import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import type { Role, OnboardingStatus } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string;
      image: string | null;
      role: Role;
      onboarding: OnboardingStatus;
    };
  }

  interface User {
    role: Role;
    onboarding: OnboardingStatus;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role: Role;
    onboarding: OnboardingStatus;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db) as never,
  session: { strategy: "jwt" },
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
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          onboarding: user.onboarding,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
        token.onboarding = user.onboarding;
      }
      if (trigger === "update" && session) {
        token.role = session.role;
        token.onboarding = session.onboarding;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as Role;
        session.user.onboarding = token.onboarding as OnboardingStatus;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/onboarding",
  },
});
