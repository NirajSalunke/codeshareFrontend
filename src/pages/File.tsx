import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MonacoEditor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
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
import axios from "axios";
import { toast } from "sonner";
import { extensionGiver } from "@/helpers/helper";

const File = () => {
  const router = useNavigate();
  const location = useLocation();
  const state = location?.state || {};
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [currFile, setCurrFile] = useState(null);
  const [code, setCode] = useState("");

  const getData = async () => {
    if (!state?.fileId) return; // Prevent unnecessary API calls

    try {
      const res = await axios.get(`${backend_url}/file/${state.fileId}`);
      if (res.data.success) {
        setCurrFile(res.data.file);
        setCode(res.data.file.content);
      }
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  useEffect(() => {
    // console.log("Location State:", location.state);
    // console.log("File ID:", state?.fileId);
    if (state?.fileId) {
      getData();
    } else {
      console.warn("fileId is missing, cannot fetch data.");
    }
  }, []);

  const saveFile = async () => {
    if (!currFile) return;

    try {
      const res = await axios.put(`${backend_url}/file/${currFile?.ID}`, {
        content: code,
      });
      if (res.data.success) {
        toast("File updated Successfully", {
          action: {
            label: "OK",
            onClick: () => console.log("ok"),
          },
        });
      }
    } catch (error: any) {
      if (error.status === 404) {
        toast("Something went Wrong, Try again!", {
          description:
            error.response.data.message +
            ", Maybe deleted, going back to room!",
        });
      } else if (error.status === 400) {
        toast("Something went Wrong, Try again!");
      } else {
        toast("Something went Wrong, Try again!", {
          description: error.response.data.message,
        });
      }
      console.error(error);
    }
  };
  if (!currFile) {
    return (
      <>
        <div className="w-screen h-screen text-3xl flex flex-col gap-5 justify-center items-center">
          <div> File Not Found or May have Deleted!</div>
          <Button
            onClick={() =>
              router("/room", {
                state: { room: state.room, name: state.room?.name },
              })
            }
            variant="outline"
          >
            Back to Room
          </Button>
        </div>
      </>
    );
  }
  return (
    <main className="text-white bg-black w-screen h-screen p-6 flex flex-col gap-6">
      <div className="w-full flex justify-between gap-1 border-b border-gray-700 h-[17vh]">
        <div className="flex flex-col gap-1">
          <h2 className="text-5xl font-bold tracking-tight">File Editor</h2>
          <p className="text-lg text-gray-400">
            Name:{" "}
            <span className="text-white font-medium">
              {currFile?.name}
              {extensionGiver(currFile?.fileType)}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            Room:{" "}
            <span className="text-white">{state?.room?.name || "Unknown"}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 ">
          <Button
            onClick={() =>
              router("/room", {
                state: { room: state.room, name: state.room?.name },
              })
            }
            variant="outline"
          >
            Back to Room
          </Button>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Save</Button>
            </DrawerTrigger>
            <DrawerContent className="p-6 mx-auto rounded-lg bg-black text-white">
              <DrawerHeader className="text-center">
                <DrawerTitle className="text-3xl font-bold">
                  Are you absolutely sure?
                </DrawerTitle>
                <DrawerDescription className="text-lg text-muted-foreground mt-2">
                  This action cannot be undone and will overwrite the previous
                  file.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter className="flex justify-center gap-4">
                <DrawerClose>
                  <Button onClick={saveFile} variant="destructive">
                    Save
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <div className="w-full flex-1 rounded-lg bg-[#1e1e1e] p-4 shadow-lg h-[70vh]">
        <MonacoEditor
          className="w-full h-[66vh]"
          language={currFile?.fileType || "plaintext"}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            quickSuggestions: true,
            suggestOnTriggerCharacters: true,
            formatOnType: true,
            formatOnPaste: true,
            inlineSuggest: { enabled: true },
          }}
        />
      </div>
    </main>
  );
};

export default File;
