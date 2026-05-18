import {
  FiChevronDown,
  FiSend,
} from 'react-icons/fi';

import ChatMessage from './chatMessage.jsx';

export default function ChatPanel(props) {
  const {
    chatOpen,
    setChatOpen,
    chatMessages,
    chatInput,
    setChatInput,
    handleSendMessage,
    chatEndRef,
    user,
  } = props;

  return (
    <div
      className={`${
        chatOpen ? 'w-72' : 'w-10'
      } shrink-0 border-l border-battle-border bg-battle-surface flex flex-col transition-all duration-200`}
    >
      {/* HEADER */}
      <button
        onClick={() =>
          setChatOpen(!chatOpen)
        }
        className="h-10 border-b border-battle-border flex items-center justify-center text-battle-muted hover:text-white transition-colors shrink-0"
      >
        <FiChevronDown
          className={`w-4 h-4 transition-transform ${
            chatOpen
              ? ''
              : '-rotate-90'
          }`}
        />
      </button>

      {/* CONTENT */}
      {chatOpen && (
        <>
          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {chatMessages.length === 0 ? (
              <div className="text-center text-battle-muted text-sm mt-10">
                No messages yet
              </div>
            ) : (
              chatMessages.map(
                (msg, i) => (
                  <ChatMessage
                    key={i}
                    msg={msg}
                    currentUser={
                      user?.username
                    }
                  />
                )
              )
            )}

            <div ref={chatEndRef} />
          </div>

          {/* INPUT */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-battle-border flex items-center gap-2"
          >
            <input
              value={chatInput}
              onChange={(e) =>
                setChatInput(
                  e.target.value
                )
              }
              placeholder="Type message..."
              className="flex-1 bg-battle-card border border-battle-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-battle-muted focus:outline-none focus:border-battle-accent"
            />

            <button
              type="submit"
              className="w-9 h-9 rounded-xl bg-battle-accent text-battle-bg flex items-center justify-center hover:scale-105 transition-transform"
            >
              <FiSend className="w-4 h-4" />
            </button>
          </form>
        </>
      )}
    </div>
  );
}