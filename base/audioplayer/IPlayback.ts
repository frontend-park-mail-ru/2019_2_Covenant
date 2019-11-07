interface IPlayback {
    /** Duration of track in seconds */
    readonly duration: number;
    /** Track playback position in seconds */
    readonly position: number;
    /** Track playback normalized position */
    readonly normalizedPosition: number;
    /** Track on playback */
    readonly track: IAudioTrack;
}