import {type IExportable} from "../api/IExportable";

export class Type implements IExportable {
    public readonly name: string;
    public readonly code: string;
    public readonly isExported: boolean;

    constructor(name: string, code: string, isExported: boolean) {
        this.name = name;
        this.code = code;
        this.isExported = isExported;
    }

    public export() {
        return `${this.isExported ? "export " : ""}type ${this.name} = ${this.code};`;
    }
}

export class Types implements IExportable {
    public readonly $types: Map<string, Type>;

    constructor() {
        this.$types = new Map();
    }

    public type(name: string, code: string, isExported: boolean) {
        this.$types.set(name, new Type(name, code.trim(), isExported));
        return this;
    }

    public export() {
        return [...this.$types.values()].map(item => item.export()).join("\n");
    }
}
