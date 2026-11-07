import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { playClick, getMasterVolume, setMasterVolume } from '@/hooks/useSoundEffects';

const DEFAULT_VOLUME = 0.8;

interface MuteToggleProps {
  size?: number;
  className?: string;
}

/** Sound on/off button. The choice is saved, so it carries across pages and visits. */
const MuteToggle = ({ size = 16, className = '' }: MuteToggleProps) => {
  const [isMuted, setIsMuted] = useState(() => getMasterVolume() === 0);

  const toggle = () => {
    const nextMuted = !isMuted;
    setMasterVolume(nextMuted ? 0 : DEFAULT_VOLUME);
    setIsMuted(nextMuted);
    if (!nextMuted) playClick();
  };

  const label = isMuted ? 'Unmute sound effects' : 'Mute sound effects';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={isMuted}
      title={label}
      className={`p-2 border border-blue-500/30 text-blue-400 hover:text-white hover:border-blue-500 transition-colors ${className}`}
    >
      {isMuted ? <VolumeX size={size} /> : <Volume2 size={size} />}
    </button>
  );
};

export default MuteToggle;
