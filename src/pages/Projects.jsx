import { useState } from 'react'
import { projects } from '../data'
import { PageHdr, Diff } from '../components/UI'

const TABS = ['Tất cả','Cơ bản','Trung bình','Nâng cao']

export default function Projects() {
  const [tab, setTab] = useState('Tất cả')
  const [sel, setSel] = useState(null)

  const filtered = tab === 'Tất cả' ? projects : projects.filter(p => p.level === tab)

  if (sel) {
    const p = projects.find(x => x.id === sel)
    return (
      <div className="fu">
        <button className="btn bg" style={{marginBottom:'1.2rem'}} onClick={() => setSel(null)}>← Danh sách đề tài</button>
        <div className="card" style={{padding:'1.5rem',borderColor:`${p.color}30`,background:`${p.color}05`}}>
          <div style={{display:'flex',alignItems:'flex-start',gap:'1rem',flexWrap:'wrap',marginBottom:'1rem'}}>
            <div style={{flex:1,minWidth:200}}>
              <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap',marginBottom:'.5rem'}}>
                <span className="badge b-blue">{p.level}</span>
                <span style={{fontSize:'.75rem',color:'var(--txt3)'}}>⏱ {p.time}</span>
              </div>
              <h2 style={{fontFamily:'var(--fm)',fontSize:'1.2rem',color:'var(--txt)',marginBottom:'.4rem'}}>{p.title}</h2>
              <p style={{fontSize:'.86rem',color:'var(--txt2)',lineHeight:1.65}}>{p.desc}</p>
            </div>
          </div>
          <div className="divider"/>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(220px,100%),1fr))',gap:'1rem',marginBottom:'1rem'}}>
            <div>
              <div style={{fontSize:'.72rem',color:'var(--txt3)',fontFamily:'var(--fc)',marginBottom:'.4rem',textTransform:'uppercase',letterSpacing:'.06em'}}>Kỹ năng cần có</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:'.3rem'}}>
                {p.skills.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
            <div>
              <div style={{fontSize:'.72rem',color:'var(--txt3)',fontFamily:'var(--fc)',marginBottom:'.4rem',textTransform:'uppercase',letterSpacing:'.06em'}}>Sản phẩm nộp</div>
              <ul className="ul">{p.deliver.map(d => <li key={d}>{d}</li>)}</ul>
            </div>
          </div>
          <div className="alert ai">
            <strong>💡 Gợi ý bắt đầu:</strong> Đọc kỹ yêu cầu, lên plan từng bước nhỏ. Commit code thường xuyên lên GitHub. Kiểm thử từng phần trước khi ghép.
          </div>
          <div className="alert aw" style={{marginTop:'.5rem'}}>
            <strong>⚠️ Lưu ý:</strong> Nộp đúng hạn. Bao gồm README.md hướng dẫn chạy project. Code phải comment đầy đủ.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fu">
      <PageHdr icon="🚀" title="Đề tài / Dự án" sub="9 đề tài từ cơ bản đến nâng cao — thực hành SDN thực tế"/>
      <div className="tabs" style={{marginBottom:'1rem'}}>
        {TABS.map(t => <button key={t} className={`tab${tab===t?' active':''}`} onClick={() => setTab(t)}>{t}</button>)}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(300px,100%),1fr))',gap:'1rem'}}>
        {filtered.map(p => (
          <div key={p.id} className="card ca" style={{padding:'1.2rem',cursor:'pointer',borderColor:`${p.color}20`}} onClick={() => setSel(p.id)}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'.6rem',gap:'.5rem',flexWrap:'wrap'}}>
              <span style={{fontSize:'.72rem',fontWeight:700,color:p.color,fontFamily:'var(--fc)',textTransform:'uppercase',letterSpacing:'.06em'}}>{p.level}</span>
              <span style={{fontSize:'.73rem',color:'var(--txt3)'}}>⏱ {p.time}</span>
            </div>
            <h3 style={{fontFamily:'var(--fm)',fontSize:'.95rem',color:'var(--txt)',marginBottom:'.45rem',lineHeight:1.3}}>{p.title}</h3>
            <p style={{fontSize:'.8rem',color:'var(--txt2)',lineHeight:1.55,marginBottom:'.85rem'}}>{p.desc}</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:'.25rem'}}>
              {p.skills.slice(0,3).map(s => <span key={s} className="tag">{s}</span>)}
              {p.skills.length > 3 && <span className="tag">+{p.skills.length-3}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
