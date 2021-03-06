import { IAudioTrack } from 'audioplayer/player';

/**
 * Interface of object that manages playback queue
 */
export interface IPlaybackQueueManager {
    readonly size: number;

    /**
     * Makes specified track current
     * @param track Track to set
     */
    setTrack(track: IAudioTrack): void;

    /**
     * Enqueues playlist at the head of the queue from the specified head
     * @param playlist 
     * @param head 
     */
    setPlaylist(playlist: IAudioTrack[], head: number): void;

    /**
     * Enqueues tracks at the head of the queue
     * @param tracks Tracks to enqueue
     */
    enqueueBefore(...tracks: IAudioTrack[]): void;

    /**
     * Enqueues tracks at the head of the queue
     * @param tracks Tracks to enqueue
     */
    enqueueAfter(...tracks: IAudioTrack[]): void;

    restore(): void;

    /** Returns head of the queue. Shifts it */
    dequeue(): IAudioTrack;

    /** Rolls back the queue by one position. Returns rolled track */
    rollback(): IAudioTrack;

    /** Clears playlist queue */
    clear(): void;
}