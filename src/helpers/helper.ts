import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";
import { nanoid } from "nanoid";

export const GenerateRoomName = (): string => {
  const name: string = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: "",
    length: 2,
    style: "lowerCase",
  });

  return `${name}-${nanoid(3)}`;
};

export const formatDate = (isoString?: string): string => {
  const date = new Date(isoString || "");
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    weekday: "long",
    month: "short",
  });
};

export const extensionGiver = (fileType: string) => {
  switch (fileType) {
    case "javascript":
      return ".js";
    case "typescript":
      return ".ts";
    case "asm":
      return ".asm";
    case "cpp":
      return ".cpp";
    case "java":
      return ".java";
    case "python":
      return ".py";
  }
};

export interface FileInter {
  ID: number;
  roomId: number;
  name: string;
  fileType: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface RoomInter {
  ID: number;
  OwnerID?: string;
  name: string;
  password: string;
  isPrivate?: boolean;
  expiresAt?: string;
  files?: FileInter[];
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
