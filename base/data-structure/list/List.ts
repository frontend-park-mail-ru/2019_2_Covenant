/**
 * Doubly linked list node.
 * Helper class for List
 */
class ListNode<T>
implements IListNode<T> {
    /** Next element in the list */
    next?: ListNode<T>;
    /** Previous element in the list */
    prev?: ListNode<T>;
    value: T;

    /**
     * Creates node instance, wrapping passed value
     * @param value Value to be wrapped
     */
    constructor(value: T) {
        this.value = value;
    }

    get inserted(): boolean {
        return !!(this.next || this.prev);
    }
}

/**
 * Doubly linked list data structure.
 * Uses ListNode helper class to store values
 */
class List<T> {
    /** First node in the list */
    private _head?: ListNode<T>;
    /** Last node in the list */
    private _tail?: ListNode<T>;
    /** Set of owned nodes */
    private _storage: Set<ListNode<T>> = new Set();

    /** First element in the list. Read-only */
    get front(): IListNode<T>|undefined {
        return this._head;
    }

    /** Last element in the list. Read-only */
    get back(): IListNode<T>|undefined {
        return this._tail;
    }

    /** Number of elements in the list. Read-only */
    get size(): number {
        return this._storage.size;
    }

    /** Creates array of values from the list */
    get array(): T[] {
        const array: T[] = [];
        this.forEach(node => array.push(node.value));

        return array;
    }

    /** Creates array of nodes from the list */
    get nodeArray(): IListNode<T>[] {
        const array: IListNode<T>[] = [];
        this.forEach(node => array.push(node));

        return array;
    }

    /**
     * Performs the specified action for each element in the list
     * @param callbackfn A function that accepts node argument. It's called one time for each element in the list
     */
    forEach(callbackfn: (node: IListNode<T>) => void) {
        if (!this.size) return;

        let node = this._head;
        do {
            callbackfn(node);
        } while (node = node.next);
    }
    
    /**
     * Appends passed values to the front of the list
     * @param values Values to append
     */
    pushFront(...values: T[]) {
        const chain = this.createChainFromArray(values);
        if (!chain) return;
            
        if (this._head) {
            chain.tail.next = this._head;
            this._head.prev = chain.tail;
        } else {
            this._tail = chain.tail;
        }

        this._head = chain.head;
    }

    /**
     * Appends passed values to the back of the list
     * @param values Values to append
     */
    pushBack(...values: T[]) {
        const chain = this.createChainFromArray(values);
        if (!chain) return;

        if (this._tail) {
            chain.head.prev = this._tail;
            this._tail.next = chain.head;
        } else {
            this._head = chain.head;
        }

        this._tail = chain.tail;
    }

    /** Removes first element from the list. Returns it */
    popFront(): IListNode<T>|null {
        const res = this.removeSingleScenario();
        if (res.done) {
            return res.node;
        }

        const node = this._head;
        this._head = node.next;

        delete node.next;
        delete this._head.prev;

        this._storage.delete(node);

        return node;
    }

    /** Removes last element from the list. Returns it */
    popBack(): IListNode<T>|null {
        const res = this.removeSingleScenario();
        if (res.done) {
            return res.node;
        }

        const node = this._tail;
        this._tail = node.prev;

        delete node.prev;
        delete this._tail.next;

        this._storage.delete(node);

        return node;
    }

    /**
     * Removes passed node from the list
     * @param node Node to remove
     */
    remove(node: ListNode<T>) {
        if (!this._storage.has(node) || this.removeSingleScenario().done) {
            return;
        }

        if (node === this._head) {
            delete node.next.prev;
            this._head = node.next;
        } else if (node === this._tail) {
            delete node.prev.next;
            this._tail = node.prev;
        } else {
            node.next.prev = node.prev;
            node.prev.next = node.next;
        }

        delete node.next;
        delete node.prev;

        this._storage.delete(node);
    }

    /**
     * Inserts passed node before specified node in the list. Returns success of insertion
     * @param location Location node in the list
     * @param node Node to be inserted
     */
    insertBefore(location: ListNode<T>, node: ListNode<T>): boolean {
        if (this.errorInsertionScenario(location, node)) {
            return false;
        }

        if (location !== this._head) {
            node.prev = location.prev;
            location.prev.next = node;
        } else {
            this._head = node;
        }
        
        node.next = location;
        location.prev = node;

        this._storage.add(node);

        return true;
    }

    /**
     * Inserts passed node after specified node in the list. Returns success of insertion
     * @param location Location node in the list
     * @param node Node to be inserted
     */
    insertAfter(location: ListNode<T>, node: ListNode<T>): boolean {
        if (this.errorInsertionScenario(location, node)) {
            return false;
        }

        if (location !== this._tail) {
            node.next = location.next;
            location.next.prev = node;
        } else {
            this._tail = node;
        }
        
        node.prev = location;
        location.next = node;

        this._storage.add(node);

        return true;
    }

    /** Clears the list */
    clear() {
        delete this._head;
        delete this._tail;

        this._storage.clear();
    }

    /**
     * Creates chain of nodes from the elements of passed array. Returns null if array is empty
     * @param array Source array
     */
    private createChainFromArray(array: T[]): {head: ListNode<T>, tail: ListNode<T>}|null {
        if (!array.length) return null;

        let head = new ListNode(array[0]);
        let tail = head;

        this._storage.add(head);

        for (let i = 1; i < array.length; ++i) {
            const node = new ListNode(array[i]);

            node.prev = tail;
            tail.next = node;

            tail = node;

            this._storage.add(node);
        }

        return {head, tail};
    }

    /** Scenario of removing node when list size <= 1. Returns scenario completion and removed node */
    private removeSingleScenario(): {done: boolean, node?: ListNode<T>} {
        if (!this.size) {
            return {done: true, node: null};
        } if (this._head === this._tail) {
            const node = this._head;
            this.clear();
            
            return {done: true, node: node};
        }

        return {done: false};
    }

    /**
     * Scenario of checking if insertion is illegal. Returns illegality flag
     * @param location Location node in the list
     * @param node Node to be inserted
     */
    private errorInsertionScenario(location: ListNode<T>, node: ListNode<T>): boolean {
        return !this._storage.has(location) || node.inserted;
    }
}

export default List;