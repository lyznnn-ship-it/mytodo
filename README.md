# 待办清单 Todo App

一个基于 React + TypeScript + Vite 构建的现代待办事项应用，数据本地持久化，无需后端。

## 功能特性

- **任务管理** — 添加、完成、删除任务
- **优先级** — 高 / 中 / 低三档，颜色徽章区分
- **分类标签** — 工作 / 个人 / 学习 / 其他
- **截止日期** — 逾期自动红色高亮，今日到期黄色提示
- **附加链接** — 支持 `https://`、`file:///`（本地 Word/PPT/Excel）、`mailto:`（邮件）、`webcal:`（日历），自动识别类型图标
- **筛选 & 排序** — 按状态、优先级、分类筛选，支持按创建时间 / 截止日期 / 优先级排序
- **数据持久化** — 使用 `localStorage`，刷新不丢失

## 技术栈

| 技术 | 版本 |
|------|------|
| React | 18 |
| TypeScript | 5 |
| Vite | 6 |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 局域网访问（手机同 WiFi 可用）
npm run dev -- --host
```

访问 `http://localhost:5173`

## 构建部署

```bash
# 类型检查 + 生产构建
npm run build

# 本地预览构建产物
npm run preview
```

构建产物输出至 `dist/` 目录。

## 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入仓库
3. Vercel 自动识别 Vite，无需额外配置，点击 Deploy 即可

每次 `git push` 后自动触发重新部署。

## 项目结构

```
src/
├── main.tsx
├── App.tsx
├── App.css
├── types.ts                  # 类型定义
├── hooks/
│   └── useTasks.ts           # 任务 CRUD + localStorage
├── utils/
│   ├── linkIcon.ts           # 链接类型图标
│   └── dueBadge.ts           # 截止日期状态
└── components/
    ├── Header.tsx
    ├── AddTaskForm.tsx
    ├── FilterBar.tsx
    └── TaskCard.tsx
```

## License

MIT
