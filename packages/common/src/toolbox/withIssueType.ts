import type { IssueSchema } from "../schema/IssueSchema";

export namespace withIssueType {
	export interface Props {
		/**
		 * Array of issues to check for matching types.
		 */
		issues: Pick<IssueSchema.Type, "type">[];
		/**
		 * One or more issue types to match against (e.g., ["error", "warning"]).
		 * At least one type must be provided.
		 */
		types: [
			IssueSchema.Type["type"],
			...IssueSchema.Type["type"][],
		];
	}
}

/**
 * Checks if any issue in the provided array matches one of the specified types.
 *
 * This utility is useful for filtering or conditionally rendering UI based on the presence of certain issue types
 * (e.g., "error", "warning", "info") in a list of issues.
 *
 * @example
 * // Returns true, because one issue is of type "error"
 * withIssueType({
 *   issues: [
 *     { id: "1", message: "Some error", type: "error" },
 *     { id: "2", message: "Some info", type: "info" }
 *   ],
 *   types: ["error"]
 * });
 *
 * @example
 * // Returns false, because no issue is of type "warning"
 * withIssueType({
 *   issues: [
 *     { id: "1", message: "Some error", type: "error" },
 *     { id: "2", message: "Some info", type: "info" }
 *   ],
 *   types: ["warning"]
 * });
 */
export const withIssueType = ({
	issues,
	types,
}: withIssueType.Props): boolean => {
	return issues.some((item) => types.includes(item.type));
};
