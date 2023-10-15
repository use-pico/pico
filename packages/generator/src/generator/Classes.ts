import {type IClass}      from "../api/IClass";
import {type IExportable} from "../api/IExportable";
import {Class}            from "./Class";

export class Classes implements IExportable {
    public readonly $classes: Map<string, Class>;

    constructor() {
        this.$classes = new Map();
    }

    public interface(name: string, code: IClass, isExported: boolean) {
        this.$classes.set(name, new Class(name, code, isExported));
        return this;
    }

    public export() {
        return [...this.$classes.values()].map(item => item.export().trim()).join("\n\n");
    }
}
