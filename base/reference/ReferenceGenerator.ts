import Reference from 'base/reference/Reference';

/**
 * Class-generator.
 * Generates references to capture elements from DOM
 */
class ReferenceGenerator {
    /** Iterator. Increments on every create reference call */
    private _cursor: number = 0;

    constructor() {}

    /** Asks generator to create new reference. Returns created reference */
    createReference(): Reference {
        return new Reference(this._generateId());
    }

    /** Transforms current id into string. Returns result */
    private _generateId() {
        return String(this._cursor++);
    }
}

export default ReferenceGenerator;