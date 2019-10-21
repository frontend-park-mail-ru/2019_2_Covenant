import Stopwatch from 'base/stopwatch/Stopwatch';

class RAFVSyncImpl
implements IVSyncImpl {
    /** Identifier returned by requestAnimationFrame. Used to be able to cancel request */
    private _rafId: number;
    /** Callback to be called on update */
    private _callback: (dt: number) => void;
    /** Stopwatch used to measure time */
    private _stopwatch: Stopwatch = new Stopwatch();

    constructor() {
        this._update = this._update.bind(this);
    }

    enable(callback: (dt: number) => void) {
        this._callback = callback;
        this._rafId = requestAnimationFrame(this._update);
        this._stopwatch.start();
    }

    disable() {
        cancelAnimationFrame(this._rafId);
    }

    /** Called by requestAnimationFrame */
    private _update() {
        this._callback(this._stopwatch.loop());

        this._rafId = requestAnimationFrame(this._update);
    }
}

export default RAFVSyncImpl;