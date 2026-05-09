/**
 * Converts a numeric pixel value to a CSS pixel string.
 *
 * @param pixels - The numeric pixel value to convert.
 * @returns A template literal string in the format `"${number}px"`.
 *
 * @example
 * px(16)  // "16px"
 * px(0)   // "0px"
 */
export function px(pixels: number): `${number}px` {
    return `${pixels}px`;
}
