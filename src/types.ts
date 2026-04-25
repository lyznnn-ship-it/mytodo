export interface TaskLink {
  label: string
  url: string
}

export type Priority = 'high' | 'medium' | 'low'
export type Category = '工作' | '个人' | '学习' | '其他'
export type StatusFilter = 'all' | 'active' | 'done'
export type SortKey = 'created' | 'due' | 'priority'

export interface Task {
  id: string
  title: string
  done: boolean
  priority: Priority
  category: Category
  dueDate: string
  links: TaskLink[]
  createdAt: number
}

export interface Filters {
  status: StatusFilter
  priority: Priority | 'all'
  category: Category | 'all'
  sort: SortKey
}
