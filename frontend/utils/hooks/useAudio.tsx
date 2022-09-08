import React, { useState, useEffect } from "react";

const useAudio = (url?: string) => {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    if (audio) audio.play();
  }, [playing]);

  useEffect(() => {
    setAudio(new Audio(url));
  }, [url]);

  return toggle;
};

export default useAudio;
