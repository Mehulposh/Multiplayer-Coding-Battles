export default function ChatMessage({
  msg,
  currentUser,
}) {
  const isMine =
    msg.username === currentUser;

  return (
    <div className={isMine ? 'text-right' : ''}>
      <div
        className={`inline-block max-w-[90%] rounded-xl px-3 py-2 text-sm ${
          isMine
            ? 'bg-battle-accent/20 text-white border border-battle-accent/30'
            : 'bg-battle-card text-white border border-battle-border'
        }`}
      >
        {!isMine && (
          <div className="text-battle-accent text-xs font-bold mb-0.5">
            {msg.username}
          </div>
        )}

        {msg.message}
      </div>
    </div>
  );
}