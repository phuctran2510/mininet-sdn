import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { useContent } from './hooks/useContent.jsx';
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import TheoryPage from './pages/TheoryPage.jsx';
import LabsPage from './pages/LabsPage.jsx';
import QuizPage from './pages/QuizPage.jsx';
import GuidePage from './pages/GuidePage.jsx';
import ContactPage from './pages/ContactPage.jsx';

const NAV = [
  { id: 'home',    icon: '⊞', label: 'Tổng quan',         color: '#6366f1' },
  { id: 'theory',  icon: '◈', label: 'Lý thuyết SDN',     color: '#8b5cf6' },
  { id: 'labs',    icon: '◉', label: 'Lab thực hành',      color: '#f59e0b' },
  { id: 'quiz',    icon: '◎', label: 'Trắc nghiệm',        color: '#06b6d4' },
  { id: 'guides',  icon: '◐', label: 'Hướng dẫn & FAQ',   color: '#f97316' },
  { id: 'contact', icon: '◑', label: 'Liên hệ & Tài liệu', color: '#a78bfa' },
];

function InnerApp() {
  const { user, isInstructor, logout } = useAuth();
  const { content, theory, labs, quiz, guides, resetToDefault } = useContent();
  const [page, setPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const activePage = NAV.find(n => n.id === page);

  const pages = {
    home:    <HomePage content={content} onNavigate={setPage} />,
    theory:  <TheoryPage content={content} ops={{ theory, labs, quiz, guides }} />,
    labs:    <LabsPage content={content} ops={{ theory, labs, quiz, guides }} />,
    quiz:    <QuizPage content={content} ops={{ theory, labs, quiz, guides }} />,
    guides:  <GuidePage content={content} ops={{ theory, labs, quiz, guides }} />,
    contact: <ContactPage />,
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020818', display: 'flex', flexDirection: 'column', fontFamily: "'Inter','Segoe UI',sans-serif", color: '#e2e8f0' }}>
      {/* Top bar */}
      <div style={{ background: '#080c18', borderBottom: '1px solid #1e293b', padding: '0 16px', display: 'flex', alignItems: 'center', gap: 12, height: 52, flexShrink: 0, position: 'sticky', top: 0, zIndex: 100 }}>
        <button onClick={() => setSidebarOpen(s => !s)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 18, padding: '4px 8px' }}>☰</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg, #6366f1, #0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>⚡</div>
          <span style={{ fontWeight: 800, fontSize: 14, color: '#f1f5f9' }}>Mininet SDN</span>
          <span style={{ color: '#334155' }}>·</span>
          <span style={{ color: '#64748b', fontSize: 12 }}>DLU Course</span>
        </div>

        {activePage && page !== 'home' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 8 }}>
            <span style={{ color: '#334155' }}>/</span>
            <span style={{ color: activePage.color, fontSize: 13, fontWeight: 600 }}>{activePage.label}</span>
          </div>
        )}

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          {isInstructor && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ background: '#052e1633', border: '1px solid #10b98133', color: '#6ee7b7', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>
                🔓 GV: {user.name}
              </span>
              <button onClick={() => setShowResetConfirm(true)} title="Reset dữ liệu về mặc định"
                style={{ background: '#1e293b', border: '1px solid #334155', color: '#64748b', borderRadius: 6, padding: '4px 10px', fontSize: 11, cursor: 'pointer' }}>
                ↺ Reset
              </button>
              <button onClick={logout}
                style={{ background: '#450a0a33', border: '1px solid #7f1d1d', color: '#fca5a5', borderRadius: 6, padding: '4px 10px', fontSize: 11, cursor: 'pointer' }}>
                Đăng xuất
              </button>
            </div>
          )}
          {!user && (
            <button onClick={() => setShowLogin(true)}
              style={{ background: '#312e81', border: '1px solid #4338ca', color: '#a5b4fc', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              🔒 Giảng viên đăng nhập
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        {sidebarOpen && (
          <div style={{ width: 230, background: '#06080f', borderRight: '1px solid #0f172a', padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 3, overflowY: 'auto', flexShrink: 0 }}>
            <div style={{ color: '#1e293b', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, padding: '4px 10px 8px' }}>ĐIỀU HƯỚNG</div>
            {NAV.map(nav => (
              <button key={nav.id} onClick={() => setPage(nav.id)} style={{
                background: page === nav.id ? nav.color + '14' : 'transparent',
                border: `1px solid ${page === nav.id ? nav.color + '44' : 'transparent'}`,
                borderRadius: 8, padding: '9px 12px', cursor: 'pointer', textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.15s',
              }}>
                <span style={{ color: page === nav.id ? nav.color : '#1e293b', fontSize: 15 }}>{nav.icon}</span>
                <span style={{ color: page === nav.id ? nav.color : '#475569', fontSize: 13, fontWeight: page === nav.id ? 700 : 400 }}>
                  {nav.label}
                </span>
              </button>
            ))}

            {/* Content counts */}
            <div style={{ marginTop: 12, padding: '12px 10px' }}>
              <div style={{ color: '#1e293b', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8 }}>THỐNG KÊ NỘI DUNG</div>
              {[
                ['Lý thuyết', content.theory.length, '#8b5cf6'],
                ['Labs', content.labs.length, '#f59e0b'],
                ['Quiz', content.quiz.length, '#06b6d4'],
                ['Guides', content.guides.length, '#f97316'],
              ].map(([label, count, color]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #0f172a' }}>
                  <span style={{ color: '#334155', fontSize: 11 }}>{label}</span>
                  <span style={{ color, fontWeight: 700, fontSize: 11 }}>{count}</span>
                </div>
              ))}
            </div>

            {/* Stack info */}
            <div style={{ marginTop: 'auto', padding: '12px 10px' }}>
              <div style={{ background: '#0a0f1e', border: '1px solid #0f172a', borderRadius: 8, padding: '12px' }}>
                <div style={{ color: '#10b981', fontSize: 10, fontWeight: 700, marginBottom: 6 }}>TECH STACK</div>
                {['Mininet v2.3', 'Ryu 4.34', 'OVS 2.17', 'OpenFlow 1.0–1.5', 'Python 3.8+'].map(t => (
                  <div key={t} style={{ color: '#1e4d3a', fontSize: 10, padding: '2px 0', borderBottom: '1px solid #0a1a14' }}>✓ {t}</div>
                ))}
              </div>
            </div>

            {/* Contact quick info */}
            <div style={{ padding: '0 10px 12px' }}>
              <div style={{ background: '#0a0f1e', border: '1px solid #0f172a', borderRadius: 8, padding: '12px' }}>
                <div style={{ color: '#6366f1', fontSize: 10, fontWeight: 700, marginBottom: 6 }}>GIẢNG VIÊN</div>
                <div style={{ color: '#334155', fontSize: 10 }}>👨‍🏫 Phúc Trần</div>
                <div style={{ color: '#1e293b', fontSize: 9, marginTop: 3 }}>📧 phuctv@dlu.edu.vn</div>
                <div style={{ color: '#1e293b', fontSize: 9, marginTop: 2 }}>📱 0976 353 605</div>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px', minWidth: 0 }}>
          {pages[page]}
        </div>
      </div>

      {showLogin && <LoginPage onClose={() => setShowLogin(false)} />}

      {showResetConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: '#000000cc', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: 20 }}>
          <div style={{ background: '#0a0f1e', border: '1px solid #334155', borderRadius: 14, padding: '32px', maxWidth: 420, width: '100%' }}>
            <div style={{ color: '#fbbf24', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>⚠ Xác nhận Reset</div>
            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
              Hành động này sẽ xóa <strong style={{ color: '#f1f5f9' }}>tất cả nội dung đã thêm</strong> và khôi phục về dữ liệu mặc định.
              Các lý thuyết, lab, câu hỏi, hướng dẫn bạn đã thêm sẽ bị mất vĩnh viễn.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowResetConfirm(false)} style={{ background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer' }}>Hủy</button>
              <button onClick={() => { resetToDefault(); setShowResetConfirm(false); }} style={{ background: '#b45309', border: 'none', color: '#fff', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Xác nhận Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}
