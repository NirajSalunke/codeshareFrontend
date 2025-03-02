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

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    weekday: "long",
    month: "short",
  });
};
