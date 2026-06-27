'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { isAuthenticated, adminLogout, getSession } from '@/lib/auth'
import { COMPANY } from '@/lib/constants'

const SIDEBAR_LINKS = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { name: 'Vehicles', href: '/admin/dashboard/vehicles', icon: '🚗' },
  { name: 'Inquiries', href: '/admin/dashboard/inquiries', icon: '📩' },
  { name: 'Procurement', href: '/admin/dashboard/procurement', icon: '🔍' },
  { name: 'Sell Requests', href: '/admin/dashboard/sell-car', icon: '💰' },
  { name: 'Testimonials', href: '/admin/dashboard/testimonials', icon: '⭐' },
  { name: 'Settings', href: '/admin/dashboard/settings', icon: '⚙️' },
]

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [adminName, setAdminName] = useState('')

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login')
      return
    }

    const session = getSession()
    setAdminName(session?.name || 'Admin')
    setIsChecking(false)
  }, [router])

  const handleLogout = () => {
    adminLogout()
    router.push('/admin/login')
  }

  if (isChecking) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-primary-gold">Loading...</p>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen flex">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-primary-dark-gray border-r-2 border-primary-gold z-40 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-primary-gold">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-gold rounded-lg flex items-center justify-center">
              <span className="text-black font-heading font-bold text-sm">IG</span>
            </div>
            <div>
              <p className="text-primary-gold font-heading font-bold text-sm leading-tight">
                ADMIN PANEL
              </p>
              <p className="text-primary-silver text-xs leading-tight">{COMPANY.name}</p>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {SIDEBAR_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-black hover:text-primary-gold transition-colors"
            >
              <span>{link.icon}</span>
              <span className="text-sm font-medium">{link.name}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-primary-gold">
          <p className="text-primary-silver text-xs mb-2 px-2">Logged in as</p>
          <p className="text-white text-sm font-semibold px-2 mb-3 truncate">{adminName}</p>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-lg text-red-400 hover:bg-black transition-colors text-sm font-medium"
          >
            🚪 Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-primary-gold bg-black sticky top-0 z-20">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-primary-gold"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <p className="text-white font-bold text-sm">Admin Panel</p>
          <div className="w-6" />
        </div>

        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
   }
