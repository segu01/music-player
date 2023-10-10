// src/components/Song.js
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Image from './Image';

const Song = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const apiKey = 'f75d59fb5ebd5d94c1d28486a02c5ed0';
    const url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json`;

    axios.get(url)
      .then((response) => {
        const tracks = response.data.tracks.track.map((track) => ({
          name: track.name,
          artist: track.artist.name,
          url: track.url,
        }));
        setSongs(tracks);
      })
      .catch((error) => {
        console.error('Error fetching songs:', error);
      });
  }, []);

  useEffect(() => {
    if (songs.length > 0) {
      audioRef.current.src = songs[currentSongIndex].url;
      audioRef.current.load();
      audioRef.current.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  }, [currentSongIndex, songs]);

  const play = () => {
    audioRef.current.play().catch((error) => {
      console.error('Error playing audio:', error);
    });
  };

  const pause = () => {
    audioRef.current.pause();
  };

  const forward = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      // Loop back to the first song
      setCurrentSongIndex(0);
    }
  };

  const backward = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else {
      // Loop to the last song
      setCurrentSongIndex(songs.length - 1);
    }
  };

  return (
    <div className='component'>
      <h2 className='subtitle'>Music Player</h2>
      <Image />
      <div>
        <button onClick={backward}>Backward</button>
        <audio ref={audioRef} controls />
        <button onClick={forward}>Forward</button>
      </div>
    </div>
  );
};

export default Song;
