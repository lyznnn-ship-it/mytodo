export function linkIcon(url: string): string {
  const u = url.toLowerCase()
  if (u.startsWith('mailto:')) return '📧'
  if (u.startsWith('webcal:')) return '📅'
  if (u.includes('calendar.google') || u.includes('outlook.live') || u.includes('calendar.')) return '📅'
  if (/\.(docx?|doc)($|\?)/.test(u)) return '📄'
  if (/\.(pptx?|ppt)($|\?)/.test(u)) return '📊'
  if (/\.(xlsx?|xls|csv)($|\?)/.test(u)) return '📈'
  if (u.startsWith('file:')) return '📁'
  return '🔗'
}
