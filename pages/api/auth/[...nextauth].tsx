import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import EmailProvider from "next-auth/providers/email"
import client from "@libs/client"

export default NextAuth({
    adapter: PrismaAdapter(client),
    // Configure one or more authentication providers
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM
        }),
        // ...add more providers here
    ],
    secret: 'hello',
    pages: {
        signIn: '/enter',
        verifyRequest: '/verification',

    },
    callbacks:{
        async session( {session, user, token}){
            session.userId = user.id
            return Promise.resolve(session)
        }
    }
})