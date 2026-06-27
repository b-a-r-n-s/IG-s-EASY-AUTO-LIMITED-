import Cookies from 'js-cookie'

const SESSION_KEY = 'ig_easy_auto_session'
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000 // 24 hours

/**
 * Admin Login — calls server-side API route
 */
export async function adminLogin(
  email: string,
  password: string
): Promise<{ success: boolean; message: string; adminId?: string }> {
  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const result = await response.json()

    if (!result.success) {
      return { success: false, message: result.message }
    }

    const sessionToken = generateSessionToken()
    const sessionData = {
      adminId: result.admin.id,
      email: result.admin.email,
      name: result.admin.name,
      token: sessionToken,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + SESSION_TIMEOUT).toISOString(),
    }

    Cookies.set(SESSION_KEY, JSON.stringify(sessionData), {
      expires: 1,
      secure: true,
      sameSite: 'strict',
    })

    return {
      success: true,
      message: 'Login successful',
      adminId: result.admin.id,
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

    return authToken
  } catch (error) {
    console.error('Auth verification error:', error)
    return null
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
 * Create admin account — calls server-side API route
 */
export async function createAdminAccount(
  email: string,
  password: string,
  name: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/admin/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })

    return await response.json()
  } catch (error) {
    console.error('Create admin error:', error)
    return { success: false, message: 'An error occurred' }
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
