import React from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Volume2, 
  VolumeX 
} from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onShuffle: () => void;
  onRepeat: () => void;
  isShuffled: boolean;
  isRepeated: boolean;
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onMute: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  onShuffle,
  onRepeat,
  isShuffled,
  isRepeated,
  volume,
  isMuted,
  onVolumeChange,
  onMute
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-4">
        <button
          onClick={onShuffle}
          className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
            isShuffled 
              ? 'text-purple-400 bg-purple-400/20' 
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Shuffle size={20} />
        </button>
        
        <button
          onClick={onPrevious}
          className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-110"
        >
          <SkipBack size={24} />
        </button>
        
        <button
          onClick={onPlayPause}
          className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200 hover:scale-105 shadow-lg"
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>
        
        <button
          onClick={onNext}
          className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-110"
        >
          <SkipForward size={24} />
        </button>
        
        <button
          onClick={onRepeat}
          className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
            isRepeated 
              ? 'text-purple-400 bg-purple-400/20' 
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Repeat size={20} />
        </button>
      </div>
      
      <div className="flex items-center space-x-3">
        <button
          onClick={onMute}
          className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume * 100}
            onChange={(e) => onVolumeChange(Number(e.target.value) / 100)}
            className="w-20 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer slider"
          />
        </div>
      </div>
    </div>
  );
};