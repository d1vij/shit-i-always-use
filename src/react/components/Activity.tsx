import {
    Activity as RActivity,
    type ActivityProps as RActivityProps,
} from "react";
import type { JSX, PropsWithChildren } from "@/react/types";

export type ActivityVisibiltyStates = boolean | RActivityProps["mode"];
export type ActivityProps = PropsWithChildren &
    (
        | {
              show: ActivityVisibiltyStates;
              mode?: never;
          }
        | {
              mode: ActivityVisibiltyStates;
              show?: never;
          }
    );
export function Activity({ mode, show, children }: ActivityProps): JSX {
    // either one would be always defined
    const value = show || mode;
    return (
        <RActivity
            mode={
                typeof value === "boolean"
                    ? value
                        ? "visible"
                        : "hidden"
                    : value
            }
        >
            {children}
        </RActivity>
    );
}
