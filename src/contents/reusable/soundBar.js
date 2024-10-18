import React, { useCallback, useEffect, useRef, useState } from "react";
import sound from "../../assets/audio/shoorah.mp3";
import "../../assets/css/audioPlayer.css";
import Lottie from "lottie-react";
import audioAnimation from "../../assets/lottie/lottie_audio_animation_shoorah.json";
import playBtn from "../../assets/audiosvg/ic_play.svg";
import pauseBtn from "../../assets/audiosvg/ic_pause.svg";
import nextBtn from "../../assets/audiosvg/ic_next.svg";
import prevBtn from "../../assets/audiosvg/ic_previous.svg";
import repeatBtn from "../../assets/audiosvg/ic_repeat.svg";
import shuffleBtn from "../../assets/audiosvg/ic_shuffle.svg";
import voice from "../../assets/audiosvg/ic_voice.svg";
import { useTheme } from "../context/themeContext";
import { errorToast, successToast, useOutsideClick } from "../../utils/helper";
import { Api } from "../../api";
import { useAudio } from "../context/audiobar";

const track = [
  {
    title: "Shoorah",
    src: sound,
    author: "Shoorah",
  },
];

const SoundBar = ({ sound, currentAudioTime }) => {
  const [currentTrack, setTrack] = useState(sound);
  const [isPlaying, setIsPlaying] = useState(false);
  const { theme } = useTheme();
  const audioRef = useRef();
  const progressBarRef = useRef();
  const volumeRef = useRef();
  const [bookmarks, setBookmarks] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [currentBookmark, setCurrentBookmark] = useState(null);

  const [volume, setVolume] = useState(50);
  const [volumeModal, setVolumeModal] = useState(false);

  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const playAnimationRef = useRef();
  const { audioNav, setCurrentime, setAudioNav, setAudio, audio } = useAudio();

  useEffect(() => {
    setAudio(sound);
    setAudioNav(true);
  }, [sound]);

  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    if (currentAudioTime) {
      setTimeProgress(currentTime);
    }
    setCurrentime(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`,
    );
    progressBarRef.current.style.setProperty(
      "--border-color",
      `${theme.shoorah_6}`,
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, volumeRef, setTimeProgress]);

  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  const skipForward = () => {
    audioRef.current.currentTime += 15;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 15;
  };

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  useOutsideClick(volumeRef, () => {
    if (volumeModal) setVolumeModal(false);
  });

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      playAnimationRef.current = requestAnimationFrame(repeat);
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(playAnimationRef.current);
    }
  }, [isPlaying, audioRef, repeat]);

  useEffect(() => {
    getBookmarks();
  }, [refresh]);

  useEffect(() => {
    currentPlayingSound();
  }, [refresh, bookmarks]);

  const currentPlayingSound = () => {
    if (bookmarks.length) {
      const song = bookmarks.find((i) => {
        return i.contentId == sound.contentId;
      });
      setCurrentBookmark(song);
    }
  };

  const getBookmarks = () => {
    Api.getAllMyBookmarks(1, 50)
      .then((res) => {
        setBookmarks(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const bookmarkClick = () => {
    const payload = {
      contentId: sound.contentId,
      contentType: sound.contentType,
    };
    Api.saveToBookmarks(payload)
      .then((res) => {
        if (res.data.meta.code == 1) {
          successToast(`Added to Bookmarks`);
          setRefresh(refresh + 1);
        } else if (res.data.meta.code == 0) {
          Api.removeMyBookmark(sound.contentId).then((res) => {
            successToast(`Removed from Bookmarks`);
            setRefresh(refresh + 1);
          });
        } else {
          errorToast(`Something error occured`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      ref={progressBarRef}
      className={`half-border fixed bottom-0 left-0 z-40 flex h-[4rem] w-[100%] items-center justify-between ${theme.audioBar1}`}
    >
      <div className="relative flex h-full w-full items-center justify-between">
        <div className="absolute inset-y-0 top-[-5rem] ml-[0.3rem] flex w-full justify-center text-white">
          <div className="controls-wrapper">
            <div className="controls flex items-center justify-center gap-[3rem]">
              <div
                onClick={skipBackward}
                className="h-[2rem]  w-[2rem] cursor-pointer"
              >
                <img src={shuffleBtn} className="h-full w-full" />
              </div>

              <div
                onClick={skipBackward}
                className="mr-[2.5rem] h-[2rem] w-[2rem] cursor-pointer"
              >
                <img src={prevBtn} className="h-full w-full" />
              </div>

              <div onClick={() => setIsPlaying(!isPlaying)}>
                <div
                  style={{ boxShadow: `3px 3px 36px 9px ${theme.shoorah_7}` }}
                  className={`flex h-[4.5rem] w-[4.5rem] cursor-pointer items-center justify-center rounded-full ${theme.shoorah_bg_5} text-white`}
                >
                  {isPlaying ? (
                    <img src={pauseBtn} className="h-[2rem] w-[2rem]" />
                  ) : (
                    <img src={playBtn} className="h-[2rem] w-[2rem]" />
                  )}
                </div>
              </div>
              <div
                onClick={skipForward}
                className="ml-[2.5rem] h-[2rem] w-[2rem] cursor-pointer"
              >
                <img src={nextBtn} className="h-full w-full" />
              </div>

              <div
                onClick={skipForward}
                className="h-[2rem] w-[2rem] cursor-pointer"
              >
                <img src={repeatBtn} className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-[5rem] ml-[0.3rem] flex w-full justify-center text-white">
          <button className="bg-red rounded-3xl text-white"></button>
        </div>

        <div className="relative">
          <div
            onClick={() => {
              setVolumeModal(!volumeModal);
            }}
            className={`ml-5 cursor-pointer rounded-full bg-[#fff] p-1 text-white ${theme.shoorah_border_5} border`}
          >
            <svg
              version="1.2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 22"
              fill="#fff"
              width="20"
              height="20"
            >
              <defs>
                <image
                  width="24"
                  height="22"
                  id="img1"
                  href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAMAAADto6y6AAAAAXNSR0IB2cksfwAAANhQTFRFOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerOkerCYVyyAAAAEh0Uk5TAAcyFDbl//lkE/qM5xq3cW1XAzhZfdesAVBgnD/f9IgF4lou9o83Ck5wJO/yGbFKQGj10Hc7IvGhgLqvL4s0wv4GkjC2hqsC3zahlQAAAMFJREFUeJx1UuUawjAQy5AbNlyGjA13d3d4/zeiY4KM5s/1ku/LtbkCNgSXG//g8ZLo+8P7vYFgSJQcvBCmCKIU+yLjiWQqTRkZWcqxVs7nDL6gEFFR1cCEKOu1EpV1vlIVa7F6Qz82qaWXdqfbY6VPA8tzaAgYkcocxxO8hSlm4TmEhQJItPwQVsxuDWzIjS3tbGHPBByOJ5zpggpP4Fo5hl/N4dzr8h9oRnJzRGKFeLdCfFgh8mN/gbco/mp/P8MTsEYXZHCjBiAAAAAASUVORK5CYII="
                />
              </defs>
              <style></style>
              <use href="#img1" x="0" y="0" />
            </svg>
          </div>
          {volumeModal && (
            <div className=" absolute left-[1.2rem] top-[-11rem] z-40 cursor-pointer">
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                orient="vertical"
                ref={volumeRef}
                onChange={(e) => setVolume(e.target.value)}
                className="cursor-pointer"
              />
            </div>
          )}
        </div>

        <audio
          ref={audioRef}
          src={currentTrack.url}
          onLoadedMetadata={onLoadedMetadata}
        />

        <div className="progress flex items-center justify-center gap-5">
          <span className="time current text-white">
            {formatTime(timeProgress)}
          </span>

          <div className="h-[4rem] w-[4rem]">
            {isPlaying ? (
              <Lottie animationData={audioAnimation} />
            ) : (
              <img src={voice} className="h-full w-full" />
            )}
          </div>
          <input
            type="range"
            id="audioProgress"
            ref={progressBarRef}
            defaultValue="0"
            className="hidden"
            onChange={handleProgressChange}
          />

          <span className="time text-white">{formatTime(duration)}</span>
        </div>

        <div
          onClick={() => bookmarkClick()}
          className=" z-40 mr-5 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill={`${currentBookmark ? `#fff` : `transparent`}`}
            stroke="#fff"
            strokeWidth="1.5"
            className="bi bi-bookmark-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SoundBar;
