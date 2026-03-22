import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Badge, Modal, FormField, inputStyle, textareaStyle, Select, Btn, EmptyState, SectionHeader } from '../components/UI.jsx';

const CATS = ['Cài đặt', 'Kết nối', 'Ryu', 'Debug', 'Performance', 'Khác'];

function GuideForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || { question: '', answer: '', category: CATS[0], tags: '' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const valid = form.question.trim() && form.answer.trim();
  return (
    <div>
      <FormField label="Câu hỏi / Vấn đề" required>
        <textarea value={form.question} onChange={e => set('question', e.target.value)}
          placeholder="VD: Làm sao cài đặt flow rule với priority cao hơn?..."
          style={{ ...textareaStyle, minHeight: 60 }} />
      </FormField>
      <FormField label="Trả lời / Hướng dẫn" required>
        <textarea value={form.answer} onChange={e => set('answer', e.target.value)}
          placeholder="Giải thích chi tiết cách giải quyết. Dùng số thứ tự để liệt kê các bước (1. 2. 3.)..."
          style={{ ...textareaStyle, minHeight: 160 }} />
      </FormField>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <FormField label="Danh mục">
          <Select value={form.category} onChange={v => set('category', v)} options={CATS.map(c => ({ value: c, label: c }))} />
        </FormField>
        <FormField label="Tags (cách nhau bằng dấu phẩy)">
          <input value={form.tags} onChange={e => set('tags', e.target.value)}
            placeholder="VD: ryu, error, port" style={inputStyle} />
        </FormField>
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <Btn onClick={onClose} color="#64748b" variant="outline">Hủy</Btn>
        <Btn onClick={() => valid && onSave(form)} color="#f97316" style={{ opacity: valid ? 1 : 0.5 }}>
          {initial ? 'Cập nhật' : 'Thêm hướng dẫn'}
        </Btn>
      </div>
    </div>
  );
}

