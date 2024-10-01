import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortStations(
  stations: { name: string; lines: string[] }[] | undefined
) {
  return stations?.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}
