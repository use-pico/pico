import {type IExportable} from "../api/IExportable";
import {type IInterface}  from "../api/IInterface";
import {Interface}        from "./Interface";

export class Interfaces implements IExportable {
    public readonly $interfaces: Map<string, Interface>;

    constructor() {
        this.$interfaces = new Map();
    }

    public interface(name: string, code: IInterface, isExported: boolean) {
        this.$interfaces.set(name, new Interface(name, code, isExported));
        return this;
    }

    public export() {
        return [...this.$interfaces.values()].map(item => item.export().trim()).join("\n\n");
    }
}
