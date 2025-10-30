'use server'

import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { prisma } from '../../lib/prisma'
import { sendVerificationEmail } from '../../lib/email'

export async function registerUser(
    name: string,
    email: string,
    password: string
) {
    try {
        if (!email || !password) {
            return { error: 'Email and password required' }
        }

        if (password.length < 6) {
            return { error: 'Password must be at least 6 characters' }
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return { error: 'Email already registered' }
        }


        const result = await prisma.$transaction(async (tx) => {
            const hashedPassword = await bcrypt.hash(password, 10)

            const user = await tx.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                    emailVerified: null,
                }
            })

            const token = crypto.randomBytes(32).toString('hex')
            const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)

            await tx.verificationToken.create({
                data: {
                    identifier: email,
                    token,
                    expires,
                }
            })
            return { user, token, email }
        })


        try {
            await sendVerificationEmail(result.email, result.token)
        } catch (emailError) {
            console.error('Email send failed but user created:', emailError)
        }


        return {
            success: true,
            message: 'Check your email to verify account'
        }
    } catch (error) {
        console.error('Registration error:', error)
        return { error: 'Something went wrong' }
    }
}
