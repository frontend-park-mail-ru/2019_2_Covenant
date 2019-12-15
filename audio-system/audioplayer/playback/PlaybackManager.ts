import { IAudioTrack } from 'audioplayer/player';

/**
 * Represents playback control class.
 * Based on HTML audio tag
 */
export class PlaybackManager {
    private _audioElement: HTMLAudioElement;
    private _currentTrack: IAudioTrack;
    private _playIntention: boolean;

    private _endedCallback: () => void;
    private _timeUpdateCallback: () => void;
    private _trackChangedCallback: () => void;

    constructor() {
        this._audioElement = document.createElement('audio');
        this._audioElement.addEventListener('loadeddata', this.ready.bind(this));
    }

    get current(): IAudioTrack {
        return this._currentTrack;
    }

    get isPlaying(): boolean {
        return !this._audioElement.paused;
    }

    /** Volume of playback */
    get volume(): number {
        return this._audioElement.volume;
    }

    set volume(value: number) {
        this._audioElement.volume = value;
    }

    get position(): number {
        return this._audioElement.currentTime;
    }

    get normalizedPosition(): number {
        const pos = this._audioElement.currentTime / this._audioElement.duration;
        return pos ? pos : 0;
    }

    /** Callback to be called on playback ended */
    get onEnded(): () => void {
        return this._endedCallback;
    }

    set onEnded(callback: () => void) {
        if (callback) {
            this._audioElement.addEventListener('ended', callback);
        } else {
            this._audioElement.removeEventListener('ended', this._endedCallback);
        }

        this._endedCallback = callback;
    }

    /** Callback to be called on time updates */
    get onTimeUpdate(): () => void {
        return this._timeUpdateCallback;
    }

    set onTimeUpdate(callback: () => void) {
        if (callback) {
            this._audioElement.addEventListener('timeupdate', callback);
        } else {
            this._audioElement.removeEventListener('timeupdate', this._timeUpdateCallback);
        }

        this._timeUpdateCallback = callback;
    }

    get onTrackChanged(): () => void {
        return this._trackChangedCallback;
    }

    set onTrackChanged(callback: () => void) {
        this._trackChangedCallback = callback;
    }

    load(track: IAudioTrack) {
        this._currentTrack = track;
        this._audioElement.src = track.url;

        if (this._trackChangedCallback) {
            this._trackChangedCallback();
        }
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

    /** Internal event. Happens when playback is ready to be played. */
    private ready() {
        if (this._playIntention) {
            this._audioElement.play();
        }
    }
}