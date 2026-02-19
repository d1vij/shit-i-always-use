import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 *
 * @param classes Array of classes
 * @returns Merged and osrted classes
 */
export function cn(...classes: ClassValue[]): string {
    return twMerge(clsx(classes));
}
