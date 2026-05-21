import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import api from '../../client/apiClient.js';

import useAuthStore from '../../zustandStore/authStore.js';
import useBattleStore from '../../zustandStore/battleStore.js';
import useEditorStore from '../../zustandStore/editorStore.js';

import { getSocket } from '../../client/socketClient.js';

import BattleTopBar from './battleTopBar.jsx';
import CountdownOverlay from './countDownOverlay.jsx';
import ResultOverlay from './resultOverlay.jsx';
import ProblemPanel from './problemPanel.jsx';
import EditorToolbar from './editorToolbar.jsx';
import BattleEditor from './battleEditor.jsx';
import ChatPanel from './chatPanel.jsx';

export default function BattleRoomPage() {
  const { roomId } = useParams();

  const navigate = useNavigate();

  const { user } = useAuthStore();

  const battle = useBattleStore();

  const editor = useEditorStore();

  const [chatMessages, setChatMessages] = useState([]);

  const [chatInput, setChatInput] = useState('');

  const [opponentCode, setOpponentCode] = useState('');

  const [opponentLang, setOpponentLang] =
    useState('javascript');

  const [viewingOpponent, setViewingOpponent] =
    useState(false);

  const [chatOpen, setChatOpen] = useState(true);

  const [submissionResult, setSubmissionResult] =
    useState(null);

  const [showResult, setShowResult] =
    useState(false);

  const chatEndRef = useRef(null);

  const typingTimeout = useRef(null);

  const codeChangeTimeout = useRef(null);

  /*
    -----------------------------------------
    LOAD BATTLE
    -----------------------------------------
  */

  useEffect(() => {
    const loadBattle = async () => {
      try {
        const { data } = await api.get(
          `/battle/${roomId}`
        );

        battle.setBattle(data.battle);

        if (data.battle.problem?.starterCode) {
          const starterCode =
            data.battle.problem.starterCode[
              editor.language
            ] || '';

          if (starterCode) {
            editor.setCode(starterCode);
          }
        }

        const socket = getSocket();

        if (socket) {
          socket.emit('join-room', {
            roomId:
              data.battle.roomId || roomId,
          });
        }
      } catch (error) {
        console.error(error);
        toast.error(
          'Failed to load battle room'
        );

        navigate('/dashboard');
      }
    };

    loadBattle();

    return () => {
      battle.reset();
      editor.reset();
    };
  }, [roomId,  navigate]);

  /*
    -----------------------------------------
    SOCKET EVENTS
    -----------------------------------------
  */

  useEffect(() => {
    const socket = getSocket();

    if (!socket) return;

    socket.on(
      'room-joined',
      ({ battle: b, isSpectator }) => {
        battle.setSpectator(
          isSpectator || false
        );

        if (b) {
          battle.setBattle(b);

          if (b.problem?.starterCode) {
            editor.setCode(
              b.problem.starterCode[
                editor.language
              ] || ''
            );
          }
        }
      }
    );

    socket.on(
      'player-joined',
      ({
        username,
        isSpectator,
        spectatorCount,
      }) => {
        if (!isSpectator) {
          toast(
            `${username} joined the battle`,
            {
              icon: '⚔️',
            }
          );
        }

        battle.setSpectatorCount(
          spectatorCount || 0
        );
      }
    );

    socket.on(
      'player-left',
      ({ username }) => {
        toast(`${username} left`, {
          icon: '🚪',
        });
      }
    );

    socket.on(
      'countdown-started',
      () => {
        battle.setStatus('countdown');
        battle.setCountdown(5);
      }
    );

    socket.on(
      'countdown-tick',
      ({ count }) => {
        battle.setCountdown(count);
      }
    );

    socket.on(
      'battle-started',
      ({ problem, startedAt }) => {
        battle.setStatus('active');

        if (problem) {
          battle.setBattle({
            ...battle.battle,
            problem,
            status: 'active',
            startedAt,
          });
        }

        toast.success(
          'Battle started!',
          {
            icon: '⚡',
          }
        );
      }
    );

    socket.on(
      'code-updated',
      ({ userId, code, language }) => {
        if (userId !== user?.id) {
          setOpponentCode(code);
          setOpponentLang(language);
        }
      }
    );

    socket.on(
      'opponent-typing',
      ({ userId, isTyping }) => {
        if (userId !== user?.id) {
          battle.setOpponentTyping(
            isTyping
          );
        }
      }
    );

    socket.on('new-message', (msg) => {
      setChatMessages((prev) => [
        ...prev,
        msg,
      ]);
    });

    socket.on(
      'submission-result',
      ({
        userId,
        username,
        passedCount,
        totalTests,
        submission,
      }) => {
        const isMe =
          userId === user?.id ||
          userId === user?._id;

        battle.addSubmission(submission);

        if (!isMe) {
          toast(
            `${username}: ${passedCount}/${totalTests} tests passed`,
            {
              icon: '📊',
            }
          );
        }
      }
    );

    socket.on(
      'battle-ended',
      ({
        winnerId,
        winnerUsername,
        passedCount,
        totalTests,
      }) => {
        battle.stopTimer();

        battle.setStatus('finished');

        const isWinner =
          winnerId === user?.id ||
          winnerId === user?._id;

        battle.setWinner(winnerUsername);

        setSubmissionResult({
          passed: isWinner,
          winnerUsername,
          passedCount,
          totalTests,
          isWinner,
        });

        setShowResult(true);

        if (isWinner) {
          toast.success(
            '🏆 You won the battle!'
          );
        } else {
          toast.error(
            `${winnerUsername} won the battle`
          );
        }
      }
    );

    return () => {
      [
        'room-joined',
        'player-joined',
        'player-left',
        'countdown-started',
        'countdown-tick',
        'battle-started',
        'code-updated',
        'opponent-typing',
        'new-message',
        'submission-result',
        'battle-ended',
      ].forEach((event) =>
        socket.off(event)
      );
    };
  }, [
    roomId,battle,
    editor,
    user?.id,
    user?._id,
]);

  /*
    -----------------------------------------
    AUTO SCROLL CHAT
    -----------------------------------------
  */

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [chatMessages]);

  /*
    -----------------------------------------
    START TIMER
    -----------------------------------------
  */

  useEffect(() => {
    if (
      battle.status === 'active' &&
      !battle.timerInterval
    ) {
      battle.startTimer();
    }
  }, [battle.status, battle.timerInterval,battle,]);

  /*
    -----------------------------------------
    CODE CHANGE
    -----------------------------------------
  */

  const handleCodeChange =
    useCallback(
      (newCode) => {
        editor.setCode(newCode || '');

        if (codeChangeTimeout.current) {
          clearTimeout(
            codeChangeTimeout.current
          );
        }

        codeChangeTimeout.current =
          setTimeout(() => {
            const socket = getSocket();

            if (socket) {
              socket.emit(
                'code-change',
                {
                  roomId,
                  code: newCode,
                  language:
                    editor.language,
                }
              );
            }
          }, 300);

        const socket = getSocket();

        if (socket) {
          socket.emit('typing', {
            roomId,
            isTyping: true,
          });

          if (typingTimeout.current) {
            clearTimeout(
              typingTimeout.current
            );
          }

          typingTimeout.current =
            setTimeout(() => {
              socket.emit('typing', {
                roomId,
                isTyping: false,
              });
            }, 2000);
        }
      },
      [roomId, editor]
    );

  /*
    -----------------------------------------
    LANGUAGE CHANGE
    -----------------------------------------
  */

  const handleLanguageChange = (
    lang
  ) => {
    editor.setLanguage(lang);

    const socket = getSocket();

    if (socket) {
      socket.emit('code-change', {
        roomId,
        code: editor.code,
        language: lang,
      });
    }
  };

  /*
    -----------------------------------------
    SUBMIT
    -----------------------------------------
  */

  const handleSubmit = async () => {
    if (battle.status !== 'active') {
      return toast.error(
        'Battle is not active'
      );
    }

    if (editor.isSubmitting) return;

    editor.setIsSubmitting(true);

    try {
      const battleData = await api.get(
        `/battle/${roomId}`
      );

      const battleId =
        battleData.data.battle._id;

      await api.post(
        `/battle/${battleId}/submit`,
        {
          code: editor.code,
          language: editor.language,
        }
      );

      toast(
        'Evaluating your solution...',
        {
          icon: '⏳',
        }
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          'Submission failed'
      );
    } finally {
      setTimeout(() => {
        editor.setIsSubmitting(false);
      }, 3000);
    }
  };

  /*
    -----------------------------------------
    SEND CHAT
    -----------------------------------------
  */

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!chatInput.trim()) return;

    const socket = getSocket();

    if (socket) {
      socket.emit('send-message', {
        roomId,
        message: chatInput,
      });
    }

    setChatInput('');
  };

  /*
    -----------------------------------------
    PLAYERS
    -----------------------------------------
  */

  const me = battle.players?.find(
    (p) => {
      const pId =
        p.user?._id || p.user;

      return (
        pId?.toString() ===
          user?.id?.toString() ||
        p.username === user?.username
      );
    }
  );

  const opponent =
    battle.players?.find((p) => {
      const pId =
        p.user?._id || p.user;

      return (
        pId?.toString() !==
          user?.id?.toString() &&
        p.username !== user?.username
      );
    });

  /*
    -----------------------------------------
    TIMER
    -----------------------------------------
  */

  const maxTime = 30 * 60;

  const timeLeft =
    maxTime - battle.timer;

  const isTimeWarning =
    timeLeft < 5 * 60;

  /*
    -----------------------------------------
    UI
    -----------------------------------------
  */

  return (
    <div className="h-screen bg-battle-bg flex flex-col overflow-hidden">
      <BattleTopBar
        me={me}
        opponent={opponent}
        battle={battle}
        timeLeft={timeLeft}
        isTimeWarning={
          isTimeWarning
        }
      />

      <div className="h-0.5 bg-battle-border shrink-0">
        <div
          className={`h-full transition-all duration-1000 ${
            isTimeWarning
              ? 'bg-battle-danger'
              : 'bg-battle-accent'
          }`}
          style={{
            width: `${
              100 -
              (battle.timer /
                maxTime) *
                100
            }%`,
          }}
        />
      </div>

      <CountdownOverlay
        show={
          battle.status ===
          'countdown'
        }
        countdown={battle.countdown}
      />

      <ResultOverlay
        show={showResult}
        result={submissionResult}
        setShowResult={
          setShowResult
        }
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[340px] shrink-0 border-r border-battle-border bg-battle-surface overflow-y-auto">
          <ProblemPanel
            problem={battle.problem}
          />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <EditorToolbar
            editor={editor}
            battle={battle}
            viewingOpponent={
              viewingOpponent
            }
            setViewingOpponent={
              setViewingOpponent
            }
            handleLanguageChange={
              handleLanguageChange
            }
            handleSubmit={
              handleSubmit
            }
          />

          <div className="flex-1 overflow-hidden">
            <BattleEditor
              viewingOpponent={
                viewingOpponent
              }
              opponentLang={
                opponentLang
              }
              opponentCode={
                opponentCode
              }
              editor={editor}
              battle={battle}
              handleCodeChange={
                handleCodeChange
              }
            />
          </div>
        </div>

        <ChatPanel
          chatOpen={chatOpen}
          setChatOpen={setChatOpen}
          chatMessages={
            chatMessages
          }
          chatInput={chatInput}
          setChatInput={
            setChatInput
          }
          handleSendMessage={
            handleSendMessage
          }
          chatEndRef={chatEndRef}
          user={user}
        />
      </div>
    </div>
  );
}