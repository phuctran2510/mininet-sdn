import { useState } from 'react'
import { topos } from '../data'
import { PageHdr } from '../components/UI'

function TopoSVG({ topo }) {
  const [hov, setHov] = useState(null)
  const nmap = {}
  topo.nodes.forEach(n => { nmap[n.id] = n })

  const style = {
    ctrl: { fill:'#4c1d95', stroke:'#a78bfa', r:18 },
    sw:   { fill:'#0c4a6e', stroke:'#38bdf8', r:15 },
    host: { fill:'#064e3b', stroke:'#34d399', r:13 },
  }

  return (
    <svg width="100%" viewBox="0 0 640 340" style={{display:'block'}}>
      <defs>
        <filter id="glow2">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {topo.links.map((l,i) => {
        const a = nmap[l.f], b = nmap[l.t]
        if (!a||!b) return null
        return (
          <g key={i}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={l.of?'#7c3aed':'#1e2a40'}
              strokeWidth={l.of?1.5:1.2}
              strokeDasharray={l.of?'6,4':''}/>
            {l.of && (
              <text x={(a.x+b.x)/2} y={(a.y+b.y)/2-6}
                textAnchor="middle" fontSize="8" fill="#7c3aed"
                fontFamily="JetBrains Mono,monospace">OF</text>
            )}
          </g>
        )
      })}

      {topo.nodes.map(n => {
        const s = style[n.type]||style.host
        const isH = hov===n.id
        const lines = (n.label||n.id).split('\n')
        return (
          <g key={n.id} transform={`translate(${n.x},${n.y})`}
            onMouseEnter={()=>setHov(n.id)} onMouseLeave={()=>setHov(null)}
            style={{cursor:'pointer'}}>
            <circle r={s.r+5} fill={`${s.fill}30`}/>
            <circle r={s.r} fill={s.fill} stroke={isH?'#00d4ff':s.stroke}
              strokeWidth={isH?2:1.5} filter={isH?'url(#glow2)':''}/>
            <text textAnchor="middle" dominantBaseline="central"
              fontSize="9" fill="rgba(255,255,255,.8)" fontWeight="bold">
              {n.type==='ctrl'?'⚙':n.type==='sw'?'⊞':'▣'}
            </text>
            {lines.map((ln,li)=>(
              <text key={li} y={s.r+10+li*12} textAnchor="middle"
                fontSize="8.5" fill={isH?'#00d4ff':'#647a96'}
                fontFamily="JetBrains Mono,monospace">{ln}</text>
            ))}
          </g>
        )
      })}
    </svg>
  )
}

export default function TopoPage() {
  const [cur, setCur] = useState(topos[0])
  const sw = cur.nodes.filter(n=>n.type==='sw').length
  const hosts = cur.nodes.filter(n=>n.type==='host').length
  const ctrls = cur.nodes.filter(n=>n.type==='ctrl').length

  return (
    <div>
      <PageHdr icon="🗺️" title="Topology Mạng" sub="Trực quan hóa 4 topology phổ biến trong Mininet"/>

      {/* Legend */}
      <div className="card" style={{padding:'.7rem 1.1rem',marginBottom:'1.3rem',display:'flex',gap:'1.5rem',flexWrap:'wrap',alignItems:'center'}}>
        {[{f:'#4c1d95',s:'#a78bfa',l:'Controller'},{f:'#0c4a6e',s:'#38bdf8',l:'Switch (OVS)'},{f:'#064e3b',s:'#34d399',l:'Host'}].map(i=>(
          <div key={i.l} style={{display:'flex',alignItems:'center',gap:'.45rem'}}>
            <svg width="20" height="20"><circle cx="10" cy="10" r="8" fill={i.f} stroke={i.s} strokeWidth="1.5"/></svg>
            <span style={{fontSize:'.82rem',color:'var(--txt2)'}}>{i.l}</span>
          </div>
        ))}
        <div style={{display:'flex',alignItems:'center',gap:'.45rem'}}>
          <svg width="38" height="12"><line x1="0" y1="6" x2="38" y2="6" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5,4"/></svg>
          <span style={{fontSize:'.82rem',color:'var(--txt2)'}}>OpenFlow</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'.45rem'}}>
          <svg width="38" height="12"><line x1="0" y1="6" x2="38" y2="6" stroke="#1e2a40" strokeWidth="1.5"/></svg>
          <span style={{fontSize:'.82rem',color:'var(--txt2)'}}>Data link</span>
        </div>
      </div>

      <div className="tabs">
        {topos.map(t=>(
          <button key={t.id} className={`tab ${cur.id===t.id?'active':''}`} onClick={()=>setCur(t)}>
            {t.name}
          </button>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:'1.1rem',alignItems:'start'}}>
        <div className="card fu" style={{padding:'1.3rem',background:'#050810'}}>
          <TopoSVG topo={cur}/>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'.7rem'}}>
          <div className="card" style={{padding:'1.1rem'}}>
            <h3 style={{fontFamily:'var(--fm)',fontSize:'1rem',marginBottom:'.4rem'}}>{cur.name}</h3>
            <p style={{color:'var(--txt3)',fontSize:'.83rem',lineHeight:1.6,marginBottom:'.9rem'}}>{cur.desc}</p>
            <div style={{fontSize:'.7rem',color:'var(--txt3)',marginBottom:'.35rem',fontFamily:'var(--fc)',textTransform:'uppercase',letterSpacing:'.05em'}}>Lệnh khởi động</div>
            <pre style={{margin:0,fontSize:'.76rem'}}><code style={{color:'var(--acc)'}}>{cur.cmd}</code></pre>
          </div>

          <div className="card" style={{padding:'1.1rem'}}>
            <div style={{fontSize:'.7rem',color:'var(--txt3)',marginBottom:'.7rem',fontFamily:'var(--fc)',textTransform:'uppercase',letterSpacing:'.05em'}}>Thống kê</div>
            {[
              {l:'Controllers',v:ctrls,c:'#a78bfa'},
              {l:'Switches',v:sw,c:'#38bdf8'},
              {l:'Hosts',v:hosts,c:'#34d399'},
              {l:'Links',v:cur.links.length,c:'var(--txt2)'},
            ].map(s=>(
              <div key={s.l} style={{display:'flex',justifyContent:'space-between',padding:'.38rem 0',borderBottom:'1px solid var(--brd)',fontSize:'.83rem'}}>
                <span style={{color:'var(--txt3)'}}>{s.l}</span>
                <span style={{color:s.c,fontFamily:'var(--fc)',fontWeight:700}}>{s.v}</span>
              </div>
            ))}
          </div>

          <div className="card" style={{padding:'1.1rem'}}>
            <div style={{fontSize:'.7rem',color:'var(--txt3)',marginBottom:'.7rem',fontFamily:'var(--fc)',textTransform:'uppercase',letterSpacing:'.05em'}}>Lệnh kiểm tra</div>
            {[
              {cmd:'nodes',d:'Liệt kê nodes'},
              {cmd:'net',d:'Xem kết nối'},
              {cmd:'pingall',d:'Test all pairs'},
              {cmd:'dump',d:'Chi tiết nodes'},
              {cmd:'sh ovs-ofctl dump-flows s1',d:'Flow table'},
            ].map(c=>(
              <div key={c.cmd} style={{marginBottom:'.45rem'}}>
                <code style={{fontSize:'.72rem',display:'block',marginBottom:'.06rem'}}>{c.cmd}</code>
                <span style={{fontSize:'.72rem',color:'var(--txt3)'}}>{c.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
