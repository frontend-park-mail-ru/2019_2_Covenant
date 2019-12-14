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
 * Doubly linked list chain.
 * Helper class for List
 */
class ListNodeChain<T>
implements IListNodeChain<T> {
    /** First node in the chain */
    head: ListNode<T>;
    /** Last node in the chain */
    tail: ListNode<T>;

    /**
     * Creates a wrapper instance over a chain of connected nodes
     * @param head First node in the chain
     * @param tail Last node in the chain
     */
    constructor(head: ListNode<T>, tail: ListNode<T>) {
        this.head = head;
        this.tail = tail;
    }

    get array(): T[] {
        const array: T[] = [];

        this.forEach(node => array.push(node.value));

        return array;
    }

    get nodeArray(): IListNode<T>[] {
        const array: IListNode<T>[] = [];

        this.forEach(node => array.push(node));

        return array;
    }

    forEach(callbackfn: (node: ListNode<T>) => void): void {
        if (!this.head) return;

        let node = this.head;
        do {
            callbackfn(node);
            node = node.next;
        } while (node !== this.tail.next);
    }
}

/**
 * Doubly linked list data structure.
 * Uses ListNode helper class to store values
 */
class List<T> {
    /**
     * Wraps passed value in new node and returns it
     * @param value Value to wrap
     */
    static createNode<T>(value: T): IListNode<T> {
        return new ListNode(value);
    }

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
    forEach(callbackfn: (node: ListNode<T>) => void) {
        if (!this.size) return;

        let node = this._head;
        do {
            callbackfn(node);
        } while (node = node.next);
    }
    
    /**
     * Adds passed values to the front of the list. Returns inserted chain of nodes
     * @param values Values to add
     */
    pushFront(...values: T[]): IListNodeChain<T> {
        const chain = this.createChainFromArray(values);
        if (!chain) return;
            
        this._head ? this.innerConnectNodes(chain.tail, this._head) : this._tail = chain.tail;
        this._head = chain.head;

        return chain;
    }

    /**
     * Adds passed values to the back of the list. Returns inserted chain of nodes
     * @param values Values to add
     */
    pushBack(...values: T[]): IListNodeChain<T> {
        const chain = this.createChainFromArray(values);
        if (!chain) return;

        this._tail ? this.innerConnectNodes(this._tail, chain.head) : this._head = chain.head;
        this._tail = chain.tail;

        return chain;
    }

    /** Removes first element from the list. Returns it */
    popFront(): IListNode<T>|null {
        const res = this.removeSingleScenario();
        if (res.done) {
            return res.node;
        }

        const node = this._head;
        this._head = node.next;

        this.innerDisconnectNodes(node, this._head);

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

        this.innerDisconnectNodes(this._tail, node);

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
            this.innerConnectNodes(node.prev, node.next);
        }

        this.innerClearNodeLinks(node);

