import { useGSAP } from "@gsap/react";
import { chipImg, frameImg, frameVideo } from "../utils";
import gsap from "gsap/all";
import { useRef } from "react";
import { animateWithGsapScrollTrigger } from "../utils/animations";

const Chip = () => {
  const videoRef = useRef();

  useGSAP(() => {
    gsap.from("#chip", {
      scale: 2,
      opacity: 0,
      duration: 2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#chip",
        toggleActions: "restart none none restart",
        start: "20% bottom",
      },
    });

    animateWithGsapScrollTrigger(
      ".animate-fadeIn",
      { opacity: 1, y: 0, ease: "power2.inOut", duration: 1 },
      { start: "top 90%", toggleActions: "restart reverse restart reverse" }
    );

    gsap.to("#chipVideo", {
      scrollTrigger: {
        trigger: "#chipVideo",
        start: "top 50%",
        toggleActions: "play pause resume restart",
      },
      onComplete: () => {
        videoRef.current.play();
      },
    });
  }, []);

  return (
    <section className="h-full w-full common-padding overflow-hidden">
      <div className="screen-max-width">
        {/* Chip Image */}
        <div id="chip" className="flex-center w-full my-20">
          <img src={chipImg} alt="chip" width={180} height={180} />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center">
          <h2 className="chip-title">A17 Pro chip.</h2>
          <h2 className="chip-title">A monster win for gaming.</h2>
          <p className="chip-subtitle">
            It’s here. The biggest redesign in the history of Apple GPUs.
          </p>
        </div>

        {/* Video inside iPhone */}
        <div className="mt-10 md:mt-20 flex-center relative h-full overflow-hidden">
          <img
            src={frameImg}
            alt="frame"
            className="bg-transparent relative z-10"
          />
          <div className="chip-video">
            <video
              id="chipVideo"
              className="pointer-events-none "
              playsInline
              autoPlay
              muted
              preload="none"
              ref={videoRef}
            >
              <source src={frameVideo} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Text below video - Game Name*/}
        <p className="text-gray text-center mt-3 mb-14 font-semibold">
          Honkai : Star Rail
        </p>

        {/* Text Container */}
        <div className="chip-text-container">
          {/* Text 1 */}
          <div className="flex-1 flex flex-col justify-start animate-fadeIn">
            <p className="chip-text">
              A17 Pro is an entirely new class of IPhone chip that delivers our{" "}
              <span className="text-white">
                best graphics performance by far
              </span>
            </p>

            <p className="chip-text my-6">
              Mobile{" "}
              <span className="text-white">
                games will look and feel so immersive
              </span>
              ,with incredibly detailed environments and more realistic
              characters. And with industry-leading speed and efficiency, A17
              Pro takes fast and runs with it.
            </p>
          </div>

          {/* Text 2 */}
          <div className="flex-1 flex flex-col justify-center animate-fadeIn ">
            <p className="chip-text">New</p>
            <p className="chip-bigtext ">Pro-class GPU</p>
            <p className="chip-text ">with 6 cores</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chip;
