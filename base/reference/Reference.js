class Reference {
    /**
     * @param {string} id Reference identifier
     * @param {boolean} removeRef Indicates whether to remove id attribute from element on capture. Default value: true
     */
    constructor(id, removeRef = true) {
        this._id = id;
        this._removeRef = removeRef;
    }

    /**
     * Captures associated element from DOM. Returns captured element
     * @returns {HTMLElement}
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
     * @param {HTMLElement} ref Captured element
     */
    onCapture(ref) {
        if (this._removeRef) {
            ref.removeAttribute('id');
        }
    }
}

export default Reference;