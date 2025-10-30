import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { token } = body

        if (!token) {
            return NextResponse.json(
                { error: 'Token is required' },
                { status: 400 }
            )
        }

        // Find verification token
        const verificationToken = await prisma.verificationToken.findUnique({
            where: { token }
        })

        if (!verificationToken) {
            return NextResponse.json(
                { error: 'Invalid or expired token' },
                { status: 400 }
            )
        }

        // Check if token is expired
        if (verificationToken.expires < new Date()) {
            // Delete expired token
            await prisma.verificationToken.delete({
                where: { token }
            })

            return NextResponse.json(
                { error: 'Token has expired. Please request a new verification email.' },
                { status: 400 }
            )
        }

        // Update user's emailVerified field
        await prisma.user.update({
            where: { email: verificationToken.identifier },
            data: { emailVerified: new Date() }
        })

        // Delete used token
        await prisma.verificationToken.delete({
            where: { token }
        })

        return NextResponse.json(
            { message: 'Email verified successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Verification error:', error)
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        )
    }
}