        this._storage.delete(node);
    }

    /**
     * Inserts passed node before specified node in the list. Returns success of insertion
     * @param location Location node in the list
     * @param node Node to be inserted
     */
    insertBefore(location: ListNode<T>, node: ListNode<T>): boolean {
        if (!this.locationCheck(location) || node.inserted) {
            return false;
        }

        if (!this.size) {
            this.initWithNode(node);
        } else {
            this.innerInsertBefore(location, node);
            this.innerConnectNodes(node, location);
            this._storage.add(node);
        }

        return true;
    }

    /**
     * Inserts passed node after specified node in the list. Returns success of insertion
     * @param location Location node in the list
     * @param node Node to be inserted
     */
    insertAfter(location: ListNode<T>, node: ListNode<T>): boolean {
        if (!this.locationCheck(location) || node.inserted) {
            return false;
        }

        if (!this.size) {
            this.initWithNode(node);
        } else {
            this.innerInsertAfter(location, node);
            this.innerConnectNodes(location, node);
            this._storage.add(node);
        }
        
        return true;
    }

    /**
     * Inserts passed values before specified node in the list. Returns inserted chain of nodes on success
     * @param location Location node in the list
     * @param values Values to insert
     */
    insertValuesBefore(location: ListNode<T>, ...values: T[]): IListNodeChain<T> {
        if (!this.locationCheck(location)) {
            return null;
        }

        const chain = this.createChainFromArray(values);

        if (!this.size) {
            this.initWithChain(chain);
        } else {
            this.innerInsertBefore(location, chain.head);
            this.innerConnectNodes(chain.tail, location);
        }

        return chain;
    }

    /**
     * Inserts passed values after specified node in the list. Returns inserted chain of nodes on success
     * @param location Location node in the list
     * @param values Values to insert
     */
    insertValuesAfter(location: ListNode<T>, ...values: T[]): IListNodeChain<T> {
        if (!this.locationCheck(location)) {
            return null;
        }

        const chain = this.createChainFromArray(values);

        if (!this.size) {
            this.initWithChain(chain);
        } else {
            this.innerInsertAfter(location, chain.tail);
            this.innerConnectNodes(location, chain.head);
        }

        return chain;
    }

    /** Clears the list */
    clear() {
        delete this._head;
        delete this._tail;

        this._storage.clear();
    }

    /**
     * Merges this list with passed list. Defaults appending passed list to this
     * @param list List to merge with
     * @param backInsertion Append list to the end of this
     */
    mergeList(list: List<T>, backInsertion: boolean = true) {
        list.forEach(node => this._storage.add(node));

        backInsertion? this.innerMergeList(this, list) : this.innerMergeList(list, this);

        list.clear();
    }

    /**
     * Splits this list on passed node. Returns resulting list before node; node; list after node
     * @param node Splitting node
     */
    splitList(node: ListNode<T>): {first: List<T>, node: ListNode<T>, second: List<T>} {
        if (!this.splitListScenario(node)) return null;
        
        const afterList = new List<T>();
        const chain = new ListNodeChain<T>(node.next, this._tail);

        const array: T[] = [];
        chain.forEach(node => {
            this._storage.delete(node);
            afterList._storage.add(node);
        });

        this._tail = node.prev;
        this._storage.delete(node);

        afterList._head = chain.head;
        afterList._tail = chain.tail;

        this.innerDisconnectNodes(node.prev, node);
        this.innerDisconnectNodes(node, node.next);

        return {
            first: this,
            node: node,
            second: afterList,
        };
    }

    /**
     * Creates chain of nodes from the elements of passed array. Returns null if array is empty
     * @param array Source array
     */
    private createChainFromArray(array: T[]): ListNodeChain<T>|null {
        if (!array.length) return null;

        let head = new ListNode(array[0]);
        let tail = head;

        this._storage.add(head);

        for (let i = 1; i < array.length; ++i) {
            const node = new ListNode(array[i]);

            this.innerConnectNodes(tail, node);

            tail = node;

            this._storage.add(node);
        }

        return new ListNodeChain(head, tail);
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

    /** Checks if work with location is possible. Returns legality flag
     * @param location Location node in the list
     */
    private locationCheck(location: ListNode<T>) {
        return this._storage.has(location) || !this.size && !location;
    }

    /**
     * Scenario of consideration of the situation of insertion. Connects node with location->prev if exists
     * @param location Location node in the list
     * @param node Node to nsert
     */
    private innerInsertBefore(location: ListNode<T>, node: ListNode<T>) {
        if (location !== this._head) {
            this.innerConnectNodes(location.prev, node);
        } else {
            this._head = node;
        }
    }

    /**
     * Scenario of consideration of the situation of insertion. Connects node with location->next if exists
     * @param location Location node in the list
     * @param node Node to insert
     */
    private innerInsertAfter(location: ListNode<T>, node: ListNode<T>) {
        if (location !== this._tail) {
            this.innerConnectNodes(node, location.next);
        } else {
            this._tail = node;
        }
    }

    /**
     * Scenarion of splitting list. Returns legacy flag
     * @param node Splitting node
     */
    private splitListScenario(node: ListNode<T>): boolean {
        return this._storage.has(node) && node !== this._head && node !== this._tail;
    }

    /**
     * Connects passed nodes in order: second after first
     * @param first First node
     * @param second Second node
     */
    private innerConnectNodes(first: ListNode<T>, second: ListNode<T>) {
        first.next = second;
        second.prev = first;
    }

    /**
     * Disconnects passed nodes in order: second after first
     * @param first First node
     * @param second Second node
     */
    private innerDisconnectNodes(first: ListNode<T>, second: ListNode<T>) {
        delete first.next;
        delete second.prev;
    }

    /**
     * Merges passed lists in order: second after first
     * @param first First list
     * @param second Second list
     */
    private innerMergeList(first: List<T>, second: List<T>) {
        this.innerConnectNodes(first._tail, second._head);

        first._tail = second._tail;
        second._head = first._head;
    }

    /**
     * Clears links of passed node
     * @param node Node to clear links of
     */
    private innerClearNodeLinks(node: ListNode<T>) {
        delete node.next;
        delete node.prev;
    }

    private initWithNode(node: ListNode<T>) {
        this._head = node;
        this._tail = node;

        this._storage.add(node);
    }

    private initWithChain(chain: ListNodeChain<T>) {
        this._head = chain.head;
        this._tail = chain.tail;
    }
}

export default List;