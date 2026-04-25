import { useState, useRef, KeyboardEvent } from 'react'
import type { Priority, Category, TaskLink } from '../types'
import type { NewTaskInput } from '../hooks/useTasks'
import { linkIcon } from '../utils/linkIcon'

interface Props {
  onAdd: (input: NewTaskInput) => void
}

const DEFAULT_PRIORITY: Priority = 'medium'
const DEFAULT_CATEGORY: Category = '工作'

export default function AddTaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>(DEFAULT_PRIORITY)
  const [category, setCategory] = useState<Category>(DEFAULT_CATEGORY)
  const [dueDate, setDueDate] = useState('')
  const [links, setLinks] = useState<TaskLink[]>([])
  const [showLinkForm, setShowLinkForm] = useState(false)
  const [linkLabel, setLinkLabel] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const titleRef = useRef<HTMLInputElement>(null)

  const reset = () => {
    setTitle('')
    setPriority(DEFAULT_PRIORITY)
    setCategory(DEFAULT_CATEGORY)
    setDueDate('')
    setLinks([])
    setShowLinkForm(false)
    setLinkLabel('')
    setLinkUrl('')
    titleRef.current?.focus()
  }

  const handleAdd = () => {
    if (!title.trim()) { titleRef.current?.focus(); return }
    onAdd({ title: title.trim(), priority, category, dueDate, links })
    reset()
  }

  const confirmLink = () => {
    if (!linkUrl.trim()) return
    setLinks(prev => [...prev, { label: linkLabel.trim() || linkUrl.trim(), url: linkUrl.trim() }])
    setLinkLabel('')
    setLinkUrl('')
    setShowLinkForm(false)
  }

  const handleLinkKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') confirmLink()
  }

  return (
    <div className="form-card">
      <h2>新建任务</h2>

      <div className="form-row">
        <input
          ref={titleRef}
          className="title-input"
          type="text"
          placeholder="任务标题…"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          autoComplete="off"
        />
      </div>

      <div className="form-row">
        <select value={priority} onChange={e => setPriority(e.target.value as Priority)}>
          <option value="medium">🟡 中优先级</option>
          <option value="high">🔴 高优先级</option>
          <option value="low">🟢 低优先级</option>
        </select>
        <select value={category} onChange={e => setCategory(e.target.value as Category)}>
          <option value="工作">💼 工作</option>
          <option value="个人">🏠 个人</option>
          <option value="学习">📚 学习</option>
          <option value="其他">📌 其他</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
      </div>

      {/* Links section */}
      <div className="links-section">
        <div className="links-section-header">
          <span>📎 附加链接</span>
          <button className="btn btn-ghost btn-sm" onClick={() => setShowLinkForm(true)}>
            + 添加链接
          </button>
        </div>

        {links.length > 0 && (
          <div className="pending-links">
            {links.map((lk, i) => (
              <div key={i} className="pending-link-row">
                <span className="link-icon">{linkIcon(lk.url)}</span>
                <span className="link-label">{lk.label}</span>
                <span className="link-url-preview">{lk.url}</span>
                <button
                  className="btn btn-danger-ghost btn-icon"
                  onClick={() => setLinks(prev => prev.filter((_, j) => j !== i))}
                >✕</button>
              </div>
            ))}
          </div>
        )}

        {showLinkForm && (
          <div className="inline-link-form">
            <input
              type="text"
              placeholder="链接标签（如：会议文档）"
              value={linkLabel}
              onChange={e => setLinkLabel(e.target.value)}
            />
            <input
              type="text"
              placeholder="URL（https:// 或 file:/// 或 mailto:）"
              value={linkUrl}
              onChange={e => setLinkUrl(e.target.value)}
              onKeyDown={handleLinkKeyDown}
            />
            <button className="btn btn-secondary btn-sm" onClick={confirmLink}>确认</button>
            <button className="btn btn-ghost btn-sm" onClick={() => { setShowLinkForm(false); setLinkLabel(''); setLinkUrl('') }}>取消</button>
          </div>
        )}
      </div>

      <div className="form-actions">
        <button className="btn btn-secondary" onClick={reset}>清空</button>
        <button className="btn btn-primary" onClick={handleAdd}>添加任务</button>
      </div>
    </div>
  )
}
