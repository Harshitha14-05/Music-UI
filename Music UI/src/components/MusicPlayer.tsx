import React, { useState, useRef, useEffect } from 'react';
import { Song, PlayerState } from '../types/music';
import { Controls } from './Controls';
import { ProgressBar } from './ProgressBar';
import { Playlist } from './Playlist';
import { sampleSongs } from '../data/sampleSongs';

export const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentSong: sampleSongs[0],
    isPlaying: false,
    currentTime: 0,
    volume: 0.7,
    isMuted: false,
    isShuffled: false,
    isRepeated: false
  });

  const [playlist] = useState<Song[]>(sampleSongs);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setPlayerState(prev => ({
        ...prev,
        currentTime: audio.currentTime
      }));
    };

    const handleEnded = () => {
      if (playerState.isRepeated) {
        audio.play();
      } else {
        handleNext();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playerState.isRepeated]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = playerState.isMuted ? 0 : playerState.volume;
  }, [playerState.volume, playerState.isMuted]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playerState.isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }

    setPlayerState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }));
  };

  const handleNext = () => {
    const currentIndex = playlist.findIndex(song => song.id === playerState.currentSong?.id);
    let nextIndex;

    if (playerState.isShuffled) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex = (currentIndex + 1) % playlist.length;
    }

    const nextSong = playlist[nextIndex];
    setPlayerState(prev => ({
      ...prev,
      currentSong: nextSong
    }));
  };

  const handlePrevious = () => {
    const currentIndex = playlist.findIndex(song => song.id === playerState.currentSong?.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : playlist.length - 1;
    const prevSong = playlist[prevIndex];

    setPlayerState(prev => ({
      ...prev,
      currentSong: prevSong
    }));
  };

  const handleSeek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;
    setPlayerState(prev => ({
      ...prev,
      currentTime: time
    }));
  };

  const handleVolumeChange = (volume: number) => {
    setPlayerState(prev => ({
      ...prev,
      volume,
      isMuted: false
    }));
  };

  const handleMute = () => {
    setPlayerState(prev => ({
      ...prev,
      isMuted: !prev.isMuted
    }));
  };

  const handleShuffle = () => {
    setPlayerState(prev => ({
      ...prev,
      isShuffled: !prev.isShuffled
    }));
  };

  const handleRepeat = () => {
    setPlayerState(prev => ({
      ...prev,
      isRepeated: !prev.isRepeated
    }));
  };

  const handleSongSelect = (song: Song) => {
    setPlayerState(prev => ({
      ...prev,
      currentSong: song,
      isPlaying: true
    }));

    setTimeout(() => {
      const audio = audioRef.current;
      if (audio) {
        audio.play().catch(console.error);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Music Player
          </h1>
          <p className="text-gray-400">Your personal music streaming experience</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Song Display */}
          <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative group">
                <img
                  src={playerState.currentSong?.coverUrl}
                  alt={playerState.currentSong?.album}
                  className="w-48 h-48 rounded-2xl object-cover shadow-2xl group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {playerState.currentSong?.title}
                  </h2>
                  <p className="text-xl text-gray-300 mb-1">
                    {playerState.currentSong?.artist}
                  </p>
                  <p className="text-gray-400">
                    {playerState.currentSong?.album}
                  </p>
                </div>
                
                <div className="space-y-6">
                  <ProgressBar
                    currentTime={playerState.currentTime}
                    duration={playerState.currentSong?.duration || 0}
                    onSeek={handleSeek}
                  />
                  
                  <Controls
                    isPlaying={playerState.isPlaying}
                    onPlayPause={handlePlayPause}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    onShuffle={handleShuffle}
                    onRepeat={handleRepeat}
                    isShuffled={playerState.isShuffled}
                    isRepeated={playerState.isRepeated}
                    volume={playerState.volume}
                    isMuted={playerState.isMuted}
                    onVolumeChange={handleVolumeChange}
                    onMute={handleMute}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Playlist */}
          <div className="lg:col-span-1">
            <Playlist
              songs={playlist}
              currentSong={playerState.currentSong}
              isPlaying={playerState.isPlaying}
              onSongSelect={handleSongSelect}
            />
          </div>
        </div>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={playerState.currentSong?.audioUrl}
          preload="metadata"
        />
      </div>
    </div>
  );
};