import PlaybackQueueManager from 'base/audioplayer/playback-queue/managers/PlaybackQueueManager';
import PlaybackManager from 'base/audioplayer/PlaybackManager';

/**
 * Audio player implementation
 */
class AudioPlayer
implements IAudioPlayer {
    private _playbackQueue: PlaybackQueueManager;
    private _playback: PlaybackManager;
    private _looping: Looping;
    private _queued: boolean;

    constructor() {
        this._playbackQueue = new PlaybackQueueManager();

        this._playback = new PlaybackManager();
        this._playback.onEnded = () => {
            const track = this._playbackQueue.dequeue();

            if (track) {
                this._playback.load(track);
            }
        };
    }

    get currentPlayback(): IPlayback {
        throw new Error('not implemented');
    }

    get isPlaying(): boolean {
        throw new Error('not implemented');
    }

    get shuffle(): boolean {
        return this._playbackQueue.shuffle;
    }

    set shuffle(flag: boolean) {
        this._playbackQueue.shuffle = flag;
    }

    get looping(): Looping {
        return this._looping;
    }

    set looping(rule: Looping) {
        this._looping = rule;
    }

    get volume(): number {
        return this._playback.volume;
    }

    set volume(value: number) {
        this._playback.volume = value;
    }

    play(): void {
        this._playback.play();
    }

    pause(): void {
        this._playback.pause();
    }

    switchNext(): void {
        const track = this._playbackQueue.dequeue();

        if (track) {
            this._playback.load(track);
        }
    }

    switchPrev(): void {
        const track = this._playbackQueue.rollback();

        if (track) {
            this._playback.load(track);
        }
    }

    seekTo(position: number): void {
        this._playback.seekTo(position);
    }

    seekToNormalized(value: number): void {
        this._playback.seekToNormalized(value);
    }

    setTrack(track: IAudioTrack): void {
        this._playback.load(track);

        if (!this._queued) {
            this.clearPlaybackQueue();
        }
        this._playbackQueue.setTrack(track);
    }

    setPlaylist(playlist: IAudioTrack[], head: number = 0): void {
        if (head >= playlist.length) return;

        this._playback.load(playlist[head]);

        if (!this._queued) {
            this.clearPlaybackQueue();
        }
        this._playbackQueue.setPlaylist(playlist, head);
    }

    enqueueBefore(...tracks: IAudioTrack[]): void {
        this._playbackQueue.enqueueBefore(...tracks);
        this._queued = true;
    }

    enqueueAfter(...tracks: IAudioTrack[]): void {
        this._playbackQueue.enqueueAfter(...tracks);
        this._queued = true;
    }
    
    clearPlaybackQueue(): void {
        this._playbackQueue.clear();
        this._queued = false;
    }
}

export default AudioPlayer;