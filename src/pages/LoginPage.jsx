import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage({ onClose }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!username || !password) { setError('Vui lòng nhập đầy đủ thông tin'); return; }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 400));
    const result = login(username, password);
    if (!result.ok) setError(result.error);
    setLoading(false);
  };

  const handleKey = e => { if (e.key === 'Enter') handleSubmit(); };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#000000dd',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 2000, padding: 20,
    }}>
      <div style={{
        background: '#0a0f1e', border: '1px solid #1e293b',
        borderRadius: 16, width: '100%', maxWidth: 400, padding: '40px 36px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: 'linear-gradient(135deg, #6366f1, #0ea5e9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, margin: '0 auto 14px',
          }}>⚡</div>
          <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 20 }}>Đăng nhập Giảng viên</div>
          <div style={{ color: '#475569', fontSize: 13, marginTop: 6 }}>Mininet SDN Course · DLU</div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', color: '#64748b', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
            TÊN ĐĂNG NHẬP
          </label>
          <input
            value={username} onChange={e => setUsername(e.target.value)} onKeyDown={handleKey}
            placeholder="phuctv"
            style={{
              width: '100%', background: '#0f172a', border: '1px solid #334155',
              borderRadius: 8, padding: '10px 14px', color: '#e2e8f0',
              fontSize: 14, outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', color: '#64748b', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
            MẬT KHẨU
          </label>
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={handleKey}
            placeholder="••••••••"
            style={{
              width: '100%', background: '#0f172a', border: '1px solid #334155',
              borderRadius: 8, padding: '10px 14px', color: '#e2e8f0',
              fontSize: 14, outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>

        {error && (
          <div style={{
            background: '#450a0a33', border: '1px solid #7f1d1d',
            borderRadius: 8, padding: '8px 12px', marginBottom: 16,
            color: '#fca5a5', fontSize: 13,
          }}>⚠ {error}</div>
        )}

        <button onClick={handleSubmit} disabled={loading} style={{
          width: '100%', background: loading ? '#1e293b' : 'linear-gradient(135deg, #6366f1, #0ea5e9)',
          color: '#fff', border: 'none', borderRadius: 10,
          padding: '12px', fontSize: 15, fontWeight: 700,
          cursor: loading ? 'default' : 'pointer',
        }}>
          {loading ? 'Đang kiểm tra...' : 'Đăng nhập'}
        </button>

        <button onClick={onClose} style={{
          width: '100%', background: 'transparent', color: '#475569',
          border: '1px solid #1e293b', borderRadius: 10,
          padding: '10px', fontSize: 13, cursor: 'pointer', marginTop: 10,
        }}>
          Hủy
        </button>

        <div style={{
          marginTop: 20, padding: '12px 14px',
          background: '#0c4a6e22', border: '1px solid #0369a133',
          borderRadius: 8,
        }}>
          
        </div>
      </div>
    </div>
  );
}
