export type DueStatus = 'overdue' | 'today' | 'normal' | null

export function getDueInfo(dueDate: string): { label: string; status: DueStatus } | null {
  if (!dueDate) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(dueDate + 'T00:00:00')
  const diff = Math.round((due.getTime() - today.getTime()) / 86_400_000)

  if (diff < 0) return { label: `逾期 ${-diff} 天`, status: 'overdue' }
  if (diff === 0) return { label: '今天到期', status: 'today' }
  if (diff === 1) return { label: '明天到期', status: 'normal' }
  return { label: dueDate, status: 'normal' }
}
