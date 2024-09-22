import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
