import {type IExportable} from "../api/IExportable";

/**
 * This class represents import items (thus already under a file).
 */
export class Import implements IExportable {
    public readonly file: string;
    public readonly $import: Set<string>;

    constructor(file: string) {
        this.file = file;
        this.$import = new Set();
    }

    public withItems(items: string[]) {
        items.map(this.$import.add, this.$import);
        return this;
    }

    public export() {
        const $join = this.$import.size > 1 ? "\n\t" : "";
        const $newline = this.$import.size > 1 ? "\n" : "";
        return `import {${$join}${[...this.$import.values()].join(`,${$join}`)}${$newline}} from "${this.file}";`;
    }
}
