import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = (props) => {
  const { width, height } = props;
  const navigate = useNavigate()
  return (
    <button
      style={{
        border: "1px solid rgba(111, 191, 73, 1)",
        color: "rgba(111, 191, 73, 1)",
        background: "transparent",
        width:width,
        height: height ? height : "44px" ,
        borderRadius:"8px"
      }}
      onClick={() => navigate(-1)}
    >
      Back
    </button>
  );
};

export default BackButton;
