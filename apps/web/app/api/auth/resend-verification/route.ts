import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '../../../../lib/prisma'
import { sendVerificationEmail } from '../../../../lib/email'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email } = body

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        if (user.emailVerified) {
            return NextResponse.json(
                { error: 'Email already verified' },
                { status: 400 }
            )
        }

        // Delete old tokens
        await prisma.verificationToken.deleteMany({
            where: { identifier: email }
        })

        // Generate new token
        const token = crypto.randomBytes(32).toString('hex')
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)

        await prisma.verificationToken.create({
            data: {
                identifier: email,
                token,
                expires,
            }
        })

        await sendVerificationEmail(email, token)

        return NextResponse.json(
            { message: 'Verification email sent' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Resend verification error:', error)
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        )
    }
}
