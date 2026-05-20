import {
  useState,
  useEffect,
} from 'react';

import {
  useParams,
  useNavigate,
} from 'react-router-dom';

import api from '../../client/apiClient.js';


import {
  ELO_TIERS,
} from './profileConstants.js';

import {
  getTier,
  getWinRate,
} from './profileUtils.js';

import ProfileLoading from './ProfileLoading.jsx';
import ProfileNotFound from  './ProfileNotFound.jsx';
import ProfileHeader from  './ProfileHeader.jsx';
import StatsGrid from  './StatsGrid.jsx'
import AchievementsSection from  './AchievementsSection.jsx';
import RecentBattles from '../Dashboard/recentBattles.jsx';

export default function ProfilePage() {
  const { username } =
    useParams();


  const navigate =
    useNavigate();

  const [profile, setProfile] =
    useState(null);

  const [
    recentBattles,
    setRecentBattles,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [notFound, setNotFound] =
    useState(false);

  
  useEffect(() => {
    const fetchProfile =
      async () => {
        setLoading(true);
        setNotFound(false);

        try {
          const { data } =
            await api.get(
              `/profile/${username}`
            );
          console.log(data);
            
          setProfile(data.user);

          setRecentBattles(
            data.recentBattles || []
          );
        } catch (err) {
          if (
            err.response?.status ===
            404
          ) {
            setNotFound(true);
          }
        } finally {
          setLoading(false);
        }
      };

    fetchProfile();
  }, [username]);

  if (loading) {
    return <ProfileLoading />;
  }

  if (notFound) {
    return (
      <ProfileNotFound
        username={username}
        navigate={navigate}
      />
    );
  }

  if (!profile) return null;

  const tier = getTier(
    profile.eloRating
  );

  const winRate = getWinRate(
    profile.wins,
    profile.battlesPlayed
  );

  const currentTierIndex =
    ELO_TIERS.findIndex(
      (t) =>
        profile.eloRating >=
        t.min
    );

  const nextTier =
    ELO_TIERS[
      currentTierIndex - 1
    ];

  const prevTierMin =
    ELO_TIERS[
      currentTierIndex
    ]?.min || 0;

  const eloProgress = nextTier
    ? Math.round(
        ((profile.eloRating -
          prevTierMin) /
          (nextTier.min -
            prevTierMin)) *
          100
      )
    : 100;

  return (
    <div className="space-y-6 animate-slide-up max-w-4xl mx-auto">
      <ProfileHeader
        profile={profile}
        tier={tier}
        nextTier={nextTier}
        eloProgress={
          eloProgress
        }
      />

      <StatsGrid
        profile={profile}
        winRate={winRate}
      />

      <AchievementsSection
        achievements={
          profile.achievements
        }
      />

      <RecentBattles
        title="Battle History"
        emptyMessage="No battles played yet"
        battles={recentBattles}
        user={profile}
        loading={loading}
      />
    </div>
  );
}