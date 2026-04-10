import type { Attachment } from "svelte/attachments";
import { on } from "svelte/events";

/**
 * Class containing the state logic for group hovering.
 * Each unique group has a common HoverGroupState instance.
 */
export class HoverGroupState {
    private _hovering = $state<boolean>(false);
    get hovering(): boolean {
        return this._hovering;
    }
    private timeoutId: ReturnType<typeof setTimeout> | null = null;

    private readonly idleTimeoutDuration: number;
    constructor(idleTimeoutDuration: number = 500) {
        this.idleTimeoutDuration = idleTimeoutDuration;
    }

    private clearTimeout() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }

    public mouseEnter(): void {
        this.clearTimeout();
        this._hovering = true;
    }

    public mouseLeave(): void {
        this.clearTimeout();
        this.timeoutId = setTimeout(() => {
            this._hovering = false;
        }, this.idleTimeoutDuration);
    }
}

export type HoverGroupConfig = {
    /**
     * Milliseconds after which the hover state would be triggered to `true`.
     * @default 1000
     */
    triggerDuration?: number;

    /**
     * Milliseconds after the cursor leaving any active node the group hover state becomes inactive
     * @default 500
     */
    groupIdleDuration?: number;
};

export type CreateHoverGroupNodeReturn<H extends EventTarget = Element> = {
    /**
     * Readonly state indicating whether the current node is hovered
     */
    readonly isHovering: boolean;
    /**
     * Attachment to bind to a html node
     */
    readonly attachment: Attachment<H>;
};

/**
 * Used to add a new node to the hover group defined by passed {@link HoverGroupState}
 * @param hoverGroupState
 * @returns {@link CreateHoverGroupNodeReturn}
 * @example
 *
 * // States.svelte.ts
 * export const hoverGroup = new HoverGroupState();
 *
 *
 * // Component.svelte
 * <script lang="ts">
 * import {hoverGroup} from "$/lib/States.svelte"
 * const node = createHoverGroupNode(hoverGroup);
 * </script>
 *
 *
 * <button {@attach node.attachment}>
 *      Hover Me
 * </button>
 * {#if node.isHovering}
 *      <span> Hovered </span>
 * {/if}
 */
export function createHoverGroupNode<H extends EventTarget = Element>(
    hoverGroupState: HoverGroupState,
    triggerDuration: number = 1000,
): CreateHoverGroupNodeReturn<H> {
    let isHovering = $state(false);
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const attachment: Attachment<H> = (node) => {
        const offEnter = on(node, "mouseenter", () => {
            // if we are already hovering some node from the group, then reveal self immediately
            if (hoverGroupState.hovering) {
                isHovering = true;

                // clear the timeout created when leaving the previous node of the same group
                hoverGroupState.mouseEnter();
            }
            // else reveal after a delay
            else {
                timeoutId = setTimeout(() => {
                    isHovering = true;
                    hoverGroupState.mouseEnter();
                }, triggerDuration);
            }
        });

        const offLeave = on(node, "mouseleave", () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
            isHovering = false;
            hoverGroupState.mouseLeave();
        });

        return () => {
            offEnter();
            offLeave();
            if (timeoutId) clearTimeout(timeoutId);
        };
    };

    return {
        // use a getter to make the returned value reactive
        get isHovering() {
            return isHovering;
        },
        attachment,
    };
}

/**
 * Automatically create and manage the {@link HoverGroupState} and create new Nodes via a function.
 * @param config {@link HoverGroupConfig}
 * @returns
 * Function to create new Nodes
 *
 * @example
 * // State.svelte.ts
 * export const createNode = createHoverGroup();
 * // Component.svelte
 *
 * <script lang="ts">
 * import {createNote} from "$/lib/State.svelte"
 * const node = createNode();
 * </script>
 *
 *
 * <button {@attach node.attachment}>
 *      Hover Me
 * </button>
 * {#if node.isHovering}
 *      <span> Hovered </span>
 * {/if}
 */
export function createHoverGroup(
    config?: HoverGroupConfig,
): () => CreateHoverGroupNodeReturn {
    const groupState = new HoverGroupState(config?.groupIdleDuration);
    return <T extends EventTarget = Element>() =>
        createHoverGroupNode<T>(groupState, config?.triggerDuration);
}
