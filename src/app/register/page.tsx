'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'


export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter() //Router 初期化

  const handleSubmit = async (e: React.FormEvent) => {
    //フォームの標準動作（ページのリロード）をキャンセル
    //Reactでのフォーム処理では毎回必要
    e.preventDefault()
  
    //入力チェック　3つともFalseの場合実行
    if (!name || !email || !password) {
      setError('すべての項目を入力してください')
      return
    }

    //エラー・成功状態の初期化
    setError('')
    setSuccess(false)

    try {
      // fetchを使ってAPIにリクエスト送信
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        //JSON形式でデータを送信
        body: JSON.stringify({ name, email, password }),
      })

      //レスポンスのJSONデータを取得
      const data = await res.json();
           
      if (!res.ok) {//HTTPステータスコードが200番台でない場合のエラー処理
        setError(data.message || "登録に失敗しました。");
        return ;
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
      <h1 className="text-2xl font-bold mb-0 leading-none">新規登録</h1>
      <button
      className="text-blue-500 hover:underline"
      onClick={() => router.push('/login')} //  ログインページへ遷移
    >
      ログイン
    </button>
    </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h3>※ 実際に使用しているメールアドレスは入力しないでください。</h3>
        <input
          className="border p-2 rounded"
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white rounded py-2 hover:bg-blue-600">
          登録
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">登録成功！</p>}
    </div>
  )
}
