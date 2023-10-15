import {type IExportable} from "../api/IExportable";
import {Import}           from "./Import";

export class Imports implements IExportable {
    protected $imports: Map<string, Import>;

    constructor() {
        this.$imports = new Map();
    }

    public withImport(file: string, items: string[]) {
        this.$imports.set(file, (this.$imports.get(file) || new Import(file)).withItems(items));
        return this;
    }

    public list() {
        return [...this.$imports.keys()].filter(item => !item.startsWith("."));
    }

    public export() {
        return [...this.$imports.values()].map(item => item.export()).join("\n");
    }
}
