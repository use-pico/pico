import { DummyDriver, Kysely } from "kysely";
import { AlaSqlQueryCompiler } from "./AlaSqlQueryCompiler";
import { BrowserAdapter } from "./BrowserAdapter";
import { BrowserIntrospector } from "./BrowserIntrospector";

export namespace withBrowserKysely {
	export interface Props {
		//
	}
}

export const withBrowserKysely = <DB>() => {
	return new Kysely<DB>({
		dialect: {
			createAdapter() {
				return BrowserAdapter;
			},
			createDriver() {
				return new DummyDriver();
			},
			createIntrospector() {
				return BrowserIntrospector;
			},
			createQueryCompiler() {
				return new AlaSqlQueryCompiler();
			},
		},
	});
};
