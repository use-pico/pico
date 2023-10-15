import {type IConst}      from "../api/IConst";
import {type IExportable} from "../api/IExportable";

export class Const implements IExportable {
    public readonly name: string;
    public readonly code: IConst;
    public readonly isExported: boolean;

    constructor(name: string, code: IConst, isExported: boolean) {
        this.name = name;
        this.code = code;
        this.isExported = isExported;
    }

    public export() {
        return `${this.code.comment ? `${this.code.comment.trim()}\n` : ""}${this.isExported ? "export" : ""} const ${this.name}${this.code.type ? `: ${this.code.type}` : ""} = ${this.code.body.trim()};`.trim();
    }
}
