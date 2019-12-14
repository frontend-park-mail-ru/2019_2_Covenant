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
        return this._audioElement.currentTime / this._audioElement.duration;
    }

    /** Callback to be called on playback ended */
    get onEnded(): () => void {
        return this._endedCallback;
    }

    set onEnded(callback: () => void) {
        if (callback) {
            this.subscribeEvent('ended', callback);
        } else {
            this.unsubscribeEvent('ended', callback);
        }

        this._endedCallback = callback;
    }

    /** Callback to be called on time updates */
    get onTimeUpdate(): () => void {
        return this._timeUpdateCallback;
    }

    set onTimeUpdate(callback: () => void) {
        if (callback) {
            this.subscribeEvent('timeupdate', callback);
        } else {
            this.unsubscribeEvent('timeupdate', callback);
        }

        this._timeUpdateCallback = callback;
    }

    load(track: IAudioTrack) {
        this._currentTrack = track;
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

    private subscribeEvent(event: string, callback: () => void) {
        this._audioElement.addEventListener(event, callback);
    }

    private unsubscribeEvent(event: string, callback: () => void) {
        this._audioElement.removeEventListener(event, callback);
    }

    /** Internal event. Happens when playback is ready to be played. */
    private ready() {
        if (this._playIntention) {
            this._audioElement.play();
        }
    }
}