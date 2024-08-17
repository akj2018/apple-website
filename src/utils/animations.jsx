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
