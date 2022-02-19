import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import EmailProvider from "next-auth/providers/email"
import client from "../../../libs/client"

export default NextAuth({
    adapter: PrismaAdapter(client),
    // Configure one or more authentication providers
    providers: [
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
            // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
        }),
        // ...add more providers here
    ],
})