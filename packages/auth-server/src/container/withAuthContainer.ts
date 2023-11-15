import {type IContainer}      from "@use-pico/container";
import {UserService}          from "../service/UserService";
import {UserTokenService}     from "../service/UserTokenService";
import {withUserService}      from "./withUserService";
import {withUserTokenService} from "./withUserTokenService";

export const withAuthContainer: IContainer.Register = container => {
    withUserTokenService.bind(container, UserTokenService);
    withUserService.bind(container, UserService);
};
