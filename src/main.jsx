import React from 'react'
import { createRoot } from 'react-dom/client'
import { BarChart3, BrainCircuit, ChevronRight, CircleCheck, FileText, Lightbulb, MessageSquareText, Sparkles, Target, Upload } from 'lucide-react'
import './styles.css'

const opportunities = [
  { title: 'Reduce repetitive data entry', evidence: '8 of 23 customers mentioned entering the same information more than once.', impact: 'High', confidence: 'High', effort: 'Medium', status: 'Investigate' },
  { title: 'Make reporting easier to understand', evidence: '6 customers struggled to turn reports into actionable decisions.', impact: 'Medium', confidence: 'High', effort: 'Low', status: 'Build' },
  { title: 'Improve mobile workflow', evidence: '5 customers asked for faster access while working away from their desk.', impact: 'High', confidence: 'Medium', effort: 'High', status: 'Investigate' },
]

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><Sparkles size={17} /></div><span>ProductSignal</span></div>
        <nav>
          <a className="active"><BarChart3 size={17} /> Overview</a>
          <a><MessageSquareText size={17} /> Feedback</a>
          <a><Lightbulb size={17} /> Opportunities</a>
          <a><Target size={17} /> Prioritization</a>
        </nav>
        <div className="sidebar-bottom">
          <div className="workspace-label">WORKSPACE</div>
          <div className="workspace"><div className="avatar">PM</div><div><strong>Product team</strong><span>Discovery workspace</span></div></div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar"><div><div className="eyebrow">PRODUCT DISCOVERY</div><h1>Turn feedback into better decisions.</h1></div><button className="primary"><Upload size={16} /> Add feedback</button></header>

        <section className="summary-grid">
          <div className="summary-card"><div className="summary-icon"><MessageSquareText size={18} /></div><div><span>Feedback analyzed</span><strong>23</strong><small>from 12 customers</small></div></div>
          <div className="summary-card"><div className="summary-icon"><BrainCircuit size={18} /></div><div><span>Problems identified</span><strong>7</strong><small>3 high-confidence themes</small></div></div>
          <div className="summary-card"><div className="summary-icon"><Lightbulb size={18} /></div><div><span>Opportunities</span><strong>3</strong><small>ready for prioritization</small></div></div>
        </section>

        <section className="content-grid">
          <div className="panel themes-panel">
            <div className="panel-heading"><div><h2>Top customer themes</h2><p>What customers are telling you most often.</p></div><button className="text-button">View all <ChevronRight size={15} /></button></div>
            <div className="theme-list">
              <div className="theme"><div className="theme-number">01</div><div className="theme-body"><div className="theme-title">Too much manual work <span className="pill high">High confidence</span></div><p>Customers repeatedly describe duplicate entry and repetitive administrative tasks.</p><div className="evidence"><span>8 mentions</span><span>•</span><span>5 customers</span></div></div></div>
              <div className="theme"><div className="theme-number">02</div><div className="theme-body"><div className="theme-title">Reporting is hard to act on <span className="pill">High confidence</span></div><p>Customers can access data but struggle to turn it into useful decisions.</p><div className="evidence"><span>6 mentions</span><span>•</span><span>4 customers</span></div></div></div>
              <div className="theme"><div className="theme-number">03</div><div className="theme-body"><div className="theme-title">Need access on the go <span className="pill">Medium confidence</span></div><p>Several customers want to complete common tasks away from their desk.</p><div className="evidence"><span>5 mentions</span><span>•</span><span>4 customers</span></div></div></div>
            </div>
          </div>

          <div className="panel ai-panel">
            <div className="ai-header"><div className="ai-icon"><BrainCircuit size={18} /></div><div><h2>AI analysis</h2><p>Helping you find signal, not make the decision.</p></div></div>
            <div className="ai-callout"><Sparkles size={16} /><div><strong>One thing to investigate</strong><p>Manual data entry appears across multiple customer segments. Before committing to a solution, quantify the time cost and identify where the workflow breaks down most.</p></div></div>
            <div className="ai-meta"><CircleCheck size={15} /> Evidence linked to every recommendation</div>
            <button className="secondary">Analyze new feedback <ChevronRight size={15} /></button>
          </div>
        </section>

        <section className="panel opportunities-panel">
          <div className="panel-heading"><div><h2>Product opportunities</h2><p>Evidence-backed problems ready for a product decision.</p></div><button className="text-button">Prioritize <ChevronRight size={15} /></button></div>
          <div className="opportunity-table"><div className="table-head"><span>OPPORTUNITY</span><span>EVIDENCE</span><span>IMPACT</span><span>EFFORT</span><span>STATUS</span></div>{opportunities.map((item) => <div className="table-row" key={item.title}><div><strong>{item.title}</strong><small>{item.confidence} confidence</small></div><p>{item.evidence}</p><span className={`score ${item.impact.toLowerCase()}`}>{item.impact}</span><span>{item.effort}</span><span className={`status ${item.status.toLowerCase()}`}>{item.status}</span></div>)}</div>
        </section>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
