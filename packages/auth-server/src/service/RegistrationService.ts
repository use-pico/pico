import {type IToken}               from "@use-pico/auth";
import {type IRegistrationService} from "../api/IRegistrationService";

export class RegistrationService implements IRegistrationService {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public handle<T extends IToken>(props: IRegistrationService.HandleProps<T>): Promise<void> {
        return Promise.resolve(undefined);
    }
}
