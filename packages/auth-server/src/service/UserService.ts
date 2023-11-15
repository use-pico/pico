import {
    type IContainer,
    lazyOf,
    withContainer
}                          from "@use-pico/container";
import {type IUserService} from "../api/IUserService";
import {withUserSession}   from "../container/withUserSession";

export class UserService implements IUserService {
    static inject = [
        /**
         * Container, because user session is deferred
         */
        lazyOf(withContainer.inject),
    ];

    constructor(
        protected container: IContainer.Type,
    ) {
    }

    public optionalId(): string | undefined {
        try {
            return this.requiredId();
        } catch (e) {
            return undefined;
        }
    }

    public requiredId(): string {
        return withUserSession.use(this.container).userId;
    }
}
