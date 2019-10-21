import Node from 'components/Node';

class Component
extends Node {
    private _template: ({}) => string;
    private _state: {};

    constructor(template: ({}) => string, state: {}) {
        super();

        this._template = template;
        this._state = state;
    }

    construct() {
        this._domElement = document.createElement('div');

        this._domElement.innerHTML = this.renderContent();
    }

    protected renderContent(): string {
        return this._template(this._state);
    }
}

export default Component;