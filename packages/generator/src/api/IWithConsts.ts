import {IConst} from "./IConst";

export interface IWithConsts {
    /**
     * Consts just laying around the file
     */
    consts?: Record<string, IConst>;
    /**
     * Consts being exported
     */
    exports?: Record<string, IConst>;
}
