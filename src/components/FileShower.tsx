// import React from "react";
import { useNavigate } from "react-router-dom";
import { CardSpotlight } from "./ui/card-spotlight";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { IconHttpDelete } from "@tabler/icons-react";
import axios from "axios";
import { toast } from "sonner";
import { extensionGiver, RoomInter, FileInter } from "@/helpers/helper";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const FileShower = ({
  room,
  setFlag,
}: {
  room: RoomInter;
  setFlag: (val: boolean) => void;
}) => {
  const router = useNavigate();
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const handleClick = (ele: FileInter) => {
    console.log("Handle Clicked");

    router("/room/file", {
      state: {
        fileId: ele?.ID,
        room: room,
      },
    });
  };

  const deleteFile = async (ele: FileInter) => {
    try {
      const res = await axios.delete(`${backend_url}/file/${ele?.ID}`);
      if (res.data.success) {
        setFlag(false);
        console.log(ele?.name + "File deleted");
        toast(ele?.name + extensionGiver(ele?.fileType) + " file deleted", {
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
        {room.files?.map((ele: FileInter, idx: number) => (
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
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="cursor-pointer">
                  <IconHttpDelete className="scale-150" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="p-6 mx-auto rounded-lg bg-black text-white">
                <DrawerHeader className="text-center">
                  <DrawerTitle className="text-3xl font-bold">
                    Are you absolutely sure?
                  </DrawerTitle>
                  <DrawerDescription className="text-lg text-muted-foreground mt-2">
                    This action cannot be undone.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="flex justify-center gap-4">
                  <DrawerClose>
                    <Button
                      onClick={() => deleteFile(ele)}
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        ))}
      </ScrollArea>
    </main>
  );
};

export default FileShower;
