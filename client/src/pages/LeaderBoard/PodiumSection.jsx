import PodiumCard from './PodiumCard.jsx';

export default function PodiumSection({
  topThree,
}) {
  if (topThree.length < 3)
    return null;

  return (
    <div className="grid grid-cols-3 gap-4 mb-2">
      <PodiumCard
        player={topThree[1]}
        place={2}
        delay={0.1}
      />

      <PodiumCard
        player={topThree[0]}
        place={1}
      />

      <PodiumCard
        player={topThree[2]}
        place={3}
        delay={0.2}
      />
    </div>
  );
}