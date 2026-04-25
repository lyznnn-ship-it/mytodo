interface Props {
  total: number
  done: number
}

export default function Header({ total, done }: Props) {
  return (
    <header>
      <h1>待办 <span>清单</span></h1>
      <div className="stats">{done} / {total} 已完成</div>
    </header>
  )
}
