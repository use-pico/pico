export interface IUserService {
    requiredId(): string;

    optionalId(): string | undefined;
}
