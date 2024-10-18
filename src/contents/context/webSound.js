import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "../../assets/css/audioPlayer.css";
import Lottie from "lottie-react";
import audioAnimation from "../../assets/lottie/lottie_audio_animation_shoorah.json";
import playBtn from "../../assets/audiosvg/ic_play.svg";
import pauseBtn from "../../assets/audiosvg/ic_pause.svg";
import voice from "../../assets/audiosvg/ic_voice.svg";
import shoorah from "../../assets/audio/shoorah.mp3";
import shoorahImage from "../../assets/audio/soundImages/shoorah.jpg";

import { useTheme } from "./themeContext";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

export const WebSoundContext = createContext();

export function useWebSound() {
  return useContext(WebSoundContext);
}

export function WebSoundProvider({ children }) {
  const [audio, setAudio] = useState({
    name: "Shoorah",
    sound: shoorah,
    image: shoorahImage,
  });

  const [isWidget, setWidget] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [themePage, setThemePage] = useState(false);
  const volumeRef = useRef();
  const [volume, setVolume] = useState(50);

  const SoundBar = (sound) => {
    const [currentTrack, setTrack] = useState(audio?.sound);
    const { theme } = useTheme();
    const audioRef = useRef();
    const location = useLocation();
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const playAnimationRef = useRef();
    const progressBarRef = useRef({});

    const handleProgressChange = () => {
      audioRef.current.currentTime = progressBarRef.current?.value;
    };

    const repeat = useCallback(() => {
      const currentTime = audioRef.current?.currentTime;
      setTimeProgress(currentTime);
      if(progressBarRef.current){
        progressBarRef.current.value = currentTime;
        progressBarRef.current?.style.setProperty(
          "--range-progress",
          `${(progressBarRef.current?.value / duration) * 100}%`,
        );
        progressBarRef.current?.style.setProperty(
          "--border-color",
          `${`${theme.shoorah_5}`}`,
        );

      }

      playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, duration, progressBarRef, setTimeProgress]);

    const onLoadedMetadata = () => {
      const seconds = audioRef.current?.duration;
      setDuration(seconds);
      progressBarRef.current.max = seconds;
    };

    useEffect(() => {
      if (audioRef) {
        audioRef.current.volume = volume / 100;
      }
    }, [volume, audioRef]);

    // useEffect(() => {
    //     setIsPlaying(true);
    // }, []);

    useEffect(() => {
      if (isPlaying) {
        audioRef.current?.play();
        playAnimationRef.current = requestAnimationFrame(repeat);
      } else {
        audioRef.current?.pause();
        cancelAnimationFrame(playAnimationRef.current);
      }
    }, [isPlaying, audioRef, repeat]);

    return (
      <div
        ref={progressBarRef}
        className={`z-10 ${
          window.location.pathname == "/personalize"
            ? themePage && `hidden`
            : "hidden"
        } half-border fixed mt-[1rem] flex w-[100%] items-center justify-between ${
          isWidget ? `h-[6rem]` : `h-[4rem]`
        } ${theme.audioBar1} bottom-0 left-0 `}
      >
        <div className="relative flex h-full w-full items-center justify-between">
          <audio
            ref={audioRef}
            src={currentTrack}
            autoPlay={true}
            loop={true}
            onLoadedMetadata={onLoadedMetadata}
          />

          <div className="absolute inset-y-0 top-[-5rem] ml-[0.3rem] flex w-full justify-center text-white">
            <div className="controls-wrapper">
              <div className="controls flex items-center justify-center gap-[3rem]">
                <div onClick={() => setIsPlaying(!isPlaying)}>
                  <div
                    // style={{ boxShadow: `3px 3px 36px 9px ${theme.shoorah_7}` }}
                    className={`flex h-16 w-16  cursor-pointer items-center justify-center rounded-full lg:h-[4.5rem] lg:w-[4.5rem] ${theme.shoorah_bg_5} text-white`}
                  >
                    {isPlaying ? (
                      <img src={pauseBtn} className="h-[2rem] w-[2rem]" />
                    ) : (
                      <img src={playBtn} className="h-[2rem] w-[2rem]" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 ml-[0.3rem] flex w-full justify-center  text-white ">
            <div className="controls-wrapper">
              <div className="controls flex items-center justify-center gap-[3rem]">
                <div onClick={() => setIsPlaying(!isPlaying)}>
                  <div className="${theme.shoorah_bg_5} flex h-[4.5rem] w-[4.5rem] cursor-pointer items-center justify-center rounded-full text-white">
                    {isPlaying ? (
                      <Lottie animationData={audioAnimation} />
                    ) : (
                      <img src={voice} className="mx-auto h-full w-full" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <WebSoundContext.Provider
      value={{
        volume,
        setVolume,
        volumeRef,
        setThemePage,
        SoundBar,
        setAudio,
        audio,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </WebSoundContext.Provider>
  );
}
