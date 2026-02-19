/**
 * Function to generate vibration
 * @param pattern Single duration to vibrate for or a pattern of durations
 * @returns boolean depending upon whether vibration was done or not
 */
type VibrateFn = (pattern: number | number[]) => boolean;

let vibrator: VibrateFn;
if ("vibrate" in navigator && typeof navigator.vibrate === "function") {
    vibrator = (pattern) => navigator.vibrate(pattern);
} else {
    console.log("Your device doesn't support vibrations (╥﹏╥)");
    vibrator = () => false;
}

/**
 * Returns a function to generate single or pattern of vibrations if device supports.
 * Retunred function returns _true_ if vibration was successful
 * @returns VibrateFn
 * @example
 * const vibrator = useVibrate();
 * vibrator(50); // vibrate once for 50ms
 * vibrator([100, 50, 100]); // vibrate pattern
 */
export function useVibrate(): VibrateFn {
    return vibrator;
}
