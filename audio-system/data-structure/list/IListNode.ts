/**
 * External interface of interaction with the node.
 * Forbids interfering with the order of nodes.
 * Can be used as external iterator
 */
export interface IListNode<T> {
    /** Next element in the list. Read-only */
    readonly next?: IListNode<T>;
    /** Previous element in the list. Read-only */
    readonly prev?: IListNode<T>;
    /** Stored value */
    value: T;

    /** Indicates whether node placed in list. Read-only */
    readonly inserted: boolean;
}