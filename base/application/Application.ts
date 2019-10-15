import ReferenceGenerator from 'base/reference/ReferenceGenerator';

class Application {
    /** Used to generate unique references for nodes. Establishes connection between nodes and DOM elements */
    readonly refGen = new ReferenceGenerator();

    /** The only lifecycle method. Returns the only instance */
    static get instance(): Application {
        if (!Application._instance) {
            Application._instance = new Application();
        }

        return Application._instance;
    }

    /** Manual creation of instances is prohibited. Use static method 'instance' instead */
    private constructor() {
        if (Application._instance) {
            return Application._instance;
        }

        Application._instance = this;
    }

    /** Reference to the only instance */
    private static _instance: Application;
}

export default Application;