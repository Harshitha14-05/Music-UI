import React from 'react';
import { Song } from '../types/music';
import { Play, Pause } from 'lucide-react';

interface PlaylistProps {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  onSongSelect: (song: Song) => void;
}

export const Playlist: React.FC<PlaylistProps> = ({
  songs,
  currentSong,
  isPlaying,
  onSongSelect
}) => {
  const formatDuration = (duration: number): string => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <h3 className="text-xl font-bold text-white mb-4">Current Playlist</h3>
      <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
        {songs.map((song, index) => {
          const isCurrentSong = currentSong?.id === song.id;
          return (
            <div
              key={song.id}
              onClick={() => onSongSelect(song)}
              className={`flex items-center space-x-4 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/5 group ${
                isCurrentSong ? 'bg-purple-500/20 border border-purple-500/30' : ''
              }`}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={song.coverUrl}
                  alt={song.album}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  {isCurrentSong && isPlaying ? (
                    <Pause size={16} className="text-white" />
                  ) : (
                    <Play size={16} className="text-white" />
                  )}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium truncate ${
                  isCurrentSong ? 'text-purple-400' : 'text-white'
                }`}>
                  {song.title}
                </h4>
                <p className="text-gray-400 text-sm truncate">{song.artist}</p>
              </div>
              
              <div className="text-gray-400 text-sm">
                {formatDuration(song.duration)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};