import React, { useEffect, useState } from "react";
import SlotMechine from "../slotMechine/SlotMechine";
import ThirdPrizeHome from "../ThirdPrize/ThirdPrizeHome";
// const audio = new Audio(
//   require("../../src/assets/bicycle-wheel-spinning-49716-[AudioTrimmer.com].mp3")
// );

const audio = new Audio(require("../assets/New folder/slot1.mpeg"))

const SecoundPrizeResult = ({ setLiveDraw, resultData, setPrizePosition }) => {
  const [status, setStatus] = useState(true);

  useEffect(() => {
    setLiveDraw(true);
    setPrizePosition("2nd")
  }, [setLiveDraw, setPrizePosition]);

  useEffect(() => {
    audio.play();
    const stopAudio = setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 6000);

    const changeStatus = setTimeout(() => {
      setStatus(false);
    }, 18000);

    return () => {
      clearTimeout(stopAudio);
      clearTimeout(changeStatus);
      audio.pause();
    };
  }, []);

  return status ? (
    <div className="second_result">
      <div className="bg-black h-[79vh] border-l-2 ">
        <div className="second_inner">
          {resultData &&
            resultData.map((endval, index) => {
              return (
                <div className="slot_machines" key={index}>
                  <SlotMechine
                    duration={6}
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
    <ThirdPrizeHome setLiveDraw={setLiveDraw} setPrizePosition={setPrizePosition} />
  );
};

export default SecoundPrizeResult;
