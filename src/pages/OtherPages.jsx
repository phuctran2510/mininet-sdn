import { useState } from 'react'
import { projects, resources, glossary, instructor } from '../data'
import { chapters } from '../data'
import { PageHdr, Render } from '../components/UI'

// =================== PROJECTS ===================
export function Projects() {
  const [f, setF] = useState('all')
  const levels = ['all','Cơ bản','Trung bình','Nâng cao']
  const filt = f==='all' ? projects : projects.filter(p=>p.level===f)

  return (
    <div>
      <PageHdr icon="🚀" title="Dự án Thực tế" sub="9 đề tài từ cơ bản đến nâng cao — sẵn sàng deploy GitHub"/>
      <div style={{display:'flex',gap:'.5rem',marginBottom:'1.3rem',flexWrap:'wrap'}}>
        {levels.map(l=>(
          <button key={l} className={`btn ${f===l?'bp':'bg'}`}
            onClick={()=>setF(l)} style={{padding:'.4rem .9rem',fontSize:'.82rem'}}>
            {l==='all'?`Tất cả (${projects.length})`:l}
          </button>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))',gap:'.9rem'}}>
        {filt.map((p,i)=>(
          <div key={p.id} className="card ca fu" style={{padding:'1.2rem',display:'flex',flexDirection:'column',gap:'.7rem',animationDelay:`${i*.04}s`}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span className="badge" style={{background:`${p.color}14`,color:p.color,border:`1px solid ${p.color}35`}}>{p.level}</span>
              <span style={{fontSize:'.75rem',color:'var(--txt3)'}}>⏱ {p.time}</span>
            </div>
            <div>
              <h3 style={{fontFamily:'var(--fm)',fontSize:'.97rem',color:'var(--txt)',marginBottom:'.4rem'}}>{p.title}</h3>
              <p style={{color:'var(--txt3)',fontSize:'.83rem',lineHeight:1.65}}>{p.desc}</p>
            </div>
            <div>
              <div style={{fontSize:'.68rem',color:'var(--txt3)',marginBottom:'.35rem',fontFamily:'var(--fc)',textTransform:'uppercase',letterSpacing:'.05em'}}>Skills</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:'.28rem'}}>
                {p.skills.map(s=><span key={s} className="tag">{s}</span>)}
              </div>
            </div>
            <div style={{borderTop:'1px solid var(--brd)',paddingTop:'.65rem'}}>
              <div style={{fontSize:'.68rem',color:'var(--txt3)',marginBottom:'.35rem',fontFamily:'var(--fc)',textTransform:'uppercase',letterSpacing:'.05em'}}>Deliverables</div>
              <ul className="ul">{p.deliver.map((d,di)=><li key={di} style={{fontSize:'.8rem'}}>{d}</li>)}</ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// =================== EXAM ===================
export function Exam() {
  const [tab, setTab] = useState(0)
  const ch10 = chapters.find(c=>c.n===10)

  const examSections = ch10 ? ch10.sections.filter(s=>s.id==='s10-3'||s.id==='s10-4') : []

  return (
    <div>
      <PageHdr icon="📝" title="Đề thi mẫu" sub="Giữa kỳ (lý thuyết) và Cuối kỳ (thực hành)"/>

      <div className="alert ai" style={{marginBottom:'1.3rem'}}>
        <strong>📋 Thông tin:</strong> Đề thi minh họa — format và nội dung thực tế có thể thay đổi theo năm học.
        Liên hệ giảng viên để biết thêm chi tiết.
      </div>

      <div className="tabs">
        {['📖 Lý thuyết (45 phút)','💻 Thực hành (90 phút)','📊 Rubric chấm điểm'].map((t,i)=>(
          <button key={i} className={`tab ${tab===i?'active':''}`} onClick={()=>setTab(i)}>{t}</button>
        ))}
      </div>

      {tab===0 && (
        <div className="card fu" style={{padding:'1.4rem'}}>
          <Render md={`
## Đề thi Giữa kỳ — Lý thuyết

**Thời gian:** 45 phút · **Tổng điểm:** 10 điểm · **Hình thức:** Tự luận

---

### Câu 1 (2 điểm) — Kiến trúc SDN

Giải thích kiến trúc 3 tầng của SDN. Vẽ sơ đồ và mô tả vai trò của:
- Application Layer
- Control Layer (SDN Controller)
- Infrastructure Layer (Switches/Routers)
- Northbound và Southbound interfaces

*Gợi ý: Northbound API = Controller↔App | Southbound = Controller↔Switch (OpenFlow)*

---

### Câu 2 (2 điểm) — Mininet Internals

Mininet sử dụng cơ chế gì để tạo mạng ảo trên một máy Linux?
So sánh với Virtual Machine và Docker container (3 tiêu chí: overhead, cô lập, tính thực tế).

---

### Câu 3 (3 điểm) — OpenFlow Packet Processing

Mô tả quá trình xử lý packet trong OpenFlow switch. Vẽ flow diagram cho 2 trường hợp:
- **Trường hợp 1:** Packet có matching flow entry → action
- **Trường hợp 2:** Không có matching entry → table-miss → Packet-In → controller → Packet-Out

---

### Câu 4 (3 điểm) — SDN Controller So sánh

So sánh **Ryu**, **ONOS**, **OpenDaylight** theo:
1. Ngôn ngữ implementation
2. Kiến trúc (distributed hay centralized)
3. Use case phù hợp
4. Khả năng scalability
5. Cộng đồng & tài liệu

Đề xuất controller phù hợp cho: (a) Lab học tập, (b) Enterprise campus, (c) Telecom/carrier
`}/>
        </div>
      )}

      {tab===1 && (
        <div className="card fu" style={{padding:'1.4rem'}}>
          <Render md={`
## Đề thi Cuối kỳ — Thực hành

**Thời gian:** 90 phút · **Tổng điểm:** 10 điểm · **Hình thức:** Lập trình trên máy

---

### Câu 1 (2.5 điểm) — Topology

Tạo **2-tier data center topology** với Python API:
- 2 core switch (redundant)
- 4 aggregation switch
- 8 edge switch
- 3 hosts/edge = 24 hosts tổng
- Core-Agg: 10Gbps | Agg-Edge: 1Gbps | Edge-Host: 100Mbps
- Verify: \`pingall\` → 0% dropped

---

### Câu 2 (3.5 điểm) — SDN Controller

Viết Ryu controller thực hiện:

**a) L2 Learning Switch** (1đ)
- Học MAC address động
- \`idle_timeout=60\`, \`hard_timeout=300\`

**b) Access Control** (1.5đ)
- Chặn traffic VLAN 10 → VLAN 20 (one-way block)
- Cho phép VLAN 20 → VLAN 10
- Log mọi ACL hit với timestamp

**c) QoS** (1đ)
- Đảm bảo tối thiểu 5 Mbps mỗi host bằng OpenFlow Meter

---

### Câu 3 (2.5 điểm) — Test & Automation

Script Python tự động:
- Kiểm tra full mesh connectivity
- Verify ACL policy (cross VLAN test)
- Đo average bandwidth giữa 3 cặp host ngẫu nhiên
- Simulate link failure: ngắt 1 link, đo recovery time
- Xuất kết quả ra \`test_report.txt\`

---

### Câu 4 (1.5 điểm) — Báo cáo

- Sơ đồ topology (ASCII art hoặc vẽ tay)
- Giải thích 5 flow entries quan trọng nhất
- Nhận xét hiệu suất và 2 đề xuất cải tiến
`}/>
        </div>
      )}

      {tab===2 && (
        <div className="card fu" style={{padding:'1.4rem'}}>
          <Render md={`
## Rubric Chấm điểm

### Đề thi Thực hành

| Tiêu chí | Mô tả | Điểm |
|---------|-------|------|
| **Topology chạy đúng** | pingall 0% dropped | 2.5 |
| **L2 Switch** | Học MAC, cài flow đúng | 1.0 |
| **ACL hoạt động** | Block/allow đúng direction | 1.5 |
| **QoS** | Meter hoạt động | 1.0 |
| **Test script chạy** | Output đúng format | 2.0 |
| **Recovery time đo được** | < 5 giây | 0.5 |
| **Báo cáo** | Đầy đủ, chính xác | 1.5 |
| **TỔNG** | | **10** |

---

### Tiêu chí đánh giá code

- ✅ **Code chạy được** (không lỗi syntax)
- ✅ **Logic đúng** (output như mô tả)
- ✅ **Comment rõ ràng** (mỗi function có docstring)
- ✅ **Error handling** (try-except cho phần quan trọng)
- ✅ **Readable** (tên biến có nghĩa, indent đúng)

---

### Bonus điểm

- Implement REST API endpoint để query topology: +0.5
- Dashboard real-time với Flask: +1.0
- Unit tests với coverage >70%: +0.5
- Docker-compose với Ryu + Mininet: +0.5
`}/>
        </div>
      )}
    </div>
  )
}

// =================== GLOSSARY ===================
export function Glossary() {
  const [q, setQ] = useState('')
  const filtered = glossary.filter(g =>
    g.term.toLowerCase().includes(q.toLowerCase()) ||
    g.full.toLowerCase().includes(q.toLowerCase()) ||
    g.def.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div>
      <PageHdr icon="📚" title="Glossary" sub={`${glossary.length} thuật ngữ SDN & Mininet`}/>
      <input
        value={q} onChange={e=>setQ(e.target.value)}
        placeholder="Tìm kiếm thuật ngữ..."
        style={{
          width:'100%',padding:'.6rem 1rem',background:'var(--sur)',
          border:'1px solid var(--brd)',borderRadius:8,color:'var(--txt)',
          fontSize:'.88rem',fontFamily:'var(--fd)',marginBottom:'1.2rem',outline:'none'
        }}
      />
      <div style={{display:'flex',flexDirection:'column',gap:'.55rem'}}>
        {filtered.map((g,i)=>(
          <div key={g.term} className="card cg fu"
            style={{padding:'.9rem 1.1rem',display:'flex',gap:'1rem',alignItems:'flex-start',animationDelay:`${i*.02}s`}}>
            <div style={{
              minWidth:70,fontFamily:'var(--fc)',fontWeight:700,fontSize:'.8rem',
              color:'var(--acc)',flexShrink:0
            }}>{g.term}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:'.82rem',color:'var(--txt2)',fontWeight:500,marginBottom:'.2rem'}}>{g.full}</div>
              <div style={{fontSize:'.82rem',color:'var(--txt3)',lineHeight:1.6}}>{g.def}</div>
            </div>
          </div>
        ))}
        {filtered.length===0&&(
          <div style={{textAlign:'center',padding:'2rem',color:'var(--txt3)',fontSize:'.9rem'}}>
            Không tìm thấy "{q}"
          </div>
        )}
      </div>
    </div>
  )
}

// =================== RESOURCES ===================
export function Resources() {
  return (
    <div>
      <PageHdr icon="🔗" title="Tài liệu tham khảo" sub="Tổng hợp tài liệu học tập SDN & Mininet"/>
      {resources.map((cat,i)=>(
        <div key={i} style={{marginBottom:'1.8rem'}}>
          <h2 style={{fontFamily:'var(--fm)',fontSize:'1rem',color:'var(--txt2)',marginBottom:'.8rem'}}>{cat.cat}</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'.7rem'}}>
            {cat.items.map((item,j)=>(
              <a key={j} href={item.url} target="_blank" rel="noopener"
                className="card ca fu"
                style={{padding:'1rem',textDecoration:'none',display:'flex',flexDirection:'column',gap:'.4rem',animationDelay:`${j*.04}s`}}>
                <div style={{fontWeight:600,color:'var(--acc)',fontSize:'.88rem'}}>{item.name}</div>
                <div style={{color:'var(--txt3)',fontSize:'.82rem',lineHeight:1.55}}>{item.desc}</div>
                <div style={{fontSize:'.72rem',color:'var(--txt3)',fontFamily:'var(--fc)',marginTop:'.1rem'}}>
                  {item.url.replace('https://','').replace('http://','').split('/')[0]} ↗
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// =================== CONTACT ===================
export function Contact() {
  return (
    <div>
      <PageHdr icon="📧" title="Liên hệ" sub="Thông tin giảng viên và hỗ trợ học tập"/>

      {/* Instructor card */}
      <div className="card" style={{
        padding:'1.8rem',marginBottom:'1.5rem',
        background:'linear-gradient(135deg,var(--sur) 0%,rgba(0,212,255,.04) 100%)',
        borderColor:'rgba(0,212,255,.2)'
      }}>
        <div style={{display:'flex',gap:'1.2rem',alignItems:'flex-start',flexWrap:'wrap'}}>
          <div style={{
            width:64,height:64,borderRadius:'50%',flexShrink:0,
            background:'linear-gradient(135deg,var(--acc),var(--grn))',
            display:'flex',alignItems:'center',justifyContent:'center',
            fontFamily:'var(--fm)',fontWeight:800,fontSize:'1.3rem',color:'#000'
          }}>{instructor.avatar}</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:'var(--fm)',fontWeight:800,fontSize:'1.2rem',marginBottom:'.2rem'}}>{instructor.name}</div>
            <div style={{color:'var(--txt3)',fontSize:'.88rem',marginBottom:'.4rem'}}>{instructor.dept} · {instructor.university}</div>
            <p style={{color:'var(--txt2)',fontSize:'.87rem',lineHeight:1.65,marginBottom:'.8rem'}}>{instructor.bio}</p>
            <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap'}}>
              {instructor.expertise.map(e=><span key={e} className="tag">{e}</span>)}
            </div>
          </div>
        </div>
      </div>

      {/* Contact details */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'.8rem',marginBottom:'1.5rem'}}>
        {[
          {icon:'📧',label:'Email',val:instructor.email,href:`mailto:${instructor.email}`},
          {icon:'📱',label:'Điện thoại',val:instructor.phone,href:`tel:${instructor.phone.replace(' ','')}`},
          {icon:'🏫',label:'Đơn vị',val:instructor.university},
          {icon:'🏢',label:'Khoa',val:instructor.dept},
        ].map((c,i)=>(
          <div key={i} className="card" style={{padding:'1rem',display:'flex',gap:'.8rem',alignItems:'center'}}>
            <span style={{fontSize:'1.4rem'}}>{c.icon}</span>
            <div>
              <div style={{fontSize:'.7rem',color:'var(--txt3)',fontFamily:'var(--fc)',textTransform:'uppercase',letterSpacing:'.05em',marginBottom:'.15rem'}}>{c.label}</div>
              {c.href ? (
                <a href={c.href} style={{color:'var(--acc)',textDecoration:'none',fontSize:'.87rem',fontWeight:500}}>{c.val}</a>
              ) : (
                <div style={{color:'var(--txt)',fontSize:'.87rem'}}>{c.val}</div>
              )}
            </div>
          </div>
        ))}
      </div>

    

      {/* Course info */}
      <div className="alert ai">
        <strong>📌 Lưu ý:</strong> Để được hỗ trợ nhanh nhất, sinh viên nên email với tiêu đề rõ ràng:
        <code style={{display:'block',marginTop:'.4rem'}}>[Mininet Lab] Chương X - Vấn đề cụ thể</code>
      </div>
    </div>
  )
}
