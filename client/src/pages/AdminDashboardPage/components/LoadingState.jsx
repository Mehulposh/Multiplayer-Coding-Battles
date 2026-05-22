export default function LoadingState({
  text = 'Loading...',
}) {
  return (
    <div className="py-16 text-center">
      <div className="w-8 h-8 border-2 border-battle-border border-t-battle-accent rounded-full animate-spin mx-auto mb-3" />

      <p className="text-battle-muted text-sm">
        {text}
      </p>
    </div>
  );
}