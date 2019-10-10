class EventBus {
    private _channels: Map<string, Set<(data: {}) => void>> = new Map();

    /**
     * Subscribes on named channel. If channel doesn't exist, creates it
     * @param channelName Name of channel to subscribe
     * @param callback Callback on publish
     */
    subscribe(channelName: string, callback: (data: {}) => void) {
        let channel = this._channels.get(channelName);
        if (!channel) {
            channel = new Set();
            this._channels.set(channelName, channel);
        }

        channel.add(callback);
    }

    /**
     * Unsubscribes from named channel. Returns true if unsubscription was successful
     * @param channelName Name of channel to unsubscribe
     * @param callback Callback used to subscribe
     */
    unsubscribe(channelName: string, callback: (data: {}) => void): boolean {
        const channel = this._channels.get(channelName);
        if (!channel || !channel.size) {
            return;
        }

        return channel.delete(callback);
    }

    /**
     * Emits all callbacks subscribed to named channel
     * @param channelName Name of channel to emit
     * @param data Data to pass to callback
     */
    publish(channelName: string, data: {}) {
        const channel = this._channels.get(channelName);
        if (!channel || !channel.size) {
            return;
        }

        channel.forEach(callback => callback(data));
    }
}

export default EventBus;