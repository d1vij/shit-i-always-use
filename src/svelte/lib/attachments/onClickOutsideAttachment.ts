import { onClickOutside, type OnClickOutsideOptions } from "runed";
import type { Attachment } from "svelte/attachments";

export type OnClickOutsideAttachmentOptions = OnClickOutsideOptions & {
    enabled: boolean;
};

/**
 * An attachment that calls a given callback when a click event occurs outside of a specified container element.
 * @param callback
 * @param options
 * Same as {@link OnClickOutsideOptions} but extended with additional property of `enabled` which controls the behaviour
 * @returns
 */
export function onClickOutsideAttachment<T extends Element>(
    callback: (event: PointerEvent | FocusEvent) => void,
    options: OnClickOutsideAttachmentOptions = { enabled: true },
): Attachment<T> {
    const attachment: Attachment<T> = (node) => {
        const { start, stop } = onClickOutside(node, callback, options);

        // no need to wrap in $effect since the attachment will recompute on state change
        if (options?.enabled) {
            start();
        } else stop();
    };
    return attachment;
}
