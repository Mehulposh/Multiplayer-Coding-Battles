import {
  FiArrowLeft,
} from 'react-icons/fi';

export default function ProfileNotFound({
  username,
  navigate,
}) {
  return (
    <div className="py-32 text-center space-y-4">
      <div className="text-6xl">
        👤
      </div>

      <h2 className="font-display font-black text-2xl text-white">
        User not found
      </h2>

      <p className="text-battle-muted">
        No user named "
        {username}" exists.
      </p>

      <button
        onClick={() =>
          navigate(-1)
        }
        className="flex items-center gap-2 mx-auto text-battle-accent hover:underline"
      >
        <FiArrowLeft className="w-4 h-4" />
        Go back
      </button>
    </div>
  );
}