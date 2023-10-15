import {type IExportable} from "../api/IExportable";
import {type IInterface}  from "../api/IInterface";
import {withPackageType}  from "../utils/withPackageType";

export class Interface implements IExportable {
    public readonly name: string;
    public readonly code: IInterface;
    public readonly isExported: boolean;

    constructor(name: string, code: IInterface, isExported: boolean) {
        this.name = name;
        this.code = code;
        this.isExported = isExported;
    }

    public export() {
        const body = this.code.body?.trim() || "";
        const $extends = this.code.extends?.map($extends => withPackageType($extends).trim()).join(", ");

        return `
${this.isExported ? "export" : ""} interface ${this.name}${$extends ? ` extends ${$extends}` : ""} {${body.length > 0 ? `\n\t${body}` : ""}\n}
`;
    }
}
