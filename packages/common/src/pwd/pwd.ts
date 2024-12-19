import { sha224 } from "js-sha256";

export const pwd = {
	hash(password: string) {
		return sha224(password);
	},
	verify(password: string, hash: string) {
		return sha224(password) === hash;
	},
} as const;

export type pwd = typeof pwd;
