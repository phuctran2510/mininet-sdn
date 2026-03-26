import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { chapters } from '../data'
import { Render, PageHdr, Diff } from '../components/UI'

export default function Theory() {
  const loc = useLocation()
  const [ch, setCh] = useState(chapters[0])
  const [sec, setSec] = useState(chapters[0].sections[0])

  useEffect(() => {
    if (loc.state?.chId) {
      const found = chapters.find(c => c.id === loc.state.chId)
      if (found) { setCh(found); setSec(found.sections[0]) }
    }
  }, [loc.state])

  const pick = (c) => { setCh(c); setSec(c.sections[0]); window.scrollTo(0,0) }

  return (
    <div>
      <PageHdr icon="📖" title="Lý thuyết" sub={`${chapters.length} chương — từ SDN cơ bản đến triển khai nâng cao`}/>

      {/* Mobile: horizontal chapter scroll */}
      <div className="theory-sidebar" style={{display:'none'}}>
        {chapters.map(c => (
          <button key={c.id} onClick={() => pick(c)} className="theory-sb-btn"
            style={{
              padding:'.38rem .75rem',borderRadius:8,
              background: ch.id===c.id ? `${c.color}18` : 'var(--sur)',
              border: ch.id===c.id ? `1px solid ${c.color}40` : '1px solid var(--brd)',
              color: ch.id===c.id ? c.color : 'var(--txt3)',
              cursor:'pointer',fontSize:'.78rem',fontWeight: ch.id===c.id ? 600 : 400,
              fontFamily:'var(--fd)',transition:'all .13s',
            }}
          >{c.n}. {c.title}</button>
        ))}
      </div>

      {/* Desktop: 2-column grid */}
      <div className="theory-grid" style={{display:'grid',gridTemplateColumns:'210px 1fr',gap:'1.3rem',alignItems:'start'}}>
        {/* Desktop sidebar */}
        <div style={{position:'sticky',top:'1rem'}} className="hide-mob">
          <div style={{fontSize:'.65rem',color:'var(--txt3)',fontFamily:'var(--fc)',marginBottom:'.45rem',textTransform:'uppercase',letterSpacing:'.06em'}}>Chương học</div>
          {chapters.map(c => (
            <button key={c.id} onClick={() => pick(c)}
              style={{
                display:'flex',alignItems:'center',gap:'.45rem',
                width:'100%',padding:'.45rem .65rem',borderRadius:8,marginBottom:2,
                background: ch.id===c.id ? `${c.color}14` : 'transparent',
                border: ch.id===c.id ? `1px solid ${c.color}35` : '1px solid transparent',
                color: ch.id===c.id ? c.color : 'var(--txt3)',
                cursor:'pointer',textAlign:'left',fontSize:'.81rem',
                fontWeight: ch.id===c.id ? 600 : 400,transition:'all .13s',fontFamily:'var(--fd)'
              }}
            >
              <span style={{fontSize:'.85rem'}}>{c.icon}</span>
              <span style={{flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{c.n}. {c.title}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="fu">
          {/* Chapter header */}
          <div className="card" style={{padding:'1.1rem',marginBottom:'.85rem',background:`${ch.color}07`,borderColor:`${ch.color}30`}}>
            <div style={{display:'flex',alignItems:'center',gap:'.65rem',marginBottom:'.35rem',flexWrap:'wrap'}}>
              <span style={{fontSize:'1.6rem'}}>{ch.icon}</span>
              <div>
                <div style={{fontSize:'.65rem',color:'var(--txt3)',fontFamily:'var(--fc)'}}>Chương {ch.n}</div>
                <h2 style={{fontFamily:'var(--fm)',fontSize:'1.1rem',color:'var(--txt)'}}>{ch.title}</h2>
              </div>
            </div>
            <div style={{display:'flex',gap:'.35rem',flexWrap:'wrap',alignItems:'center'}}>
              <Diff level={ch.diff}/>
              <span style={{fontSize:'.73rem',color:'var(--txt3)'}}>⏱ {ch.time}</span>
              <span style={{fontSize:'.73rem',color:'var(--txt3)'}}>· {ch.sections.length} phần</span>
              <span style={{fontSize:'.73rem',color:'var(--txt3)'}}>· {ch.quiz.length} quiz</span>
              <span style={{fontSize:'.73rem',color:'var(--txt3)'}}>· {ch.exercises.length} bài tập</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            {ch.sections.map(s => (
              <button key={s.id} className={`tab ${sec.id===s.id?'active':''}`}
                onClick={() => setSec(s)}>{s.title}</button>
            ))}
          </div>

          {/* Section */}
          <div className="card fu" style={{padding:'1.3rem'}}>
            <Render md={sec.md}/>
          </div>

          {/* Nav */}
          <div style={{display:'flex',justifyContent:'space-between',marginTop:'.8rem',gap:'.5rem'}}>
            <button className="btn bg"
              disabled={ch.sections.indexOf(sec)===0}
              onClick={() => { setSec(ch.sections[ch.sections.indexOf(sec)-1]); window.scrollTo(0,0) }}>← Trước</button>
            <button className="btn bo"
              disabled={ch.sections.indexOf(sec)===ch.sections.length-1}
              onClick={() => { setSec(ch.sections[ch.sections.indexOf(sec)+1]); window.scrollTo(0,0) }}>Tiếp →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
