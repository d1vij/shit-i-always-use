import { useEffect, useRef } from "react";

/**
 * Hook which sets the window title to passed title and then reverts back to original one once the component unmounts
 * @param title Title of window to set
 */
export function useWindowTitle(title: string): void {
    const originalTitle = useRef<string>(null);

    useEffect(() => {
        // storing the original title when component gets mounted
        if (originalTitle.current === null) {
            originalTitle.current = document.title;
        }

        document.title = title;
        return () => {
            // reset back to original when component unmounts
            if (originalTitle.current != null) {
                document.title = originalTitle.current;
            }
        };
    }, [title]);
}
