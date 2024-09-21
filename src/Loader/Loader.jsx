import React from "react";
import { FidgetSpinner } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="bg-transparent fixed inset-0 z-[222] backdrop-blur-sm">
      <div className="flex justify-center items-center h-[100%]">
      <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
      />
      </div>
    </div>
  );
};

export default Loader;
