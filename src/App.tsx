import { useState, useMemo } from 'react'
import type { Filters, Task } from './types'
import { useTasks } from './hooks/useTasks'
import Header from './components/Header'
import AddTaskForm from './components/AddTaskForm'
import FilterBar from './components/FilterBar'
import TaskCard from './components/TaskCard'

const PRIORITY_ORDER: Record<string, number> = { high: 0, medium: 1, low: 2 }

const DEFAULT_FILTERS: Filters = {
  status: 'all',
  priority: 'all',
  category: 'all',
  sort: 'created',
}

function applyFilters(tasks: Task[], filters: Filters): Task[] {
  let list = [...tasks]
  if (filters.status === 'active') list = list.filter(t => !t.done)
  else if (filters.status === 'done') list = list.filter(t => t.done)
  if (filters.priority !== 'all') list = list.filter(t => t.priority === filters.priority)
  if (filters.category !== 'all') list = list.filter(t => t.category === filters.category)
  if (filters.sort === 'due') {
    list.sort((a, b) => {
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return a.dueDate.localeCompare(b.dueDate)
    })
  } else if (filters.sort === 'priority') {
    list.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
  } else {
    list.sort((a, b) => b.createdAt - a.createdAt)
  }
  return list
}

export default function App() {
  const { tasks, loading, error, addTask, toggleDone, deleteTask } = useTasks()
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)

  const visible = useMemo(() => applyFilters(tasks, filters), [tasks, filters])
  const doneCount = tasks.filter(t => t.done).length

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>加载中…</p>
      </div>
    )
  }

  return (
    <div className="container">
      <Header total={tasks.length} done={doneCount} />

      {error && (
        <div className="error-banner">⚠️ {error}</div>
      )}

      <AddTaskForm onAdd={addTask} />
      <FilterBar filters={filters} onChange={setFilters} />

      <div id="task-list">
        {visible.length === 0 ? (
          <div className="empty-state">
            <div className="icon">✅</div>
            <p>{tasks.length ? '没有匹配的任务' : '还没有任务，快来添加吧！'}</p>
          </div>
        ) : (
          visible.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={toggleDone}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  )
}
