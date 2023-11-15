import {withService}       from "@use-pico/container";
import {type IUserService} from "../api/IUserService";

export const withUserService = withService<IUserService>("@use-pico/auth/UserService");
