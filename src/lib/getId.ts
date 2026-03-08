import { nanoid } from "nanoid";

/**
 * Returns a random _nanoid_.
 * @param length Length of Id to generate
 * @returns
 */
export function getId(length?: number): string {
    return nanoid(length);
}
