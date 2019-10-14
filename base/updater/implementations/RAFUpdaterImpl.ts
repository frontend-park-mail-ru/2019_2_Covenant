/**
 * Implementation of updater.
 * Based on embedded browser function 'requestAnimationFrame'
 */
class RAFUpdaterImpl
implements IUpdaterImpl {
    /** Identifier returned by requestAnimationFrame. Used to be able to cancel request */
    private _rafId: number;
    /** Update callback */
    private _callback: () => void;

    constructor() {
        this._update = this._update.bind(this);
    }

    requestUpdate(callback: () => void) {
        this._callback = callback;
        this._rafId = requestAnimationFrame(this._update);
    }

    cancelUpdate() {
        cancelAnimationFrame(this._rafId);
    }

    /** Called by requestAnimationFrame */
    private _update() {
        this._callback();
    }
}

export default RAFUpdaterImpl;