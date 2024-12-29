import { SqliteQueryCompiler } from "kysely";

export class AlaSqlQueryCompiler extends SqliteQueryCompiler {
	protected getLeftIdentifierWrapper(): string {
		return "`";
	}

	protected getRightIdentifierWrapper(): string {
		return "`";
	}
}
