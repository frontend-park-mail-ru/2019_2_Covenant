import { Looping } from './Looping';

export interface IAudioPlayer {
    /** Currently playing audio track */
    readonly currentPlayback: IPlayback;
    /** Indicates whether player is on playback */
    readonly isPlaying: boolean;

    /** Order of playing */
    shuffle: boolean;
    /** Looping rule */
    looping: Looping;
    /** Volume of playback */
    volume: number;

    /** Plays current playback */
    play(): void;

    /** Pauses current playback */
    pause(): void;

    /** Switches current track to the next in the queue */
    switchNext(): void;

    /** Switches current track to the previous in the queue */
    switchPrev(): void;

    /**
     * Seeks current playback to given position
     * @param position Seek position in seconds
     */
    seekTo(position: number): void;

    /**
     * Seeks current playback to given normalized position
     * @param value Normalized seek position
     */
    seekToNormalized(value: number): void;

    /**
     * Makes given track current
     * @param tracks Audio track to be played
     */
    setTrack(track: IAudioTrack): void;

    /**
     * Makes given playlist current
     * @param playlist Playlist to be played
     * @param head Index of track in playlist to be started with. Defaults to 0
     */
    setPlaylist(playlist: IAudioTrack[], head?: number): void;

    /**
     * Enqueues tracks at the head of the playback queue
     * @param tracks Tracks to enqueue
     */
    enqueueBefore(...tracks: IAudioTrack[]): void;

    /**
     * Enqueues tracks at the tail of the playback queue
     * @param tracks Tracks to enqueue
     */
    enqueueAfter(...tracks: IAudioTrack[]): void;

    /** Clears playback queue */
    clearPlaybackQueue(): void;
}