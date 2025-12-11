'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import type { User } from './types'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, firstName: string, lastName: string, role: 'student' | 'instructor', phone?: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (session?.user) {
      // Map NextAuth session user to our User type
      // Note: You might need to extend the NextAuth session type to include more fields if needed
      const mappedUser: User = {
        id: session.user.id || '',
        email: session.user.email || '',
        firstName: session.user.name?.split(' ')[0] || '',
        lastName: session.user.name?.split(' ').slice(1).join(' ') || '',
        role: (session.user as any).role || 'student', // Assuming role is passed in session
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      setUser(mappedUser)
    } else {
      setUser(null)
    }
  }, [session])

  const login = async (email: string, password: string) => {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if (result?.error) {
      throw new Error(result.error)
    }
  }

  const signup = async (email: string, password: string, firstName: string, lastName: string, role: 'student' | 'instructor', phone?: string) => {
    // For signup, we usually hit an API route which then creates the user
    // For now, we can just throw an error or implement a basic fetch to an API route
    // This part needs a proper API route implementation for registration
    console.log('Signup not fully implemented in this context yet, should call API')
    throw new Error('Signup not implemented')
  }

  const logout = async () => {
    await signOut({ redirect: false })
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading: status === 'loading', login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
