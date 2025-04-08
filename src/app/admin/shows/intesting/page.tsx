"use client";

import React from 'react';
import { useState } from 'react';

export default function CreateVideoForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [maturityRating, setMaturityRating] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genre, setGenre] = useState('');
  const [actors, setActors] = useState([{ name: '', biography: '', birthDate: '' }]); // Sample actor array

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const videoData = {
      title,
      description,
      duration,
      maturityRating,
      releaseDate,
      genre,
      actors,
      thumbnailUrl: '',  // Empty string for thumbnail
      contentUrl: ''     // Empty string for content URL
    };

    try {
      const response = await fetch('https://localhost:7230/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(videoData),
      });

      if (!response.ok) {
        throw new Error('Failed to create video');
      }

      const result = await response.json();
      console.log('Video Created:', result);
      alert('Video created successfully!');
    } catch (error) {
      console.error(error);
      alert('Error creating video');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: 'black', padding: '20px' }}>
      <h1 style={{ color: 'white' }}>Create Video</h1>
      <label style={{ color: 'white' }}>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />

      <label style={{ color: 'white' }}>Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <br />

      <label style={{ color: 'white' }}>Duration:</label>
      <input
        type="text"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      />
      <br />

      <label style={{ color: 'white' }}>Maturity Rating:</label>
      <input
        type="text"
        value={maturityRating}
        onChange={(e) => setMaturityRating(e.target.value)}
        required
      />
      <br />

      <label style={{ color: 'white' }}>Release Date:</label>
      <input
        type="datetime-local"
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
        required
      />
      <br />

      <label style={{ color: 'white' }}>Genre:</label>
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        required
      />
      <br />

      <label style={{ color: 'white' }}>Actors:</label>
      {actors.map((actor, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Actor Name"
            value={actor.name}
            onChange={(e) => {
              const newActors = [...actors];
              newActors[index].name = e.target.value;
              setActors(newActors);
            }}
          />
          <input
            type="text"
            placeholder="Actor Biography"
            value={actor.biography}
            onChange={(e) => {
              const newActors = [...actors];
              newActors[index].biography = e.target.value;
              setActors(newActors);
            }}
          />
          <input
            type="date"
            placeholder="Actor Birth Date"
            value={actor.birthDate}
            onChange={(e) => {
              const newActors = [...actors];
              newActors[index].birthDate = e.target.value;
              setActors(newActors);
            }}
          />
        </div>
      ))}
      <br />

      <button type="submit" style={{ backgroundColor: 'white', color: 'black' }}>
        Create Video
      </button>
    </form>
  );
}
