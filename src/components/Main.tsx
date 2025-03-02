// import { CommandBox } from "./CommandBox";
import { IconCode } from "@tabler/icons-react";
import { CommandBox } from "./CommandBox";
import Robot from "./models/Robot";

const Main = () => {
  return (
    <div className="h-full w-full">
      <div className="w-screen h-[10vh]   text-white flex items-center dark   ">
        <div className="w-1/2 text-white h-full flex items-center gap-2 justify-start px-10">
          <IconCode />
          <span>CodeShare</span>
        </div>
        <div className="w-1/2 h-full flex items-center justify-end px-10">
          <CommandBox />
        </div>
      </div>
      <div className="h-[90vh] overflow-clip w-full ">
        <Robot />
      </div>
    </div>
  );
};

export default Main;
