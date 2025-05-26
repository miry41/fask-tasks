'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'


export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter() //Router 初期化

  const handleLogin = async (e: React.FormEvent) => {
    //フォームの標準動作（ページのリロード）をキャンセル
    //Reactでのフォーム処理では毎回必要
    e.preventDefault()
  
    //入力チェック　2つともFalseの場合実行
    if (!email || !password) {
      setError('すべての項目を入力してください')
      return
    }

    //エラー・成功状態の初期化
    setError('')
    setSuccess(false)

    try {
      // fetchを使ってAPIにリクエスト送信
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
           
      if (result?.error){
        setError(result.error);
        return;
      }

      setSuccess(true)

      //ユーザーページへ
      router.push("/user")
    } catch (err) {
      setError('エラーが発生しました')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold mb-0 leading-none">ログイン</h1>
      <button
      className="text-blue-500 hover:underline"
      onClick={() => router.push('/register')} //  ログインページへ遷移
    >
      アカウント作成
    </button>
    </div>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white rounded py-2 hover:bg-blue-600">
          ログイン
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">ログイン成功！</p>}
    </div>
  )
}
