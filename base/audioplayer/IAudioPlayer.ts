interface IAudioPlayer {
    /** Currently playing audio track */
    readonly currentPlayback: IAudioTrack;
    /** Indicates whether player is on playback */
    readonly isPlaying: boolean;
    /** Volume of playback */
    volume: number;

    /** Plays current playback */
    play(): void;
    /** Pauses current playback */
    pause(): void;
    /**
     * Makes given track current
     * @param track Audio track to be played
     */
    setTrack(track: IAudioTrack): void;
    /**
     * Inserts track into playing queue right after current playback before next tracks in playlist
     * @param track Track to enqueue
     */
    enqueueTrackBefore(track: IAudioTrack): void;
    /**
     * Inserts track into playing queue after all next tracks in playlist
     * @param track Track to enqueue
     */
    enqueueTrackAfter(track: IAudioTrack): void;
    /** Clears playing queue */
    clearTrackQueue(): void;
}