import {type IRegistrationService} from "@use-pico/auth";
import {withService}               from "@use-pico/container";

export const withRegistrationService = withService<IRegistrationService>("@use-pico/auth/RegistrationService");
