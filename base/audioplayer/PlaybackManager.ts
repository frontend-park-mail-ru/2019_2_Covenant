/**
 * Represents playback control class.
 * Based on HTML audio tag
 */
class PlaybackManager {
    private _audioElement: HTMLAudioElement;
    private _playIntention: boolean;

    private _endedCallback: () => void;

    constructor() {
        this._audioElement = document.createElement('audio');

        this.ready = this.ready.bind(this);
        this.ended = this.ended.bind(this);

        this.subscribeEvents();
    }

    /** Volume of playback */
    get volume(): number {
        return this._audioElement.volume;
    }

    set volume(value: number) {
        this._audioElement.volume = value;
    }

    /** Callback to be called on playback ended */
    get onEnded(): () => void {
        return this._endedCallback;
    }

    set onEnded(callback: () => void) {
        this._endedCallback = callback;
    }

    load(track: IAudioTrack) {
        this._audioElement.src = track.url;
    }

    play() {
        this._playIntention = true;
        this._audioElement.play();
    }

    pause() {
        this._playIntention = false;
        this._audioElement.pause();
    }

    seekTo(position: number): void {
        this._audioElement.currentTime = position;
    }

    seekToNormalized(value: number): void {
        if (value < 0) {
            value = 0;
        } else if (value > 1) {
            value = 1;
        }

        this._audioElement.currentTime = value * this._audioElement.duration;
    }

    private subscribeEvents() {
        this._audioElement.addEventListener('loadeddata', this.ready);
        this._audioElement.addEventListener('ended', this.ended);
    }

    private unsubscribeEvents() {
        this._audioElement.removeEventListener('loadeddata', this.ready);
        this._audioElement.removeEventListener('ended', this.ended);
    }

    /** Internal event. Happens when playback is ready to be played */
    private ready() {
        if (this._playIntention) {
            this._audioElement.play();
        }
    }

    /** Internal event. Happens when playback is ended */
    private ended() {
        this._endedCallback();
    }
}

export default PlaybackManager;