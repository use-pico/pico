import {withService}               from "@use-pico/container";
import {type IRegistrationService} from "../api/IRegistrationService";

export const withRegistrationService = withService<IRegistrationService>("@use-pico/auth/RegistrationService");
