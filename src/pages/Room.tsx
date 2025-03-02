import FileShower from "@/components/FileShower";

import { formatDate, RoomInter } from "@/helpers/helper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Room = () => {
  const state = useLocation().state;
  const [flag, setFlag] = useState<boolean>(false);
  const router = useNavigate();
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [room, setRoom] = useState<RoomInter>({
    ID: 0,
    OwnerID: "",
    name: "",
    password: "",
    isPrivate: false,
    expiresAt: undefined,
    files: [],
  });

  const [newFileName, setNewFileName] = useState("");
  const [newFileType, setNewFileType] = useState("");
  const [subMsgCreate, setsubMsgCreate] = useState("Add File to Room");
  if (!state) {
    return <div>Room not found</div>;
  }

  const createFile = async (e: FormEvent) => {
    e.preventDefault();
    setsubMsgCreate("Adding File ....");
    try {
      const res = await axios.post(`${backend_url}/file/create/${room.ID}`, {
        name: newFileName,
        fileType: newFileType,
        content: "",
      });
      if (res.data.success) {
        toast("File has been created", {
          action: {
            label: "OK",
            onClick: () => console.log("oK"),
          },
        });
        router("/room/file", {
          state: {
            // file: res.data.file,
            fileId: res.data.file.ID,
            room: res.data.room,
          },
        });
        setsubMsgCreate("File Created!");
      }
    } catch (error: any) {
      setsubMsgCreate("Failed to Add");
      toast("Something went Wrong, Try again!", {
        description: error.message,
      });
      console.error(error);
      setTimeout(() => {
        setsubMsgCreate("Add File to Room");
      }, 2000);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(`${backend_url}/room/${state.name}`);
      setRoom(res.data.room);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (!flag) {
      getData();
      setFlag(true);
    }
  }, [flag]);

  console.log(room);
  return (
    <>
      <main className="text-white bg-black w-screen h-screen p-6 flex flex-col gap-6">
        {/* Room Header */}
        <div className="w-full flex justify-between  gap-1 border-b border-gray-700  h-[17vh]">
          <div className="flex flex-col gap-1">
            <h2 className="text-5xl font-bold tracking-tight">Room</h2>
            <p className="text-lg text-gray-400">
              Unique Name:{" "}
              <span className="text-white font-medium">{room.name}</span>
            </p>

            {room.OwnerID && (
              <p className="text-sm text-gray-500">{room.OwnerID}’s Room</p>
            )}

            <p className="text-sm text-gray-500">
              Expires on:{" "}
              <span className="text-white">{formatDate(room?.expiresAt)}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 ">
            <Dialog>
              <DialogTrigger asChild className="">
                <Button variant="default">New File</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create file</DialogTitle>
                  <DialogDescription>Create a New File</DialogDescription>
                </DialogHeader>
                <form onSubmit={createFile} className="grid gap-4 py-2s">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      File Name
                    </Label>
                    <Input
                      id="name"
                      value={newFileName}
                      onChange={(e) => setNewFileName(e.target.value)}
                      className="col-span-3 "
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      File Type
                    </Label>
                    <Select value={newFileType} onValueChange={setNewFileType}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asm">Assembly</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="go">GO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <DialogFooter>
                    <Button type="submit" className="">
                      {subMsgCreate}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Button
              onClick={() => {
                router("/");
              }}
              variant="outline"
            >
              Back to Home
            </Button>
          </div>
        </div>

        {/* Room Content */}
        <div className="w-full flex-1 rounded-lg  p-4 shadow-lg h-[70vh]">
          <FileShower room={room} setFlag={setFlag} />
        </div>
      </main>
    </>
  );
};

export default Room;
