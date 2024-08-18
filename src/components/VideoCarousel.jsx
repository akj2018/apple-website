import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { handleCarouselProcess } from "../utils/funtions";

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  // Keep tracking of video references
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);

  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  const handleLoadedMetadata = (index, event) =>
    setLoadedData((prevLoadedData) => [...prevLoadedData, event]);

  // Animation to chnage the state and move the video id in view point at scroll trigger
  useGSAP(() => {
    // Animate the video to play whenever it is in the view
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      ease: "power1.inOut",
      onComplete: () => {
        // Once the scroll trigger is complete, run this callback
        console.log("Animation Complete");
        setVideo((prevVideo) => ({
          ...prevVideo,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });

    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 1,
      ease: "power2.inOut",
    });
    console.log(document.querySelector("#slider"));
    console.log(videoId);
  }, [isEnd, videoId]);

  // Deals with playing of the video
  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }

    console.log(loadedData);
  }, [startPlay, videoId, isPlaying, loadedData]);

  // Animation to update the progress bar of the video
  useEffect(() => {
    // video progress reference
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // animate progress of the video

      gsap.to(videoDivRef.current[videoId], {
        width:
          window.innerWidth < 760
            ? "10vw"
            : window.innerWidth < 1200
            ? "10vw"
            : "4vw",
      });

      // Animating the pointer of video currently running
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const currentProgress = Math.ceil(anim.progress() * 100);

          gsap.to(span[videoId], {
            width: `${currentProgress}%`,
            backgroundColor: "white",
          });
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });

            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId === 0) {
        anim.restart();
      }

      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  const handleProcess = (type, index = 0) =>
    handleCarouselProcess(type, index, setVideo);

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((item, index) => (
          <div key={item.id} id="slider" className="sm:pr-20 pr-10">
            {/* Container to hold video and text with size */}
            <div className="video-carousel_container">
              {/* Video */}
              <div className="w-full h-full bg-black rounded-3xl overflow-hidden flex-center">
                <video
                  id="video"
                  className={`${
                    item.id === 2 && "translate-x-44"
                  } pointer-events-none`}
                  playsInline
                  muted
                  preload="auto"
                  ref={(el) => (videoRef.current[index] = el)}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                  onLoadedMetadata={(event) =>
                    handleLoadedMetadata(index, event)
                  }
                  onEnded={() => {
                    console.log(videoId);
                    return index !== 3
                      ? handleProcess("video-end", index)
                      : handleProcess("video-last");
                  }}
                >
                  <source src={item.video} type="video/mp4" />
                </video>
              </div>
              {/* Text */}
              <div className="absolute top-12 left-[5%] z-10">
                {item.textLists.map((textItem, index) => (
                  <p key={index} className="md:text-2xl text-xl font-medium">
                    {textItem}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-center relative mt-10">
        {/* animated pointers */}
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, index) => (
            <span
              key={index}
              ref={(el) => (videoDivRef.current[index] = el)}
              className="mx-2 bg-gray-200 w-3 h-3 rounded-full cursor-pointer relative"
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[index] = el)}
              ></span>
            </span>
          ))}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
        {/* Play/Pause Btn */}
      </div>
    </>
  );
};

export default VideoCarousel;
