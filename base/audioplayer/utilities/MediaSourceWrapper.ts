import AudioMimeType from 'base/audioplayer/utilities/AudioMimeType';

/**
 * Media source wrapping class.
 * Simplifies work with MediaSource API
 */
class MediaSourceWrapper {
    private _mediaSource: MediaSource;
    private _mediaSourceUrl: string;
    private _sourceBuffer: SourceBuffer;
    private _mimeType: AudioMimeType;

    /**
     * Creates media source wrapper object
     * @param mimeType MIME type of audio files
     */
    constructor(mimeType: AudioMimeType) {
        this.bindMethods();

        this._mimeType = mimeType;

        this.initMediaSource();
    }

    /** Generated media source url */
    get url(): string {
        return this._mediaSourceUrl;
    }

    private bindMethods() {
        this.sourceOpen = this.sourceOpen.bind(this);
        this.sourceClose = this.sourceClose.bind(this);
    }

    private initMediaSource() {
        this._mediaSource = new MediaSource();
        this._mediaSource.addEventListener('sourceopen', this.sourceOpen);
        this._mediaSource.addEventListener('sourceclose', this.sourceClose);

        this._mediaSourceUrl = URL.createObjectURL(this._mediaSource);
    }

    private sourceOpen() {
        this._sourceBuffer = this._mediaSource.addSourceBuffer(this._mimeType);
    }

    private sourceClose() {
        this._sourceBuffer = null;
    }
}

export default MediaSourceWrapper;