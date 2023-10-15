import {type IClass}      from "../api/IClass";
import {type IExportable} from "../api/IExportable";

export class Class implements IExportable {
    public readonly name: string;
    public readonly code: IClass;
    public readonly isExported: boolean;

    constructor(name: string, code: IClass, isExported: boolean) {
        this.name = name;
        this.code = code;
        this.isExported = isExported;
    }

    public export() {
        const body = this.code.body?.trim() || "";
        return `
${this.isExported ? "export" : ""} class ${this.name}${this.code.extends ? ` extends ${this.code.extends.trim()}` : ""}${this.code.implements ? ` implements ${this.code.implements.trim()}` : ""} {${body.length > 0 ? `\n\t${body}` : ""}\n}
`;
    }
}
