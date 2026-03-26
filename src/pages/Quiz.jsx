import { useState } from 'react'
import { chapters } from '../data'
import { PageHdr } from '../components/UI'

const ALL_QUIZ = chapters.flatMap(ch => ch.quiz.map(q => ({ ...q, chTitle: ch.title, chIcon: ch.icon, chN: ch.n })))

export default function Quiz() {
  const [chFilter, setChFilter] = useState('all')
  const [idx, setIdx] = useState(0)
  const [chosen, setChosen] = useState({})
  const [shown, setShown] = useState({})
  const [mode, setMode] = useState('browse') // browse | test
  const [testScore, setTestScore] = useState(null)

  const pool = chFilter === 'all' ? ALL_QUIZ : ALL_QUIZ.filter(q => q.chN === Number(chFilter))
  const q = pool[idx]

  const choose = (qi, opt) => {
    if (chosen[qi] !== undefined) return
    setChosen(p => ({ ...p, [qi]: opt }))
    setShown(p => ({ ...p, [qi]: true }))
  }

  const finishTest = () => {
    let score = 0
    pool.forEach((q, i) => { if (chosen[i] === q.ans) score++ })
    setTestScore(score)
  }

  const reset = () => { setChosen({}); setShown({}); setIdx(0); setTestScore(null) }

  if (!q) return <div style={{padding:'2rem',color:'var(--txt3)'}}>Không có câu hỏi</div>

  // Test mode
  if (mode === 'test' && testScore === null) {
    return (
      <div className="fu">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.2rem',flexWrap:'wrap',gap:'.5rem'}}>
          <PageHdr icon="❓" title="Trắc nghiệm" sub={`${pool.length} câu — ${chFilter==='all'?'Tất cả chương':`Chương ${chFilter}`}`}/>
          <button className="btn bg" onClick={() => { setMode('browse'); reset() }}>Thoát</button>
        </div>
        <div style={{marginBottom:'.7rem',fontSize:'.8rem',color:'var(--txt3)',fontFamily:'var(--fc)'}}>
          {Object.keys(chosen).length}/{pool.length} đã trả lời
        </div>
        <div className="prog" style={{marginBottom:'1.2rem'}}>
          <div className="prog-f" style={{width:`${Object.keys(chosen).length/pool.length*100}%`}}/>
        </div>

        {pool.map((qq, i) => (
          <div key={qq.id} className="card" style={{padding:'1.1rem',marginBottom:'.75rem'}}>
            <div style={{fontSize:'.78rem',color:'var(--txt3)',fontFamily:'var(--fc)',marginBottom:'.35rem'}}>Câu {i+1} · {qq.chTitle}</div>
            <p style={{fontWeight:600,color:'var(--txt)',fontSize:'.88rem',marginBottom:'.7rem',lineHeight:1.55}}>{qq.q}</p>
            {qq.opts.map((opt, j) => {
              const isDone = chosen[i] !== undefined
              const isSel = chosen[i] === j
              const isRight = qq.ans === j
              let cls = 'qopt'
              if (isDone && isRight) cls += ' qc'
              else if (isDone && isSel && !isRight) cls += ' qw'
              return (
                <div key={j} className={cls} onClick={() => choose(i, j)}
                  style={{opacity: isDone && !isRight && !isSel ? 0.5 : 1}}>
                  <div style={{width:20,height:20,borderRadius:'50%',border:'1.5px solid currentColor',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.7rem',fontFamily:'var(--fc)',fontWeight:700,flexShrink:0}}>
                    {isDone && isRight ? '✓' : isDone && isSel ? '✗' : ['A','B','C','D'][j]}
                  </div>
                  {opt}
                </div>
              )
            })}
          </div>
        ))}

        <div style={{display:'flex',justifyContent:'center',marginTop:'1rem'}}>
          <button className="btn bp" disabled={Object.keys(chosen).length < pool.length} onClick={finishTest}>
            Nộp bài ({Object.keys(chosen).length}/{pool.length})
          </button>
        </div>
      </div>
    )
  }

  if (mode === 'test' && testScore !== null) {
    const pct = Math.round(testScore/pool.length*100)
    return (
      <div className="fu" style={{textAlign:'center',padding:'2rem 1rem'}}>
        <div style={{fontSize:'3.5rem',marginBottom:'1rem'}}>{pct>=80?'🎉':pct>=60?'😊':'📚'}</div>
        <div style={{fontFamily:'var(--fm)',fontSize:'2rem',color: pct>=80?'var(--grn)':pct>=60?'var(--org)':'var(--red)',marginBottom:'.5rem'}}>{testScore}/{pool.length}</div>
        <div style={{color:'var(--txt2)',marginBottom:'1.5rem',fontSize:'.9rem'}}>{pct}% — {pct>=80?'Xuất sắc!':pct>=60?'Khá tốt!':'Cần ôn thêm!'}</div>
        <div style={{display:'flex',gap:'.7rem',justifyContent:'center',flexWrap:'wrap'}}>
          <button className="btn bp" onClick={() => { reset(); setMode('test') }}>Làm lại</button>
          <button className="btn bg" onClick={() => { reset(); setMode('browse') }}>Về trang chính</button>
        </div>
      </div>
    )
  }

  // Browse mode
  return (
    <div className="fu">
      <PageHdr icon="❓" title="Trắc nghiệm" sub={`${ALL_QUIZ.length} câu hỏi — luyện tập từng chương hoặc kiểm tra tổng hợp`}/>

      {/* Controls */}
      <div style={{display:'flex',gap:'.6rem',flexWrap:'wrap',marginBottom:'1rem',alignItems:'center'}}>
        <select value={chFilter} onChange={e => { setChFilter(e.target.value); setIdx(0); reset() }}
          style={{padding:'.4rem .7rem',background:'var(--sur)',border:'1px solid var(--brd)',color:'var(--txt)',borderRadius:6,fontSize:'.82rem',fontFamily:'var(--fd)',cursor:'pointer'}}>
          <option value="all">Tất cả chương</option>
          {chapters.map(c => <option key={c.id} value={c.n}>Chương {c.n}: {c.title}</option>)}
        </select>
        <button className="btn bp" onClick={() => { reset(); setMode('test') }}>
          🎯 Bắt đầu kiểm tra ({pool.length} câu)
        </button>
      </div>

      {/* Question card */}
      <div style={{fontSize:'.75rem',color:'var(--txt3)',fontFamily:'var(--fc)',marginBottom:'.7rem'}}>
        Câu {idx+1} / {pool.length} · {q.chIcon} {q.chTitle}
      </div>
      <div className="prog" style={{marginBottom:'1rem'}}>
        <div className="prog-f" style={{width:`${(idx+1)/pool.length*100}%`}}/>
      </div>

      <div className="card" style={{padding:'1.3rem',marginBottom:'1rem'}}>
        <p style={{fontWeight:600,color:'var(--txt)',fontSize:'.9rem',lineHeight:1.6,marginBottom:'1rem'}}>{q.q}</p>
        {q.opts.map((opt, j) => {
          const isDone = chosen[idx] !== undefined
          const isSel = chosen[idx] === j
          const isRight = q.ans === j
          let cls = 'qopt'
          if (isDone && isRight) cls += ' qc'
          else if (isDone && isSel && !isRight) cls += ' qw'
          else if (!isDone && isSel) cls += ' qs'
          return (
            <div key={j} className={cls} onClick={() => choose(idx, j)}
              style={{opacity: isDone && !isRight && !isSel ? 0.55 : 1}}>
              <div style={{width:22,height:22,borderRadius:'50%',border:'1.5px solid currentColor',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.72rem',fontFamily:'var(--fc)',fontWeight:700,flexShrink:0}}>
                {isDone && isRight ? '✓' : isDone && isSel ? '✗' : ['A','B','C','D'][j]}
              </div>
              {opt}
            </div>
          )
        })}
        {shown[idx] && (
          <div className="alert as" style={{marginTop:'.8rem'}}>
            <strong>💡 Giải thích:</strong> {q.exp}
          </div>
        )}
      </div>

      <div style={{display:'flex',justifyContent:'space-between',gap:'.5rem'}}>
        <button className="btn bg" disabled={idx===0} onClick={() => setIdx(idx-1)}>← Trước</button>
        <span style={{display:'flex',alignItems:'center',fontSize:'.78rem',color:'var(--txt3)',fontFamily:'var(--fc)'}}>
          {Object.values(chosen).filter((_,i) => ALL_QUIZ[i]?.ans === chosen[i]).length} / {Object.keys(chosen).length} đúng
        </span>
        <button className="btn bo" disabled={idx===pool.length-1} onClick={() => setIdx(idx+1)}>Tiếp →</button>
      </div>
    </div>
  )
}
