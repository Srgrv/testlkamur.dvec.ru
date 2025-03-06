import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSixMonthsAgo(): Date {
  const today = new Date();
  const sixMonthsAgo = new Date(today);

  sixMonthsAgo.setMonth(today.getMonth() - 6);

  return sixMonthsAgo;
}

export function formatMonth(month: string): string {
  return (month + 1).toString().padStart(2, "0");
}
