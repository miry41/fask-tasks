'use client'

type Task = {
  id: string
  title: string
  completed: boolean
}

type TaskListProps = {
  tasks: Task[]
  onDelete: (id:string) => void
  onChange: (id:string, completed: boolean) => void
  onEdit: (id:string, title:string) => void
}

export default function TaskList({ tasks,onDelete, onChange, onEdit }: TaskListProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">タスク一覧</h2>
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500">タスクがありません</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  className="h-5 w-5 rounded border-gray-300"
                  onChange={() => onChange(task.id, !task.completed)}
                />
                <span className={task.completed ? 'line-through text-gray-500' : ''}>
                  {task.title}
                </span>
              </div>
              <div>
              <button
                className="text-green-500 hover:text-green-700"
                onClick={() => onEdit(task.id, task.title)}
              >
                編集
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => onDelete(task.id)}
              >
                削除
              </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
} 