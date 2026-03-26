import { useState } from 'react'
import { glossary } from '../data'
import { PageHdr } from '../components/UI'

export default function Glossary() {
  const [q, setQ] = useState('')
  const filtered = glossary.filter(g =>
    g.term.toLowerCase().includes(q.toLowerCase()) ||
    g.full.toLowerCase().includes(q.toLowerCase()) ||
    g.def.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div className="fu">
      <PageHdr icon="📚" title="Thuật ngữ SDN" sub={`${glossary.length} thuật ngữ — từ điển kỹ thuật SDN/Mininet`}/>
      <div style={{position:'relative',marginBottom:'1.2rem'}}>
        <input
          value={q} onChange={e => setQ(e.target.value)}
          placeholder="🔍  Tìm kiếm thuật ngữ..."
          style={{
            width:'100%',padding:'.65rem 1rem .65rem 2.4rem',
            background:'var(--sur)',border:'1px solid var(--brd)',
            borderRadius:'var(--r)',color:'var(--txt)',
            fontSize:'.88rem',outline:'none',fontFamily:'var(--fd)',
            transition:'border-color .15s',
          }}
          onFocus={e => e.target.style.borderColor='var(--acc)'}
          onBlur={e => e.target.style.borderColor='var(--brd)'}
        />
        <span style={{position:'absolute',left:'.8rem',top:'50%',transform:'translateY(-50%)',fontSize:'.9rem'}}>🔍</span>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(280px,100%),1fr))',gap:'.7rem'}}>
        {filtered.map(g => (
          <div key={g.term} className="card cg" style={{padding:'1rem'}}>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'.5rem',marginBottom:'.35rem'}}>
              <div style={{fontFamily:'var(--fc)',fontWeight:700,color:'var(--acc)',fontSize:'.88rem'}}>{g.term}</div>
              <div style={{fontSize:'.68rem',color:'var(--txt3)',fontFamily:'var(--fc)',textAlign:'right',flexShrink:0}}>{g.full}</div>
            </div>
            <p style={{fontSize:'.81rem',color:'var(--txt2)',lineHeight:1.55}}>{g.def}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{gridColumn:'1/-1',textAlign:'center',padding:'3rem',color:'var(--txt3)',fontSize:'.88rem'}}>
            Không tìm thấy thuật ngữ nào phù hợp
          </div>
        )}
      </div>
    </div>
  )
}
