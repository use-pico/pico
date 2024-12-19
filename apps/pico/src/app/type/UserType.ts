import type { IdentitySchema } from "@use-pico/common";

export interface UserType extends IdentitySchema.Type {
	name: string;
	login: string;
	password: string;
}
