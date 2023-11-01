import {type IUserSession} from "@use-pico/auth";
import {withService}       from "@use-pico/container";

export const withUserSession = withService<IUserSession>("@use-pico/auth/UserSession");
