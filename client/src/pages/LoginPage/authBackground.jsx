export default function AuthBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-battle-accent/5 rounded-full blur-[100px]" />

      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-battle-accent2/5 rounded-full blur-[100px]" />
    </div>
  );
}