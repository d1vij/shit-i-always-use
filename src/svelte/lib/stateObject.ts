import { mapEntries } from "radashi";
import { State } from "./State.svelte";

/**
 * Creates an immutable object with values as {@link State} object containing getter and setter for accessing the said state.
 * @param states
 * Object containing initial values for states
 * @returns
 * Object containing readonly properties with values as {@link State} objects
 */
export function stateObject<O extends Record<string, unknown>>(
    states: O,
): {
    readonly [K in keyof O]: State<O[K]>;
} {
    return mapEntries(states, (key, value) => [key, new State(value)]) as {
        readonly [K in keyof O]: State<O[K]>;
    };
}
