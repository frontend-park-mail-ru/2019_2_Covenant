import AudioMimeType from 'base/audioplayer/utilities/AudioMimeType';
import MediaSourceWrapper from 'base/audioplayer/utilities/MediaSourceWrapper';

/**
 * Audio player class implementation.
 * Based on Web Audio API
 */
class AudioPlayerImpl
implements IAudioPlayer {
    /** Wrapping class to work with MediaSource API */
    private _wrapper: MediaSourceWrapper;
    /** HTML audio element to work with music */
    private _audioElement: HTMLAudioElement;

    constructor() {
        this._wrapper = new MediaSourceWrapper(AudioMimeType.mpeg);

        this._audioElement = document.createElement('audio');
        this._audioElement.src = this._wrapper.url;
    }

    currentPlayback: IAudioTrack;

    get isPlaying(): boolean {
        return !this._audioElement.paused;
    }
    
    get volume(): number {
        return this._audioElement.volume
    }

    set volume(value: number) {
        this._audioElement.volume = value;
    }

    play(): void {
        this._audioElement.play();
    }
    pause(): void {
        this._audioElement.pause();
    }
    setTrack(track: IAudioTrack): void {
        throw new Error("Method not implemented.");
    }
    enqueueTrackBefore(track: IAudioTrack): void {
        throw new Error("Method not implemented.");
    }
    enqueueTrackAfter(track: IAudioTrack): void {
        throw new Error("Method not implemented.");
    }
    clearTrackQueue(): void {
        throw new Error("Method not implemented.");
    }
}

export default AudioPlayerImpl;