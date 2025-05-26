'use client'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type HeaderProps = {
  userName?: string | null
  onAddTaskClick: () => void
}

export default function Header({ onAddTaskClick }: HeaderProps) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const userName = session?.user?.name

  useEffect(() => {
    if (status === 'unauthenticated' || !userName) {
      router.push('/login')
    }
  }, [status, userName, router])

  if (status === 'loading') {
    return <div>読み込み中...</div>
  }

  if (!userName) {
    return null
  }

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/login')
  }

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="text-white">
        <p className="text-2xl font-bold">ようこそ{`${userName}さん`}</p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onAddTaskClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          タスクを追加
        </button>
        <button
          onClick={handleLogout}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
        >
          ログアウト
        </button>
      </div>
    </div>
  )
} 