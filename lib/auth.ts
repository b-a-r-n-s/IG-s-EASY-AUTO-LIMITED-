import { supabase } from './supabase'
import Cookies from 'js-cookie'

// Session storage key
const SESSION_KEY = 'ig_easy_auto_session'
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000 // 24 hours

/**
 * Admin Login
 * Verifies email and password against admin table
 */
export async function adminLogin(
  email: string,
  password: string
): Promise<{ success: boolean; message: string; adminId?: string }> {
  try {
    // Query admin table for user with matching email
    const { data: admin, error } = await supabase
      .from('admins')
      .select('id, email, password_hash, name')
      .eq('email', email)
      .single()

    if (error || !admin) {
      return { success: false, message: 'Invalid email or password' }
    }

    // Simple password verification (in production, use bcrypt)
    const passwordMatch = await verifyPassword(password, admin.password_hash)

    if (!passwordMatch) {
      return { success: false, message: 'Invalid email or password' }
    }

    // Create session
    const sessionToken = generateSessionToken()
    const sessionData = {
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
      token: sessionToken,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + SESSION_TIMEOUT).toISOString(),
    }

    // Store session in cookie
    Cookies.set(SESSION_KEY, JSON.stringify(sessionData), {
      expires: 1, // 1 day
      secure: true,
      sameSite: 'strict',
    })

    // Update last login in database
    await supabase
      .from('admins')
      .update({ last_login: new Date().toISOString() })
      .eq('id', admin.id)

    return {
      success: true,
      message: 'Login successful',
      adminId: admin.id,
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, message: 'An error occurred during login' }
  }
}

/**
 * Admin Logout
 */
export function adminLogout(): void {
  Cookies.remove(SESSION_KEY)
}

/**
 * Get current session
 */
export function getSession(): {
  adminId: string
  email: string
  name: string
  token: string
  isValid: boolean
} | null {
  try {
    const sessionCookie = Cookies.get(SESSION_KEY)

    if (!sessionCookie) {
      return null
    }

    const session = JSON.parse(sessionCookie)

    // Check if session is expired
    if (new Date(session.expiresAt) < new Date()) {
      Cookies.remove(SESSION_KEY)
      return null
    }

    return {
      adminId: session.adminId,
      email: session.email,
      name: session.name,
      token: session.token,
      isValid: true,
    }
  } catch (error) {
    console.error('Session parse error:', error)
    Cookies.remove(SESSION_KEY)
    return null
  }
}

/**
 * Check if admin is authenticated
 */
export function isAuthenticated(): boolean {
  const session = getSession()
  return session !== null && session.isValid
}

/**
 * Verify admin authentication for API routes
 */
export async function verifyAdminAuth(token?: string): Promise<string | null> {
  try {
    let authToken = token

    if (!authToken) {
      const session = getSession()
      authToken = session?.token
    }

    if (!authToken) {
      return null
    }

    // In production, verify token signature and expiry
    // For now, we just check if session exists
    return authToken
  } catch (error) {
    console.error('Auth verification error:', error)
    return null
  }
}

/**
 * Hash password (simple version - use bcrypt in production)
 */
export async function hashPassword(password: string): Promise<string> {
  // In production environment, use proper bcrypt library
  // For development, use a simple hash
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

/**
 * Verify password against hash
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    const hashedPassword = await hashPassword(password)
    return hashedPassword === hash
  } catch (error) {
    console.error('Password verification error:', error)
    return false
  }
}

/**
 * Generate random session token
 */
export function generateSessionToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

/**
 * Create admin account (for initial setup only)
 */
export async function createAdminAccount(
  email: string,
  password: string,
  name: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Check if admin already exists
    const { data: existingAdmin } = await supabase
      .from('admins')
      .select('id')
      .eq('email', email)
      .single()

    if (existingAdmin) {
      return { success: false, message: 'Admin account already exists' }
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create admin account
    const { error } = await supabase.from('admins').insert({
      email,
      password_hash: passwordHash,
      name,
      role: 'admin',
    })

    if (error) {
      return { success: false, message: 'Failed to create admin account' }
    }

    return { success: true, message: 'Admin account created successfully' }
  } catch (error) {
    console.error('Create admin error:', error)
    return { success: false, message: 'An error occurred' }
  }
}

/**
 * Update admin password
 */
export async function updateAdminPassword(
  adminId: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  try {
    const passwordHash = await hashPassword(newPassword)

    const { error } = await supabase
      .from('admins')
      .update({ password_hash: passwordHash })
      .eq('id', adminId)

    if (error) {
      return { success: false, message: 'Failed to update password' }
    }

    return { success: true, message: 'Password updated successfully' }
  } catch (error) {
    console.error('Update password error:', error)
    return { success: false, message: 'An error occurred' }
  }
}

/**
 * Log admin activity
 */
export async function logActivity(
  adminId: string,
  action: string,
  entityType: string,
  entityId?: string
): Promise<void> {
  try {
    await supabase.from('activity_logs').insert({
      admin_id: adminId,
      action,
      entity_type: entityType,
      entity_id: entityId || null,
      created_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Activity logging error:', error)
  }
}

/**
 * Refresh session expiry
 */
export function refreshSessionExpiry(): void {
  const session = getSession()
  if (session) {
    const refreshedSession = {
      ...session,
      expiresAt: new Date(Date.now() + SESSION_TIMEOUT).toISOString(),
    }
    Cookies.set(SESSION_KEY, JSON.stringify(refreshedSession), {
      expires: 1,
      secure: true,
      sameSite: 'strict',
    })
  }
}

/**
 * Get admin info
 */
export async function getAdminInfo(
  adminId: string
): Promise<{ id: string; email: string; name: string; role: string } | null> {
  try {
    const { data: admin, error } = await supabase
      .from('admins')
      .select('id, email, name, role')
      .eq('id', adminId)
      .single()

    if (error || !admin) {
      return null
    }

    return admin
  } catch (error) {
    console.error('Get admin info error:', error)
    return null
  }
}
