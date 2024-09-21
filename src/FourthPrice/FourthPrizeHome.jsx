import React, { useCallback, useEffect, useState } from "react";
import FourthPriceResult from "./FourthPriceResult";
import { useLocation } from "react-router-dom";
import { getFourthResultData } from "../Utils/AllApiCals";

const FourthPrizeHome = ({ setLiveDraw, setPrizePosition }) => {
  const [textType, setTextType] = useState(false);
  const [textFall, setTextFall] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [blink, setBlink] = useState(false);
  const [bottomText, setBottomText] = useState(false);
  const [status, setStatus] = useState(true);
  const [resultData, setResultData] = useState([]);
  const location = useLocation();
  const data = location.state.row || {};

  const fetchThirdResult = useCallback(async () => {
    try {
      let res = await getFourthResultData(data.game_date, data.game_name);
      if (res && res.status) {
        if (res && res.status) {
          let filterData = res?.data?.map((item) => item['5thresult']);
          setResultData(filterData);
        }
      }
      console.log("ressssss", res);
    } catch (error) {
      console.log("errorrrrr", error);
    }
  }, [data]);

  useEffect(() => {
    fetchThirdResult();
  }, [fetchThirdResult]);

  useEffect(() => {
    const typeText = setTimeout(() => {
      setTextType(true);
    }, 1000);

    const lineShow = setInterval(() => {
      setShowLine(true);
    }, 3000);

    const falltext = setTimeout(() => {
      setTextFall(true);
    }, 3000);

    const Blink = setTimeout(() => {
      setBlink(true);
    }, 5800);

    const bottomtextType = setTimeout(() => {
      setBottomText(true);
    }, 6500);

    const changeStatus = setTimeout(() => {
      setStatus(false)
    }, 15000);

    return () => {
      clearTimeout(typeText);
      clearTimeout(falltext);
      clearInterval(lineShow);
      clearTimeout(Blink);
      clearTimeout(bottomtextType);
      clearTimeout(changeStatus);
    };
  }, []);

  return status ? (
    <div className="bg-black fixed inset-0 z-10">
      <dib className="flex flex-col w-[52%] h-[100vh] mx-auto text-center second_main_div">
        <div className="typing_text_2_main_div">
          <ul className={textType ? "dynamik_text2" : "hidden"}>
            <li>
              <span>PXWELL</span>
            </li>
          </ul>
        </div>
        <div className={showLine ? "line" : ""}></div>
        <div className={textFall ? "nextDraw" : ""}>
          <span>LIVE NEXT DRAW</span>
        </div>
        <div className={`secoundPrizeNo ${blink ? "blink" : "hidden"}`}>
          <span className="number">4</span>
          <span className="nd">th</span> <span>Prize</span>
        </div>
        <div className="bottom_text">
          <ul className={bottomText ? "dynamik_text_bottom" : "hidden"}>
            <li>
              <span>ON 5 DIGITS WITH 60 TIMES</span>
            </li>
          </ul>
        </div>
      </dib>
    </div>
  ) : (
    <FourthPriceResult setLiveDraw={setLiveDraw} resultData={resultData} setPrizePosition={setPrizePosition} />
  )
}

export default FourthPrizeHome
