import {withService}            from "@use-pico/container";
import {type IUserTokenService} from "../api/IUserTokenService";

export const withUserTokenService = withService<IUserTokenService>("@use-pico/auth/UserTokenService");
