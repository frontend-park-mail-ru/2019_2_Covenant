import Reference from './Reference.js';

class ReferenceGenerator {
    constructor() {
        /** @private {number} */
        this._cursor = 0;
    }

    /**
     * Asks generator to create new reference
     *
     * @returns {Reference} created reference
     */
    requestReference() {
        return new Reference(this._generateId());
    }

    /**
     * Transforms current id into string
     *
     * @returns {string} created string identificator
     */
    _generateId() {
        return String(this._cursor++);
    }
}

export default ReferenceGenerator;