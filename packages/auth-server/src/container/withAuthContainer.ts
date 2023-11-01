import {type IContainer}         from "@use-pico/container";
import {RegistrationService}     from "../service/RegistrationService";
import {UserTokenService}        from "../service/UserTokenService";
import {withRegistrationService} from "./withRegistrationService";
import {withUserTokenService}    from "./withUserTokenService";

export const withAuthContainer: IContainer.Register = container => {
    withRegistrationService.bind(container, RegistrationService);
    withUserTokenService.bind(container, UserTokenService);
};
