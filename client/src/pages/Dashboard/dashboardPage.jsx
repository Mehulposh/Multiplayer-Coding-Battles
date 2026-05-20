import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import api from '../../client/apiClient.js';

import useAuthStore from '../../zustandStore/authStore.js';
import useMatchmakingStore from '../../zustandStore/matchMakingStore.js';

import { getSocket } from '../../client//socketClient.js';

import DashboardHeader from './dashboardHeader.jsx';
import StatsGrid from './statsGrid.jsx';
import MatchmakingCard from './matchMakingCard.jsx';
import RecentBattles from './recentBattles.jsx';

export default function DashboardPage() {
  const { user } = useAuthStore();

  const navigate = useNavigate();

  const {
    isSearching,
    waitTime,
    playersSearching,
    matchFound,
    startSearching,
    stopSearching,
    setPlayersSearching,
    setMatchFound,
    reset,
  } = useMatchmakingStore();

  const [recentBattles, setRecentBattles] = useState([]);
  const [loadingBattles, setLoadingBattles] = useState(true);

  const handleFindMatch = () => {
    const socket = getSocket();

    if (!socket) return toast.error('Not connected');

    socket.emit('start-matchmaking');

    startSearching();
  };

  const handleCancelMatch = () => {
    const socket = getSocket();

    if (socket) socket.emit('stop-matchmaking');

    stopSearching();
  };


  useEffect(() => {
        const loadBattles = async () => {
            try {
            const { data } = await api.get('/battle/my?limit=5');

            setRecentBattles(data.battles || []);
            } catch (error) {
            console.error(error);
            } finally {
            setLoadingBattles(false);
            }
        };

        loadBattles();

        const socket = getSocket();

        if (!socket) return;

        socket.on('match-found', (data) => {
            setMatchFound(data);
        });

        socket.on(
            'matchmaking-update',
            ({ playersSearching: count }) => {
            setPlayersSearching(count);
            }
        );

        return () => {
            socket.off('match-found');
            socket.off('matchmaking-update');
        };
    }, [setMatchFound, setPlayersSearching]);

   useEffect(() => {
    if (matchFound) {
      toast.success(`Match found! vs ${matchFound.opponent.username}`);

      setTimeout(() => {
        navigate(`/battle/${matchFound.roomId}`);
        reset();
      }, 1500);
    }
  }, [matchFound, navigate, reset]);

  return (
    <div className="space-y-8 animate-slide-up">
      <DashboardHeader user={user} />

      <StatsGrid user={user} />

      <MatchmakingCard
        user={user}
        isSearching={isSearching}
        waitTime={waitTime}
        playersSearching={playersSearching}
        matchFound={matchFound}
        onFindMatch={handleFindMatch}
        onCancelMatch={handleCancelMatch}
      />

      <RecentBattles
        title="Recent Battles"
        emptyMessage="No battles yet. Start your first match!"
        battles={recentBattles}
        loading={loadingBattles}
        user={user}
      />
    </div>
  );
}