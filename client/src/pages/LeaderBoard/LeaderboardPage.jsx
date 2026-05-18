import { useState, useEffect } from 'react';

import api from '../../client/apiClient.js';

import useAuthStore from '../../zustandStore/authStore.js';

import LeaderboardHeader from './LeaderboardHeader.jsx';
import RankBanner from './RankBanner.jsx'
import LeaderboardTabs from './LeaderboardTabs.jsx';
import PodiumSection from './PodiumSection.jsx';
import LeaderboardTable from './LeaderboardTable.jsx';
import LoadingLeaderboard from './LoadingLeaderboard.jsx';
import EmptyLeaderboard from './EmptyLeaderboard.jsx';

export default function LeaderboardPage() {
  const { user } = useAuthStore();

  const [tab, setTab] =
    useState('global');

  const [data, setData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [lastUpdated, setLastUpdated] =
    useState(null);

  const [myRank, setMyRank] =
    useState(null);

  
   useEffect(() => {
        const loadLeaderboard = async () => {
            setLoading(true);

            try {
                const { data: res } = await api.get(
                    `/leaderboard/${tab}`
                );

                const leaderboard =
                    res.leaderboard || [];

                setData(leaderboard);

                setLastUpdated(new Date());

                if (user) {
                    const me = leaderboard.find(
                    (e) =>
                        e.username ===
                        user.username
                    );

                    setMyRank(
                    me?.rank || null
                    );
                }
            } catch {
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        loadLeaderboard();
    }, [tab, user]);

    const refreshLeaderboard = async () => {
        setLoading(true);

        try {
            const { data: res } = await api.get(
                `/leaderboard/${tab}`
            );

            const leaderboard = res.leaderboard || [];

            setData(leaderboard);

            setLastUpdated(new Date());

            if (user) {
            const me = leaderboard.find(
                (e) =>
                e.username ===
                user.username
            );

            setMyRank(
                me?.rank || null
            );
            }
        } catch {
            setData([]);
        } finally {
            setLoading(false);
        }
    };
  const topThree =
    data.slice(0, 3);

  return (
    <div className="space-y-6 animate-slide-up">
      <LeaderboardHeader
        loading={loading}
        lastUpdated={lastUpdated}
        fetchLeaderboard={
          refreshLeaderboard
        }
      />

      <RankBanner
        myRank={myRank}
        user={user}
      />

      <LeaderboardTabs
        tab={tab}
        setTab={setTab}
      />

      {loading ? (
        <LoadingLeaderboard />
      ) : data.length === 0 ? (
        <EmptyLeaderboard />
      ) : (
        <>
          {tab === 'global' && (
            <PodiumSection
              topThree={topThree}
            />
          )}

          <LeaderboardTable
            data={data}
            user={user}
          />
        </>
      )}
    </div>
  );
}