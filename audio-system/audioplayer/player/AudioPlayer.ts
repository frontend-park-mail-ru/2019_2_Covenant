import { PlaybackQueueManager } from 'audioplayer/playback-queue/managers';
import { PlaybackManager } from 'audioplayer/playback/PlaybackManager';
import { IAudioTrack } from 'audioplayer/player/IAudioTrack';
import { Looping } from 'audioplayer/playback/Looping';

/**
 * AudioPlayer class represents audio
 * system used for playing and queueing
 * tracks; controlling playback.
 */
export class AudioPlayer {
    /** @private */
    private _looping: Looping;
    /** @private */
    private _playback: PlaybackManager;
    /** @private */
    private _playbackQueue: PlaybackQueueManager;
    /** @private */
    private _queued: boolean;

    /**
     * Creates AudioPlayer instance.
     * @param loopingRule Playback looping rule.
     */
    constructor(loopingRule: Looping = Looping.none) {
        this._playbackQueue = new PlaybackQueueManager();
        this._playback = new PlaybackManager();
        this._queued = false;
        this.looping = loopingRule;
    }

    /** 
     * Indicates whether player is on playback.
     */
    get isPlaying(): boolean {
        return this._playback.isPlaying;
    }

    /** 
     * Indicates whether playback is shuffled.
     */
    get shuffle(): boolean {
        return this._playbackQueue.shuffle;
    }

    set shuffle(flag: boolean) {
        this._playbackQueue.shuffle = flag;
    }

    /**
     * Playback looping rule.
     */
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

    /**
     * Playback volume.
     */
    get volume(): number {
        return this._playback.volume;
    }

    set volume(value: number) {
        this._playback.volume = value;
    }

    /**
     * Absolute playback positions in seconds. Read-only.
     */
    get position(): number {
        return this._playback.position;
    }

    /**
     * Normalized playback position in seconds. Read-only.
     */
    get normalizedPosition(): number {
        return this._playback.normalizedPosition;
    }

    /**
     * Starts playback.
     */
    play(): void {
        this._playback.play();
    }

    /**
     * Stops playback.
     */
    pause(): void {
        this._playback.pause();
    }

    /**
     * Switches current track over specified number of tracks in the queue. Negative values means switch backwards.
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

    /**
     * Switches current track to the next in the queue.
     */
    switchNext(): void {
        const track = this._playbackQueue.dequeue();

        if (track) {
            this._playback.load(track);
        } else {
            this.queueEnded();
        }
    }

    /** 
     * Switches current track to the previous in the queue.
     */
    switchPrev(): void {
        const track = this._playbackQueue.rollback();

        if (track) {
            this._playback.load(track);
        } else {
            this.seekToNormalized(0);
        }
    }

    /**
     * Seeks current playback to absolute given position.
     * @param position Seek position in seconds
     */
    seekTo(position: number): void {
        this._playback.seekTo(position);
    }

    /**
     * Seeks current playback to given normalized position.
     * @param value Normalized seek position. Range: [0, 1].
     */
    seekToNormalized(value: number): void {
        this._playback.seekToNormalized(value);
    }

    /**
     * Makes specified track current.
     * @param tracks Audio track to play.
     */
    setTrack(track: IAudioTrack): void {
        this._playback.load(track);

        if (!this._queued) {
            this.clearPlaybackQueue();
        }
        this._playbackQueue.setTrack(track);
    }

    /**
     * Makes given playlist current.
     * @param playlist Playlist to play.
     * @param head Index of track in playlist to be started with. Defaults to 0.
     */
    setPlaylist(playlist: IAudioTrack[], head: number = 0): void {
        if (head >= playlist.length) return;

        this._playback.load(playlist[head]);

        if (!this._queued) {
            this.clearPlaybackQueue();
        }
        this._playbackQueue.setPlaylist(playlist, head);
    }

    /**
     * Enqueues tracks at the head of the playback queue.
     * @param tracks Tracks to enqueue.
     */
    enqueueBefore(...tracks: IAudioTrack[]): void {
        this._playbackQueue.enqueueBefore(...tracks);
        this._queued = true;
    }

    /**
     * Enqueues tracks at the tail of the playback queue.
     * @param tracks Tracks to enqueue.
     */
    enqueueAfter(...tracks: IAudioTrack[]): void {
        this._playbackQueue.enqueueAfter(...tracks);
        this._queued = true;
    }
    
    /**
     * Clears playback queue.
     */
    clearPlaybackQueue(): void {
        this._playbackQueue.clear();
        this._queued = false;
    }

    /** @private */
    private queueEnded() {
        if (this._playbackQueue.size) {
            this._playbackQueue.restore();
            this.switchNext();
        }
    }
}