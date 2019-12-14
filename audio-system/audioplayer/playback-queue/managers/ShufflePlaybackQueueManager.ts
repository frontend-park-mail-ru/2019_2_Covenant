import { PlaybackQueue, ListNodePlaybackQueue } from 'audioplayer/playback-queue/queues';
import { IPlaybackQueueManager } from './IPlaybackQueueManager';
import { IAudioTrack } from 'audioplayer/player';
import { shuffle } from 'data-structure/array';
import { List } from 'data-structure/list';

/**
 * Shuffle playback queue manager.
 * Serves shuffle playback queue.
 * Maintains syncronization with regular queue
 */
export class ShufflePlaybackQueueManager
implements IPlaybackQueueManager {
    /** Regular playback queue */
    private _regular: PlaybackQueue;
    /** Shuffle playback queue */
    private _shuffle: ListNodePlaybackQueue;

    /**
     * Creates instance of shuffle playback queue manager
     * @param regular Reference to regular playback queue
     */
    constructor(regular: PlaybackQueue) {
        this._regular = regular;
        this._shuffle = new ListNodePlaybackQueue();
    }

    get size(): number {
        return this._shuffle.size;
    }

    /** Activates shuffle playback order. Restores regular queue state */
    activate() {
        const regCurrent = this._regular.current;

        const arrayBefore = this._regular.behind.nodeArray;
        const arrayAfter = this._regular.ahead.nodeArray;
        this._shuffle.ahead.pushFront(...shuffle(arrayBefore.concat(arrayAfter)));

        this._regular.restore();

        if (regCurrent) {
            this._shuffle.current = List.createNode(regCurrent);
        }
    }

    /** Deactivates shuffle playback order. Sets regular queue current track position */
    deactivate() {
        const node = this._shuffle.current;
        if (node) {
            this._regular.setPositionNode(node.value)
        }

        this._shuffle.clear();
    }

    setTrack(track: IAudioTrack): void {
        throw new Error("Method not implemented.");
    }

    setPlaylist(playlist: IAudioTrack[], head: number): void {
        throw new Error("Method not implemented.");
    }

    enqueueBefore(...tracks: IAudioTrack[]): void {
        const chain = this._regular.ahead.insertValuesAfter(this._shuffle.current.value, ...tracks);
        this._shuffle.ahead.pushFront(...chain.nodeArray);
    }

    enqueueAfter(...tracks: IAudioTrack[]): void {
        const chain = this._regular.ahead.pushBack(...tracks);
        this._shuffle.ahead.pushBack(...chain.nodeArray);
    }

    restore() {
        this._shuffle.restore();
    }

    dequeue(): IAudioTrack|null {
        const trackNode = this._shuffle.ahead.popFront();
        if (!trackNode) return null;

        if (this._shuffle.current) {
            this._shuffle.behind.insertAfter(this._shuffle.behind.back, this._shuffle.current);
        }
        this._shuffle.current = trackNode;

        return trackNode.value.value;
    }

    rollback(): IAudioTrack|null {
        const trackNode = this._shuffle.behind.popBack();
        if (!trackNode) return null;

        if (this._shuffle.current) {
            this._shuffle.ahead.insertBefore(this._shuffle.ahead.front, this._shuffle.current);
        }
        this._shuffle.current = trackNode;

        return trackNode.value.value;
    }
    
    clear(): void {
        this._regular.clear();
        this._shuffle.clear();
    }
}