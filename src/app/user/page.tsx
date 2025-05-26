'use client'
import { useState, useEffect } from 'react'
import Header from '../UI/Header'
import TaskList from '../UI/TaskList'
import AddTaskModal from '../UI/AddTaskModal'
import { title } from 'process'
import EditTitleModal from '../UI/EditTitle'

type Task = {
  id: string
  title: string
  completed: boolean
}


export default function UserPage() {

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [editingTaskTitle, setEditingTaskTitle] = useState<string>('')
  const [tasks, setTasks] = useState<Task[]>([]) 

  useEffect(() => {
    const fetchTasks = async() => {
      try {
        const res = await fetch("/api/auth/tasks",{
          method:"GET",
          credentials: "include" //cookieを送る設定
        });

        const data = await res.json();

        if(!res.ok){
          throw new Error(data.message || "タスクの取得に失敗しました。")
        }
        setTasks(data); //タスクリスト更新
      } catch(e : any){
        console.log("タスク取得エラー",e.message);
      }
    };
    fetchTasks();
  },[]);


  const handleAddTask = async (title: string) => {
    // タスク追加処理
    //console.log('新しいタスク:', title)
    try{
      const res = await fetch("/api/auth/tasks",{
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({ title }),
        credentials: "include",
     });

     const data = await res.json();
      if (!res.ok){
        throw new Error(data.message || "タスク追加に失敗しました。");
      }

      setTasks(prev => [...prev, data.task]);

    }catch(e){
      return 
    }
  }

  const handleDeleteTask = async (id: string) => {
    try{
      const res = await fetch("/api/auth/tasks",{
        method:"DELETE",
        headers:{
          "content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
        credentials: "include",
      });

      const data = await res.json();
      
      if(!res.ok){
        throw new Error(data.message || "削除失敗");
      }

      //削除成功時、UIからも削除
      setTasks(prev => prev.filter(task => task.id !== id));
    }catch(e: any){
      console.log("削除エラー",e)
    }
  }

  const handleChangeTask = async (id:string, completed: boolean)=> {
    try{
      const res = await fetch("/api/auth/tasks",{
        method:"PATCH",
        headers:{
          "Content-type": "application/json",
        },
        body: JSON.stringify({id, completed}),
        credentials:"include",
      });

      const data = await res.json();

      if(!res.ok){
        throw new Error(data.message || "更新失敗");
      }

      //UI更新
      setTasks(prev =>
        prev.map(task =>
          task.id === id ? {...task, completed: data.task.completed} :task
        )
      )
    }catch(e){
      console.log(e);
    }
  }

  const handleEditTaitle = async(id:string, title: string) => {
    //console.log("handleEditTaitle START", id, title)
    try{
      const res = await fetch("/api/auth/tasks",{
        method:"PATCH",
        headers:{
          "Content-type": "application/json",
        },
        body: JSON.stringify({id, title}),
        credentials:"include",
      });

      const data = await res.json();
      //console.log("PATCH response", res.status, data)

      if(!res.ok){
        throw new Error(data.message || "更新失敗");
      }

      //UI更新
      setTasks(prev =>
        prev.map(task =>
          task.id === id ? {...task, title: data.task.title}:task
        )
      )
    }catch(e){
      console.log(e);
    }
  }

    //モーダルを開く関数
  const openEditModal = (id: string, title: string) => {
    setEditingTaskId(id)
    setEditingTaskTitle(title)
    setIsEditModalOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Header
        onAddTaskClick={() => setIsAddTaskModalOpen(true)}
      />
      <TaskList 
        tasks={tasks} 
        onDelete={handleDeleteTask}
        onChange={handleChangeTask}
        onEdit={openEditModal}/>
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onSubmit={handleAddTask}
      />
      <EditTitleModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        taskTitle={editingTaskTitle}
        onSubmit={(newTitle) => {
          if (editingTaskId){
          handleEditTaitle(editingTaskId, newTitle)
          setIsEditModalOpen(false)
          }
        }}
        />
    </div>
  )
}