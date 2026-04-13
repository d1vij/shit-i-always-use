import type { Attachment } from "svelte/attachments";
import { useVibrate } from "$lib/hooks";

/**
 * Returns an attachment which produces vibrations (if supported) on clicking the node.
 * @param pattern {@link VibratePattern}
 * @returns {@link Attachment}
 */
export function vibrateOnClick(pattern: VibratePattern): Attachment {
    return (node: Element) => {
        return node.addEventListener("click", () => useVibrate(pattern));
    };
}
