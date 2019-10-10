interface IUpdaterImpl {
    /**
     * Requests to perform update on next cycle. Should be called not more than once per cycle
     * @param callback Update callback which is to be called
     */
    requestUpdate(callback: () => void): void;
    /** Cancels requested update */
    cancelUpdate(): void;
}