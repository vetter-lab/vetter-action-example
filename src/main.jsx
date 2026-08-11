import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  Check,
  ChevronRight,
  CircleDot,
  Clock3,
  Code2,
  FileCode2,
  GitPullRequest,
  KeyRound,
  LockKeyhole,
  Play,
  Settings2,
  ShieldCheck,
  TerminalSquare,
  Zap,
} from 'lucide-react'
import './styles.css'

const workflowSteps = [
  {
    number: '01',
    icon: GitPullRequest,
    title: 'Pull request 事件',
    description: '打开、重新打开或同步代码时自动触发。',
    tag: 'on.pull_request',
  },
  {
    number: '02',
    icon: Bot,
    title: 'Vetter review',
    description: '在 ubuntu-latest 上调用 Vetter 执行智能审查。',
    tag: 'jobs.review',
  },
  {
    number: '03',
    icon: Check,
    title: '反馈到 PR',
    description: '使用 GITHUB_TOKEN 写入检查结果与审查反馈。',
    tag: 'checks + comments',
  },
]

const configRows = [
  ['model', 'gpt-5.6-luna', '审查使用的模型'],
  ['baseUrl', 'https://supercodes.vip/v1', '模型 API 地址'],
  ['language', 'en', '审查输出语言'],
]

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Vetter Action 首页">
          <span className="brand-mark"><ShieldCheck size={17} strokeWidth={2.5} /></span>
          <span>vetter<span className="brand-slash">/</span>action</span>
        </a>
        <div className="topbar-right">
          <span className="repo-label"><CircleDot size={13} /> vetter-action-example</span>
          <a className="github-link" href="https://github.com/vetter-lab/vetter" target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={14} />
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> CI / CODE REVIEW</div>
            <h1>让每一个 PR<br /><em>都先被认真看一遍。</em></h1>
            <p className="hero-intro">
              这是一个最小可用的 Vetter Action 示例。提交 Pull Request 后，GitHub Actions 会自动启动审查，并把结果带回你的代码协作流程。
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#workflow"><Play size={16} fill="currentColor" /> 查看 workflow</a>
              <a className="text-button" href="https://github.com/vetter-lab/vetter" target="_blank" rel="noreferrer">阅读 Vetter 文档 <ChevronRight size={16} /></a>
            </div>
          </div>
          <div className="hero-panel" aria-label="workflow 当前状态">
            <div className="panel-topline">
              <span className="panel-label"><TerminalSquare size={15} /> WORKFLOW RUN</span>
              <span className="run-status"><span className="live-dot" /> READY</span>
            </div>
            <div className="run-heading">
              <div>
                <span className="run-title">Vetter review</span>
                <span className="run-subtitle">Pull request quality gate</span>
              </div>
              <span className="run-number">#001</span>
            </div>
            <div className="run-track">
              <span className="track-fill" />
              <span className="track-node node-one"><Check size={12} /></span>
              <span className="track-node node-two"><Check size={12} /></span>
              <span className="track-node node-three"><CircleDot size={12} /></span>
            </div>
            <div className="run-meta">
              <span><Clock3 size={14} /> on pull_request</span>
              <span>3 steps</span>
            </div>
            <div className="terminal-lines" aria-hidden="true">
              <div><span className="terminal-prompt">$</span> vetter action --review</div>
              <div><span className="terminal-ok">OK</span> model loaded · language: en</div>
              <div><span className="terminal-wait">...</span> waiting for pull request</div>
            </div>
          </div>
        </section>

        <section className="signal-band">
          <div className="section-wrap signal-grid">
            <div className="signal-item"><span className="signal-icon"><Zap size={17} /></span><span><strong>自动触发</strong><small>PR opened / reopened / synchronize</small></span></div>
            <div className="signal-item"><span className="signal-icon"><LockKeyhole size={17} /></span><span><strong>权限清晰</strong><small>只读代码，写入检查与 PR 反馈</small></span></div>
            <div className="signal-item"><span className="signal-icon"><Settings2 size={17} /></span><span><strong>配置集中</strong><small>模型、接口和语言一处管理</small></span></div>
          </div>
        </section>

        <section className="workflow-section section-wrap" id="workflow">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> HOW IT RUNS</div>
              <h2>一次 PR，三步完成审查。</h2>
            </div>
            <p>工作流定义在 <code>.github/workflows/vetter-action.yml</code>，GitHub 负责调度，Vetter 负责审查。</p>
          </div>
          <div className="workflow-grid">
            {workflowSteps.map(({ number, icon: Icon, title, description, tag }, index) => (
              <div className="workflow-step" key={number}>
                <div className="step-index">{number}</div>
                <div className="step-icon"><Icon size={21} /></div>
                <h3>{title}</h3>
                <p>{description}</p>
                <code>{tag}</code>
                {index < workflowSteps.length - 1 && <ArrowDown className="step-arrow" size={18} />}
              </div>
            ))}
          </div>
        </section>

        <section className="details-section">
          <div className="section-wrap details-grid">
            <div className="detail-block config-block">
              <div className="eyebrow"><span className="eyebrow-line" /> REVIEW CONFIG</div>
              <div className="detail-title-row">
                <h2>审查参数</h2>
                <span className="file-badge"><FileCode2 size={14} /> vetter-action.yml</span>
              </div>
              <div className="config-table">
                {configRows.map(([key, value, note]) => (
                  <div className="config-row" key={key}>
                    <code>{key}</code>
                    <strong>{value}</strong>
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-block secrets-block">
              <div className="eyebrow"><span className="eyebrow-line" /> REQUIRED SECRETS</div>
              <h2>只需要两把钥匙。</h2>
              <p>敏感信息放在 GitHub Secrets 中，workflow 只在运行时读取，不写进仓库。</p>
              <div className="secret-list">
                <div className="secret-row"><span className="secret-icon"><KeyRound size={16} /></span><code>GITHUB_TOKEN</code><span className="secret-required">GitHub 自动提供</span></div>
                <div className="secret-row"><span className="secret-icon"><KeyRound size={16} /></span><code>VETTER_MODEL_API_KEY</code><span className="secret-required">需要手动配置</span></div>
              </div>
              <a className="text-button" href="https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions" target="_blank" rel="noreferrer">了解 GitHub Secrets <ArrowUpRight size={15} /></a>
            </div>
          </div>
        </section>

        <section className="cta-section section-wrap">
          <div className="cta-icon"><Code2 size={23} /></div>
          <div><div className="eyebrow"><span className="eyebrow-line" /> START HERE</div><h2>把审查带进你的下一个 PR。</h2></div>
          <a className="primary-button" href="https://github.com/vetter-lab/vetter" target="_blank" rel="noreferrer">打开 Vetter <ArrowUpRight size={16} /></a>
        </section>
      </main>

      <footer className="footer section-wrap">
        <span>vetter/action example</span>
        <span>Built for clearer code reviews <span className="footer-mark">✦</span></span>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
