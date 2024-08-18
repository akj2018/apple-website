export const handleCarouselProcess = (type, index, setVideo) => {
  switch (type) {
    // If a video ends
    case "video-end":
      setVideo((prevVideo) => ({
        ...prevVideo,
        isEnd: true,
        videoId: index + 1,
      }));
      break;

    // If the video is last video
    case "video-last":
      setVideo((prevVideo) => ({
        ...prevVideo,
        isLastVideo: true,
      }));
      break;

    // reset the videos
    case "video-reset":
      setVideo((prevVideo) => ({
        ...prevVideo,
        isLastVideo: false,
        videoId: 0,
      }));
      break;

    // Play the video
    case "play":
      setVideo((prevVideo) => ({
        ...prevVideo,
        isPlaying: !prevVideo.isPlaying,
      }));
      break;

    // Pause the video
    case "pause":
      setVideo((prevVideo) => ({
        ...prevVideo,
        isPlaying: !prevVideo.isPlaying,
      }));
      break;
    default:
      return video;
  }
};
