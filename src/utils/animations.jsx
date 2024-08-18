import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const animateWithGsapTimeline = (
  timeline,
  modelRef,
  rotationState,
  firstTarget,
  secondTarget,
  animationObj
) => {
  timeline.to(modelRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: "power2.inOut",
  });

  timeline.to(
    firstTarget,
    {
      ...animationObj,
      ease: "power2.inOut",
    },
    "<"
  );

  timeline.to(
    secondTarget,
    {
      ...animationObj,
      ease: "power2.inOut",
    },
    "<"
  );
};

export const animateWithGsapScrollTrigger = (
  target,
  animProps,
  scrollTriggerProps
) => {
  gsap.to(target, {
    ...animProps,
    scrollTrigger: {
      trigger: target,
      ...scrollTriggerProps,
    },
  });
};
