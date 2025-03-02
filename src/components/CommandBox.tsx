// import * as React from "react";
import { Calendar, User } from "lucide-react";
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
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormEvent, useEffect, useState } from "react";
import { formatDate, GenerateRoomName } from "../helpers/helper.ts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

export function CommandBox() {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [open, setOpen] = useState(false);
  const [nameCreateRoom, setnameCreateRoom] = useState("");
  const [nameJoinRoom, setnameJoinRoom] = useState("");
  const [subMsgCreate, setsubMsgCreate] = useState("Create Room");
  const [pass, setPass] = useState("");
  const router = useNavigate();
  const submitCreateRoom = async (e: FormEvent) => {
    e.preventDefault();
    setsubMsgCreate("Creating Room...");
    try {
      const res = await axios.post(
        `${backend_url}/room/`,
        {
          name: nameCreateRoom,
          password: pass,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        setsubMsgCreate("Created Room");
        const dateExpiresAt = formatDate(res.data.room.expiresAt);
        toast("Room has been created", {
          description: `Expires at ${dateExpiresAt}.`,
          action: {
            label: "Ok",
            onClick: () => console.log("ok"),
          },
        });
        router("/room", {
          state: {
            name: nameCreateRoom,
            password: pass,
            room: res.data.room,
          },
        });
        setsubMsgCreate("Created Room");
      }
    } catch (error: any) {
      toast("Something went Wrong, Try again!", {
        description: error.message,
      });
      console.log(error.message);
      setsubMsgCreate("Room wasn't created.");
      setTimeout(() => {
        setsubMsgCreate("Create Room");
      }, 2000);
    }
  };

  const submitJoinRoom = (e: FormEvent) => {
    e.preventDefault();
    router("/room", {
      state: {
        name: nameJoinRoom,
        password: pass,
      },
    });
  };

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(!open);
    setnameCreateRoom(GenerateRoomName());
  };
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setnameCreateRoom(GenerateRoomName());
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <p
        onClick={handleClick}
        className="text-sm flex gap-2  items-center  cursor-pointer bg-[#18181a] text-muted-foreground hover:text-white transition-all   border-white  p-2  rounded-sm hover:bg-[#27272a]  "
      >
        <span className="text-sm"> Press </span>
        <div className=" inline-flex h-5  select-none items-center gap-1 bg-muted rounded border     px-1.5 font-mono text-[13px] font-medium  opacity-100">
          <span className="text-xs">⌘</span> J
        </div>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Room">
            <CommandItem className="m-2">
              <Calendar />
              <Dialog>
                <DialogTrigger asChild className="w-full ">
                  <Button variant="ghost">Create Room</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create Room</DialogTitle>
                    <DialogDescription>
                      Create a New Room to Add files
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={submitCreateRoom} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Room Name
                      </Label>
                      <Input
                        id="name"
                        value={nameCreateRoom}
                        className="col-span-3 select-none pointer-events-none"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="password" className="text-right">
                        Password
                      </Label>
                      <Input
                        onChange={(e) => setPass(e.target.value)}
                        id="password"
                        value={pass}
                        className="col-span-3  "
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">{subMsgCreate}</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CommandItem>
            <CommandItem className="m-2">
              <User />
              <Dialog>
                <DialogTrigger asChild className="w-full ">
                  <Button variant="ghost">Join Room</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Join Room</DialogTitle>
                    <DialogDescription>
                      Join room to access files
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={submitJoinRoom} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Room Name
                      </Label>
                      <Input
                        type="text"
                        value={nameJoinRoom}
                        onChange={(e) => setnameJoinRoom(e.target.value)}
                        id="name"
                        placeholder="developerisshit-69YZ"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Password
                      </Label>
                      <Input
                        type="text"
                        onChange={(e) => setPass(e.target.value)}
                        id="username"
                        placeholder="password"
                        className="col-span-3"
                      />
                    </div>
                  </form>
                  <DialogFooter>
                    <Button type="submit">Join Room</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
