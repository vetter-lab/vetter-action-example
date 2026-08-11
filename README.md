# Vetter Action Example

一个用 Vite + React 构建的 Vetter Action workflow 介绍页。

## 本地运行

```bash
npm install
npm run dev
```

构建生产版本：

```bash
npm run build
```

## Workflow

`.github/workflows/vetter-action.yml` 会在 Pull Request 被打开、重新打开或同步时触发 `vetter-lab/vetter@main`，使用 `VETTER_MODEL_API_KEY` 执行代码审查，并将检查结果反馈到 PR。
