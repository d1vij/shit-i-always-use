const canVibrate =
    typeof navigator !== "undefined" && typeof navigator.vibrate === "function";

/**
 * Generates single or pattern of vibrations if device supports.
 * Returns boolean indicating whether vibration was successful
 * @param pattern {@link VibratePattern}
 * @example
 * useVibrate(50); // vibrate once
 * useVibrate([50, 100, 50]); // vibrate pattern
 */
export function useVibrate(pattern: VibratePattern): boolean {
    if (canVibrate) {
        return navigator.vibrate(pattern);
    }
    return false;
}
