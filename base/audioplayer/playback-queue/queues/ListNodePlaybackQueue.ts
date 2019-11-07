import List from 'base/data-structure/list/List';

/**
 * Represents playback queue.
 * Based on list data structure.
 * Wraps nodes of another list to be able perform quick
 * insert/delete operations of that list
 */
class ListNodePlaybackQueue {
    ahead: List<IListNode<IAudioTrack>>;
    current?: IListNode<IListNode<IAudioTrack>>;
    behind: List<IListNode<IAudioTrack>>;

    constructor() {
        this.ahead = new List();
        this.behind = new List();
    }

    clear() {
        this.ahead.clear();
        this.behind.clear();

        delete this.current;
    }
}

export default ListNodePlaybackQueue;