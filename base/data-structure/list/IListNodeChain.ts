/**
 * External interface of interaction with the chain of nodes.
 * Forbids interfering with the order of nodes
 */
interface IListNodeChain<T> {
    /** First node in the chain. Read-only */
    readonly head: IListNode<T>;
    /** Last node in the chain. Read-only */
    readonly tail: IListNode<T>;

    /** Creates array of values from the chain */
    readonly array: T[];
    /** Creates array of nodes from the chain */
    readonly nodeArray: IListNode<T>[];

    /**
     * Performs the specified action for each element in the list
     * @param callbackfn A function that accepts node argument. It's called one time for each element in the list
     */
    forEach(callbackfn: (node: IListNode<T>) => void): void;
}