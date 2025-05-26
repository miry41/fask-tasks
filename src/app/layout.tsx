import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from './UI/providers/SessionProvider'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fast-Tasks",
  description: "シンプルなToDoアプリケーション",
};


//App Routerのすべてのページがこの RootLayout にネストされて表示される
//引数 children には各ページの内容が入る（例：/page.tsxの中身）
export default function RootLayout({
  children,
}: Readonly<{//「このオブジェクトのプロパティは読み取り専用にする」という意味
             //関数内で children = xxx のように上書きできなくなる
  children: React.ReactNode;//Reactで描画可能なすべてのもの を指す型(JSX,TXT,LIST,NaNなど)
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
