import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Badge, Modal, FormField, inputStyle, Select, Btn, EmptyState, SectionHeader } from '../components/UI.jsx';

const DIFFS = ['Dễ', 'Trung bình', 'Khó'];
const CATS = ['Khái niệm', 'Kiến trúc', 'OpenFlow', 'Mininet', 'Ryu', 'Debug', 'Performance'];
const DIFF_COLOR = { 'Dễ': '#10b981', 'Trung bình': '#f59e0b', 'Khó': '#ef4444' };

function QuizForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || {
    question: '', options: ['', '', '', ''], correct: 0,
    explain: '', category: CATS[0], difficulty: DIFFS[0],
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const setOpt = (i, v) => {
    const opts = [...form.options]; opts[i] = v; set('options', opts);
  };
  const valid = form.question.trim() && form.options.every(o => o.trim()) && form.explain.trim();
  return (
    <div>
      <FormField label="Câu hỏi" required>
        <textarea value={form.question} onChange={e => set('question', e.target.value)}
          placeholder="Nhập câu hỏi trắc nghiệm..."
          style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '9px 12px', color: '#e2e8f0', fontSize: 13, outline: 'none', width: '100%', minHeight: 70, resize: 'vertical', boxSizing: 'border-box' }} />
      </FormField>
      <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 600, marginBottom: 8, letterSpacing: 0.5 }}>
        CÁC ĐÁP ÁN (chọn đáp án đúng)
      </div>
      {form.options.map((opt, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
          <button onClick={() => set('correct', i)} style={{
            width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
            background: form.correct === i ? '#10b981' : '#1e293b',
            border: `2px solid ${form.correct === i ? '#10b981' : '#334155'}`,
            color: form.correct === i ? '#fff' : '#64748b',
            fontWeight: 700, fontSize: 11, cursor: 'pointer',
          }}>
            {['A', 'B', 'C', 'D'][i]}
          </button>
          <input value={opt} onChange={e => setOpt(i, e.target.value)}
            placeholder={`Đáp án ${['A', 'B', 'C', 'D'][i]}...`}
            style={{ ...inputStyle, flex: 1, border: `1px solid ${form.correct === i ? '#10b98155' : '#334155'}` }} />
        </div>
      ))}
      <FormField label="Giải thích đáp án đúng" required>
        <textarea value={form.explain} onChange={e => set('explain', e.target.value)}
          placeholder="Giải thích tại sao đáp án đó là đúng..."
          style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '9px 12px', color: '#e2e8f0', fontSize: 13, outline: 'none', width: '100%', minHeight: 70, resize: 'vertical', boxSizing: 'border-box' }} />
      </FormField>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        <FormField label="Danh mục">
          <Select value={form.category} onChange={v => set('category', v)} options={CATS.map(c => ({ value: c, label: c }))} />
        </FormField>
        <FormField label="Độ khó">
          <Select value={form.difficulty} onChange={v => set('difficulty', v)} options={DIFFS.map(d => ({ value: d, label: d }))} />
        </FormField>
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <Btn onClick={onClose} color="#64748b" variant="outline">Hủy</Btn>
        <Btn onClick={() => valid && onSave(form)} color="#06b6d4" style={{ opacity: valid ? 1 : 0.5 }}>
          {initial ? 'Cập nhật' : 'Thêm câu hỏi'}
        </Btn>
      </div>
    </div>
  );
}

