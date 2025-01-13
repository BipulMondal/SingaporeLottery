import React, { useCallback, useContext, useEffect, useState } from "react";
import "./Main.css";
import middle from "../images/draw_img.png";
import logo from "../images/lottery_logo.png";
import prize from "../images/prize.png";
import CustomWheel2 from "../customwheel2/CustomWheel2";
import { getAllTime, getFirstResult, getSingleTime } from "../Utils/AllApiCals";
import { useLocation } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import Modal from "../Components/Modal/Modal";

const beepSound = new Audio(require("../assets/newSound/beep3.mp3"));
const countDown = new Audio(require("../assets/coundDown.mpeg"));

const Main = () => {
  const location = useLocation();
  const data = location.state.row || {};
  const [count, setCount] = useState(5);
  const [status, setStatus] = useState(false);
  const [color, setColor] = useState(false);
  const [fallingText, setfallingText] = useState(false);
  const [blink, setBlink] = useState(false);
  const [liveDraw, setLiveDraw] = useState(false);
  const [home, setHome] = useState(true);
  const [prizePosition, setPrizePosition] = useState("1st");
  const [resultData, setResultData] = useState({});
  const [allTime, setAllTime] = useState([]);
  const [singleDrawTime, setSingleDrawTime] = useState("");
  const {show, setShow} = useContext(AppContext)

  const fetchSpinData = useCallback(async () => {
    try {
      let res = await getFirstResult(data.game_date, data.game_name);
      if (res && res.status) {
        setResultData(res?.data?.[0]);
      }
      console.log("ressssss", res);
    } catch (error) {
      console.log("errorrrrr", error);
    }
  }, []);
  const fetcallDrawTime = useCallback(async () => {
    try {
      let res = await getAllTime();
      if (res && res.status) {
        setAllTime(res.data);
      }
      console.log("timess", res);
    } catch (error) {
      console.log("errorrrrr", error);
    }
  }, []);

  const fetcSingleDrawTime = useCallback(async () => {
    try {
      let res = await getSingleTime(data.game_name);
      if (res && res.status) {
        console.log(res, "88888");
        setSingleDrawTime(res.data[0].game_time);
      }
      console.log("timess", res);
    } catch (error) {
      console.log("errorrrrr", error);
    }
  }, []);

  useEffect(() => {
    fetchSpinData();
    fetcallDrawTime();
    fetcSingleDrawTime();
  }, [fetcSingleDrawTime, fetchSpinData]);

  useEffect(() => {
    if (!home) {
      // Decrement the count at a 1.2-second interval
      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount > 0) {
            // countDown.play();
            // if (prevCount <= 10) {
            //   countDown.play(); // Start countdown sound when count is 10 or less
            // }
            return prevCount - 1;
          } else if (prevCount === 0) {
            beepSound.play();
            countDown.pause();
            clearInterval(interval);
            return 0;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1200);

      const fallingText = setTimeout(() => {
        setfallingText(true);
      }, 7000);

      const changeColor = setTimeout(() => {
        setColor(true);
      }, 12500);

      const Blink = setTimeout(() => {
        setBlink(true);
      }, 13000);

      const changeState = setTimeout(() => {
        setStatus(true);
        beepSound.pause();
        countDown.pause();
      }, 6000);
      // }, 76000);

      return () => {
        clearInterval(interval);
        clearTimeout(fallingText);
        clearTimeout(changeColor);
        clearTimeout(Blink);
        clearTimeout(changeState);
      };
    }
  }, [home]);

  const handleClick = () => {
    setShow(false);
    setTimeout(() => {
      setHome(false); 
    }, 5000); 
  };


  const formattedCount = String(count).padStart(2, "0");

  return home ? (
    <div className="home_main_div content">
      <div className="home_text">
        <p>SINGAPORE LOTTERIES</p>
        <p>PRESENTS</p>
        <p>PXWELL</p>
        <p>LIVE LOTTERY DRAW</p>
      </div>
      {show ? (
        <button
          type="button"
          class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2 me-2 mb-2  focus:outline-none dark:focus:ring-blue-800"
          onClick={() => handleClick()}
        >
          Play
        </button>
      ) : (
        ""
      )}
    </div>
  ) : (
    <div className="main_div relative">
      {/* top */}
      <div className="flex justify-around main_div_second">
        <div className="pt-1 pb-1 flex justify-center align-center bg-black  rounded-full w-72 h-[56px] top_left_uTube">
          <p className="w-full text-center bg-yellow-400 text-black  rounded-full font-bold top_left">
            PLAY LIVE DRAW ON <span className="text-red-700">YOUTUBE</span>{" "}
            <br />
            SINGAPORE LOTTERIES{" "}
          </p>
        </div>
        <div className="">
          <div class="draw">
            <img src={middle} alt="middle" />
            <h2 className="draw_text1">SINGAPORE LOTTERIES</h2>
            <h3 className="draw_text2">
              DRAW TIME{" "}
              {allTime.map((ele, id) => {
                return `${ele.game_time},`;
              })}{" "}
            </h3>
          </div>
        </div>
        <div className="pt-1 pb-1 flex justify-center align-center bg-black rounded rounded-full w-56 h-[56px] top_right_uTube">
          <p className="w-full flex justify-center items-center bg-yellow-400 text-black rounded rounded-full font-bold top_right">
            LIVE FROM SINGAPORE
          </p>
        </div>
      </div>
      {/* middle */}
      <div className="mt-[0.5rem] w-[98%] h-[78vh] mx-auto flex justify-between main_middle">
        <div className="w-[50px] h-[100%] flex justify-between items-center mr-2 main_middle_second ">
          <div className="w-full h-[90%] flex flex-col justify-evenly items-center text-black text-5xl rounded rounded-full font-bold pxwell_main">
            <p className="pxwell font-extrabold">P</p>
            <p className="pxwell font-extrabold">X</p>
            <p className="pxwell font-extrabold">W</p>
            <p className="pxwell font-extrabold">E</p>
            <p className="pxwell font-extrabold">L</p>
            <p className="pxwell font-extrabold">L</p>
          </div>
        </div>
        {liveDraw && (
          <div className="w-[50px] h-[100%] flex justify-between items-center mr-2 live_draw_main">
            <div className="w-full h-[90%] flex flex-col justify-evenly items-center text-black text-5xl rounded rounded-full font-bold live_draw">
              <p className="pxwell font-extrabold">L</p>
              <p className="pxwell font-extrabold">I</p>
              <p className="pxwell font-extrabold">V</p>
              <p className="pxwell font-extrabold">E</p>
              <p className="pxwell font-extrabold">D</p>
              <p className="pxwell font-extrabold">R</p>
              <p className="pxwell font-extrabold">A</p>
              <p className="pxwell font-extrabold">W</p>
            </div>
          </div>
        )}
        {!status ? (
          <div className="w-9/12 border border-2 h-[100%] bg-black text-white p-8 text-center overflow-hidden middle_text_area">
            <div className="typing_text_main_div">
              <ul className="dynamik_text">
                <li>
                  <span>SINGAPORE LOTTERIES</span>
                </li>
              </ul>
            </div>
            {/* {fallingText && ( */}
            <div className="fall_blink_text ">
              <h4 className="text-9xl font-extrabold mt-8 mb-8 blink_text ">
                <div
                  className={`word ${fallingText ? "block" : "hidden"} ${color ? "colorChange" : ""
                    } ${blink ? "blink" : ""}`}
                >
                  <span>P</span>
                  <span>X</span>
                  <span>W</span>
                  <span>E</span>
                  <span>L</span>
                  <span>L</span>
                </div>
              </h4>
            </div>
            {/* )} */}
            <div className="flex justify-center items-center number_main_div">
              <div
                className={`h-[81px] w-24 bg-white text-black text-7xl count_number`}
              >
                <span
                  className={`${formattedCount === "00" ? (blink ? "blink" : "") : ""
                    }`}
                >
                  00
                </span>
              </div>
              <div
                className={`h-[81px] w-24 bg-white text-black text-7xl ml-2 count_number`}
              >
                <span
                  className={`${formattedCount === "00" ? (blink ? "blink" : "") : ""
                    }`}
                >
                  {formattedCount}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-[74vw] border overflow-hidden relative wheel_main_section">
            <CustomWheel2
              no={resultData?.pre_digit}
              letter={resultData.series}
              digits={resultData?.result}
              rotate={true}
              setLiveDraw={setLiveDraw}
              setPrizePosition={setPrizePosition}
              singleDrawTime={singleDrawTime}
            />
          </div>
        )}

        <div className="oval_div">
          <div className="prize">
            <div className="first">
              <img className="prize_img" src={prize} alt="prize" />
              <h4 className="prize_number">{prizePosition}</h4>
            </div>
            <div className="pri">
              <h2>prize</h2>
            </div>
            <div className="digit">
              <h3>
                on <br /> 5 <br />
                digits <br /> with <br />
                series
              </h3>
            </div>
          </div>
        </div>

        <div className="w-[50px] h-[100%] flex justify-between items-center ml-2 pxwell_right_main">
          <div className="w-full h-[90%] flex flex-col justify-evenly items-center text-black text-5xl rounded rounded-full font-bold pxwell_main pexel_right">
            <p className="pxwell font-extrabold">P</p>
            <p className="pxwell font-extrabold">X</p>
            <p className="pxwell font-extrabold">W</p>
            <p className="pxwell font-extrabold">E</p>
            <p className="pxwell font-extrabold">L</p>
            <p className="pxwell font-extrabold">L</p>
          </div>
        </div>
      </div>
      {/* bottom */}
      <div className="flex justify-around mt-[0.5rem] bottom_div">
        <div className="pt-1 pb-1 flex justify-center align-center bg-black rounded rounded-full w-64 h-12 draw_date_time">
          <p className="w-full flex justify-center items-center bg-red-700 text-white rounded rounded-full font-bold">
            DRAW DATE - {data.game_date}
          </p>
        </div>
        <div className="">
          <img className="bottom_logo" src={logo} alt="middle" />
        </div>
        <div className="pt-1 pb-1 flex justify-center align-center bg-black rounded rounded-full w-56 h-12 draw_date_time">
          <p className="w-full flex justify-center items-center bg-red-700 text-white rounded rounded-full font-bold">
            DRAW TIME - {singleDrawTime}
          </p>
        </div>
      </div>

      {/* <Modal singleDrawTime={singleDrawTime}/> */}
    </div>
  );
};

export default Main;
