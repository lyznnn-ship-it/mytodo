import type { Filters, StatusFilter, Priority, Category, SortKey } from '../types'

interface Props {
  filters: Filters
  onChange: (f: Filters) => void
}

export default function FilterBar({ filters, onChange }: Props) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch })

  return (
    <div className="filters">
      <div className="filter-group">
        {(['all', 'active', 'done'] as StatusFilter[]).map(v => (
          <button
            key={v}
            className={`filter-chip${filters.status === v ? ' active' : ''}`}
            onClick={() => set({ status: v })}
          >
            {v === 'all' ? '全部' : v === 'active' ? '未完成' : '已完成'}
          </button>
        ))}
      </div>

      <span className="filter-sep">|</span>

      <div className="filter-group">
        {(['all', 'high', 'medium', 'low'] as (Priority | 'all')[]).map(v => (
          <button
            key={v}
            className={`filter-chip${filters.priority === v ? ' active' : ''}`}
            onClick={() => set({ priority: v })}
          >
            {v === 'all' ? '全部优先级' : v === 'high' ? '🔴 高' : v === 'medium' ? '🟡 中' : '🟢 低'}
          </button>
        ))}
      </div>

      <span className="filter-sep">|</span>

      <div className="filter-group">
        {(['all', '工作', '个人', '学习', '其他'] as (Category | 'all')[]).map(v => (
          <button
            key={v}
            className={`filter-chip${filters.category === v ? ' active' : ''}`}
            onClick={() => set({ category: v })}
          >
            {v === 'all' ? '全部分类' : v === '工作' ? '💼 工作' : v === '个人' ? '🏠 个人' : v === '学习' ? '📚 学习' : '📌 其他'}
          </button>
        ))}
      </div>

      <select
        className="sort-select"
        value={filters.sort}
        onChange={e => set({ sort: e.target.value as SortKey })}
      >
        <option value="created">按创建时间</option>
        <option value="due">按截止日期</option>
        <option value="priority">按优先级</option>
      </select>
    </div>
  )
}
