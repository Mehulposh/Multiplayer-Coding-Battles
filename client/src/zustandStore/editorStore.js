import { create } from 'zustand';

const STARTER_CODE = {
  javascript: '// Write your solution here\n\n',
  python: '# Write your solution here\n\n',
  java: 'class Solution {\n    // Write your solution here\n}\n',
  cpp: '#include <bits/stdc++.h>\nusing namespace std;\n\n// Write your solution here\n',
  go: 'package main\n\nimport "fmt"\n\n// Write your solution here\n',
};

const useEditorStore = create((set, get) => ({
  code: STARTER_CODE.javascript,
  language: 'javascript',
  theme: 'vs-dark',
  fontSize: 14,
  wordWrap: 'on',
  minimap: false,
  isSubmitting: false,
  lastSaved: null,

  setCode: (code) => set({ code, lastSaved: new Date() }),

  setLanguage: (language) => {
    const { code } = get();
    // Only reset if no significant code written
    const isDefault = Object.values(STARTER_CODE).some((s) => s.trim() === code.trim());
    set({
      language,
      code: isDefault ? (STARTER_CODE[language] || '') : code,
    });
  },

  setCodeForLanguage: (language, starterCode) => {
    set({
      language,
      code: starterCode || STARTER_CODE[language] || '',
    });
  },

  setIsSubmitting: (val) => set({ isSubmitting: val }),

  toggleTheme: () => set((state) => ({
    theme: state.theme === 'vs-dark' ? 'light' : 'vs-dark',
  })),

  increaseFontSize: () => set((state) => ({ fontSize: Math.min(state.fontSize + 1, 24) })),
  decreaseFontSize: () => set((state) => ({ fontSize: Math.max(state.fontSize - 1, 10) })),

  reset: () => set({
    code: STARTER_CODE.javascript,
    language: 'javascript',
    isSubmitting: false,
    lastSaved: null,
  }),
}));

export default useEditorStore;