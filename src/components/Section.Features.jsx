import { useGSAP } from "@gsap/react";
import { animateWithGsapScrollTrigger } from "../utils/animations";
import { explore1Img, explore2Img, exploreVideo } from "../utils";
import { useRef } from "react";
import gsap from "gsap";

const Features = () => {
  const videoRef = useRef();

  useGSAP(() => {
    animateWithGsapScrollTrigger(
      "#features-title",
      { opacity: 1, y: 0, duration: 1, ease: "power1.inOut" },
      { start: "top 90%", end: "top 10%", scrub: true }
    );

    gsap.to("#exploreVideo", {
      scrollTrigger: {
        trigger: "#exploreVideo",
        toggleActions: "play pause reverse restart",
        start: "-10% bottom",
      },
      onComplete: () => {
        videoRef.current.play();
      },
    });

    animateWithGsapScrollTrigger(
      ".animate-features-img",
      { opacity: 1, scale: 1, ease: "power1.inOut", duration: 1 },
      { start: "top 90%", end: "top top", scrub: true }
    );

    animateWithGsapScrollTrigger(
      ".animate-features-text",
      {
        opacity: 1,
        y: 0,
        ease: "power2.inOut",
        duration: 0.5,
        stagger: 0.1,
      },
      {
        start: "top 90%",
        toggleActions: "restart reverse restart reverse",
      }
    );
  }, []);

  return (
    <section className="h-full w-full common-padding bg-zinc overflow-hidden">
      <div className="screen-max-width">
        {/* Section Title */}
        <h1 className="section-heading mb-12 w-full" id="features-title">
          Explore the full story.
        </h1>

        <div className="flex flex-col justify-start items-center overflow-hidden">
          {/* Big Text */}
          <div className="mt-32 mb-24 pl-24">
            <h2 className="text-5xl lg:text-7xl font-semibold">iPhone</h2>
            <h2 className="text-5xl lg:text-7xl font-semibold">
              Forged in titanium
            </h2>
          </div>

          {/* Grid holding videos */}
          <div className="flex-center flex-col sm:px-10">
            {/* First Video on top */}
            <div className="w-full h-[50vh] relative flex items-center">
              <video
                id="exploreVideo"
                className="w-full h-full object-cover object-center"
                ref={videoRef}
                muted
                playsInline
                autoPlay
                preload="none"
              >
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>

            {/* Remaining Two Images */}
            <div className="feature-video-container">
              <div className="overflow-hidden flex-1 h-[50vh]">
                <img
                  src={explore1Img}
                  alt="titanium1"
                  className="feature-video animate-features-img"
                />
              </div>
              <div className="overflow-hidden flex-1 h-[50vh]">
                <img
                  src={explore2Img}
                  alt="titanium2"
                  className="feature-video animate-features-img"
                />
              </div>
            </div>

            {/* Text Container */}
            <div className="feature-text-container">
              {/* Text 1 */}
              <div className="flex-1 flex-center">
                <p className="feature-text animate-features-text">
                  iPhone 15 pro is{" "}
                  <span className="text-white">
                    the first iPhone to feature an aerospace-grade titanium
                    design
                  </span>
                  , using the same allow that spacecrafts use for the missions
                  to Mars.
                </p>
              </div>

              {/* Text 2 */}
              <div className="flex-1 flex-center">
                <p className="feature-text animate-features-text">
                  Titanium has one of the best strength-to-weight ration of any
                  mental, making these our{" "}
                  <span className="text-white">lightest Pro models ever.</span>
                  You'll notice the difference the moment you pick one up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
