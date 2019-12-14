import PlaybackQueue from 'player/audioplayer/playback-queue/queues/PlaybackQueue';
import List from 'player/data-structure/list/List';

/**
 * Standard playback queue manager.
 * Serves regular playback queue
 */
class StandardPlaybackQueueManager
implements IPlaybackQueueManager {
    /** Regular playback queue */
    private _queue: PlaybackQueue;

    get queue(): PlaybackQueue {
        return this._queue;
    }

    get size(): number {
        return this._queue.size;
    }

    constructor() {
        this._queue = new PlaybackQueue();
    }

    setTrack(track: IAudioTrack): void {
        if (this._queue.current) {
            this._queue.behind.insertAfter(this._queue.behind.back, this._queue.current);
        }

        this._queue.current = List.createNode(track);
    }

    setPlaylist(playlist: IAudioTrack[], head: number): void {
        const behind = playlist.slice(0, head);
        const ahead = playlist.slice(head + 1);

        if (this._queue.current) {
            this._queue.behind.insertAfter(this._queue.behind.back, this._queue.current);
        }

        this._queue.behind.pushBack(...behind);
        this._queue.ahead.pushFront(...ahead);

        this._queue.current = List.createNode(playlist[head]);
    }

    enqueueBefore(...tracks: IAudioTrack[]): void {
        this._queue.ahead.pushFront(...tracks);
    }

    enqueueAfter(...tracks: IAudioTrack[]): void {
        this._queue.ahead.pushBack(...tracks);
    }

    restore() {
        this._queue.restore();
    }

    dequeue(): IAudioTrack {
        const trackNode = this._queue.ahead.popFront();
        if (!trackNode) return null;

        if (this._queue.current) {
            this._queue.behind.insertAfter(this._queue.behind.back, this._queue.current);
        }
        this._queue.current = trackNode;

        return trackNode.value;
    }

    rollback(): IAudioTrack {
        const trackNode = this._queue.behind.popBack();
        if (!trackNode) return null;

        if (this._queue.current) {
            this._queue.ahead.insertBefore(this._queue.ahead.front, this._queue.current);
        }
        this._queue.current = trackNode;

        return trackNode.value;
    }

    clear(): void {
        this._queue.clear();
    }
}

export default StandardPlaybackQueueManager;