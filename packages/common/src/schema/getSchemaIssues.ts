import type z from "zod";
import { translator } from "../i18n/translator";
import { genId } from "../toolbox/genId";
import type { IssueSchema } from "./IssueSchema";

export namespace getSchemaIssues {
	export interface Props {
		/**
		 * The schema to validate against (create or update schema)
		 */
		schema: z.ZodType;
		/**
		 * The data to validate
		 */
		data: any;
		/**
		 * Prefix for error messages (e.g., "Vehicle import", "Contract import")
		 */
		prefix: string;
	}
}

export const getSchemaIssues = ({
	schema,
	data,
	prefix,
}: getSchemaIssues.Props) => {
	const issues: IssueSchema.Type[] = [];

	const result = schema.safeParse(data);

	if (!result.success) {
		result.error.issues.forEach((issue) => {
			issues.push({
				id: genId(),
				message: translator.text(
					`${prefix} - ${issue.path.join(".")} - ${issue.message}`,
				),
			});
		});
	}

	return issues;
};
