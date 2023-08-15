import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "descope",
      name: "Descope",
      type: "oauth",
      wellKnown: `https://api.descope.com/P2U06w5vvSzA6NBqrv7tba9EhlkL/.well-known/openid-configuration`,
      authorization: { params: { scope: "openid email profile" } },
      idToken: true,
      clientId: "P2U06w5vvSzA6NBqrv7tba9EhlkL",
      clientSecret:
        "K2U0OlUj2CtIt7E9aShYjy65ekZ0jl7kuLYXx34h8lBgkAXhfJcY2yWCtvCeaK04mbvRwdL",
      checks: ["pkce", "state"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
