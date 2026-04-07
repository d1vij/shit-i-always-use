import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The current action's status
 * - `success`: Action was successfull
 * - `error` : Action resulted in error
 * - `null`: Action is in process
 */
type ClipboardActionStatus = "success" | "error" | "copying" | null;

/**
 * Object of the corresponding error thrown, is `undefined` if status is _success_
 */
type ClipboardErrorObject = Error | undefined;

/**
 * Object returned by the useClipboardText hook
 */
type UseClipboardTextHookReturnType = {
    /**
     * The current action's statuss
     */
    status: ClipboardActionStatus;
    /**
     * Object of the corresponding error thrown
     */
    error: ClipboardErrorObject;
    /**
     *	Async function to copy text to clipboard
     * @param content Text to copy
     * @returns Void
     *
     * @example
     * const {copy, status, error} = useClipboardText();
     * await copy("Hello World!!");
     * if(status === "success") {
     *		alert("Copying was successfull!!")
     * } else {
     *		alert("Copying failed due to " + error.message);
     * }
     */
    copy: (content: string) => Promise<void>;
    /**
     *	Async function to paste text from clipboard - ie returns text contained in clipboard
     * @returns Promise containing the text from clipboard
     */
    paste: () => Promise<string | undefined>;
};

type UseClipboardHookOptions = {
    /**
     * Milliseconds after which to revert back the copy status
     * @default
     * 1000
     */
    statusUpdateDelay?: number;
};

/**
 * Hook to access the device's clipboard.
 * Contains methods to copy and paste text to and from the clipboard along with props indicating the status of said operation
 * @returns UseClipboardHookReturnType
 */
export function useClipboardText(
    opts?: UseClipboardHookOptions,
): UseClipboardTextHookReturnType {
    const { statusUpdateDelay = 1000 } = { ...opts };

    const [status, setStatus] = useState<ClipboardActionStatus>(null);
    const [error, setError] = useState<ClipboardErrorObject>(undefined);

    const id = useRef<ReturnType<typeof setTimeout>>(null);
    // cleanup before unmounting
    useEffect(() => {
        if (id.current) {
            clearTimeout(id.current);
        }
    }, []);

    const copy = useCallback(
        async (content: string) => {
            try {
                setError(undefined);
                setStatus("copying");
                if (!navigator.clipboard.writeText) {
                    throw new Error("clipboard is not supported");
                }
                await navigator.clipboard.writeText(content);
                setStatus("success");

                if (id.current) clearTimeout(id.current);
                id.current = setTimeout(
                    () => setStatus(null),
                    statusUpdateDelay,
                );
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e);
                    setStatus("error");
                    id.current = setTimeout(() => {
                        setStatus(null);
                    }, statusUpdateDelay);
                    return;
                }
                throw new Error("wtf has been thrown ???");
            }
        },
        [statusUpdateDelay],
    );

    const paste = useCallback(async () => {
        try {
            setError(undefined);
            setStatus(null);
            if (!navigator.clipboard?.readText) {
                throw new Error("clipboard is not supported");
            }
            const content = await navigator.clipboard.readText();
            setStatus("success");
            return content;
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e);
                setStatus("error");
                return;
            }
            throw new Error("wtf has been thrown ???");
        }
    }, []);

    return {
        status,
        error,
        copy,
        paste,
    };
}
