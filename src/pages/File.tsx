// import React from "react";
import { useLocation } from "react-router-dom";

const File = () => {
  const state = useLocation().state;
  console.log(state);
  const currFile = state.file;
  return <div className="w-screen h-screen"></div>;
};

export default File;
