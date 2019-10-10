class Updater {
    /** Indicates whether update will be performed on next cycle */
    private _updates: boolean = false;
    /** Queue of tasks. Will be completed on next cycle */
    private _queue: Array<() => void> = [];
    /** Implementation of updater */
    private _impl: IUpdaterImpl;

    /**
     * Creates instance of updater
     * @param impl Implementation of updater
     */
    constructor(impl: IUpdaterImpl) {
        this._impl = impl;

        this.update = this.update.bind(this);
    }

    /** Adds task to the queue to be performed on next cycle */
    enqueue(task: () => void) {
        if (!this._updates) {
            this._updates = true;
            this._impl.requestUpdate(this.update);
        }

        this._queue.push(task);
    }

    /** Clears the queue. Cancels update's call on next cycle */
    clearQueue() {
        this._queue = [];

        if (this._updates) {
            this._impl.cancelUpdate();
        }
    }

    /** Performs all tasks from the queue and clears it. Called automatically at the time of update */
    update() {
        this._queue.forEach(task => task());

        this._updates = false;
        this.clearQueue();
    }
}

export default Updater;