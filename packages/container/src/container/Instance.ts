import {type IContainer} from "../api/IContainer";

export class Instance {
    protected $container: IContainer.Type | undefined;

    constructor($container: IContainer.Type | undefined) {
        this.$container = $container;
    }

    withInstance(container: IContainer.Type) {
        return this.$container = container;
    }

    container(): IContainer.Type {
        if (!this.$container) {
            throw new Error("There is container instance available!");
        }
        return this.$container;
    }
}

// @ts-ignore
export const instance = global.instance ?? (global.instance = new Instance());

