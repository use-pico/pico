import {type IExportable} from "../api/IExportable";

export class Exports implements IExportable {
    protected $exportsOf: Set<string>;


    constructor() {
        this.$exportsOf = new Set();
    }

    public exportsOf(files: string[]) {
        files.forEach(item => this.$exportsOf.add(item));
    }

    public export() {
        return [...this.$exportsOf.values()].map(item => `export * from "${item}";`).join("\n");
    }
}
