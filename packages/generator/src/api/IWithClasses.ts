import {IClass} from "./IClass";

export interface IWithClasses {
    classes?: Record<string, IClass>;
    exports?: Record<string, IClass>;
}
