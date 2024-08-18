import { useGSAP } from "@gsap/react";
import { chipImg } from "../utils";
import gsap from "gsap/all";

const Chip = () => {
  useGSAP(() => {
    gsap.from("#chip", {
      scale: 2,
      opacity: 0,
      duration: 2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#chip",
        start: "20% bottom",
      },
    });
  }, []);

  return (
    <section className="h-full w-full common-padding overflow-hidden">
      <div className="screen-max-width">
        <div id="chip" className="flex-center w-full my-20">
          <img src={chipImg} alt="chip" width={180} height={180} />
        </div>
      </div>
    </section>
  );
};

export default Chip;
