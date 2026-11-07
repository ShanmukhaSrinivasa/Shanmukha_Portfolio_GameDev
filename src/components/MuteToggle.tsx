import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { playClick, getMasterVolume, setMasterVolume, subscribeVolume } from '@/hooks/useSoundEffects';

const DEFAULT_VOLUME = 0.8;

interface MuteToggleProps {
  size?: number;
  className?: string;
}

/** Sound on/off button. The choice is saved, so it carries across pages and visits. */
const MuteToggle = ({ size = 16, className = '' }: MuteToggleProps) => {
  const [isMuted, setIsMuted] = useState(() => getMasterVolume() === 0);
  useEffect(() => subscribeVolume((v) => setIsMuted(v === 0)), []);

  const toggle = () => {
    const nextMuted = !isMuted;
    setMasterVolume(nextMuted ? 0 : DEFAULT_VOLUME);
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
      className={`p-2 border border-line text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors ${className}`}
    >
      {isMuted ? <VolumeX size={size} /> : <Volume2 size={size} />}
    </button>
  );
};

export default MuteToggle;
