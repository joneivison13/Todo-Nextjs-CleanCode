import api from "@/utils/api";
import NextAuth, { AuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { serialize } from "cookie";
import ms from "ms";
import { JWT } from "next-auth/jwt";

interface ExtendedUser extends User {
  jwt?: unknown;
  refresh?: unknown;
}

// Extenda a sessão padrão para incluir o token
interface ExtendedSession extends Session {
  jwt?: unknown;
  refresh?: unknown;
}

// Extenda o JWT padrão para incluir o token
interface ExtendedJWT extends JWT {
  jwt?: unknown;
  refresh?: unknown;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const {
            data: { data },
          } = await api.post("/login", {
            email: credentials?.username,
            loggin_type: "5",
            password: credentials?.password,
          });

          // console.log({ data });

          return {
            ...data,
            jwt: data.auth.token,
            refresh: data.auth.refresh_token,
          };
        } catch (error: any) {
          console.log(error);
          console.log({ error: Object.keys(error), aa: error?.message });

          throw new Error(error.response.data.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { maxAge: 1 * 24 * 60 * 60 },

  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user: ExtendedUser }) => {
      // user is only available the first time a user signs in authorized
      if (user) {
        return {
          ...token,
          jwt: user.jwt,
          refresh: user.refresh,
        };
      }
      return token;
    },
    session: async ({
      session,
      token,
    }: {
      session: ExtendedSession;
      token: JWT;
    }) => {
      if (token) {
        (session as ExtendedSession).jwt = token.jwt;
        (session as ExtendedSession).refresh = token.refresh;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
