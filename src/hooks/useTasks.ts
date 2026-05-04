import { useState, useEffect, useCallback } from 'react'
import type { Task, Priority, Category, TaskLink } from '../types'

export interface NewTaskInput {
  title: string
  priority: Priority
  category: Category
  dueDate: string
  links: TaskLink[]
}

const API = '/api/tasks'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 初始加载
  useEffect(() => {
    fetch(API)
      .then(r => {
        if (!r.ok) throw new Error('加载失败')
        return r.json() as Promise<Task[]>
      })
      .then(data => {
        setTasks(data)
        setLoading(false)
      })
      .catch(e => {
        setError((e as Error).message)
        setLoading(false)
      })
  }, [])

  // 保存到云端
  const save = useCallback((next: Task[]) => {
    setTasks(next)
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(next),
    }).catch(() => setError('保存失败，请检查网络'))
  }, [])

  const addTask = useCallback((input: NewTaskInput) => {
    save([
      {
        ...input,
        id: crypto.randomUUID(),
        done: false,
        createdAt: Date.now(),
      },
      ...tasks,
    ])
  }, [tasks, save])

  const toggleDone = useCallback((id: string) => {
    save(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)))
  }, [tasks, save])

  const deleteTask = useCallback((id: string) => {
    save(tasks.filter(t => t.id !== id))
  }, [tasks, save])

  return { tasks, loading, error, addTask, toggleDone, deleteTask }
}
