/**
 * Provedor de Autenticação.
 * @module api
 */

import { authUser } from "controllers";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { exceptionHandler } from "utils/exceptionHandler";

/**
 * Rota API de autenticação. Requerido para o funcionamento
 * do NextAuth.
 * @method NextAuth
 * @memberof module:auth
 * @returns {Object} Objeto do tipo 'session'.
 */
export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "flemCredentials",
      name: "Credentials Authentication",
      credentials: {
        username: { label: "User", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      type: "credentials",
      async authorize(credentials, req) {
        try {
          const user = await authUser(
            credentials.username,
            credentials.password
          );
          if (user) return user;
          return null;
        } catch (error) {
          exceptionHandler(error, 0);
          return false;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  jwt: {
    encryption: true,
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        const { permissoes, ...restUser } = user;
        token.id = restUser.idUser;
        token.name = restUser.nome;
        return { ...restUser, ...token };
      }
      return token;
    },
    session: ({ session, token, user }) => {
      if (token) {
        session.id = token.id;
        session.user.lotacaoDominio = token.lotacaoDominio;
        session.user.id = token.id;
      }
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      return baseUrl;
    },
  },
  debug: true,
});
