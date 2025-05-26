import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
    }
  }

  interface User {
    id: string
    email: string
    name: string
  }
} 

//NextAuth を使うと、useSession() でセッション情報が取得できるが、
//デフォルトでは user.id が型に含まれていない
//このコードを使って Session.user.id を明示的に型定義に追加