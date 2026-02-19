import type { ReactRef } from "@/react/types";
import { useCallback, useEffect, useRef } from "react";

export type UseCanvasHookReturnType = {
    ref: ReactRef<HTMLCanvasElement | null>;
    /**
     *
     * @returns throws error if ref is not attached to canvas element, canvas and 2d context otherwise
     */
    getContext: () => {
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
    };

    /**
     * Function to clear the canvas
     */
    clear: VoidFunction;
};

/**
 *
 * @param heightPx Height of canvas in pixels
 * @param widthPx Width of canvas in pixels
 * @returns UseCanvasHookReturnType
 */
export function useCanvas(
    heightPx: number,
    widthPx: number,
): UseCanvasHookReturnType {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    // Setting up canvas once mounted
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr =
            typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

        // normalizing css and dom heights and widths based on device's DPR
        // so that the pixel units across devices remain same
        canvas.style.width = `${widthPx}px`;
        canvas.style.height = `${heightPx}px`;

        canvas.width = Math.round(widthPx * dpr);
        canvas.height = Math.round(heightPx * dpr);

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctxRef.current = ctx;
    }, [heightPx, widthPx]);

    const getContext = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            throw new Error(
                "Canvas ref is null. Is the ref attached to the canvas element ??",
            );
        }

        const ctx = ctxRef.current;
        if (!ctx) {
            throw new Error(
                "Context ref is null. Is the ref attached to the canvas element ??",
            );
        }
        return { canvas, ctx };
    }, []);

    const clear = useCallback(() => {
        const { ctx, canvas } = getContext();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, [getContext]);

    return {
        ref: canvasRef,
        getContext,
        clear,
    };
}
