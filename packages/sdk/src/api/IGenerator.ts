import {type ITemplate} from "./ITemplate";

export interface IGenerator<TParams = void> {
    (props: ITemplate<TParams>): Promise<void>;
}
