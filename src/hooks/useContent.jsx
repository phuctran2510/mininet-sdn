import { useState, useEffect } from 'react';
import { INITIAL_THEORY, INITIAL_LABS, INITIAL_QUIZ, INITIAL_GUIDES } from '../data/initialData.jsx';

const STORAGE_KEY = 'sdn_course_content';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return null;
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_) {}
}

export function useContent() {
  const [content, setContent] = useState(() => {
    const saved = loadFromStorage();
    return saved || {
      theory: INITIAL_THEORY,
      labs: INITIAL_LABS,
      quiz: INITIAL_QUIZ,
      guides: INITIAL_GUIDES,
    };
  });

  useEffect(() => {
    saveToStorage(content);
  }, [content]);

  // -------- THEORY --------
  const addTheory = (item) => {
    const newItem = { ...item, id: Date.now().toString() };
    setContent(c => ({ ...c, theory: [...c.theory, newItem] }));
  };
  const updateTheory = (id, item) => {
    setContent(c => ({ ...c, theory: c.theory.map(t => t.id === id ? { ...t, ...item } : t) }));
  };
  const deleteTheory = (id) => {
    setContent(c => ({ ...c, theory: c.theory.filter(t => t.id !== id) }));
  };

  // -------- LABS --------
  const addLab = (item) => {
    const newItem = { ...item, id: Date.now().toString() };
    setContent(c => ({ ...c, labs: [...c.labs, newItem] }));
  };
  const updateLab = (id, item) => {
    setContent(c => ({ ...c, labs: c.labs.map(l => l.id === id ? { ...l, ...item } : l) }));
  };
  const deleteLab = (id) => {
    setContent(c => ({ ...c, labs: c.labs.filter(l => l.id !== id) }));
  };

  // -------- QUIZ --------
  const addQuiz = (item) => {
    const newItem = { ...item, id: Date.now().toString() };
    setContent(c => ({ ...c, quiz: [...c.quiz, newItem] }));
  };
  const updateQuiz = (id, item) => {
    setContent(c => ({ ...c, quiz: c.quiz.map(q => q.id === id ? { ...q, ...item } : q) }));
  };
  const deleteQuiz = (id) => {
    setContent(c => ({ ...c, quiz: c.quiz.filter(q => q.id !== id) }));
  };

  // -------- GUIDES --------
  const addGuide = (item) => {
    const newItem = { ...item, id: Date.now().toString() };
    setContent(c => ({ ...c, guides: [...c.guides, newItem] }));
  };
  const updateGuide = (id, item) => {
    setContent(c => ({ ...c, guides: c.guides.map(g => g.id === id ? { ...g, ...item } : g) }));
  };
  const deleteGuide = (id) => {
    setContent(c => ({ ...c, guides: c.guides.filter(g => g.id !== id) }));
  };

  const resetToDefault = () => {
    const defaultContent = {
      theory: INITIAL_THEORY,
      labs: INITIAL_LABS,
      quiz: INITIAL_QUIZ,
      guides: INITIAL_GUIDES,
    };
    setContent(defaultContent);
    saveToStorage(defaultContent);
  };

  return {
    content,
    theory: { add: addTheory, update: updateTheory, delete: deleteTheory },
    labs: { add: addLab, update: updateLab, delete: deleteLab },
    quiz: { add: addQuiz, update: updateQuiz, delete: deleteQuiz },
    guides: { add: addGuide, update: updateGuide, delete: deleteGuide },
    resetToDefault,
  };
}
