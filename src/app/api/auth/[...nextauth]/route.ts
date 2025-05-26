import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
//このToDoアプリはアダプタなしで実装
//メールアドレス認証は形だけで


// 認証オプションの設定
export const authOptions: NextAuthOptions = {
  // セッションの設定
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, //TTL=1h
  },
  
  // 認証プロバイダーの設定
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('メールアドレスとパスワードが必要です');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user.password) {
          throw new Error('ユーザーが見つかりません');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error('パスワードが正しくありません');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    })
  ],
  
  pages: {
    signIn: '/login',
    error: '/error',
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  }
};

/*
流れ

ログイン成功
  ↓
authorize() で { id, email, name } を返す
  ↓
jwt() が呼ばれ、token.id に user.id を埋め込む
  ↓
session() が呼ばれ、token.id を session.user.id にコピーする
  ↓
useSession() で session.user.id が使える 🎉

構造
authOptions (NextAuthOptions)
├─ adapter: PrismaAdapter(prisma)
├─ session
│  └─ strategy: "jwt"
├─ providers
│  └─ CredentialsProvider
│     ├─ name: "credentials"
│     ├─ credentials
│     │  ├─ email: ...
│     │  └─ password: ...
│     └─ authorize(credentials)
│        ├─ 入力チェック
│        ├─ ユーザー検索（DB）
│        ├─ パスワード照合
│        └─ 成功時 return { id, email, name }
├─ pages
│  ├─ signIn: '/auth/login'
│  └─ error: '/auth/error'
├─ callbacks
│  ├─ jwt({ token, user })
│  │  └─ token.id = user.id
│  └─ session({ session, token })
│     └─ session.user.id = token.id


*/

// Next.js 13のApp RouterでのAPI Route
import NextAuth from "next-auth";
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 