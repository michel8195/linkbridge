import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Actual auth logic is in auth.ts to avoid Edge issues with bcrypt/prisma
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/onboarding",
  },
} satisfies NextAuthConfig;
