import Editor from '@monaco-editor/react';

export default function BattleEditor({
  viewingOpponent,
  opponentLang,
  opponentCode,
  editor,
  handleCodeChange,
  battle,
}) {
  return (
    <Editor
      height="100%"
      language={
        viewingOpponent
          ? opponentLang
          : editor.language
      }
      value={
        viewingOpponent
          ? opponentCode
          : editor.code
      }
      onChange={
        viewingOpponent
          ? undefined
          : handleCodeChange
      }
      theme="vs-dark"
      options={{
        fontSize: editor.fontSize,
        minimap: {
          enabled: editor.minimap,
        },
        readOnly:
          viewingOpponent ||
          battle.isSpectator ||
          battle.status !== 'active',
      }}
    />
  );
}