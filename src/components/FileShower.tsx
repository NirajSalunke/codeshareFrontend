// import React from "react";
import { useNavigate } from "react-router-dom";
import { CardSpotlight } from "./ui/card-spotlight";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { IconHttpDelete } from "@tabler/icons-react";
import axios from "axios";
import { toast } from "sonner";

const FileShower = ({ room, flag, setFlag }) => {
  const router = useNavigate();
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const handleClick = (ele) => {
    console.log("Handle Clicked");

    router("/room/file", {
      state: {
        file: ele,
      },
    });
  };

  const deleteFile = async (ele) => {
    try {
      const res = await axios.delete(`${backend_url}/file/${ele?.ID}`);
      if (res.data.success) {
        setFlag(false);
        console.log(ele?.name + "File deleted");
        toast(ele?.name + "." + ele?.fileType + " file deleted", {
          action: {
            label: "OK",
            onClick: () => console.log("ok"),
          },
        });
      }
    } catch (error: any) {
      console.log(error.message);
      toast("Something went Wrong, Try again!", {
        description: error.message,
      });
    }
  };
  if (room.files?.length === 0) {
    return (
      <main className="w-full h-full">
        <h2>No Files </h2>
      </main>
    );
  }

  return (
    <main className="w-full h-full">
      <h1 className="p-2 h-[5vh] ">All files</h1>
      <ScrollArea className="h-[65vh] ">
        {room.files?.map((ele, idx) => (
          <div className="flex items-center">
            <CardSpotlight
              radius={80}
              key={idx}
              className=" w-1/2 p-3 m-2 cursor-pointer "
              onClick={() => handleClick(ele)}
            >
              <h2 className="flex gap-2">
                <h2>
                  {idx + 1}
                  {")"}
                </h2>
                <h2>{ele?.name}</h2>
              </h2>
            </CardSpotlight>
            <Button className="cursor-pointer" onClick={() => deleteFile(ele)}>
              <IconHttpDelete className="scale-150" />
            </Button>
          </div>
        ))}
      </ScrollArea>
    </main>
  );
};

export default FileShower;
