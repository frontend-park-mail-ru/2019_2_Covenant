/**
 * Class-linker.
 * Allows to capture elements from DOM
 */
class Reference {
    /** Reference identifier */
    readonly id: string;
    /** Indicates whether to remove id attribute from element on capture */
    private _removeRef: boolean;

    /**
     * @param id Reference identifier
     * @param removeRef Indicates whether to remove id attribute from element on capture. Default value: true
     */
    constructor(id: string, removeRef: boolean = true) {
        this.id = id;
        this._removeRef = removeRef;
    }

    /** Captures associated element from DOM. Returns captured element */
    capture(): HTMLElement {
        const el = document.getElementById(this.id);

        if (el) {
            this.onCapture(el);
        }
        
        return el;
    }

    /**
     * Called on successful capture of associated element from DOM
     * @param el Captured element
     */
    onCapture(el: HTMLElement) {
        if (this._removeRef) {
            el.removeAttribute('id');
        }
    }
}

export default Reference;