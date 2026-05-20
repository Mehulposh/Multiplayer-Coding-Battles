export default function AvatarCard({
  profile,
}) {
  return (
    <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-battle-accent/30 to-battle-accent2/30 flex items-center justify-center text-3xl font-black text-battle-accent border-4 border-battle-card shadow-xl">
      {profile.avatar ? (
        <img
          src={profile.avatar}
          alt=""
          className="w-full h-full rounded-xl object-cover"
        />
      ) : (
        profile.username[0].toUpperCase()
      )}
    </div>
  );
}