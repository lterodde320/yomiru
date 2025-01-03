import NextAuth, { AuthOptions, Session } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

export interface UserSession extends Session {
  user: {
    id: string | undefined
    name: string | null | undefined
    email: string | null | undefined
    image: string | null | undefined
  }
}

const prisma = new PrismaClient()

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })
        if (!user) {
          return null
        }
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
        if (!isPasswordValid) {
          return null
        }
        return { id: user.id, email: user.email }
      }
    })
  ],
  callbacks: {
    session: async ({ session, token }) => {
      const userSession = session as UserSession
      if (userSession?.user) {
        userSession.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

