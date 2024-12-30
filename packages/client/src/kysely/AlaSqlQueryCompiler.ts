import {
    SqliteQueryCompiler,
    type LimitNode,
    type OffsetNode,
    type UniqueConstraintNode,
} from "kysely";

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

	protected visitLimit(node: LimitNode): void {
		this.append("LIMIT ");
		this.append(`${(node.limit as any).value}`);
	}

	protected visitOffset(node: OffsetNode): void {
		this.append("OFFSET ");
		this.append(`${(node.offset as any).value}`);
	}
}
