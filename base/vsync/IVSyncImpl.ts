interface IVSyncImpl {
    /**
     * Starts periodic calling callback
     * @param callback Callback to be called
     */
    enable(callback: (dt: number) => void): void;
    /** Stops calling current callback */
    disable(): void;
}