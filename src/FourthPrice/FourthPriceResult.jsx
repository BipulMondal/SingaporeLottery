import React, { useCallback, useEffect, useState } from "react";
import SlotMechine from "../slotMechine/SlotMechine";
const audio = new Audio(
  require("../../src/assets/bicycle-wheel-spinning-49716-[AudioTrimmer.com].mp3")
);

const FourthPriceResult = ({ setLiveDraw, resultData, setPrizePosition }) => {
  // const [currentBatch, setCurrentBatch] = useState(0); // To track which batch is being displayed
  const [currentResults, setCurrentResults] = useState([]);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    setLiveDraw(true);
    setPrizePosition("4th");
  }, [setLiveDraw, setPrizePosition]);
  const showResults = useCallback((batchIndex) => {
    const start = batchIndex * 20;
    const end = start + 20;
    const newResults = resultData.slice(start, end);

    setCurrentResults(newResults);
    setIsRotating(true);
    audio.play();

    // Stop the slot machine and the audio after 10 seconds
    const stopRotationTimer = setTimeout(() => {
      setIsRotating(false);
      audio.pause();
      audio.currentTime = 0;
      if (batchIndex < 2) {
        // Wait 5 seconds and then start the next batch
        setTimeout(() => {
          // setCurrentBatch(batchIndex + 1);
          showResults(batchIndex + 1);
        }, 6000);
      }
    }, 10000); // 10 seconds duration

    // Cleanup the timer when the component unmounts
    return () => {
      clearTimeout(stopRotationTimer);
    };
  }, [resultData]);
  useEffect(() => {
    if (resultData?.length > 0) {
      // Start with the first batch
      showResults(0);
    }
  }, [resultData, showResults]);



  return (
    <div className="fourth_result">
      <div className="bg-black h-[79vh] border-l-2 ">
        <div className="fourth_inner">
          {currentResults &&
            currentResults.map((endval, index) => {
              return (
                <div className="slot_machines_fourth" key={index}>
                  <SlotMechine
                    duration={10} // Duration for the slot machine rotation
                    endNumbers={endval}
                    setvalueStart
                    rotate={isRotating}
                    fourth={true}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FourthPriceResult;
