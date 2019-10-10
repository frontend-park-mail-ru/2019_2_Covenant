class RAFUpdaterImpl
implements IUpdaterImpl {
    /** Identifier returned by requestAnimationFrame. Used to be able to cancel request */
    private _rafId: number;

    requestUpdate(callback: () => void) {
        this._rafId = requestAnimationFrame(callback);
    }

    cancelUpdate() {
        cancelAnimationFrame(this._rafId);
    }
}

export default RAFUpdaterImpl;