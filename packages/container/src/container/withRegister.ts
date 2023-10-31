import {type IContainer} from "../api/IContainer";
import {Container}       from "./Container";

export const withRegister = (
    register: IContainer.Register,
    container?: IContainer.Type,
): IContainer.Type => {
    const $container = container ?? new Container();
    register($container);
    return $container;
};
