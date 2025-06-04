import { clsx, type ClassValue } from "clsx";
import { formatDate, formatDistanceToNowStrict } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formateRelativeDate = (date: Date) => {
  const currentDate = new Date();

  if (currentDate.getTime() - date.getTime() < 24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(date, {
      addSuffix: true,
    });
  } else {
    if (currentDate.getFullYear() === date.getFullYear()) {
      return formatDate(date, "MMM d");
    } else {
      return formatDate(date, "MMM d, yyy");
    }
  }
};
