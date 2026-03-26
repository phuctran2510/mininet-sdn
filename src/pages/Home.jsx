import { Link } from 'react-router-dom'
import { chapters, instructor, projects } from '../data'
import { Stat } from '../components/UI'

const QUICK = [
  { to:'/theory', icon:'📖', label:'Lý thuyết', desc:'10 chương từ SDN cơ bản', color:'var(--acc)' },
  { to:'/lab',    icon:'🧪', label:'Lab',       desc:'Hướng dẫn thực hành từng bước', color:'var(--grn)' },
  { to:'/quiz',   icon:'❓', label:'Trắc nghiệm',desc:'Luyện tập & kiểm tra',   color:'var(--org)' },
  { to:'/exam',   icon:'📝', label:'Đề thi',    desc:'3 dạng đề mẫu',           color:'var(--pur)' },
  { to:'/projects',icon:'🚀',label:'Đề tài',    desc:'9 dự án thực tế',         color:'var(--yel)' },
  { to:'/topology',icon:'🗺️',label:'Topology',  desc:'4 sơ đồ mạng tương tác',  color:'#ff5370'    },
]

export default function Home() {
  const totalQuiz = chapters.reduce((s,c) => s + c.quiz.length, 0)
  const totalEx   = chapters.reduce((s,c) => s + c.exercises.length, 0)

  return (
    <div>
      {/* Hero */}
      <div className="fu" style={{textAlign:'center',padding:'1.8rem 0 2.2rem'}}>
        <div style={{
          display:'inline-flex',alignItems:'center',gap:'.45rem',
          background:'rgba(0,212,255,.07)',border:'1px solid rgba(0,212,255,.18)',
          padding:'.28rem .85rem',borderRadius:999,marginBottom:'1.2rem'
        }}>
          <span style={{width:6,height:6,background:'var(--grn)',borderRadius:'50%',animation:'pulse 2s infinite'}}/>
          <span style={{fontSize:'.73rem',color:'var(--acc)',fontFamily:'var(--fc)'}}>Đại học Đà Lạt · Khoa CNTT · 2025</span>
        </div>

        <h1 style={{fontFamily:'var(--fm)',fontSize:'clamp(1.7rem,5vw,2.7rem)',fontWeight:800,lineHeight:1.1,marginBottom:'.75rem'}}>
          <span className="gt">Mininet EDU</span><br/>
          <span style={{color:'var(--txt3)',fontSize:'.48em',fontWeight:400,fontFamily:'var(--fd)'}}>
            Giáo trình Mạng Máy Tính & SDN Toàn tập
          </span>
        </h1>

        <p style={{color:'var(--txt2)',maxWidth:520,margin:'0 auto 1.6rem',fontSize:'.9rem',lineHeight:1.8}}>
          Từ cài đặt Mininet cơ bản đến triển khai SDN nâng cao — lý thuyết đầy đủ, lab có hướng dẫn, topology tương tác, trắc nghiệm và {projects.length} dự án thực tế.
        </p>

        <div style={{display:'flex',gap:'.6rem',justifyContent:'center',flexWrap:'wrap'}}>
          <Link to="/theory" className="btn bp">📖 Bắt đầu học</Link>
          <Link to="/lab"    className="btn bo">🧪 Lab thực hành</Link>
          <Link to="/quiz"   className="btn bg">❓ Luyện trắc nghiệm</Link>
        </div>
      </div>

      {/* Stats */}
      <div className="fu d1" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(100px,1fr))',gap:'.65rem',marginBottom:'2rem'}}>
        <Stat icon="📖" val={chapters.length}  lbl="Chương học"/>
        <Stat icon="🧪" val="6+"               lbl="Lab hướng dẫn"  col="var(--grn)"/>
        <Stat icon="❓" val={totalQuiz}         lbl="Câu trắc nghiệm" col="var(--org)"/>
        <Stat icon="✏️" val={totalEx}           lbl="Bài tập"        col="var(--pur)"/>
        <Stat icon="🚀" val={projects.length}   lbl="Đề tài dự án"   col="var(--yel)"/>
        <Stat icon="📚" val="25"               lbl="Thuật ngữ"       col="var(--red)"/>
      </div>

      {/* Quick access */}
      <div className="fu d2" style={{marginBottom:'2rem'}}>
        <div style={{fontSize:'.68rem',color:'var(--txt3)',fontFamily:'var(--fc)',marginBottom:'.7rem',textTransform:'uppercase',letterSpacing:'.07em'}}>Truy cập nhanh</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(150px,100%),1fr))',gap:'.6rem'}} className="resp-grid-3">
          {QUICK.map(q => (
            <Link key={q.to} to={q.to} style={{textDecoration:'none'}}>
              <div className="card ca" style={{padding:'.9rem',textAlign:'center',height:'100%'}}>
                <div style={{fontSize:'1.5rem',marginBottom:'.35rem'}}>{q.icon}</div>
                <div style={{fontWeight:600,fontSize:'.84rem',color:q.color,marginBottom:'.2rem'}}>{q.label}</div>
                <div style={{fontSize:'.74rem',color:'var(--txt3)',lineHeight:1.4}}>{q.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Chapters */}
      <div className="fu d3" style={{marginBottom:'2rem'}}>
        <div style={{fontSize:'.68rem',color:'var(--txt3)',fontFamily:'var(--fc)',marginBottom:'.7rem',textTransform:'uppercase',letterSpacing:'.07em'}}>Chương trình học</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(260px,100%),1fr))',gap:'.65rem'}}>
          {chapters.map((ch,i) => (
            <Link key={ch.id} to="/theory" state={{chId:ch.id}}
              className="card ca fu"
              style={{padding:'1rem',textDecoration:'none',animationDelay:`${i*.03}s`}}
            >
              <div style={{display:'flex',alignItems:'flex-start',gap:'.65rem'}}>
                <div style={{
                  width:38,height:38,borderRadius:9,flexShrink:0,
                  background:`${ch.color}16`,border:`1px solid ${ch.color}35`,
                  display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.15rem'
                }}>{ch.icon}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:'.65rem',color:'var(--txt3)',fontFamily:'var(--fc)',marginBottom:'.12rem'}}>Chương {ch.n}</div>
                  <div style={{fontWeight:600,fontSize:'.86rem',color:'var(--txt)',marginBottom:'.3rem',lineHeight:1.3}}>{ch.title}</div>
                  <div style={{display:'flex',gap:'.3rem',flexWrap:'wrap',alignItems:'center'}}>
                    <span className={`badge ${ch.diff==='beginner'?'b-green':ch.diff==='intermediate'?'b-blue':'b-pur'}`}>
                      {ch.diff==='beginner'?'Cơ bản':ch.diff==='intermediate'?'Trung bình':'Nâng cao'}
                    </span>
                    <span style={{fontSize:'.67rem',color:'var(--txt3)'}}>⏱ {ch.time}</span>
                    <span style={{fontSize:'.67rem',color:'var(--txt3)'}}>· {ch.sections.length} phần · {ch.quiz.length}Q</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Instructor card */}
      <div className="fu d4">
        <div className="card" style={{
          padding:'1.2rem',
          background:'linear-gradient(135deg,var(--sur) 0%,rgba(0,212,255,.04) 100%)',
          borderColor:'rgba(0,212,255,.18)'
        }}>
          <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
            <div style={{
              width:48,height:48,borderRadius:'50%',flexShrink:0,
              background:'linear-gradient(135deg,var(--acc),var(--grn))',
              display:'flex',alignItems:'center',justifyContent:'center',
              fontFamily:'var(--fm)',fontWeight:800,fontSize:'1.05rem',color:'#000'
            }}>{instructor.avatar}</div>
            <div style={{flex:1,minWidth:160}}>
              <div style={{fontFamily:'var(--fm)',fontWeight:700,fontSize:'.95rem',color:'var(--txt)'}}>{instructor.name}</div>
              <div style={{fontSize:'.79rem',color:'var(--txt3)',marginTop:'.1rem'}}>{instructor.dept} · {instructor.university}</div>
              <div style={{fontSize:'.76rem',color:'var(--acc2)',marginTop:'.1rem',fontFamily:'var(--fc)'}}>{instructor.email} · {instructor.phone}</div>
            </div>
            <Link to="/contact" className="btn bo" style={{flexShrink:0}}>📧 Liên hệ GV</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
