import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { CodeBlock, Badge, Modal, FormField, inputStyle, textareaStyle, Select, Btn, EmptyState, SectionHeader } from '../components/UI.jsx';

const LEVELS = ['Cơ bản', 'Trung cấp', 'Nâng cao'];
const CATS = ['Khái niệm cơ bản', 'Kiến trúc', 'OpenFlow', 'Mininet', 'Ryu', 'ONOS', 'Thực hành'];
const LEVEL_COLOR = { 'Cơ bản': '#10b981', 'Trung cấp': '#f59e0b', 'Nâng cao': '#ef4444' };

function TheoryForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || { title: '', category: CATS[0], level: LEVELS[0], content: '', code: '' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const valid = form.title.trim() && form.content.trim();
  return (
    <div>
      <FormField label="Tiêu đề" required>
        <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="VD: OpenFlow Pipeline Processing..." style={inputStyle} />
      </FormField>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <FormField label="Danh mục">
          <Select value={form.category} onChange={v => set('category', v)} options={CATS.map(c => ({ value: c, label: c }))} />
        </FormField>
        <FormField label="Cấp độ">
          <Select value={form.level} onChange={v => set('level', v)} options={LEVELS.map(l => ({ value: l, label: l }))} />
        </FormField>
      </div>
      <FormField label="Nội dung lý thuyết" required>
        <textarea value={form.content} onChange={e => set('content', e.target.value)}
          placeholder="Nhập nội dung lý thuyết. Dùng **text** để in đậm, xuống dòng bằng Enter..."
          style={{ ...textareaStyle, minHeight: 140 }} />
      </FormField>
      <FormField label="Code minh họa (tùy chọn)">
        <textarea value={form.code} onChange={e => set('code', e.target.value)}
          placeholder="# Nhập code ví dụ ở đây..."
          style={{ ...textareaStyle, minHeight: 100 }} />
      </FormField>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
        <Btn onClick={onClose} color='#64748b' variant='outline'>Hủy</Btn>
        <Btn onClick={() => valid && onSave(form)} color='#6366f1' style={{ opacity: valid ? 1 : 0.5 }}>
          {initial ? 'Cập nhật' : 'Thêm lý thuyết'}
        </Btn>
      </div>
    </div>
  );
}