export default function QuizPage({ content, ops }) {
  const { isInstructor } = useAuth();
  const [mode, setMode] = useState('list'); // list | quiz
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [score, setScore] = useState(null);
  const [modal, setModal] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [catFilter, setCatFilter] = useState('Tất cả');
  const [diffFilter, setDiffFilter] = useState('Tất cả');

  const quiz = content.quiz;
  const cats = ['Tất cả', ...new Set(quiz.map(q => q.category))];
  const filtered = quiz.filter(q => {
    const matchCat = catFilter === 'Tất cả' || q.category === catFilter;
    const matchDiff = diffFilter === 'Tất cả' || q.difficulty === diffFilter;
    return matchCat && matchDiff;
  });

  const handleSelect = (qi, oi) => {
    if (revealed[qi]) return;
    setAnswers(a => ({ ...a, [qi]: oi }));
    setRevealed(r => ({ ...r, [qi]: true }));
  };

  const calcScore = () => {
    let s = 0;
    filtered.forEach((q, i) => { if (answers[i] === q.correct) s++; });
    setScore(s);
  };

  const resetQuiz = () => { setAnswers({}); setRevealed({}); setScore(null); };

  const handleAdd = (form) => { ops.quiz.add(form); setModal(null); };
  const handleEdit = (form) => { ops.quiz.update(editItem.id, form); setModal(null); setEditItem(null); };
  const handleDelete = (id) => { ops.quiz.delete(id); setDeleteConfirm(null); };

  return (
    <div>
      <SectionHeader title="Câu hỏi trắc nghiệm" count={quiz.length} color="#06b6d4"
        onAdd={isInstructor ? () => setModal('add') : null} addLabel="+ Thêm câu hỏi" />

      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setCatFilter(c)} style={{
            background: catFilter === c ? '#0c4a6e22' : '#0f172a',
            border: `1px solid ${catFilter === c ? '#06b6d4' : '#1e293b'}`,
            borderRadius: 8, padding: '6px 12px',
            color: catFilter === c ? '#67e8f9' : '#64748b', fontSize: 12, cursor: 'pointer',
          }}>{c}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {['Tất cả', ...DIFFS].map(d => (
            <button key={d} onClick={() => setDiffFilter(d)} style={{
              background: diffFilter === d ? (DIFF_COLOR[d] || '#1e293b') + '22' : '#0f172a',
              border: `1px solid ${diffFilter === d ? (DIFF_COLOR[d] || '#06b6d4') : '#1e293b'}`,
              borderRadius: 8, padding: '6px 10px',
              color: diffFilter === d ? (DIFF_COLOR[d] || '#06b6d4') : '#64748b', fontSize: 11, cursor: 'pointer',
            }}>{d}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <Btn onClick={() => { setMode(mode === 'quiz' ? 'list' : 'quiz'); resetQuiz(); }}
          color="#06b6d4" variant={mode === 'quiz' ? 'fill' : 'outline'}>
          {mode === 'quiz' ? '📋 Xem danh sách' : '🎯 Làm bài test'}
        </Btn>
        {mode === 'quiz' && <span style={{ color: '#475569', fontSize: 13, alignSelf: 'center' }}>
          {filtered.length} câu · {Object.keys(revealed).length} đã trả lời
        </span>}
      </div>

      {filtered.length === 0 ? <EmptyState icon="❓" text="Không tìm thấy câu hỏi nào" /> : (

        mode === 'list' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map((q, i) => (
              <div key={q.id} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, padding: '16px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                      <span style={{ color: '#06b6d4', marginRight: 8 }}>Q{i + 1}.</span>
                      {q.question}
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <Badge text={q.category} color="#06b6d4" />
                      <Badge text={q.difficulty} color={DIFF_COLOR[q.difficulty] || '#10b981'} />
                      <span style={{ color: '#10b981', fontSize: 12, padding: '2px 8px' }}>
                        ✓ {['A','B','C','D'][q.correct]}. {q.options[q.correct]}
                      </span>
                    </div>
                  </div>
                  {isInstructor && (
                    <div style={{ display: 'flex', gap: 4 }}>
                      <Btn onClick={() => { setEditItem(q); setModal('edit'); }} color="#f59e0b" variant="outline" size="sm">✏</Btn>
                      <Btn onClick={() => setDeleteConfirm(q.id)} color="#ef4444" variant="outline" size="sm">🗑</Btn>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {score !== null && (
              <div style={{
                background: score / filtered.length >= 0.8 ? '#052e1622' : score / filtered.length >= 0.5 ? '#78350f22' : '#450a0a22',
                border: `1px solid ${score / filtered.length >= 0.8 ? '#10b981' : score / filtered.length >= 0.5 ? '#f59e0b' : '#ef4444'}`,
                borderRadius: 12, padding: '20px 24px', marginBottom: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 20 }}>
                    {score}/{filtered.length} câu đúng
                    <span style={{ fontSize: 14, color: '#94a3b8', marginLeft: 10 }}>
                      ({Math.round(score / filtered.length * 100)}%)
                    </span>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>
                    {score / filtered.length >= 0.8 ? '🏆 Xuất sắc! Bạn đã nắm vững kiến thức SDN' :
                     score / filtered.length >= 0.5 ? '👍 Khá tốt! Ôn lại các câu sai để hoàn thiện hơn' :
                     '📚 Cần học thêm lý thuyết trước khi làm lại'}
                  </div>
                </div>
                <Btn onClick={resetQuiz} color="#64748b" variant="outline">Làm lại</Btn>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {filtered.map((q, qi) => {
                const sel = answers[qi];
                const isRevealed = revealed[qi];
                return (
                  <div key={q.id} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, padding: '20px 24px' }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                      <Badge text={q.category} color="#06b6d4" />
                      <Badge text={q.difficulty} color={DIFF_COLOR[q.difficulty] || '#10b981'} />
                    </div>
                    <div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 600, marginBottom: 14 }}>
                      <span style={{ color: '#06b6d4', marginRight: 8 }}>Q{qi + 1}.</span>
                      {q.question}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {q.options.map((opt, oi) => {
                        let bg = '#1e293b', border = '#334155', color = '#94a3b8';
                        if (isRevealed) {
                          if (oi === q.correct) { bg = '#052e1633'; border = '#10b981'; color = '#6ee7b7'; }
                          else if (oi === sel) { bg = '#450a0a33'; border = '#ef4444'; color = '#fca5a5'; }
                        } else if (sel === oi) { bg = '#1e40af33'; border = '#3b82f6'; color = '#93c5fd'; }
                        return (
                          <button key={oi} onClick={() => handleSelect(qi, oi)} style={{
                            background: bg, border: `1px solid ${border}`, borderRadius: 8,
                            padding: '10px 14px', color, fontSize: 13,
                            cursor: isRevealed ? 'default' : 'pointer', textAlign: 'left',
                            transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 10,
                          }}>
                            <span style={{
                              width: 22, height: 22, borderRadius: '50%',
                              background: border + '33', border: `1px solid ${border}`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 10, fontWeight: 700, flexShrink: 0, color,
                            }}>{['A','B','C','D'][oi]}</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {isRevealed && (
                      <div style={{ marginTop: 12, padding: '10px 14px', background: '#0c4a6e22', border: '1px solid #0369a133', borderRadius: 8 }}>
                        <span style={{ color: '#38bdf8', fontSize: 12, fontWeight: 700 }}>💡 Giải thích: </span>
                        <span style={{ color: '#7dd3fc', fontSize: 12 }}>{q.explain}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {Object.keys(revealed).length === filtered.length && score === null && (
              <button onClick={calcScore} style={{
                marginTop: 20, width: '100%', background: '#06b6d4', color: '#0f172a',
                border: 'none', borderRadius: 10, padding: '14px', fontSize: 15,
                fontWeight: 800, cursor: 'pointer',
              }}>
                📊 Xem kết quả ({Object.keys(revealed).length}/{filtered.length} câu đã trả lời)
              </button>
            )}
          </div>
        )
      )}

      {modal === 'add' && (
        <Modal title="Thêm câu hỏi trắc nghiệm" onClose={() => setModal(null)}>
          <QuizForm onSave={handleAdd} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal === 'edit' && editItem && (
        <Modal title="Chỉnh sửa câu hỏi" onClose={() => { setModal(null); setEditItem(null); }}>
          <QuizForm initial={editItem} onSave={handleEdit} onClose={() => { setModal(null); setEditItem(null); }} />
        </Modal>
      )}
      {deleteConfirm && (
        <Modal title="Xác nhận xóa" onClose={() => setDeleteConfirm(null)}>
          <p style={{ color: '#94a3b8', marginBottom: 20 }}>Xóa câu hỏi này? Hành động không thể hoàn tác.</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <Btn onClick={() => setDeleteConfirm(null)} color="#64748b" variant="outline">Hủy</Btn>
            <Btn onClick={() => handleDelete(deleteConfirm)} color="#ef4444">Xóa</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}
