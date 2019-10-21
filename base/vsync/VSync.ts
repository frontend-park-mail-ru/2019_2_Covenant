class VSync {
    /** Implementation of vsync */
    private _impl: IVSyncImpl;

    /**
     * Creates instance of vsync
     * @param impl Implementation of vsync
     */
    constructor(impl: IVSyncImpl) {
        this._impl = impl;

        this.update = this.update.bind(this);
    }
    
    /** Enables perodic call of update method */
    enable() {
        this._impl.enable(this.update);
    }

    /** Disables perodic call of update method */
    disable() {
        this._impl.disable();
    }

    /**
     * Called on every cycle, if enabled
     * @param dt Time elapsed from the time of previous call
     */
    update(dt: number) {
        console.log(dt);
    }
}

export default VSync;