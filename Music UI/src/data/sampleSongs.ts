import { Song, Playlist } from '../types/music';

export const sampleSongs: Song[] = [
  {
    id: '1',
    title: 'Neon Dreams',
    artist: 'Synthwave Collective',
    album: 'Digital Horizons',
    duration: 243,
    coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds-of-nature/bird-singing-1.wav'
  },
  {
    id: '2',
    title: 'Midnight City',
    artist: 'Urban Echo',
    album: 'City Lights',
    duration: 198,
    coverUrl: 'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds-of-nature/bird-singing-2.wav'
  },
  {
    id: '3',
    title: 'Electric Pulse',
    artist: 'Beat Machine',
    album: 'Electronic Vibes',
    duration: 275,
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds-of-nature/bird-singing-3.wav'
  },
  {
    id: '4',
    title: 'Ocean Waves',
    artist: 'Ambient Space',
    album: 'Natural Sounds',
    duration: 312,
    coverUrl: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds-of-nature/ocean-waves.wav'
  },
  {
    id: '5',
    title: 'Solar Flare',
    artist: 'Cosmic Travelers',
    album: 'Space Odyssey',
    duration: 289,
    coverUrl: 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds-of-nature/rain-1.wav'
  },
  {
    id: '6',
    title: 'Digital Rain',
    artist: 'Cyber Dreams',
    album: 'Matrix',
    duration: 234,
    coverUrl: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=400',
    audioUrl: 'https://www.soundjay.com/misc/sounds-of-nature/thunder-1.wav'
  }
];

export const samplePlaylists: Playlist[] = [
  {
    id: 'p1',
    name: 'Chill Vibes',
    songs: [sampleSongs[0], sampleSongs[3], sampleSongs[4]],
    coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'p2',
    name: 'Electronic Mix',
    songs: [sampleSongs[1], sampleSongs[2], sampleSongs[5]],
    coverUrl: 'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'p3',
    name: 'All Songs',
    songs: sampleSongs,
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];