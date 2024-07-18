import {
	Context as CoolContext,
	useContext as useCoolContext
} from "react";

/**
 * Get the context value or throw an error.
 * 
 * @group hooks
 */
export function useContext<TContext>(
	context: CoolContext<TContext | null>,
	name: string,
	hint?: string
): TContext {
	const $context = useCoolContext(context);
	if (!$context) {
		throw new Error(
			`There is no [${name}] context available.${hint ? ` ${hint}` : ""}`
		);
	}
	return $context;
}
