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
import nextBtn from "../../assets/audiosvg/ic_next.svg";
import prevBtn from "../../assets/audiosvg/ic_previous.svg";
import repeatBtn from "../../assets/audiosvg/ic_repeat.svg";
import shuffleBtn from "../../assets/svg/playback.svg";
import voice from "../../assets/audiosvg/ic_voice.svg";
import { errorToast, successToast, useOutsideClick } from "../../utils/helper";
import { Api } from "../../api";
import { useTheme } from "./themeContext";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "../../component/common/Loader";

export const AudioContext = createContext();

export function useAudio() {
  return useContext(AudioContext);
}

export function AudioProvider({ children }) {
  const [audio, setAudio] = useState(null);
  const [audioNav, setAudioNav] = useState(false);
  const [theme, setTheme] = useState();
  const [currentAudioTime, setCurrentime] = useState(null);
  const [isWidget, setWidget] = useState(false);
  const [contentType, setContentType] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);

  const SoundBar = ({ sound, currentAudioTime }) => {
    const [currentTrack, setTrack] = useState(sound);
    const { theme } = useTheme();
    const audioRef = useRef();
    const progressBarRef = useRef();
    const volumeRef = useRef();
    const [loader, setLoader] = useState(false);
    const [bookmarks, setBookmarks] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const location = useLocation();
    const [isWidget, setWidget] = useState(false);
    const playbackRates = [0.5, 1, 1.5, 2];
    const [currentRateIndex, setCurrentRateIndex] = useState(1);

    const [currentBookmark, setCurrentBookmark] = useState(null);

    const [volume, setVolume] = useState(50);
    const [volumeModal, setVolumeModal] = useState(false);

    const [forRerender, setForRerender] = useState(0);

    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const playAnimationRef = useRef();
    const { audioNav, setCurrentime, setAudioNav, setAudio, audio } =
      useAudio();
    const [loop, setLoop] = useState(true);
    const [trend, setTrend] = useState(false);

    useEffect(() => {
      if (location.pathname.includes("/sound")) {
        setWidget(false);
      } else {
        setWidget(true);
      }
    }, [location.pathname]);

    useEffect(() => {
      setAudio(sound);
      setAudioNav(true);
    }, [sound]);

    const changePlaybackRate = () => {
      // Get the next playback rate from the array based on the current index.
      const nextRateIndex = (currentRateIndex + 1) % playbackRates.length;
      const newRate = playbackRates[nextRateIndex];

      // Set the new playback rate.
      audioRef.current.playbackRate = newRate;

      // Update the state to reflect the new rate and index.
      setCurrentRateIndex(nextRateIndex);
    };

    const handleProgressChange = () => {
      audioRef.current.currentTime = progressBarRef.current.value;

      console.log("Changed");
      setForRerender(forRerender + 1);
    };

    const repeat = useCallback(() => {
      const currentTime = audioRef?.current?.currentTime;
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime;
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(progressBarRef.current.value / duration) * 100}%`,
      );
      progressBarRef.current.style.setProperty(
        "--border-color",
        `${`${theme.shoorah_5}`}`,
      );

      playAnimationRef.current = requestAnimationFrame(repeat);
    }, [
      audioRef,
      isPlaying,
      duration,
      progressBarRef,
      volumeRef,
      setTimeProgress,
    ]);

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

    const repeatSong = () => {
      setLoop(!loop);
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

    const addToTrend = () => {
      let payload = {
        contentId: sound.contentId,
        contentType: parseInt(contentType),
        duration: duration,
        trendingDate: new Date().toISOString().split("T")[0],
      };
      Api.addToTrendings(payload)
        .then((res) => {
          if (res.data.meta.code == 1) {
            console.log("Success");
          } else {
            console.log("Fail");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(() => {
      setInterval(() => {
        setTrend(!trend);
      }, 10000);
    }, []);

    useEffect(() => {
      if (isPlaying) {
        addToTrend();
      }
    }, [trend]);

    useEffect(() => {}, [duration]);

    const getBookmarks = () => {
      Api.getAllMyBookmarks(1, 50)
        .then((res) => {
          setBookmarks(res.data.data);
        })
        .catch((err) => console.log(err));
    };

    const bookmarkClick = () => {
      setLoader(true);
      const payload = {
        contentId: sound.contentId,
        contentType: contentType,
      };

      Api.saveToBookmarks(payload)
        .then((res) => {
          if (res.data.meta.code == 1) {
            setLoader(false);
            successToast(`Added to Bookmarks`);
            setRefresh(refresh + 1);
          } else if (res.data.meta.code == 0) {
            Api.removeMyBookmark(sound.contentId).then((res) => {
              successToast(`Removed from Bookmarks`);
              setLoader(false);
              setRefresh(refresh + 1);
            });
          } else {
            setLoader(false);

            errorToast(`Something error occured`);
          }
        })
        .catch((err) => {
          setLoader(false);

          console.log(err);
        });
    };

    return (
      <div
        className={`half-border fixed z-40 flex w-[100%] items-center justify-between ${
          isWidget ? `h-[6rem]` : `h-[4rem]`
        } bottom-[13vh] left-0  ${theme.audioBar1} lg:bottom-0 `}
      >
        {loader && <Loader />}
        <div className="relative flex h-full w-full items-center justify-between ">
          <input
            step={1}
            onChange={(e) => {
              // setTimeProgress(formatTime(e.target.value))
              audioRef.current.currentTime = e.target.value;
            }}
            type="range"
            value={timeProgress}
            min={0}
            max={duration}
            className={`absolute ${theme.shoorah_bg_5} left-0 top-0 z-30 h-1 ${theme.shoorah_range_1}  w-screen appearance-none`}
          />
          <div className={`${isWidget ? `h-full w-full` : ``} flex gap-[3rem]`}>
            <div className="relative flex items-center justify-center lg:mt-[1rem]">
              <div
                onClick={() => {
                  setVolumeModal(!volumeModal);
                }}
                className={`z-10 ml-5 cursor-pointer rounded-full bg-[#fff] p-1 text-white ${theme.shoorah_border_5} border`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_487_11335)">
                    <path
                      d="M13.1787 7.4469C13.5563 7.78992 13.8218 8.31815 13.8218 9.00015C13.8218 9.68214 13.5563 10.2104 13.1787 10.5534"
                      stroke={theme.shoorah_7}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.0576 4.29504C16.2168 5.32296 17.0365 6.92406 17.0365 8.9999C17.0365 11.0757 16.2168 12.6768 15.0576 13.7047"
                      stroke={theme.shoorah_7}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.15305 7.01567C1.04438 7.63847 0.963867 8.33133 0.963867 9.00004C0.963867 9.66876 1.04438 10.3616 1.15305 10.9844C1.36176 12.1804 2.26417 13.1778 3.46612 13.3488C3.76341 13.3911 4.10939 13.4274 4.51714 13.4539C5.48909 13.5168 6.36752 14.0601 6.89096 14.8815C7.09603 15.2032 7.31276 15.5173 7.53684 15.8152C8.5438 17.1544 10.1137 16.3811 10.1822 14.7071C10.2393 13.3098 10.2853 11.4306 10.2853 9.00004C10.2853 6.5695 10.2393 4.69033 10.1822 3.29304C10.1137 1.61896 8.5438 0.84568 7.53684 2.18481C7.31276 2.48281 7.09603 2.79681 6.89096 3.11858C6.36752 3.93995 5.48909 4.48329 4.51714 4.54623C4.10939 4.57262 3.76341 4.60889 3.46612 4.65121C2.26417 4.82227 1.36176 5.81968 1.15305 7.01567Z"
                      stroke={theme.shoorah_7}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_487_11335">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              {volumeModal && (
                <div
                  className={` absolute ${
                    isWidget ? `top-[-9rem]` : `top-[-11rem]`
                  }  left-[1.9rem] z-40 cursor-pointer`}
                >
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

            {isWidget && (
              <div className="relative mr-[4rem] hidden h-full w-full items-center gap-[1rem] xl:flex">
                <div className="P22Mackinac flex flex-col gap-1 text-ellipsis whitespace-nowrap">
                  <span className="P22Mackinac w-[20rem] overflow-hidden !text-ellipsis text-2xl tracking-wider text-white">
                    {sound.contentName}
                  </span>
                  <span className="P22Mackinac text-sm text-white">
                    {sound.expertName}
                  </span>
                </div>

                <div className="P22Mackinac flex flex-col gap-1">
                  <span className="P22Mackinac text-sm tracking-wider text-white">
                    Description :
                  </span>
                  <span className="P22Mackinac text-sm text-white">
                    {sound.description}
                  </span>
                </div>
              </div>
            )}
          </div>

          {isWidget && (
            <div className="progress relative mr-[3.5rem] mt-[1rem] flex items-center justify-center gap-5">
              <div
                onClick={changePlaybackRate}
                className="relative flex justify-center items-center h-6 w-6 cursor-pointer  xl:h-[2rem] xl:w-[2rem]"
              >
                <img src={shuffleBtn} className="h-full w-full" />
                <span className="absolute top-[-20px] text-[13px] text-white">
                  {playbackRates[currentRateIndex]}x
                </span>
              </div>

              <div
                onClick={skipBackward}
                className=" relative h-[2rem]  w-[2rem] cursor-pointer"
              >
                <span className="time current absolute -left-8 top-[-2rem] text-sm text-white xl:left-[-0.5rem]">
                  {formatTime(timeProgress)}
                </span>

                <img src={prevBtn} className="h-full w-full" />
              </div>

              <div
                className="absolute top-[-6.5rem]"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <div
                  className={`flex h-[4.5rem] w-[4.5rem] cursor-pointer items-center justify-center rounded-full ${theme.shoorah_bg_5} text-white`}
                >
                  {isPlaying ? (
                    <img src={pauseBtn} className="h-[2rem] w-[2rem]" />
                  ) : (
                    <img src={playBtn} className="h-[2rem] w-[2rem]" />
                  )}
                </div>
              </div>

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

              <div
                onClick={skipForward}
                className="relative h-[2rem] w-[2rem] cursor-pointer"
              >
                <span className="time current absolute -right-8 top-[-2rem] text-sm text-white xl:right-[-0.5rem]">
                  {formatTime(duration)}
                </span>
                <img src={nextBtn} className="h-full w-full" />
              </div>

              <div
                onClick={() => {
                  setIsPlaying(false);
                  setAudioNav(false);
                }}
                className={`${theme.shoorah_bg_3} current  absolute -right-12 top-[-1rem] z-10 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-sm xl:right-[-1rem] ${theme.shoorah_text_7}`}
              >
                x
              </div>

              <div
                onClick={repeatSong}
                className=" h-[2rem] w-[2rem] cursor-pointer"
              >
                {/* <img src={repeatBtn} className='w-full h-full' /> */}

                <svg
                  className="h-full w-full"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.53143 15.7768C3.65942 16.1708 4.08254 16.3864 4.47648 16.2584C4.87042 16.1304 5.08601 15.7073 4.95801 15.3133L3.53143 15.7768ZM19.7553 15.5451L19.042 15.3133L19.7553 15.5451ZM16.5451 18.7553L16.3133 18.042L16.5451 18.7553ZM20.4686 8.22315C20.3406 7.82921 19.9175 7.61362 19.5235 7.74162C19.1296 7.86962 18.914 8.29274 19.042 8.68668L20.4686 8.22315ZM7.45492 5.24472L7.22315 4.53142L7.45492 5.24472ZM4.24472 8.45492L3.53142 8.22315L4.24472 8.45492ZM15.7803 2.46967C15.4874 2.17678 15.0126 2.17678 14.7197 2.46967C14.4268 2.76256 14.4268 3.23744 14.7197 3.53033L15.7803 2.46967ZM16.4757 4.2257L17.006 3.69537V3.69537L16.4757 4.2257ZM16.4088 5.70102L15.9286 5.12486H15.9286L16.4088 5.70102ZM14.5199 6.29883C14.2017 6.56401 14.1587 7.03693 14.4238 7.35514C14.689 7.67335 15.1619 7.71634 15.4801 7.45117L14.5199 6.29883ZM9.53033 17.5303C9.82322 17.2374 9.82322 16.7626 9.53033 16.4697C9.23744 16.1768 8.76256 16.1768 8.46967 16.4697L9.53033 17.5303ZM7.7743 18.2257L8.30464 18.756L7.7743 18.2257ZM7.84123 19.701L7.36109 20.2772L7.84123 19.701ZM8.76986 21.4512C9.08807 21.7163 9.56099 21.6733 9.82617 21.3551C10.0913 21.0369 10.0483 20.564 9.73014 20.2988L8.76986 21.4512ZM7.49493 18.768L6.75503 18.6453L7.49493 18.768ZM13 18.25H11V19.75H13V18.25ZM3.25 12C3.25 13.8029 3.24075 14.8822 3.53143 15.7768L4.95801 15.3133C4.75925 14.7016 4.75 13.9197 4.75 12H3.25ZM19.25 12C19.25 13.9197 19.2407 14.7016 19.042 15.3133L20.4686 15.7768C20.7593 14.8822 20.75 13.8029 20.75 12H19.25ZM13 19.75C14.8029 19.75 15.8822 19.7593 16.7768 19.4686L16.3133 18.042C15.7016 18.2407 14.9197 18.25 13 18.25V19.75ZM19.042 15.3133C18.6216 16.6072 17.6072 17.6216 16.3133 18.042L16.7768 19.4686C18.5274 18.8998 19.8998 17.5274 20.4686 15.7768L19.042 15.3133ZM20.75 12C20.75 10.1971 20.7593 9.11777 20.4686 8.22315L19.042 8.68668C19.2407 9.29839 19.25 10.0803 19.25 12H20.75ZM11 4.25C9.19709 4.25 8.11777 4.24075 7.22315 4.53142L7.68668 5.95801C8.29839 5.75925 9.08034 5.75 11 5.75V4.25ZM4.75 12C4.75 10.0803 4.75925 9.29839 4.95801 8.68668L3.53142 8.22315C3.24075 9.11777 3.25 10.1971 3.25 12H4.75ZM7.22315 4.53142C5.47263 5.1002 4.1002 6.47263 3.53142 8.22315L4.95801 8.68668C5.37841 7.39282 6.39282 6.37841 7.68668 5.95801L7.22315 4.53142ZM14.7197 3.53033L15.9454 4.75603L17.006 3.69537L15.7803 2.46967L14.7197 3.53033ZM15.9286 5.12486L14.5199 6.29883L15.4801 7.45117L16.8889 6.27719L15.9286 5.12486ZM8.46967 16.4697L7.24397 17.6954L8.30464 18.756L9.53033 17.5303L8.46967 16.4697ZM7.36109 20.2772L8.76986 21.4512L9.73014 20.2988L8.32137 19.1249L7.36109 20.2772ZM11 5.75H16.5V4.25H11V5.75ZM15.9454 4.75603C15.9988 4.8095 16.0228 4.87876 16.018 4.94973L17.5146 5.05027C17.5471 4.5677 17.3796 4.06894 17.006 3.69537L15.9454 4.75603ZM16.018 4.94973C16.0135 5.01658 15.9839 5.07881 15.9286 5.12486L16.8889 6.27719C17.2732 5.95697 17.4839 5.5078 17.5146 5.05027L16.018 4.94973ZM16.5 5.75H16.7663V4.25H16.5V5.75ZM7.24397 17.6954C6.97572 17.9636 6.81259 18.2982 6.75503 18.6453L8.23483 18.8907C8.24292 18.8419 8.26516 18.7955 8.30464 18.756L7.24397 17.6954ZM6.75503 18.6453C6.65774 19.2321 6.86232 19.8616 7.36109 20.2772L8.32137 19.1249C8.25098 19.0662 8.22036 18.978 8.23483 18.8907L6.75503 18.6453ZM11 18.25C9.11537 18.25 8.32761 18.2415 7.71758 18.0518L7.27228 19.4842C8.15477 19.7585 9.22771 19.75 11 19.75V18.25Z"
                    fill={loop ? theme.shoorah_2 : `#fff`}
                  />
                </svg>
              </div>
            </div>
          )}

          <audio
            ref={audioRef}
            src={currentTrack.url}
            loop={loop}
            onLoadedMetadata={onLoadedMetadata}
          />

          {!isWidget && (
            <div className="absolute inset-y-0 top-[-5rem] ml-[0.3rem] flex w-full justify-center text-white">
              <div className="controls-wrapper">
                <div className="controls flex items-center justify-center gap-6 xl:gap-[3rem]">
                  <div
                    onClick={changePlaybackRate}
                    className="relative flex justify-center items-center h-6 w-6 cursor-pointer  xl:h-[2rem] xl:w-[2rem]"
                  >
                    <img src={shuffleBtn} className="h-full w-full" />
                    <span className="absolute top-[-20px] flex text-[13px] text-white">
                      {playbackRates[currentRateIndex]}x
                    </span>
                  </div>

                  <div
                    onClick={skipBackward}
                    className="h-[2rem] w-[2rem] cursor-pointer xl:mr-[2.5rem]"
                  >
                    <img src={prevBtn} className="h-full w-full" />
                  </div>

                  <div onClick={() => setIsPlaying(!isPlaying)}>
                    <div
                      style={{
                        boxShadow: `3px 3px 36px 9px ${theme.shoorah_7}`,
                      }}
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
                    className="h-[2rem] w-[2rem] cursor-pointer xl:ml-[2.5rem]"
                  >
                    <img src={nextBtn} className="h-full w-full" />
                  </div>

                  <div
                    onClick={repeatSong}
                    className="h-[2rem] w-[2rem] cursor-pointer"
                  >
                    {/* <img src={repeatBtn} className={`w-full h-full`} /> */}
                    <svg
                      className="h-full w-full"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.53143 15.7768C3.65942 16.1708 4.08254 16.3864 4.47648 16.2584C4.87042 16.1304 5.08601 15.7073 4.95801 15.3133L3.53143 15.7768ZM19.7553 15.5451L19.042 15.3133L19.7553 15.5451ZM16.5451 18.7553L16.3133 18.042L16.5451 18.7553ZM20.4686 8.22315C20.3406 7.82921 19.9175 7.61362 19.5235 7.74162C19.1296 7.86962 18.914 8.29274 19.042 8.68668L20.4686 8.22315ZM7.45492 5.24472L7.22315 4.53142L7.45492 5.24472ZM4.24472 8.45492L3.53142 8.22315L4.24472 8.45492ZM15.7803 2.46967C15.4874 2.17678 15.0126 2.17678 14.7197 2.46967C14.4268 2.76256 14.4268 3.23744 14.7197 3.53033L15.7803 2.46967ZM16.4757 4.2257L17.006 3.69537V3.69537L16.4757 4.2257ZM16.4088 5.70102L15.9286 5.12486H15.9286L16.4088 5.70102ZM14.5199 6.29883C14.2017 6.56401 14.1587 7.03693 14.4238 7.35514C14.689 7.67335 15.1619 7.71634 15.4801 7.45117L14.5199 6.29883ZM9.53033 17.5303C9.82322 17.2374 9.82322 16.7626 9.53033 16.4697C9.23744 16.1768 8.76256 16.1768 8.46967 16.4697L9.53033 17.5303ZM7.7743 18.2257L8.30464 18.756L7.7743 18.2257ZM7.84123 19.701L7.36109 20.2772L7.84123 19.701ZM8.76986 21.4512C9.08807 21.7163 9.56099 21.6733 9.82617 21.3551C10.0913 21.0369 10.0483 20.564 9.73014 20.2988L8.76986 21.4512ZM7.49493 18.768L6.75503 18.6453L7.49493 18.768ZM13 18.25H11V19.75H13V18.25ZM3.25 12C3.25 13.8029 3.24075 14.8822 3.53143 15.7768L4.95801 15.3133C4.75925 14.7016 4.75 13.9197 4.75 12H3.25ZM19.25 12C19.25 13.9197 19.2407 14.7016 19.042 15.3133L20.4686 15.7768C20.7593 14.8822 20.75 13.8029 20.75 12H19.25ZM13 19.75C14.8029 19.75 15.8822 19.7593 16.7768 19.4686L16.3133 18.042C15.7016 18.2407 14.9197 18.25 13 18.25V19.75ZM19.042 15.3133C18.6216 16.6072 17.6072 17.6216 16.3133 18.042L16.7768 19.4686C18.5274 18.8998 19.8998 17.5274 20.4686 15.7768L19.042 15.3133ZM20.75 12C20.75 10.1971 20.7593 9.11777 20.4686 8.22315L19.042 8.68668C19.2407 9.29839 19.25 10.0803 19.25 12H20.75ZM11 4.25C9.19709 4.25 8.11777 4.24075 7.22315 4.53142L7.68668 5.95801C8.29839 5.75925 9.08034 5.75 11 5.75V4.25ZM4.75 12C4.75 10.0803 4.75925 9.29839 4.95801 8.68668L3.53142 8.22315C3.24075 9.11777 3.25 10.1971 3.25 12H4.75ZM7.22315 4.53142C5.47263 5.1002 4.1002 6.47263 3.53142 8.22315L4.95801 8.68668C5.37841 7.39282 6.39282 6.37841 7.68668 5.95801L7.22315 4.53142ZM14.7197 3.53033L15.9454 4.75603L17.006 3.69537L15.7803 2.46967L14.7197 3.53033ZM15.9286 5.12486L14.5199 6.29883L15.4801 7.45117L16.8889 6.27719L15.9286 5.12486ZM8.46967 16.4697L7.24397 17.6954L8.30464 18.756L9.53033 17.5303L8.46967 16.4697ZM7.36109 20.2772L8.76986 21.4512L9.73014 20.2988L8.32137 19.1249L7.36109 20.2772ZM11 5.75H16.5V4.25H11V5.75ZM15.9454 4.75603C15.9988 4.8095 16.0228 4.87876 16.018 4.94973L17.5146 5.05027C17.5471 4.5677 17.3796 4.06894 17.006 3.69537L15.9454 4.75603ZM16.018 4.94973C16.0135 5.01658 15.9839 5.07881 15.9286 5.12486L16.8889 6.27719C17.2732 5.95697 17.4839 5.5078 17.5146 5.05027L16.018 4.94973ZM16.5 5.75H16.7663V4.25H16.5V5.75ZM7.24397 17.6954C6.97572 17.9636 6.81259 18.2982 6.75503 18.6453L8.23483 18.8907C8.24292 18.8419 8.26516 18.7955 8.30464 18.756L7.24397 17.6954ZM6.75503 18.6453C6.65774 19.2321 6.86232 19.8616 7.36109 20.2772L8.32137 19.1249C8.25098 19.0662 8.22036 18.978 8.23483 18.8907L6.75503 18.6453ZM11 18.25C9.11537 18.25 8.32761 18.2415 7.71758 18.0518L7.27228 19.4842C8.15477 19.7585 9.22771 19.75 11 19.75V18.25Z"
                        fill={loop ? theme.shoorah_5 : `#fff`}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isWidget && (
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
          )}

          {!isWidget && (
            <div
              onClick={() => bookmarkClick()}
              className=" z-40 mr-5 cursor-pointer"
            >
              <svg
                viewBox="0 0 16 19"
                stroke="#fff"
                width="20"
                height="20"
                fill={`${currentBookmark ? `#fff` : `transparent`}`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.6574 17.2644C14.6099 17.9296 13.8109 18.2404 13.3263 17.7824L8.98146 13.6749C8.43076 13.1543 7.56936 13.1543 7.01866 13.6749L2.67386 17.7824C2.18933 18.2404 1.39024 17.9296 1.34274 17.2644C1.01994 12.7453 1.00633 8.2133 1.27447 3.69352C1.36248 2.21016 2.60458 1.07129 4.09054 1.07129H11.9096C13.3956 1.07129 14.6376 2.21016 14.7256 3.69352C14.9939 8.2133 14.9801 12.7453 14.6574 17.2644Z"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <AudioContext.Provider
      value={{
        setContentType,
        setIsPlaying,
        isWidget,
        setWidget,
        setTheme,
        SoundBar,
        currentAudioTime,
        setCurrentime,
        audio,
        setAudio,
        setAudioNav,
        audioNav,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
