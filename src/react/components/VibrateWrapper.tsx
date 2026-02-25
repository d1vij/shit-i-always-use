import type { JSX, PropsWithChildren } from "@/react/types";
import { useCallback } from "react";
import { useVibrate } from "../hooks";

export type VibrateOnClickProps = PropsWithChildren & {
    pattern: VibratePattern;
};
export function VibrateOnClick({
    children,
    pattern,
}: VibrateOnClickProps): JSX {
    const vibrator = useVibrate();
    const handleClick = useCallback(() => {
        vibrator(pattern);
    }, [pattern, vibrator]);
    return (
        // biome-ignore lint/a11y/useSemanticElements: <>
<div onClick={handleClick} role="button" tabIndex={0} onKeyUp={handleClick}>
            {children}
        </div>
    );
}
