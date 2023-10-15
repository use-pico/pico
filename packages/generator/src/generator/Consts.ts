import {type IConst}      from "../api/IConst";
import {type IExportable} from "../api/IExportable";
import {Const}            from "./Const";

export class Consts implements IExportable {
    public readonly $consts: Map<string, Const>;

    constructor() {
        this.$consts = new Map();
    }

    public const(name: string, code: IConst, isExported: boolean) {
        this.$consts.set(name, new Const(name, code, isExported));
        return this;
    }

    public export() {
        return [...this.$consts.values()].map(item => item.export()).join("\n");
    }
}
