import { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

interface UserType {
  id: string;
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export const authOptions : NextAuthOptions = {
    debug: true,
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                username: { label: "Email", type: "email", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error("CredentialsSignin");
                }

                const payload = {
                    username: credentials.username,
                    password: credentials.password,
                };

                const res = await fetch("https://server.aptech.io/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                const tokens = await res.json();

                if (!res.ok || !tokens.loggedInUser) {
                    // Throw CredentialsSignin for NextAuth error mapping
                    throw new Error("CredentialsSignin");
                }

                const user: UserType = {
                    id: tokens.loggedInUser.id,
                    name: tokens.loggedInUser.name ?? "", // fallback if name is missing
                    email: tokens.loggedInUser.email,
                    accessToken: tokens.access_token,
                    refreshToken: tokens.refresh_token,
                };
                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT, user: User }) {
            if (user) {
                const u = user as UserType;
                return {
                    ...token,
                    accessToken: u.accessToken,
                    refreshToken: u.refreshToken,
                };
            }
            return token;
        },
        
        async session({ session, token }: { session: Session; token: JWT }) {
      //console.log('callbacks session', token);
      // Create a user object with token properties
      const userObject: UserType = {
        id: token.id as string,
        name: (token.name as string) ?? "",
        accessToken: (token.accessToken as string) ?? "",
        refreshToken: (token.refreshToken as string) ?? "",
        email: (token.email as string) ?? "",
      };

      // Add the user object to the session
      session.user = userObject;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

declare module "next-auth" {
  interface Session {
    user: UserType & {
      accessToken?: string
    }
  }
}