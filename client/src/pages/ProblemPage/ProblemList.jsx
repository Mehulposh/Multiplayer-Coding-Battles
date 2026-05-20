import ProblemCard from './ProblemCard.jsx';

export default function ProblemList({
  filtered,
  page,
  limit,
}) {
  return (
    <div className="space-y-3">
      {filtered.map((problem, i) => (
        <ProblemCard
          key={problem._id}
          problem={problem}
          index={
            (page - 1) * limit + i
          }
        />
      ))}
    </div>
  );
}