import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { rightImg, watchImg } from "../utils";
import VideoCarousel from "./VideoCarousel";
import { ScrollTrigger } from "gsap/all";
import { animateWithGsapScrollTrigger } from "../utils/animations";

gsap.registerPlugin(ScrollTrigger);

const Highlights = () => {
  useGSAP(() => {
    animateWithGsapScrollTrigger(
      ".hero-item",
      { opacity: 1, duration: 1, y: 1, stagger: 0.15, ease: "power1.inOut" },
      { trigger: ".hero-item", start: "top 90%", end: "top 50%", scrub: true }
    );
  }, []);

  return (
    <section className="w-full h-full common-padding bg-zinc">
      <div className="screen-max-width">
        {/* Title + Links */}
        <div className="mb-12 w-full flex flex-col md:flex-row items-start md:items-end justify-between">
          <h1 id="title" className="hero-item section-heading">
            Get the highlights
          </h1>
          <div className="flex flex-col sm:flex-row items-end gap-2 sm:gap-5">
            <p className="link max-sm:text-[1.05rem] hero-item">
              Watch the film
              <img src={watchImg} alt="Watch" className="ml-2" />
            </p>
            <p className="link max-sm:text-[1.05rem] hero-item">
              Watch the event
              <img src={rightImg} alt="Event" className="ml-2" />
            </p>
          </div>
        </div>

        {/* Video Carousel */}
        <VideoCarousel></VideoCarousel>
      </div>
    </section>
  );
};

export default Highlights;