export default function GuidePage({ content, ops }) {
  const { isInstructor } = useAuth();
  const [filter, setFilter] = useState('');
  const [catFilter, setCatFilter] = useState('Tất cả');
  const [openIdx, setOpenIdx] = useState(null);
  const [modal, setModal] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const guides = content.guides;
  const cats = ['Tất cả', ...new Set(guides.map(g => g.category))];
  const filtered = guides.filter(g => {
    const matchSearch = !filter ||
      g.question.toLowerCase().includes(filter.toLowerCase()) ||
      g.answer.toLowerCase().includes(filter.toLowerCase()) ||
      (g.tags && g.tags.toString().includes(filter.toLowerCase()));
    const matchCat = catFilter === 'Tất cả' || g.category === catFilter;
    return matchSearch && matchCat;
  });

  const renderAnswer = (text) => text.split('\n').map((line, i) => {
    if (/^\d+\./.test(line.trim())) {
      return (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 5, paddingLeft: 8 }}>
          <span style={{ color: '#f97316', flexShrink: 0 }}>›</span>
          <span style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>{line.replace(/^\d+\.\s*/, '')}</span>
        </div>
      );
    }
    if (line.trim().startsWith('$') || line.trim().startsWith('mininet>')) {
      return (
        <div key={i} style={{ background: '#080c18', border: '1px solid #1e293b', borderRadius: 6, padding: '6px 12px', margin: '4px 0', fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: '#a5f3fc' }}>
          {line}
        </div>
      );
    }
    return line.trim() ? <p key={i} style={{ color: '#94a3b8', fontSize: 13, margin: '0 0 6px', lineHeight: 1.7 }}>{line}</p> : null;
  });

  const handleAdd = (form) => {
    ops.guides.add({ ...form, author: 'Phúc Trần', createdAt: new Date().toLocaleDateString('vi-VN') });
    setModal(null);
  };
  const handleEdit = (form) => { ops.guides.update(editItem.id, form); setModal(null); setEditItem(null); };
  const handleDelete = (id) => { ops.guides.delete(id); if (openIdx === id) setOpenIdx(null); setDeleteConfirm(null); };

  return (
    <div>
      <SectionHeader title="Hướng dẫn & FAQ" count={guides.length} color="#f97316"
        onAdd={isInstructor ? () => setModal('add') : null} addLabel="+ Thêm hướng dẫn" />

      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="🔍 Tìm kiếm câu hỏi, vấn đề..."
          style={{ ...inputStyle, flex: 1, minWidth: 200 }} />
        {cats.map(c => (
          <button key={c} onClick={() => setCatFilter(c)} style={{
            background: catFilter === c ? '#7c2d1222' : '#0f172a',
            border: `1px solid ${catFilter === c ? '#f97316' : '#1e293b'}`,
            borderRadius: 8, padding: '7px 14px',
            color: catFilter === c ? '#fb923c' : '#64748b', fontSize: 12.5, cursor: 'pointer',
          }}>{c}</button>
        ))}
      </div>

      {filtered.length === 0 ? <EmptyState icon="🔍" text="Không tìm thấy câu hỏi nào" /> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map((item) => (
            <div key={item.id} style={{
              background: '#0f172a',
              border: `1px solid ${openIdx === item.id ? '#f97316' : '#1e293b'}`,
              borderRadius: 10, overflow: 'hidden', transition: 'border-color 0.2s',
            }}>
              <div style={{
                padding: '16px 20px', display: 'flex',
                alignItems: 'center', justifyContent: 'space-between', gap: 10,
              }}>
                <button onClick={() => setOpenIdx(openIdx === item.id ? null : item.id)}
                  style={{ flex: 1, background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ color: '#f97316', fontSize: 16, flexShrink: 0, marginTop: 1 }}>Q.</span>
                    <span style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>
                      {item.question}
                    </span>
                  </div>
                </button>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                  <Badge text={item.category} color="#f97316" />
                  {isInstructor && (
                    <>
                      <Btn onClick={() => { setEditItem(item); setModal('edit'); }} color="#f59e0b" variant="outline" size="sm">✏</Btn>
                      <Btn onClick={() => setDeleteConfirm(item.id)} color="#ef4444" variant="outline" size="sm">🗑</Btn>
                    </>
                  )}
                  <span style={{ color: '#64748b', fontSize: 18, cursor: 'pointer' }}
                    onClick={() => setOpenIdx(openIdx === item.id ? null : item.id)}>
                    {openIdx === item.id ? '−' : '+'}
                  </span>
                </div>
              </div>

              {openIdx === item.id && (
                <div style={{ borderTop: '1px solid #1e293b', padding: '16px 20px' }}>
                  <div style={{ color: '#f97316', fontSize: 12, fontWeight: 700, marginBottom: 10 }}>A.</div>
                  {renderAnswer(item.answer)}
                  {item.tags && (
                    <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {(Array.isArray(item.tags) ? item.tags : item.tags.split(',')).map((tag, i) => (
                        <span key={i} style={{
                          background: '#1e293b', color: '#64748b',
                          borderRadius: 20, padding: '2px 10px', fontSize: 11,
                        }}>#{tag.trim()}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {modal === 'add' && (
        <Modal title="Thêm câu hỏi / Hướng dẫn" onClose={() => setModal(null)}>
          <GuideForm onSave={handleAdd} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal === 'edit' && editItem && (
        <Modal title="Chỉnh sửa hướng dẫn" onClose={() => { setModal(null); setEditItem(null); }}>
          <GuideForm initial={editItem} onSave={handleEdit} onClose={() => { setModal(null); setEditItem(null); }} />
        </Modal>
      )}
      {deleteConfirm && (
        <Modal title="Xác nhận xóa" onClose={() => setDeleteConfirm(null)}>
          <p style={{ color: '#94a3b8', marginBottom: 20 }}>Xóa hướng dẫn này?</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <Btn onClick={() => setDeleteConfirm(null)} color="#64748b" variant="outline">Hủy</Btn>
            <Btn onClick={() => handleDelete(deleteConfirm)} color="#ef4444">Xóa</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}
