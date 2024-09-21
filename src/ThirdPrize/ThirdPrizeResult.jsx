import React, { useState, useEffect } from "react";
import SlotMechine from "../slotMechine/SlotMechine";
import FourthPrizeHome from "../FourthPrice/FourthPrizeHome";
const audio = new Audio(
  require("../../src/assets/bicycle-wheel-spinning-49716-[AudioTrimmer.com].mp3")
);

const ThirdPrizeResult = ({ setLiveDraw, resultData, setPrizePosition }) => {
  const [status, setStatus] = useState(true);

  useEffect(() => {
    setLiveDraw(true);
    setPrizePosition("3rd")
  }, [setLiveDraw, setPrizePosition]);

  useEffect(() => {
    audio.play();

    const stopAudio = setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 9500);

    const changeStatus = setTimeout(() => {
      setStatus(false);
    }, 12500);

    return () => {
      clearTimeout(stopAudio);
      clearTimeout(changeStatus);
      audio.pause();
    };
  }, []);

  return status ? (
    <div className="second_result">
      <div className="bg-black h-[79vh] border-l-2 ">
        <div className="third_inner">
          {resultData &&
            resultData.map((endval, index) => {
              return (
                <div className="slot_machines_third" key={index}>
                  <SlotMechine
                    duration={10}
                    endNumbers={endval}
                    setvalueStart
                    rotate
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  ) : (
    <FourthPrizeHome setLiveDraw={setLiveDraw} setPrizePosition={setPrizePosition} />
  );
};

export default ThirdPrizeResult;
