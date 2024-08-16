import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { heroVideo, smallHeroVideo } from "../utils";
import { useState } from "react";
import { useEffect } from "react";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );

  const handleVideoSrc = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleVideoSrc);

    return () => {
      window.removeEventListener("resize", handleVideoSrc);
    };
  }, []);

  useGSAP(() => {
    gsap.to("#hero", {
      opacity: 1,
      delay: 2,
    });

    const ctaChildren = gsap.utils.toArray(
      document.getElementById("cta").childNodes
    );

    console.log(ctaChildren);

    gsap.to(ctaChildren, {
      opacity: 1,
      y: -20,
      delay: 2,
      stagger: 0.05,
    });
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="w-full h-full sm:h-5/6 lg:h-4/6 flex-center flex-col">
        <p id="hero" className="hero-title">
          iPhone 15 Pro
        </p>
        <div className="w-10/12 md:w-8/12 lg:w-7/12">
          <video
            autoPlay
            muted
            playsInline
            key={videoSrc}
            className="pointer-events-none"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Buy Button with Price */}
      <div id="cta" className="flex flex-col justify-center items-center gap-3">
        <a
          href="#highlights"
          className="btn font-semibold text-lg flex-1 opacity-0 translate-y-3"
        >
          Buy
        </a>
        <p className="font-normal text-xl opacity-0 translate-y-6">
          From $999 or $41.62/mo. for 24mo.{" "}
        </p>
      </div>
    </section>
  );
};

export default Hero;
