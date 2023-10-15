import {IInterface} from "./IInterface";

export interface IWithInterfaces {
    interfaces?: Record<string, IInterface>;
    exports?: Record<string, IInterface>;
}
