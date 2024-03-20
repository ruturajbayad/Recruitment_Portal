import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loder = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <RotatingLines
        visible={true}
        height={96}
        width={96}
        color="blue"
        strokeWidth={5}
        animationDuration={0.75}
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
};

export default Loder;
