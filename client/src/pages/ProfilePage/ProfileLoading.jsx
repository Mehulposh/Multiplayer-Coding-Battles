export default function ProfileLoading() {
  return (
    <div className="py-32 text-center">
      <div className="w-10 h-10 border-2 border-battle-border border-t-battle-accent rounded-full animate-spin mx-auto mb-4" />

      <p className="text-battle-muted">
        Loading profile...
      </p>
    </div>
  );
}