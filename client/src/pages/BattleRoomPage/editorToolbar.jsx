import {
  FiPlay,
  FiMaximize2,
  FiMinimize2,
} from 'react-icons/fi';

import {
  LANGUAGES,
  LANGUAGE_LABELS,
} from './battleConstants.js';

export default function EditorToolbar({
  editor,
  viewingOpponent,
  setViewingOpponent,
  handleLanguageChange,
  handleSubmit,
  battle,
}) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-battle-surface border-b border-battle-border shrink-0">
      {/* LEFT */}
      <div className="flex items-center gap-2">
        {/* LANGUAGE SELECTOR */}
        <div className="flex items-center gap-1 bg-battle-card border border-battle-border rounded-lg p-1">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() =>
                handleLanguageChange(lang)
              }
              disabled={
                battle.status !==
                'active'
              }
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                editor.language ===
                lang
                  ? 'bg-battle-accent text-battle-bg'
                  : 'text-battle-muted hover:text-white'
              }`}
            >
              {LANGUAGE_LABELS[lang]}
            </button>
          ))}
        </div>

        {/* VIEW TOGGLE */}
        <button
          onClick={() =>
            setViewingOpponent(
              !viewingOpponent
            )
          }
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            viewingOpponent
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : 'bg-battle-card border border-battle-border text-battle-muted hover:text-white'
          }`}
        >
          {viewingOpponent ? (
            <>
              <FiMinimize2 className="w-3.5 h-3.5" />
              Viewing Opponent
            </>
          ) : (
            <>
              <FiMaximize2 className="w-3.5 h-3.5" />
              View Opponent
            </>
          )}
        </button>
      </div>

      {/* RIGHT */}
      <button
        onClick={handleSubmit}
        disabled={
          battle.status !==
            'active' ||
          editor.isSubmitting
        }
        className="flex items-center gap-2 bg-battle-accent text-battle-bg px-4 py-2 rounded-xl font-bold text-sm hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {editor.isSubmitting ? (
          <div className="w-4 h-4 border-2 border-battle-bg/30 border-t-battle-bg rounded-full animate-spin" />
        ) : (
          <>
            <FiPlay className="w-4 h-4" />
            Submit
          </>
        )}
      </button>
    </div>
  );
}