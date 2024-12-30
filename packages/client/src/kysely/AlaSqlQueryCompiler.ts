import { SqliteQueryCompiler, type UniqueConstraintNode } from "kysely";

export class AlaSqlQueryCompiler extends SqliteQueryCompiler {
	protected getLeftIdentifierWrapper(): string {
		return "`";
	}

	protected getRightIdentifierWrapper(): string {
		return "`";
	}

	protected visitUniqueConstraint(node: UniqueConstraintNode): void {
		this.append("UNIQUE(");
		node.columns.map((col) => this.append(col.column.name));
		this.append(")");
	}
}
