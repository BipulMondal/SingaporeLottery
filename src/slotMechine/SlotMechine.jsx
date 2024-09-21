import React, { useState, useRef, useEffect, useCallback } from "react";
import "./slotMechine.css"; // Make sure to include the CSS here
import SlotCounter from "react-slot-counter";
// const audio = require("../../src/assets/wheel-spin-click-slow-down-101152.mp3");
const SlotMechine = ({ duration, endNumbers, rotate, fourth, slotWidth }) => {
  const [isspinn, setisSpinn] = useState(false);
  console.log("slotWidth", slotWidth);
  const counterRef = useRef(null);

  const startAnimation = useCallback(() => {
    // var audio1 = new Audio(audio);
    // audio1.play();

    setisSpinn(true);
    setTimeout(() => {
      // audio1.pause();
    }, duration * 1000);

    if (counterRef.current) {
      counterRef.current.startAnimation();
    }
  }, [duration]);

  useEffect(() => {
    if (rotate && endNumbers) startAnimation();
  }, [rotate, endNumbers, startAnimation]);

  const staticStartVal = [
    <span>0</span>,
    <span>0</span>,
    <span>0</span>,
    <span>0</span>,
    <span>0</span>,
  ];

  return (
    <>
      <div className="h-1 bg-white"></div>
      <div
        className={`h-[90px] ${fourth ? "w-[249px]" : "w-[290px]"} ${
          slotWidth ? "w-[50%]" : "w-[100%]"
        } bg-white flex flex-col justify-center item-center slot_machine_top`}
      >
        <div className="digits_dot">
          <hr className="dot" />
          <span>PXWELL</span>
          <span>PXWELL</span>
          <hr className="dot" />
        </div>
        <div className="bg-gray-300 w-[92%] mx-auto h-[200px] flex justify-center item-center p-[12px] slot_main_div">
          <div className="bg-gray-500 h-[43px] bg_gray_div">
            <SlotCounter
              ref={counterRef}
              startValue={staticStartVal}
              // value={isspinn && endValue ? endValue : staticStartVal}
              value={isspinn && endNumbers ? endNumbers : staticStartVal}
              animateUnchanged
              direction="bottom-up"
              autoAnimationStart={false}
              duration={duration}
            />
          </div>
        </div>
        <div className="digits_dot">
          <hr className="dot" />
          <span>HONG KONG LOTTERIES</span>
          <hr className="dot" />
        </div>
      </div>
    </>
  );
};

export default SlotMechine;
