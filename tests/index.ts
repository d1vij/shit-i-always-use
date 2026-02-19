//@ts-nocheck

import type { PropsWithChildren } from "../src/react/types";

type p = {
    a: number;
    b: string;
};

type mutatedP = PropsWithChildren<p>;
