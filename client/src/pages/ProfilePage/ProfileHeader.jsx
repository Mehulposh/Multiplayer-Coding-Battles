import { motion } from 'framer-motion';

import { FiShield } from 'react-icons/fi';

import { formatDistanceToNow } from 'date-fns';

import AvatarCard from './AvatarCard.jsx';
import TierBadge from './TierBadge.jsx';
import RankBadge from './RankBadge.jsx';
import EloProgress from './EloProgress.jsx';
import MemberSince from './MemberSince.jsx';

export default function ProfileHeader({
  profile,
  tier,
  nextTier,
  eloProgress,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="bg-battle-card border border-battle-border rounded-2xl overflow-hidden"
    >
      {/* BANNER */}
      <div className="h-32 bg-linear-to-r from-battle-accent/20 via-battle-accent2/10 to-purple-500/20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_40%)]" />
      </div>

      {/* CONTENT */}
      <div className="px-6 pb-6 relative">
        {/* AVATAR */}
        <div className="-mt-10 mb-4 flex items-end justify-between gap-4">
          <AvatarCard profile={profile} />

          <RankBadge rank={profile.rank} />
        </div>

        {/* USER INFO */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-3xl text-white">
                {profile.username}
              </h1>

              {profile.isAdmin && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold">
                  <FiShield className="w-3 h-3" />
                  ADMIN
                </div>
              )}
            </div>

            <TierBadge tier={tier} />

            <MemberSince
              createdAt={
                profile.createdAt
              }
            />
          </div>

          {/* ELO */}
          <div className="text-left md:text-right">
            <div className="text-battle-muted text-sm uppercase tracking-wider">
              ELO Rating
            </div>

            <div className="font-display font-black text-5xl text-battle-accent">
              {profile.eloRating}
            </div>

            <div className="text-xs text-battle-muted mt-1">
              Last active{' '}
              {formatDistanceToNow(
                new Date(
                  profile.updatedAt ||
                    profile.createdAt
                ),
                {
                  addSuffix: true,
                }
              )}
            </div>
          </div>
        </div>

        {/* PROGRESS */}
        <EloProgress
          tier={tier}
          nextTier={nextTier}
          profile={profile}
          eloProgress={eloProgress}
        />
      </div>
    </motion.div>
  );
}