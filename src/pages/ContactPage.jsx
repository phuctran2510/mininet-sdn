import { Badge } from '../components/UI.jsx';

const REFS = [
  { cat: '📚 Sách & Papers', items: [
    { title: 'OpenFlow: Enabling Innovation in Campus Networks', author: 'McKeown et al., 2008', desc: 'Paper gốc của OpenFlow', url: 'https://dl.acm.org/doi/10.1145/1355734.1355746' },
    { title: 'SDN: Software Defined Networks (O\'Reilly)', author: 'Thomas D. Nadeau, Ken Gray', desc: 'Sách toàn diện nhất về SDN', url: '#' },
    { title: 'Mininet: An Instant Virtual Network...', author: 'Lantz, Heller, McKeown - HotNets 2010', desc: 'Paper gốc của Mininet', url: 'https://dl.acm.org/doi/10.1145/1868447.1868466' },
  ]},
  { cat: '📖 Tài liệu chính thức', items: [
    { title: 'Mininet Walkthrough', author: 'mininet.org', desc: 'Tutorial chính thức đầy đủ', url: 'http://mininet.org/walkthrough/' },
    { title: 'Ryu Documentation', author: 'ryu.readthedocs.io', desc: 'API docs và examples đầy đủ', url: 'https://ryu.readthedocs.io/' },
    { title: 'Open vSwitch Documentation', author: 'docs.openvswitch.org', desc: 'OVS commands và configuration', url: 'https://docs.openvswitch.org/' },
    { title: 'OpenFlow Specification 1.5.1', author: 'ONF', desc: 'Spec đầy đủ của OpenFlow', url: 'https://www.opennetworking.org/' },
  ]},
  { cat: '🎬 Khóa học online', items: [
    { title: 'SDN & NFV - Princeton (Coursera)', author: 'Prof. Jennifer Rexford', desc: 'Khóa học online chất lượng cao', url: 'https://www.coursera.org/learn/sdn' },
    { title: 'Introduction to Open Source Networking', author: 'The Linux Foundation', desc: 'Networking với open source tools', url: 'https://training.linuxfoundation.org/' },
  ]},
  { cat: '🛠️ GitHub & Tools', items: [
    { title: 'Mininet GitHub', author: 'github.com/mininet/mininet', desc: 'Source code và issues', url: 'https://github.com/mininet/mininet' },
    { title: 'Ryu GitHub', author: 'github.com/osrg/ryu', desc: 'Source + extensive examples', url: 'https://github.com/osrg/ryu' },
    { title: 'containernet', author: 'github.com/containernet', desc: 'Mininet with Docker containers', url: 'https://github.com/containernet/containernet' },
    { title: 'P4 Language', author: 'p4.org', desc: 'Next-gen data plane programming', url: 'https://p4.org/' },
  ]},
];

export default function ContactPage() {
  return (
    <div>
      {/* Instructor card */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
        border: '1px solid #312e81', borderRadius: 16, padding: '36px',
        marginBottom: 28, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, background: 'radial-gradient(circle, #6366f133, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #0ea5e9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, flexShrink: 0,
          }}>👨‍🏫</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#a5b4fc', fontSize: 12, fontWeight: 600, letterSpacing: 1.5, marginBottom: 4 }}>GIẢNG VIÊN PHỤ TRÁCH</div>
            <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 24, marginBottom: 4 }}>Phúc Trần</div>
            <div style={{ color: '#94a3b8', fontSize: 14 }}>Khoa Công nghệ Thông tin · Đại học Đà Lạt</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
              <Badge text="SDN & Network Programming" color="#6366f1" />
              <Badge text="Python / Linux Networking" color="#0ea5e9" />
              <Badge text="Cloud Computing" color="#10b981" />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginTop: 28 }}>
          {[
            { icon: '📧', label: 'Email', value: 'phuctv@dlu.edu.vn', href: 'mailto:phuctv@dlu.edu.vn' },
            { icon: '📱', label: 'Điện thoại', value: '0976 353 605', href: 'tel:+84976353605' },
            { icon: '🏫', label: 'Trường', value: 'Đại học Đà Lạt', href: 'https://dlu.edu.vn' },
            { icon: '📍', label: 'Địa chỉ', value: '1 Phù Đổng Thiên Vương, Phường Lâm Viên-Đà Lạt', href: '#' },
          ].map(({ icon, label, value, href }) => (
            <a key={label} href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, background: '#ffffff0a', border: '1px solid #ffffff14', borderRadius: 10, padding: '14px 16px' }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <div>
                <div style={{ color: '#64748b', fontSize: 11, fontWeight: 600, letterSpacing: 0.5 }}>{label}</div>
                <div style={{ color: '#e2e8f0', fontSize: 13.5, fontWeight: 600, marginTop: 2 }}>{value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Course info */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Lý thuyết', value: '6+ bài', color: '#8b5cf6', icon: '📖' },
          { label: 'Lab thực hành', value: '4+ labs', color: '#f59e0b', icon: '🔬' },
          { label: 'Câu trắc nghiệm', value: '16+ câu', color: '#06b6d4', icon: '❓' },
          { label: 'Hướng dẫn FAQ', value: '5+ mục', color: '#f97316', icon: '💡' },
          { label: 'Thời lượng', value: '~30 giờ', color: '#10b981', icon: '⏱' },
          { label: 'Cập nhật', value: '2024', color: '#6366f1', icon: '🔄' },
        ].map(({ label, value, color, icon }) => (
          <div key={label} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, padding: '18px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
            <div style={{ color, fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{value}</div>
            <div style={{ color: '#64748b', fontSize: 12 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* References */}
      <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>📚 Tài liệu tham khảo</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {REFS.map(ref => (
          <div key={ref.cat} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, padding: '20px 24px' }}>
            <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 14, marginBottom: 14 }}>{ref.cat}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ref.items.map(item => (
                <a key={item.title} href={item.url} target="_blank" rel="noopener noreferrer"
                  style={{ textDecoration: 'none', display: 'flex', gap: 14, alignItems: 'flex-start', background: '#0a0f1e', border: '1px solid #1e293b', borderRadius: 8, padding: '12px 16px', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#a78bfa'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#1e293b'}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#a78bfa', fontWeight: 600, fontSize: 13.5 }}>{item.title}</div>
                    <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>{item.author}</div>
                    <div style={{ color: '#475569', fontSize: 12, marginTop: 3 }}>→ {item.desc}</div>
                  </div>
                  <span style={{ color: '#a78bfa', fontSize: 16, flexShrink: 0 }}>↗</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 28, textAlign: 'center', color: '#334155', fontSize: 12, paddingBottom: 20 }}>
        © 2024 Phúc Trần · Đại học Đà Lạt · phuctv@dlu.edu.vn · 0976 353 605
      </div>
    </div>
  );
}
