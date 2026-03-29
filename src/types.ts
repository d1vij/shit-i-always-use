/**
 * Expands a type in hover preview
 */
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;


/**
 * Returns the keys from a Object-like which have the values of provided type
 */
export type KeysWithValueAsType<M, V> = Extract<
    {
        [K in keyof M]: M[K] extends V ? K : never;
    }[keyof M],
    string
>;

/**
 * Primitives which are compareable. You cant compare `object` types with each other
 */
export type ComparableType = string | number | bigint | boolean;

/**
 * The keys from an Object-like which are of type {@link ComparableType}
 */
export type KeysWithComparableValue<T> = {
    [K in keyof T]: T[K] extends ComparableType ? K : never;
}[keyof T];