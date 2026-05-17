
export default function SubmitButton({ 
  isLoading,
  icon: Icon,
  text,
 }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-2 bg-battle-accent text-battle-bg py-3 rounded-xl font-bold text-base hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-battle-bg/30 border-t-battle-bg rounded-full animate-spin" />
      ) : (
        <>
          <Icon className='w-5 h-5'/>
          {text}
        </>
      )}
    </button>
  );
}