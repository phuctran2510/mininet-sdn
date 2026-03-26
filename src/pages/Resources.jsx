import { resources } from '../data'
import { PageHdr } from '../components/UI'

export default function Resources() {
  return (
    <div className="fu">
      <PageHdr icon="🔗" title="Tài liệu tham khảo" sub="Sách, khóa học, GitHub repos và công cụ hữu ích"/>
      <div style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
        {resources.map(cat => (
          <div key={cat.cat}>
            <div style={{fontFamily:'var(--fm)',fontSize:'1rem',color:'var(--txt)',marginBottom:'.75rem'}}>{cat.cat}</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(280px,100%),1fr))',gap:'.7rem'}}>
              {cat.items.map(item => (
                <a key={item.name} href={item.url} target="_blank" rel="noopener"
                  className="card ca"
                  style={{padding:'1rem',textDecoration:'none',display:'block'}}
                >
                  <div style={{fontWeight:600,color:'var(--acc)',fontSize:'.87rem',marginBottom:'.3rem'}}>{item.name}</div>
                  <div style={{fontSize:'.79rem',color:'var(--txt2)',lineHeight:1.5}}>{item.desc}</div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
