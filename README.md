# 技術スタック
フロントエンド: Next.js（App Router） + TypeScript
状態管理: React hooks（useState, useEffect）
認証: next-auth
APIとDB: Next.js API Routes + Prisma + PostgreSQL
バリデーション: zod or react-hook-form
UI:Tailwind CSS（見た目と開発効率両立）



#認証機能の基本構成
✅ 使用技術
next-auth: 認証ライブラリ
bcrypt: パスワードハッシュ化
Prisma: ユーザーデータをDBに保存・照合
SQLite（開発用） or PostgreSQL