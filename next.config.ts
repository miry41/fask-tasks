import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, 
    /*
    ↑　ここと、
    package.jsonの
    "scripts": {
    　・・・
    "build": "NEXT_DISABLE_ESLINT=true next build",
    ・・・　　　↑ここが、
    ビルド時の「ESLint（コードチェック）」でエラーを無視する設定
    後で修正
    */
  },
}

export default nextConfig
