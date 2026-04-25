import { useState, useEffect } from 'react'
import type { Task, Priority, Category, TaskLink } from '../types'

const STORAGE_KEY = 'todo_tasks'

export interface NewTaskInput {
  title: string
  priority: Priority
  category: Category
  dueDate: string
  links: TaskLink[]
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Task[]
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (input: NewTaskInput) => {
    setTasks(prev => [
      {
        ...input,
        id: crypto.randomUUID(),
        done: false,
        createdAt: Date.now(),
      },
      ...prev,
    ])
  }

  const toggleDone = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  return { tasks, addTask, toggleDone, deleteTask }
}
