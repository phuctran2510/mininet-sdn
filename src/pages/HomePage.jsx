import { Badge } from '../components/UI.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function HomePage({ content, onNavigate }) {
  const { isInstructor } = useAuth();
  const stats = [
    { label: 'Bài lý thuyết', val: content.theory.length, color: '#8b5cf6' },
    { label: 'Lab thực hành', val: content.labs.length, color: '#f59e0b' },
    { label: 'Câu trắc nghiệm', val: content.quiz.length, color: '#06b6d4' },
    { label: 'Hướng dẫn FAQ', val: content.guides.length, color: '#f97316' },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0c1a35 100%)',
        borderRadius: 16, padding: '48px 40px', marginBottom: 28,
        border: '1px solid #312e81', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, background: 'radial-gradient(circle, #6366f122, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, background: 'radial-gradient(circle, #0ea5e911, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 12, color: '#818cf8', letterSpacing: 2.5, marginBottom: 10, fontWeight: 700 }}>
            ĐẠI HỌC ĐÀ LẠT · KHOA CNTT · PHÚC TRẦN
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: '#f8fafc', margin: '0 0 14px', lineHeight: 1.2 }}>
            Triển khai SDN<br />với Mininet
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15, margin: '0 0 28px', lineHeight: 1.8, maxWidth: 600 }}>
            Tài liệu toàn diện từ lý thuyết cơ bản đến lab nâng cao về Software Defined Networking.
            Bao gồm lập trình Ryu/POX controller, thiết kế topology, firewall, load balancer và network slicing.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            {['OpenFlow 1.0–1.5', 'Ryu Framework', 'OVS 2.17+', 'Python 3', 'Ubuntu 20.04+'].map(tag => (
              <Badge key={tag} text={tag} color="#6366f1" />
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {stats.map(({ label, val, color }) => (
          <div key={label} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, padding: '20px', textAlign: 'center' }}>
            <div style={{ color, fontWeight: 900, fontSize: 32, lineHeight: 1 }}>{val}</div>
            <div style={{ color: '#64748b', fontSize: 12.5, marginTop: 8 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Navigation cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { id: 'theory', icon: '📖', title: 'Lý thuyết SDN', desc: 'Kiến trúc SDN, OpenFlow, Mininet components, luồng xử lý packet', color: '#8b5cf6', count: content.theory.length },
          { id: 'labs', icon: '🔬', title: 'Lab thực hành', desc: 'Mininet CLI, custom topology, Ryu L2 switch, SDN Firewall, Load Balancer', color: '#f59e0b', count: content.labs.length },
          { id: 'quiz', icon: '❓', title: 'Trắc nghiệm', desc: 'Kiểm tra kiến thức SDN từ cơ bản đến nâng cao với giải thích chi tiết', color: '#06b6d4', count: content.quiz.length },
          { id: 'guides', icon: '💡', title: 'Hướng dẫn FAQ', desc: 'Giải quyết các vấn đề thường gặp, debug tips, performance testing', color: '#f97316', count: content.guides.length },
          { id: 'contact', icon: '👨‍🏫', title: 'Liên hệ & Tài liệu', desc: 'Thông tin giảng viên Phúc Trần và tài liệu tham khảo chất lượng', color: '#a78bfa', count: null },
        ].map(({ id, icon, title, desc, color, count }) => (
          <div key={id} onClick={() => onNavigate(id)}
            style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, padding: '22px', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = color + '08'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e293b'; e.currentTarget.style.background = '#0f172a'; }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <span style={{ fontSize: 28 }}>{icon}</span>
              {count !== null && <Badge text={`${count} mục`} color={color} />}
            </div>
            <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{title}</div>
            <div style={{ color: '#64748b', fontSize: 12.5, lineHeight: 1.6 }}>{desc}</div>
            <div style={{ color, fontSize: 12, marginTop: 12, fontWeight: 600 }}>Xem ngay →</div>
          </div>
        ))}
      </div>

      {/* Instructor role notice */}
      {isInstructor ? (
        <div style={{ background: '#052e1622', border: '1px solid #10b98133', borderRadius: 12, padding: '16px 20px', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 20 }}>🔓</span>
          <div>
            <div style={{ color: '#6ee7b7', fontWeight: 700, fontSize: 13 }}>Đang đăng nhập với tài khoản Giảng viên</div>
            <div style={{ color: '#94a3b8', fontSize: 12.5, marginTop: 2 }}>
              Bạn có quyền thêm, sửa, xóa lý thuyết, lab, câu hỏi và hướng dẫn. Tất cả thay đổi được lưu tự động.
            </div>
          </div>
        </div>
      ) : (
        <div style={{ background: '#0c4a6e22', border: '1px solid #0369a133', borderRadius: 12, padding: '16px 20px', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 20 }}>👋</span>
          <div>
            <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: 13 }}>Chào mừng sinh viên!</div>
            <div style={{ color: '#94a3b8', fontSize: 12.5, marginTop: 2 }}>
              Hãy khám phá tài liệu, làm labs và kiểm tra kiến thức qua bài trắc nghiệm.
              Giảng viên đăng nhập để quản lý nội dung.
            </div>
          </div>
        </div>
      )}

      {/* Roadmap */}
      <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, padding: '24px 28px', marginTop: 20 }}>
        <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 700, letterSpacing: 1.5, marginBottom: 20 }}>LỘ TRÌNH HỌC TẬP GỢI Ý</div>
        <div style={{ display: 'flex', gap: 0, overflowX: 'auto', paddingBottom: 8 }}>
          {[
            ['Tuần 1', 'Lý thuyết SDN\n& Cài đặt môi trường', '#0ea5e9'],
            ['Tuần 2', 'Lab cơ bản\nMininet CLI', '#8b5cf6'],
            ['Tuần 3', 'Lập trình Ryu\nController', '#10b981'],
            ['Tuần 4', 'Lab nâng cao\nFirewall & LB', '#f59e0b'],
            ['Tuần 5', 'Project\nNetwork Slicing', '#ef4444'],
          ].map(([week, desc, color], i) => (
            <div key={week} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: color + '22', border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, fontWeight: 800, fontSize: 11, margin: '0 auto' }}>{week}</div>
                <div style={{ color: '#64748b', fontSize: 10.5, marginTop: 8, whiteSpace: 'pre', lineHeight: 1.4, textAlign: 'center' }}>{desc}</div>
              </div>
              {i < 4 && <div style={{ width: 36, height: 2, background: '#1e293b', margin: '0 4px', flexShrink: 0, marginBottom: 24 }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
