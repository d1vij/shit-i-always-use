/**
 * Returns a random Integer between _min_ and _max_ ranges.
 * @param min
 * @param max
 * @param bothInclusive
 * Whether to include both end points.
 * @default false
 * @returns
 * A random number between [min, max) or [min, max]
 */
export function getIntBetween(
    min: number,
    max: number,
    bothInclusive = false,
): number {
    if (min > max) throw new Error("min must be ≤ max");

    return bothInclusive
        ? Math.floor(Math.random() * (max - min + 1)) + min
        : Math.floor(Math.random() * (max - min)) + min;
}
