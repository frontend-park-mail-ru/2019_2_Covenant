class Reference {
    /**
     * @param {string} id reference identifier
     * @param {boolean} removeRef indicates whether to remove id attribute from element on capture
     */
    constructor(id, removeRef = true) {
        this._id = id;
        this._removeRef = removeRef;
    }

    /**
     * Captures associated element from DOM
     *
     * @returns {HTMLElement} captured element
     */
    capture() {
        const ref = document.getElementById(this._id);

        if (ref) {
            this.onCapture(ref);
        }
        
        return ref;
    }

    /**
     * Called on successful capture of associated element from DOM
     *
     * @param {HTMLElement} ref captured element
     */
    onCapture(ref) {
        if (this._removeRef) {
            ref.removeAttribute('id');
        }
    }
}

export default Reference;