import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { useState, useRef, useEffect } from "react";
import { yellowImg } from "../utils";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animateWithGsapTimeline } from "../utils/animations";

import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const Model = () => {
  // To track which model user clicked (6.1 or 6.7)
  const [size, setSize] = useState("small");

  // Store Model Details rendered on the page
  const [model, setModel] = useState({
    id: 1,
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  // Ref to access camera control
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  //Ref to track model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // track rotation value of each model
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = gsap.timeline();

  useEffect(() => {
    if (size === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 1,
      });
    }

    if (size === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 1,
      });
    }
  }, [size]);

  useGSAP(() => {
    gsap.to("#heading", {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "#heading",
        start: "top 85%",
        end: "top 30%",
        scrub: true,
      },
      ease: "power1.inOut",
    });
  }, []);

  const sliderClickHander = (btnType) => {
    if (btnType === "large") {
      gsap.to("#slider-icon", {
        left: "46%",
        duration: 0.5,
        ease: "power1.inOut",
      });
    }

    if (btnType === "small") {
      gsap.to("#slider-icon", {
        left: "0%",
        duration: 0.5,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="w-full mx-auto">
            <p className="text font-medium text-center mb-5 transition-all">
              {model.title}
            </p>

            <div className="flex-center">
              {/* Color Pallete */}
              <ul className="color-container">
                {models.map((item, index) => (
                  <li
                    key={index}
                    className={`w-7 h-7 rounded-full mx-2 cursor-pointer transition-all color-icon-box-shadow ${
                      model.id === item.id ? "selected-color-outlined" : ""
                    }`}
                    style={{
                      backgroundColor: item.color[0],
                    }}
                    onClick={() => setModel(item)}
                  ></li>
                ))}
              </ul>

              {/* Size Button */}
              <button className="size-btn-container relative">
                {sizes.map((sizeOption) => (
                  <span
                    key={sizeOption.label}
                    className="size-btn"
                    style={{
                      color: size === sizeOption.value ? "black" : "white",
                    }}
                    onClick={() => {
                      sliderClickHander(sizeOption.value);
                      setSize(sizeOption.value);
                    }}
                  >
                    {sizeOption.label}
                  </span>
                ))}
                <span
                  id="slider-icon"
                  className="w-12 h-12 bg-white rounded-full absolute left-0 -z-10 m-2"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
