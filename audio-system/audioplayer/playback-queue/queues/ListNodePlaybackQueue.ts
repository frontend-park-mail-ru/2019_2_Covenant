import { List, IListNode } from 'data-structure/list';
import { IAudioTrack } from 'audioplayer/player';

/**
 * Represents playback queue.
 * Based on list data structure.
 * Wraps nodes of another list to be able perform quick
 * insert/delete operations of that list.
 */
export class ListNodePlaybackQueue {
    ahead: List<IListNode<IAudioTrack>>;
    current?: IListNode<IListNode<IAudioTrack>>;
    behind: List<IListNode<IAudioTrack>>;

    constructor() {
        this.ahead = new List();
        this.behind = new List();
    }

    get size(): number {
        return this.ahead.size + this.behind.size + (this.current ? 1 : 0);
    }

    restore() {
        if (this.current) {
            this.ahead.insertBefore(this.ahead.front, this.current);
        }
        if (this.behind.size) {
            this.ahead.mergeList(this.behind, false);
        }
    } 

    clear() {
        this.ahead.clear();
        this.behind.clear();

        delete this.current;
    }
}