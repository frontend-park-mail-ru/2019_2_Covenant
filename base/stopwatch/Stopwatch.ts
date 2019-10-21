class Stopwatch {
    /** Time point used to measure elapsed time */
    private _timePoint: number;

    /** Starts measuring time */
    start() {
        this._timePoint = new Date().getTime();
    }

    /** Returns elapsed time (ms) from the previous measure */
    loop(): number {
        const elapsed = new Date().getTime() - this._timePoint;
        this._timePoint += elapsed;

        return elapsed;
    }
}

export default Stopwatch;