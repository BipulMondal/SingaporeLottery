import React from "react";
import { useLocation } from "react-router-dom";

const Modal = ({singleDrawTime}) => {
   const location = useLocation();
  const data = location.state.row || {};

  return (
    <div
      id="modal"
      class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 flex items-center justify-center"
    >
      <div class="bg-transparent rounded-lg shadow-lg flex flex-col justify-end w-full space-y-12 lg:space-y-40">
        <div class="flex justify-around md:justify-center lg:justify-center gap-10 items-center p-4 text-gray-500 font-bold mt-4">
          <h3 className="text-[10px] mg:text-[18px] lg:text-[22px]">Draw Date: {data.game_date}</h3>
          <h3 className="text-[10px] mg:text-[18px] lg:text-[22px] mr-[76px]">Draw Time: {singleDrawTime}</h3>
        </div>

        <div class="p-4 text-gray-500 font-bold text-center">
          <p className="text-[10px] mg:text-[18px] lg:text-[22px]">PXWELL DAY LIVE DRAW</p>
          <p className="text-[10px] mg:text-[18px] lg:text-[22px]">SINGAPORE LOTTERY</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
