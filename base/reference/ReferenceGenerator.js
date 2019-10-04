import Reference from './Reference.js';

class ReferenceGenerator {
    constructor() {
        /** @private {number} */
        this._cursor = 0;
    }

    /**
     * Asks generator to create new reference. Returns created reference
     *
     * @returns {Reference} created reference
     */
    createReference() {
        return new Reference(this._generateId());
    }

    /**
     * Transforms current id into string. Returns result
     *
     * @returns {string}
     */
    _generateId() {
        return String(this._cursor++);
    }
}

export default ReferenceGenerator;