/**
 * Abstract type reprenseting a `setState` function
 * @example
 * const [count, setCount] = useState(0);
 * function incrementCount(setter: StateSetterFunction<number>) {
 *		setter(c => c + 1); // c is of type number
 * }
 * incrementCount(setCount);
 */
export type StateSetterFunction<T> = React.Dispatch<React.SetStateAction<T>>;

/**
 * Type closure which extends existing object type with React _children_ props
 * @example
 * // consider props of some component Foo
 * type FooProps = {
 *	 bar: number
 * };
 *
 * // now if component foo wants to accept all valid react children
 * type FooChildrenProps = PropsWithChildren<FooProps>
 */
export type PropsWithChildren<Props extends object> = {
    [K in keyof Props]: Props[K];
} & {
    children: React.ReactNode;
};

/**
 * Type for representing a object created with _useRef_ hook.
 * @example
 * const myRef = useRef<number>(0);
 * function printRef(ref: ReactRef<number>){
 *	  console.log(ref.current);
 * }
 */
export type ReactRef<T> = React.RefObject<T>;
