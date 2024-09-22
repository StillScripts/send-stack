import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";
import { Omit, type TObject } from "@sinclair/typebox";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
);

export function withoutId<Schema extends TObject>(schema: Schema) {
  return schema; //Omit(schema, ["id"]);
}