export default function TheoryPage({ content, ops }) {
  const { isInstructor } = useAuth();
  const [filter, setFilter] = useState('');
  const [catFilter, setCatFilter] = useState('Tất cả');
  const [active, setActive] = useState(null);
  const [modal, setModal] = useState(null); // 'add'|'edit'
  const [editItem, setEditItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const cats = ['Tất cả', ...new Set(content.theory.map(t => t.category))];
  const filtered = content.theory.filter(t => {
    const matchSearch = !filter || t.title.toLowerCase().includes(filter.toLowerCase()) || t.content.toLowerCase().includes(filter.toLowerCase());
    const matchCat = catFilter === 'Tất cả' || t.category === catFilter;
    return matchSearch && matchCat;
  });

  const handleAdd = (form) => {
    ops.theory.add({ ...form, author: 'Phúc Trần', createdAt: new Date().toLocaleDateString('vi-VN') });
    setModal(null);
  };
  const handleEdit = (form) => {
    ops.theory.update(editItem.id, form);
    setModal(null); setEditItem(null);
  };
  const handleDelete = (id) => {
    ops.theory.delete(id);
    if (active?.id === id) setActive(null);
    setDeleteConfirm(null);
  };

  const renderContent = (text) => text.split('\n').map((line, i) => (
    <p key={i} style={{ margin: '0 0 8px', color: '#94a3b8', fontSize: 14, lineHeight: 1.8 }}>
      {line.split('**').map((seg, j) => j % 2 === 1 ? <strong key={j} style={{ color: '#e2e8f0' }}>{seg}</strong> : seg)}
    </p>
  ));

  return (
    <div>
      <SectionHeader title="Lý thuyết SDN" count={content.theory.length} color="#8b5cf6"
        onAdd={isInstructor ? () => setModal('add') : null} addLabel="+ Thêm lý thuyết" />

      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="🔍 Tìm kiếm lý thuyết..."
          style={{ ...inputStyle, flex: 1, minWidth: 200 }} />
        {cats.map(c => (
          <button key={c} onClick={() => setCatFilter(c)} style={{
            background: catFilter === c ? '#312e81' : '#0f172a',
            border: `1px solid ${catFilter === c ? '#6366f1' : '#1e293b'}`,
            borderRadius: 8, padding: '8px 14px',
            color: catFilter === c ? '#a5b4fc' : '#64748b', fontSize: 12.5, cursor: 'pointer',
          }}>{c}</button>
        ))}
      </div>

      {filtered.length === 0 ? <EmptyState text="Không tìm thấy bài lý thuyết nào" /> : (
        <div style={{ display: 'grid', gridTemplateColumns: active ? '300px 1fr' : '1fr', gap: 16 }}>
          {/* List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map(t => (
              <div key={t.id} onClick={() => setActive(active?.id === t.id ? null : t)}
                style={{
                  background: active?.id === t.id ? '#2e1065' : '#0f172a',
                  border: `1px solid ${active?.id === t.id ? '#7c3aed' : '#1e293b'}`,
                  borderRadius: 10, padding: '14px 16px', cursor: 'pointer', transition: 'all 0.15s',
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 13.5, marginBottom: 6, lineHeight: 1.4 }}>{t.title}</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      <Badge text={t.category} color="#8b5cf6" />
                      <Badge text={t.level} color={LEVEL_COLOR[t.level] || '#10b981'} />
                    </div>
                  </div>
                  {isInstructor && (
                    <div style={{ display: 'flex', gap: 4, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                      <Btn onClick={() => { setEditItem(t); setModal('edit'); }} color="#f59e0b" variant="outline" size="sm">✏</Btn>
                      <Btn onClick={() => setDeleteConfirm(t.id)} color="#ef4444" variant="outline" size="sm">🗑</Btn>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Detail */}
          {active && (
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, padding: '24px 28px', minWidth: 0 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                <Badge text={active.category} color="#8b5cf6" />
                <Badge text={active.level} color={LEVEL_COLOR[active.level] || '#10b981'} />
              </div>
              <h3 style={{ color: '#f1f5f9', margin: '12px 0 16px', fontSize: 18 }}>{active.title}</h3>
              <div>{renderContent(active.content)}</div>
              {active.code && <CodeBlock code={active.code} />}
              {active.author && (
                <div style={{ marginTop: 20, color: '#334155', fontSize: 12 }}>
                  👤 {active.author} · 📅 {active.createdAt}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {(modal === 'add') && (
        <Modal title="Thêm bài lý thuyết mới" onClose={() => setModal(null)}>
          <TheoryForm onSave={handleAdd} onClose={() => setModal(null)} />
        </Modal>
      )}
      {(modal === 'edit' && editItem) && (
        <Modal title="Chỉnh sửa lý thuyết" onClose={() => { setModal(null); setEditItem(null); }}>
          <TheoryForm initial={editItem} onSave={handleEdit} onClose={() => { setModal(null); setEditItem(null); }} />
        </Modal>
      )}
      {deleteConfirm && (
        <Modal title="Xác nhận xóa" onClose={() => setDeleteConfirm(null)}>
          <p style={{ color: '#94a3b8', marginBottom: 20 }}>Bạn có chắc muốn xóa bài lý thuyết này không? Hành động này không thể hoàn tác.</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <Btn onClick={() => setDeleteConfirm(null)} color="#64748b" variant="outline">Hủy</Btn>
            <Btn onClick={() => handleDelete(deleteConfirm)} color="#ef4444">Xóa</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}
