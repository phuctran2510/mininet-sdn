import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { CodeBlock, Badge, Modal, FormField, inputStyle, textareaStyle, Select, Btn, EmptyState, SectionHeader } from '../components/UI.jsx';

const LEVELS = ['Cơ bản', 'Trung cấp', 'Nâng cao', 'Chuyên sâu'];
const CATS = ['Cơ bản', 'Trung cấp', 'Nâng cao', 'Project'];
const LEVEL_COLOR = { 'Cơ bản': '#10b981', 'Trung cấp': '#f59e0b', 'Nâng cao': '#ef4444', 'Chuyên sâu': '#8b5cf6' };

function StepEditor({ steps, onChange }) {
  const addStep = () => onChange([...steps, { title: '', code: '' }]);
  const updateStep = (i, k, v) => {
    const s = [...steps]; s[i] = { ...s[i], [k]: v }; onChange(s);
  };
  const removeStep = i => onChange(steps.filter((_, j) => j !== i));
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <label style={{ color: '#94a3b8', fontSize: 12, fontWeight: 600 }}>CÁC BƯỚC THỰC HÀNH</label>
        <Btn onClick={addStep} color="#10b981" variant="outline" size="sm">+ Thêm bước</Btn>
      </div>
      {steps.map((step, i) => (
        <div key={i} style={{ background: '#0a0f1e', border: '1px solid #1e293b', borderRadius: 8, padding: '12px', marginBottom: 8 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
            <div style={{ color: '#6366f1', fontWeight: 700, fontSize: 12, minWidth: 24 }}>#{i + 1}</div>
            <input value={step.title} onChange={e => updateStep(i, 'title', e.target.value)}
              placeholder="Tiêu đề bước..." style={{ ...inputStyle, flex: 1 }} />
            <Btn onClick={() => removeStep(i)} color="#ef4444" variant="outline" size="sm">×</Btn>
          </div>
          <textarea value={step.code} onChange={e => updateStep(i, 'code', e.target.value)}
            placeholder="# Code/lệnh cho bước này..." style={{ ...textareaStyle, width: '100%', minHeight: 80, boxSizing: 'border-box' }} />
        </div>
      ))}
    </div>
  );
}

function LabForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || {
    title: '', category: CATS[0], level: LEVELS[0],
    time: '45 phút', objectives: '', notes: '',
    steps: [{ title: '', code: '' }],
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const valid = form.title.trim() && form.objectives.trim();
  return (
    <div>
      <FormField label="Tên Lab" required>
        <input value={form.title} onChange={e => set('title', e.target.value)}
          placeholder="VD: Lab 5: Load Balancer SDN..." style={inputStyle} />
      </FormField>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        <FormField label="Danh mục">
          <Select value={form.category} onChange={v => set('category', v)} options={CATS.map(c => ({ value: c, label: c }))} />
        </FormField>
        <FormField label="Cấp độ">
          <Select value={form.level} onChange={v => set('level', v)} options={LEVELS.map(l => ({ value: l, label: l }))} />
        </FormField>
        <FormField label="Thời gian">
          <input value={form.time} onChange={e => set('time', e.target.value)} placeholder="VD: 90 phút" style={inputStyle} />
        </FormField>
      </div>
      <FormField label="Mục tiêu Lab" required>
        <textarea value={form.objectives} onChange={e => set('objectives', e.target.value)}
          placeholder="Mô tả mục tiêu, kỹ năng sinh viên đạt được..." style={{ ...textareaStyle, minHeight: 70 }} />
      </FormField>
      <StepEditor steps={form.steps} onChange={v => set('steps', v)} />
      <FormField label="Lưu ý / Gợi ý">
        <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
          placeholder="Lưu ý quan trọng, common errors, hints..." style={{ ...textareaStyle, minHeight: 60 }} />
      </FormField>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <Btn onClick={onClose} color="#64748b" variant="outline">Hủy</Btn>
        <Btn onClick={() => valid && onSave(form)} color="#f59e0b" style={{ opacity: valid ? 1 : 0.5 }}>
          {initial ? 'Cập nhật' : 'Thêm Lab'}
        </Btn>
      </div>
    </div>
  );
}

export default function LabsPage({ content, ops }) {
  const { isInstructor } = useAuth();
  const [filter, setFilter] = useState('');
  const [catFilter, setCatFilter] = useState('Tất cả');
  const [activeLab, setActiveLab] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [modal, setModal] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const cats = ['Tất cả', ...new Set(content.labs.map(l => l.category))];
  const filtered = content.labs.filter(l => {
    const matchSearch = !filter || l.title.toLowerCase().includes(filter.toLowerCase());
    const matchCat = catFilter === 'Tất cả' || l.category === catFilter;
    return matchSearch && matchCat;
  });

  const openLab = (lab) => { setActiveLab(lab); setActiveStep(0); };

  const handleAdd = (form) => {
    ops.labs.add({ ...form, author: 'Phúc Trần', createdAt: new Date().toLocaleDateString('vi-VN') });
    setModal(null);
  };
  const handleEdit = (form) => {
    ops.labs.update(editItem.id, form);
    if (activeLab?.id === editItem.id) setActiveLab({ ...editItem, ...form });
    setModal(null); setEditItem(null);
  };
  const handleDelete = (id) => {
    ops.labs.delete(id);
    if (activeLab?.id === id) setActiveLab(null);
    setDeleteConfirm(null);
  };

  return (
    <div>
      <SectionHeader title="Lab thực hành" count={content.labs.length} color="#f59e0b"
        onAdd={isInstructor ? () => setModal('add') : null} addLabel="+ Thêm Lab" />

      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="🔍 Tìm kiếm lab..."
          style={{ ...inputStyle, flex: 1, minWidth: 200 }} />
        {cats.map(c => (
          <button key={c} onClick={() => setCatFilter(c)} style={{
            background: catFilter === c ? '#78350f22' : '#0f172a',
            border: `1px solid ${catFilter === c ? '#f59e0b' : '#1e293b'}`,
            borderRadius: 8, padding: '8px 14px',
            color: catFilter === c ? '#fbbf24' : '#64748b', fontSize: 12.5, cursor: 'pointer',
          }}>{c}</button>
        ))}
      </div>

      {filtered.length === 0 ? <EmptyState icon="🔬" text="Không tìm thấy lab nào" /> : (
        activeLab ? (
          <div>
            <button onClick={() => setActiveLab(null)} style={{
              background: 'none', border: 'none', color: '#64748b', cursor: 'pointer',
              fontSize: 13, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6,
            }}>← Danh sách Lab</button>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, padding: '24px 28px', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <h3 style={{ color: '#f1f5f9', margin: '0 0 10px', fontSize: 18 }}>{activeLab.title}</h3>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <Badge text={activeLab.level} color={LEVEL_COLOR[activeLab.level] || '#10b981'} />
                    <Badge text={activeLab.time} color="#0ea5e9" />
                  </div>
                </div>
                {isInstructor && (
                  <div style={{ display: 'flex', gap: 6 }}>
                    <Btn onClick={() => { setEditItem(activeLab); setModal('edit'); }} color="#f59e0b" variant="outline" size="sm">✏ Sửa</Btn>
                    <Btn onClick={() => setDeleteConfirm(activeLab.id)} color="#ef4444" variant="outline" size="sm">🗑 Xóa</Btn>
                  </div>
                )}
              </div>
              <div style={{ marginTop: 16, padding: '14px', background: '#052e1622', border: '1px solid #10b98133', borderRadius: 8 }}>
                <div style={{ color: '#6ee7b7', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>🎯 MỤC TIÊU</div>
                <div style={{ color: '#94a3b8', fontSize: 13.5, lineHeight: 1.7 }}>{activeLab.objectives}</div>
              </div>
            </div>
            {activeLab.steps?.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16 }}>
                <div>
                  {activeLab.steps.map((step, i) => (
                    <button key={i} onClick={() => setActiveStep(i)} style={{
                      width: '100%', background: activeStep === i ? '#78350f22' : '#0f172a',
                      border: `1px solid ${activeStep === i ? '#f59e0b' : '#1e293b'}`,
                      borderRadius: 8, padding: '10px 12px',
                      color: activeStep === i ? '#fbbf24' : '#64748b',
                      fontSize: 12.5, cursor: 'pointer', textAlign: 'left',
                      marginBottom: 6, display: 'flex', gap: 8, alignItems: 'center',
                    }}>
                      <span style={{
                        width: 20, height: 20, borderRadius: '50%',
                        background: activeStep === i ? '#f59e0b' : '#1e293b',
                        color: activeStep === i ? '#0f172a' : '#64748b',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: 800, flexShrink: 0,
                      }}>{i + 1}</span>
                      <span style={{ lineHeight: 1.3 }}>{step.title || `Bước ${i + 1}`}</span>
                    </button>
                  ))}
                </div>
                <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, padding: '20px 24px' }}>
                  <div style={{ color: '#fbbf24', fontWeight: 700, fontSize: 14, marginBottom: 10 }}>
                    Bước {activeStep + 1}: {activeLab.steps[activeStep].title}
                  </div>
                  <CodeBlock code={activeLab.steps[activeStep].code || '# Chưa có code cho bước này'} />
                </div>
              </div>
            )}
            {activeLab.notes && (
              <div style={{ marginTop: 16, padding: '14px 18px', background: '#1a1207', border: '1px solid #78350f44', borderRadius: 8 }}>
                <div style={{ color: '#fbbf24', fontWeight: 700, fontSize: 12, marginBottom: 6 }}>💡 Lưu ý</div>
                <div style={{ color: '#a16207', fontSize: 13, lineHeight: 1.6 }}>{activeLab.notes}</div>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {filtered.map(lab => (
              <div key={lab.id} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, padding: '20px', cursor: 'pointer', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#f59e0b'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#1e293b'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <Badge text={lab.level} color={LEVEL_COLOR[lab.level] || '#10b981'} />
                    <Badge text={lab.time} color="#0ea5e9" />
                  </div>
                  {isInstructor && (
                    <div style={{ display: 'flex', gap: 4 }} onClick={e => e.stopPropagation()}>
                      <Btn onClick={() => { setEditItem(lab); setModal('edit'); }} color="#f59e0b" variant="outline" size="sm">✏</Btn>
                      <Btn onClick={() => setDeleteConfirm(lab.id)} color="#ef4444" variant="outline" size="sm">🗑</Btn>
                    </div>
                  )}
                </div>
                <div onClick={() => openLab(lab)}>
                  <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 14, marginBottom: 8, lineHeight: 1.4 }}>{lab.title}</div>
                  <div style={{ color: '#64748b', fontSize: 12.5, lineHeight: 1.6, marginBottom: 12 }}>
                    {lab.objectives?.substring(0, 100)}...
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#334155', fontSize: 11 }}>{lab.steps?.length || 0} bước thực hành</span>
                    <span style={{ color: '#f59e0b', fontSize: 12 }}>Xem chi tiết →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {modal === 'add' && (
        <Modal title="Thêm Lab mới" onClose={() => setModal(null)}>
          <LabForm onSave={handleAdd} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal === 'edit' && editItem && (
        <Modal title="Chỉnh sửa Lab" onClose={() => { setModal(null); setEditItem(null); }}>
          <LabForm initial={editItem} onSave={handleEdit} onClose={() => { setModal(null); setEditItem(null); }} />
        </Modal>
      )}
      {deleteConfirm && (
        <Modal title="Xác nhận xóa" onClose={() => setDeleteConfirm(null)}>
          <p style={{ color: '#94a3b8', marginBottom: 20 }}>Xóa lab này? Hành động không thể hoàn tác.</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <Btn onClick={() => setDeleteConfirm(null)} color="#64748b" variant="outline">Hủy</Btn>
            <Btn onClick={() => handleDelete(deleteConfirm)} color="#ef4444">Xóa</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}
