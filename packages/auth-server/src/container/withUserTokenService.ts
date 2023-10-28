import {type IUserTokenService} from "@use-pico/auth";
import {withService}            from "@use-pico/container";

export const withUserTokenService = withService<IUserTokenService>("@use-pico/auth/UserTokenService");
