"use client";

import React from "react";
import { useEffect, useState } from "react";

interface Actor {
  name: string;
  biography: string;
  birthDate: string;
}

interface Video {
  title: string;
  description: string;
  duration: number;
  genre: string;
  releaseDate: string;
  maturityRating: string;
  actors: Actor[];
}

const VideoDetails = () => {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("string"); // Use a video title here

  useEffect(() => {
    if (!title) return; // Avoid fetching if title is empty

    // Fetch video details from the API using the title
    fetch(`https://localhost:7230/api/videos/title/${title}`)
      .then((response) => response.json())
      .then((data) => {
        setVideo(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching video details:", error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, [title]); // Re-run the effect if title changes

  if (loading) return <div>Loading...</div>;

  if (!video) return <div>Video not found</div>;

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "black",
        color: "orange",
        borderRadius: "8px",
      }}
    >
      <h1>{video.title}</h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "10px", border: "1px solid orange" }}>Attribute</th>
            <th style={{ padding: "10px", border: "1px solid orange" }}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "10px", border: "1px solid orange" }}>Description</td>
            <td style={{ padding: "10px", border: "1px solid orange" }}>{video.description}</td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid orange" }}>Duration</td>
            <td style={{ padding: "10px", border: "1px solid orange" }}>{video.duration} seconds</td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid orange" }}>Genre</td>
            <td style={{ padding: "10px", border: "1px solid orange" }}>{video.genre}</td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid orange" }}>Release Date</td>
            <td style={{ padding: "10px", border: "1px solid orange" }}>
              {new Date(video.releaseDate).toLocaleDateString()}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid orange" }}>Maturity Rating</td>
            <td style={{ padding: "10px", border: "1px solid orange" }}>{video.maturityRating}</td>
          </tr>
        </tbody>
      </table>

      <h2 style={{ marginTop: "20px" }}>Actors:</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "10px", border: "1px solid orange" }}>Actor Name</th>
            <th style={{ padding: "10px", border: "1px solid orange" }}>Biography</th>
            <th style={{ padding: "10px", border: "1px solid orange" }}>Birth Date</th>
          </tr>
        </thead>
        <tbody>
          {video.actors.map((actor, index) => (
            <tr key={index}>
              <td style={{ padding: "10px", border: "1px solid orange" }}>{actor.name}</td>
              <td style={{ padding: "10px", border: "1px solid orange" }}>{actor.biography}</td>
              <td style={{ padding: "10px", border: "1px solid orange" }}>
                {new Date(actor.birthDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VideoDetails;
