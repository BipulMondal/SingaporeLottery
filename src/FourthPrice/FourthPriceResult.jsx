import React, { useCallback, useEffect, useState } from "react";
import SlotMechine from "../slotMechine/SlotMechine";
import Modal from "../Components/Modal/Modal";
import Main from "../first/Main";

const audio = new Audio(require("../assets/newSound/slotsound.mp3"))

const FourthPriceResult = ({ setLiveDraw, resultData, setPrizePosition, singleDrawTime, setShow}) => {
  // const [currentBatch, setCurrentBatch] = useState(0); // To track which batch is being displayed
  const [currentResults, setCurrentResults] = useState([]);
  const [isRotating, setIsRotating] = useState(false);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    setLiveDraw(true);
    setPrizePosition("4th");
  }, [setLiveDraw, setPrizePosition]);

  const showResults = useCallback((batchIndex) => {
    const start = batchIndex * 20;
    const end = start + 20;
    const newResults = resultData.slice(start, end);

    console.log("resultData", resultData)

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
      }else{
        setTimeout(() => {
          setShow(false)
          setStatus(false);
        }, 9000);
      }
    }, 6000); 

 
    return () => {
      clearTimeout(stopRotationTimer);
    };
  }, [resultData]);


  useEffect(() => {
    if (resultData?.length > 0) {
      showResults(0);
    }
  }, [resultData, showResults]);



  return status ? (
    <div className="fourth_result relative">
      <div className="bg-black h-[79vh] border-l-2 ">
        <div className="fourth_inner">
          {currentResults &&
            currentResults.map((endval, index) => {
              return (
                <div className="slot_machines_fourth" key={index}>
                  <SlotMechine
                    duration={6} // Duration for the slot machine rotation
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
      <Modal singleDrawTime={singleDrawTime}/>
    </div>
  ):(
    <div className="fixed inset-0 z-10">
      <Main setShow={setShow}/>
    </div>
  )
};

export default FourthPriceResult;
