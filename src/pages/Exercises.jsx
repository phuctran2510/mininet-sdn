import { useState } from 'react'
import { chapters } from '../data'
import { PageHdr, Diff } from '../components/UI'

const ALL_EX = chapters.flatMap(ch => ch.exercises.map(ex => ({ ...ex, chTitle: ch.title, chIcon: ch.icon, chColor: ch.color })))
const DIFFS = ['Tất cả','Dễ','Trung bình','Khó']

export default function Exercises() {
  const [diff, setDiff] = useState('Tất cả')
  const [open, setOpen] = useState(null)

  const list = diff === 'Tất cả' ? ALL_EX : ALL_EX.filter(e => {
    const map = {easy:'Dễ',medium:'Trung bình',hard:'Khó'}
    return map[e.diff] === diff
  })

  return (
    <div className="fu">
      <PageHdr icon="✏️" title="Bài tập thực hành" sub={`${ALL_EX.length} bài tập — từ cơ bản đến nâng cao`}/>
      <div className="tabs" style={{marginBottom:'1rem'}}>
        {DIFFS.map(d => <button key={d} className={`tab${diff===d?' active':''}`} onClick={() => setDiff(d)}>{d}</button>)}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:'.6rem'}}>
        {list.map(ex => (
          <div key={ex.id} className="card" style={{overflow:'hidden',borderColor: open===ex.id ? `${ex.chColor}40` : 'var(--brd)'}}>
            <div
              onClick={() => setOpen(open===ex.id ? null : ex.id)}
              style={{display:'flex',alignItems:'center',gap:'.75rem',padding:'.9rem 1.1rem',cursor:'pointer',flexWrap:'wrap'}}
            >
              <span style={{fontSize:'1rem',flexShrink:0}}>{ex.chIcon}</span>
              <div style={{flex:1,minWidth:160}}>
                <div style={{fontSize:'.84rem',fontWeight:600,color:'var(--txt)',marginBottom:'.15rem'}}>{ex.title}</div>
                <div style={{fontSize:'.74rem',color:'var(--txt3)'}}>{ex.chTitle}</div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'.5rem',flexShrink:0}}>
                <Diff level={ex.diff}/>
                <span style={{color:'var(--txt3)',fontSize:'.8rem'}}>{open===ex.id?'▾':'▸'}</span>
              </div>
            </div>
            {open===ex.id && (
              <div style={{borderTop:'1px solid var(--brd)',padding:'1rem 1.1rem',background:'rgba(0,0,0,.12)'}}>
                <p style={{fontSize:'.85rem',color:'var(--txt2)',lineHeight:1.65}}>{ex.desc}</p>
                <div className="alert ai" style={{marginTop:'.7rem'}}>
                  <strong>💡 Tip:</strong> Đọc lại phần lý thuyết chương <em>{ex.chTitle}</em> trước khi làm bài.
                </div>
              </div>
            )}
          </div>
        ))}
        {list.length === 0 && (
          <div style={{textAlign:'center',padding:'3rem',color:'var(--txt3)',fontSize:'.88rem'}}>
            Chưa có bài tập cho bộ lọc này
          </div>
        )}
      </div>
    </div>
  )
}
