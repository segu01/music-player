// src/components/Music.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Image = () => {
  const [musicImage, setMusicImage] = useState('');

  useEffect(() => {
    // Replace 'YOUR_UNSPLASH_API_KEY' with your Unsplash API key
    const apiKey = 'aH92DbS_YavNLp8OgBjax5S_6sf4EahoZjOyDtVPO1k';
    const url = `https://api.unsplash.com/photos/random/?query=music&client_id=${apiKey}`;

    axios.get(url)
      .then((response) => {
        setMusicImage(response.data.urls.regular);
      })
      .catch((error) => {
        console.error('Error fetching music image:', error);
      });
  }, []);

  return (
    <div>
      <img src={musicImage} alt="Music" className='musicCover' />
    </div>
  );
};

export default Image;
