import Application from 'base/application/Application';
import Reference from 'base/reference/Reference';

const refGen = Application.instance.referenceGenerator;
const bus = Application.instance.eventBus;

/**
 * 
 */
class Node
implements INode {
    protected _domElement: HTMLElement;
    private _ref?: Reference;

    constructor() {
    }

    get domElement(): HTMLElement {
        return this._domElement;
    }

    onMount() {
        this._domElement = this._ref.capture();
        delete this._ref;
    }

    render(): string {
        this._ref = refGen.createReference();

        return this.renderWrapper(this.renderContent());
    }

    private renderWrapper(content: string): string {
        return `<div id="${this._ref.id}">${content}</div>`;
    }

    protected renderContent(): string {
        return '';
    }
}

export default Node;