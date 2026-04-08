/**
 * Simple wrapper around $state to provide getters and setters for accessing primitive state. Also allows to share the singleton state across differernt components.
 */
export class State<T> {
    // instantiating state here so as to intimidate the svelte compiler about the reactivity of this property
    private state = $state<T>() as T;
    constructor(initial: T) {
        this.state = initial;
    }
    public get(): T {
        return this.state;
    }
    public set(value: T): void {
        this.state = value;
    }
}
