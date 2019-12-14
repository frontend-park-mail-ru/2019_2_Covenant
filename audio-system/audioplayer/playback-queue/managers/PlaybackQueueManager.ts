import { IAudioTrack } from 'audioplayer/player';
import {
    StandardPlaybackQueueManager,
    ShufflePlaybackQueueManager,
    IPlaybackQueueManager
} from 'audioplayer/playback-queue/managers';

/**
 * Master playback queue manager.
 * Uses Standard and Shuffle playback queue managers as slaves.
 * Delegates job to slaves.
 */
export class PlaybackQueueManager
implements IPlaybackQueueManager {
    /** Standard playback queue manager. Used in regular mode */
    private _standard: StandardPlaybackQueueManager;
    /** Shuffle playback queue manager. Used in shuffle mode */
    private _shuffle: ShufflePlaybackQueueManager;
    /** Current interface playback queue manager. Entity depends on current mode */
    private _current: IPlaybackQueueManager;

    /** Playback order */
    get shuffle(): boolean {
        return this._current === this._shuffle;
    }

    set shuffle(flag: boolean) {
        if (this.shuffle && flag || !flag && !this.shuffle) return;

        if (flag) { 
            this._shuffle.activate();
            this._current = this._shuffle;
        } else {
            this._shuffle.deactivate();
            this._current = this._standard;
        }
    }

    get size(): number {
        return this._current.size;
    }

    setTrack(track: IAudioTrack): void {
        this._current.setTrack(track);
    }

    setPlaylist(playlist: IAudioTrack[], head: number): void {
        this._current.setPlaylist(playlist, head);
    }

    constructor() {
        this._standard = new StandardPlaybackQueueManager();
        this._shuffle = new ShufflePlaybackQueueManager(this._standard.queue);

        this._current = this._standard;
    }

    enqueueBefore(...tracks: IAudioTrack[]) {
        this._current.enqueueBefore(...tracks);
    }

    enqueueAfter(...tracks: IAudioTrack[]) {
        this._current.enqueueAfter(...tracks);
    }

    restore() {
        this._current.restore();
    }

    dequeue(): IAudioTrack {
        return this._current.dequeue();
    }

    rollback(): IAudioTrack {
        return this._current.rollback();
    }

    clear() {
        this._current.clear();
    }
}