import { PrismaClient } from '../generated/prisma'

const globalForPrisma = global as unknown as { prisma: PrismaClient }
//as unknown as 型名 は TypeScriptで「一時的に型チェックを無視して
// 別の型に無理やり変える」という裏技的なキャスト方法


export const prisma =
  globalForPrisma.prisma ||
//すでにあるならそれを使う
//なければ新しいインスタンスを作る
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 
//「本番環境でなければ、生成した Prisma Client を
//  global に保存する」という処理
//process.env.NODE_ENV とは？
//Node.jsの環境変数で、アプリの実行環境を表す