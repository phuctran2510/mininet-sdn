export function Render({ md }) {
  if (!md) return null
  const lines = md.trim().split('\n')
  const out = []
  let i = 0
  while (i < lines.length) {
    const l = lines[i]
    if (l.startsWith('```')) {
      const lang = l.slice(3).trim() || 'bash'
      const code = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) { code.push(lines[i]); i++ }
      out.push(<pre key={i} data-lang={lang}><code style={{color:'#9ab'}}>{code.join('\n')}</code></pre>)
      i++; continue
    }
    if (l.startsWith('|')) {
      const rows = []
      while (i < lines.length && lines[i].startsWith('|')) {
        if (!lines[i].includes('---')) rows.push(lines[i].split('|').filter(Boolean).map(c => c.trim()))
        i++
      }
      const [hd, ...bd] = rows
      out.push(<div key={i} className="tw" style={{margin:'.8rem 0'}}><table>
        <thead><tr>{hd.map((h,j)=><th key={j}>{ri(h)}</th>)}</tr></thead>
        <tbody>{bd.map((r,ri_)=><tr key={ri_}>{r.map((c,ci)=><td key={ci}>{ri(c)}</td>)}</tr>)}</tbody>
      </table></div>)
      continue
    }
    if (l.startsWith('## ')) { out.push(<h2 key={i} style={{fontFamily:'var(--fm)',fontSize:'1.15rem',color:'var(--acc)',margin:'1.3rem 0 .6rem',borderBottom:'1px solid var(--brd)',paddingBottom:'.35rem'}}>{l.slice(3)}</h2>); i++; continue }
    if (l.startsWith('### ')) { out.push(<h3 key={i} style={{fontFamily:'var(--fm)',fontSize:'1rem',color:'var(--txt)',margin:'1rem 0 .45rem'}}>{ri(l.slice(4))}</h3>); i++; continue }
    if (l.startsWith('#### ')) { out.push(<h4 key={i} style={{fontSize:'.9rem',color:'var(--txt2)',margin:'.8rem 0 .35rem',fontWeight:600}}>{ri(l.slice(5))}</h4>); i++; continue }
    if (l.startsWith('> ')) { out.push(<div key={i} className="alert ai" style={{fontStyle:'italic'}}>{ri(l.slice(2))}</div>); i++; continue }
    if (l.trim() === '---') { out.push(<div key={i} className="divider"/>); i++; continue }
    if (l.match(/^[-*] /)) {
      const items = []
      while (i < lines.length && lines[i].match(/^[-*] /)) { items.push(lines[i].slice(2)); i++ }
      out.push(<ul key={i} className="ul">{items.map((it,j)=><li key={j}>{ri(it)}</li>)}</ul>)
      continue
    }
    if (l.match(/^\d+\. /)) {
      const items = []
      while (i < lines.length && lines[i].match(/^\d+\. /)) { items.push(lines[i].replace(/^\d+\. /,'')); i++ }
      out.push(<ol key={i} className="ol">{items.map((it,j)=><li key={j}>{ri(it)}</li>)}</ol>)
      continue
    }
    if (l.trim() === '') { i++; continue }
    out.push(<p key={i} style={{color:'var(--txt2)',margin:'.3rem 0 .7rem',fontSize:'.88rem',lineHeight:1.75}}>{ri(l)}</p>)
    i++
  }
  return <div>{out}</div>
}

function ri(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[.*?\]\(.*?\))/)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i} style={{color:'var(--txt)',fontWeight:600}}>{p.slice(2,-2)}</strong>
    if (p.startsWith('`') && p.endsWith('`')) return <code key={i}>{p.slice(1,-1)}</code>
    if (p.match(/\[.*?\]\(.*?\)/)) {
      const [,label,url] = p.match(/\[(.*?)\]\((.*?)\)/)
      return <a key={i} href={url} target="_blank" rel="noopener" style={{color:'var(--acc)',textDecoration:'none'}}>{label}</a>
    }
    return p
  })
}

export function PageHdr({ icon, title, sub }) {
  return (
    <div className="fu" style={{marginBottom:'1.8rem'}}>
      <h1 style={{fontFamily:'var(--fm)',fontSize:'clamp(1.4rem,3.5vw,1.9rem)',display:'flex',alignItems:'center',gap:'.45rem'}}>
        <span>{icon}</span><span className="gt">{title}</span>
      </h1>
      {sub && <p style={{color:'var(--txt3)',marginTop:'.35rem',fontSize:'.88rem'}}>{sub}</p>}
    </div>
  )
}

export function Diff({ level }) {
  const m = {beginner:{c:'b-green',t:'Cơ bản'},intermediate:{c:'b-blue',t:'Trung bình'},advanced:{c:'b-pur',t:'Nâng cao'},easy:{c:'b-green',t:'Dễ'},medium:{c:'b-org',t:'Trung bình'},hard:{c:'b-red',t:'Khó'}}
  const d = m[level] || {c:'b-blue',t:level}
  return <span className={`badge ${d.c}`}>{d.t}</span>
}

export function Stat({ icon, val, lbl, col }) {
  return (
    <div className="card" style={{padding:'1.1rem',textAlign:'center'}}>
      <div style={{fontSize:'1.6rem',marginBottom:'.25rem'}}>{icon}</div>
      <div style={{fontFamily:'var(--fm)',fontSize:'1.5rem',fontWeight:800,color:col||'var(--acc)'}}>{val}</div>
      <div style={{fontSize:'.75rem',color:'var(--txt3)',marginTop:'.15rem'}}>{lbl}</div>
    </div>
  )
}
