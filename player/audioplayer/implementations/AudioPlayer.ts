import PlaybackQueueManager from 'player/audioplayer/implementations/@base/audioplayer/playback-queue/managers/PlaybackQueueManager';
import PlaybackManager from 'player/audioplayer/PlaybackManager';
import { Looping } from '../Looping';
import { IAudioPlayer } from '../IAudioPlayer';

/**
 * Audio player implementation
 */
class AudioPlayer
implements IAudioPlayer {
    private _playbackQueue: PlaybackQueueManager;
    private _playback: PlaybackManager;
    private _looping: Looping;
    private _queued: boolean;

    constructor(loopingRule: Looping = Looping.none) {
        this._playbackQueue = new PlaybackQueueManager();

        this._playback = new PlaybackManager();
        this.looping = loopingRule;
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
        switch (rule) {
            case Looping.single:
                this._playback.onEnded = () => {
                    this._playback.play();
                };
                break;
            case Looping.queue:
                this._playback.onEnded = () => {
                    const track = this._playbackQueue.dequeue();
        
                    if (track) {
                        this._playback.load(track);
                    } else {
                        this.queueEnded();
                    }
                };
                break;
            case Looping.none:
                this._playback.onEnded = () => {
                    const track = this._playbackQueue.dequeue();
        
                    if (track) {
                        this._playback.load(track);
                    } else {
                        this.pause();
                    }
                };
                break;
        } 
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

    /**
     * Switches over specified number of tracks. Negative values means switch backwards.
     * @param offset Number of tracks.
     */
    switchOver(offset: number) {
        if (!offset) return;

        let switchFunc: () => IAudioTrack;
        if (offset > 0) {
            switchFunc = this._playbackQueue.dequeue.bind(this._playbackQueue);
        } else {
            switchFunc = this._playbackQueue.rollback.bind(this._playbackQueue);
        }

        let track: IAudioTrack;
        const n = Math.abs(offset);
        for (let i = 0; i < n; ++i) {
            const newTrack = switchFunc();
            if (!newTrack) {
                break;
            }
            track = newTrack;
        }

        if (track) {
            this._playback.load(track);
        }
    }

    switchNext(): void {
        const track = this._playbackQueue.dequeue();

        if (track) {
            this._playback.load(track);
        } else {
            this.queueEnded();
        }
    }

    switchPrev(): void {
        const track = this._playbackQueue.rollback();

        if (track) {
            this._playback.load(track);
        } else {
            this.seekToNormalized(0);
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

    private queueEnded() {
        if (this._playbackQueue.size) {
            this._playbackQueue.restore();
            this.switchNext();
        }
    }
}

export default AudioPlayer;