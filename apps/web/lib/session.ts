import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth'

// Get current session
export async function getCurrentSession() {
    return await getServerSession(authOptions)
}

// Get current user
export async function getCurrentUser() {
    const session = await getCurrentSession()
    return session?.user
}

// Check if user is logged in
export async function isAuthenticated() {
    const session = await getCurrentSession()
    return !!session
}
