class Updater {
    /** Indicates whether update will be performed on next cycle */
    private _updates: boolean = false;
    /** Queue of tasks. Will be completed on next cycle */
    private _queue: Array<() => void> = [];

    constructor() {

    }

    /** Adds task to the queue to be performed on next cycle */
    enqueue(task: () => void) {
        this._updates = true;
        this._queue.push(task);
    }

    /** Clears the queue. Cancels update's call on next cycle */
    clearQueue() {
        this._queue = [];
    }

    /** Performs all tasks from the queue and clears it. Called automatically at the time of update */
    update() {
        this._queue.forEach(task => task());

        this.clearQueue();
        this._updates = false;
    }
}

export default Updater;