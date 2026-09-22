"use client";

import { useEffect, useRef, useState } from "react";

const AUDIO_SRC = encodeURI(
  "/audio/Lain's Playlist for Walking to School - CloudStar Cinema.mp3",
);

export function AmbientAudioToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const userManuallyPaused = useRef(false);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    const onPlay = () => setEnabled(true);
    const onPause = () => setEnabled(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    // Attempt autoplay immediately once the page loads
    const attemptAutoplay = () => {
      if (userManuallyPaused.current) return;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setEnabled(true);
          })
          .catch(() => {
            // If browser autoplay policy blocks zero-interaction audio playback,
            // play immediately on the visitor's first page interaction.
            const startOnGesture = () => {
              if (userManuallyPaused.current) return;
              audio.play().catch(() => {});
            };

            const gestureEvents = ["pointerdown", "touchstart", "keydown", "click"];
            gestureEvents.forEach((event) => {
              window.addEventListener(event, startOnGesture, {
                once: true,
                passive: true,
              });
            });
          });
      }
    };

    attemptAutoplay();

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  async function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      userManuallyPaused.current = true;
      audio.pause();
      setEnabled(false);
    } else {
      userManuallyPaused.current = false;
      try {
        await audio.play();
        setEnabled(true);
      } catch (err) {
        console.error("Unable to play ambient audio:", err);
      }
    }
  }

  return (
    <button
      type="button"
      className="header-control"
      onClick={toggleAudio}
      aria-pressed={enabled}
      title={enabled ? "Mute ambient audio" : "Play ambient audio"}
    >
      sound {enabled ? "on" : "off"}
    </button>
  );
}

