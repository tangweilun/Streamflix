"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoPlayerProps {
  src: string;
}

export function VideoPlayer({ src }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const togglePlay = () => {
    console.log("0");
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        console.log("1");
      } else {
        videoRef.current.play();
        console.log("2");
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeChange = (newTime: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newTime[0];
      setCurrentTime(newTime[0]);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume[0];
      setVolume(newVolume[0]);
      setIsMuted(newVolume[0] === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);

      if (isMuted) {
        videoRef.current.volume = volume;
      } else {
        setVolume(videoRef.current.volume);
        videoRef.current.volume = 0;
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden">
      <video ref={videoRef} src={src} className="w-full" />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={handleTimeChange}
          className="mb-4"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={togglePlay}
              className="text-orange-500 hover:text-orange-600"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleMute}
              className="text-orange-500 hover:text-orange-600"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
