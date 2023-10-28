import {withService}       from "@use-pico/container";
import {type IUserSession} from "../api/IUserSession";

export const withUserSession = withService<IUserSession>("@use-pico/auth/UserSession");
