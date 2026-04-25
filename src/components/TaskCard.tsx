import { useState } from 'react'
import type { Task } from '../types'
import { linkIcon } from '../utils/linkIcon'
import { getDueInfo } from '../utils/dueBadge'

const PRIORITY_LABEL: Record<string, string> = { high: '高', medium: '中', low: '低' }

interface Props {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TaskCard({ task, onToggle, onDelete }: Props) {
  const [linksOpen, setLinksOpen] = useState(false)
  const dueInfo = getDueInfo(task.dueDate)

  return (
    <div className={`task-card${task.done ? ' done' : ''}`}>
      <div className="task-main">
        <div
          className={`task-check${task.done ? ' checked' : ''}`}
          onClick={() => onToggle(task.id)}
        />
        <div className="task-body">
          <div className="task-title">{task.title}</div>
          <div className="task-meta">
            <span className={`badge badge-priority-${task.priority}`}>
              {PRIORITY_LABEL[task.priority]}优先级
            </span>
            <span className="badge badge-category">{task.category}</span>
            {dueInfo && (
              <span className={`badge badge-due${dueInfo.status === 'overdue' ? ' overdue' : dueInfo.status === 'today' ? ' today' : ''}`}>
                📅 {dueInfo.label}
              </span>
            )}
          </div>
        </div>
        <div className="task-actions">
          <button
            className="btn btn-danger-ghost btn-icon"
            onClick={() => onDelete(task.id)}
            title="删除"
          >🗑</button>
        </div>
      </div>

      {task.links.length > 0 && (
        <div className="task-links">
          <button className="task-links-toggle" onClick={() => setLinksOpen(o => !o)}>
            📎 {task.links.length} 个附件/链接
          </button>
          {linksOpen && (
            <div className="task-links-list">
              {task.links.map((lk, i) => (
                <div key={i} className="task-link-item">
                  <span className="link-type-icon">{linkIcon(lk.url)}</span>
                  <a href={lk.url} target="_blank" rel="noopener noreferrer">{lk.label}</a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
