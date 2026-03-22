import { useState } from 'react';

export function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ position: 'relative', margin: '12px 0' }}>
      <pre style={{
        background: '#080c18', color: '#e2e8f0',
        borderRadius: 10, padding: '16px 20px 16px 16px',
        fontSize: 12.5, lineHeight: 1.65, overflowX: 'auto',
        margin: 0, border: '1px solid #1e293b',
        fontFamily: "'JetBrains Mono','Fira Code',monospace",
        whiteSpace: 'pre-wrap', wordBreak: 'break-word',
      }}>
        <code>{code}</code>
      </pre>
      <button onClick={() => { navigator.clipboard.writeText(code).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
        style={{
          position: 'absolute', top: 8, right: 8,
          background: copied ? '#10b981' : '#1e293b',
          color: '#e2e8f0', border: 'none', borderRadius: 6,
          padding: '3px 10px', fontSize: 11, cursor: 'pointer', transition: 'all 0.2s',
        }}>
        {copied ? '✓ Copied' : 'Copy'}
      </button>
    </div>
  );
}

export function Badge({ text, color }) {
  return (
    <span style={{
      display: 'inline-block',
      background: color + '22', color,
      border: `1px solid ${color}55`,
      borderRadius: 20, padding: '2px 10px',
      fontSize: 11, fontWeight: 600, letterSpacing: 0.3,
    }}>{text}</span>
  );
}

export function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#000000cc',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: 20,
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: '#0a0f1e', border: '1px solid #334155',
        borderRadius: 14, width: '100%', maxWidth: 700,
        maxHeight: '90vh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          padding: '18px 24px', borderBottom: '1px solid #1e293b',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 16 }}>{title}</span>
          <button onClick={onClose} style={{
            background: '#1e293b', border: 'none', color: '#94a3b8',
            borderRadius: 6, width: 30, height: 30, cursor: 'pointer', fontSize: 16,
          }}>×</button>
        </div>
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function FormField({ label, required, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, fontWeight: 600, marginBottom: 6, letterSpacing: 0.5 }}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      {children}
    </div>
  );
}

export const inputStyle = {
  width: '100%', background: '#0f172a', border: '1px solid #334155',
  borderRadius: 8, padding: '9px 12px', color: '#e2e8f0',
  fontSize: 13, outline: 'none', fontFamily: "'Inter',sans-serif",
};

export const textareaStyle = {
  ...inputStyle, minHeight: 100, resize: 'vertical',
  fontFamily: "'JetBrains Mono','Fira Code',monospace", fontSize: 12,
};

export function Select({ value, onChange, options, style = {} }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ ...inputStyle, ...style, cursor: 'pointer' }}>
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

export function Btn({ children, onClick, color = '#6366f1', variant = 'fill', size = 'md', style: s = {} }) {
  const pad = size === 'sm' ? '5px 12px' : size === 'lg' ? '12px 24px' : '8px 16px';
  const fs = size === 'sm' ? 11 : size === 'lg' ? 15 : 13;
  const base = variant === 'fill'
    ? { background: color, color: '#fff', border: 'none' }
    : { background: color + '15', color, border: `1px solid ${color}44` };
  return (
    <button onClick={onClick} style={{
      ...base, borderRadius: 8, padding: pad, fontSize: fs,
      fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', ...s,
    }}>{children}</button>
  );
}

export function EmptyState({ icon = '📂', text }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>{icon}</div>
      <div style={{ color: '#475569', fontSize: 14 }}>{text}</div>
    </div>
  );
}

export function SectionHeader({ title, count, onAdd, addLabel = '+ Thêm mới', color = '#6366f1' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <h2 style={{ color: '#f1f5f9', fontSize: 20, margin: 0 }}>{title}</h2>
        {count !== undefined && (
          <Badge text={`${count} mục`} color={color} />
        )}
      </div>
      {onAdd && <Btn onClick={onAdd} color={color}>{addLabel}</Btn>}
    </div>
  );
}
