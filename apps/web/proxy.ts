import { withAuth } from 'next-auth/middleware'

export default withAuth(
    function proxy(req) {
        // You can add custom logic here if needed
    },
    {
        callbacks: {
            authorized({ req, token }) {
                const protectedRoutes = [
                    '/generatequiz',
                    '/attemptquiz',
                    '/quizhistory',
                    '/quizzes',
                ]

                const isProtected = protectedRoutes.some(route =>
                    req.nextUrl.pathname.startsWith(route)
                )

                return isProtected ? !!token : true
            }
        },
    }
)

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
