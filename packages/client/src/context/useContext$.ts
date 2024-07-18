import { useContext, type Context } from "react";

export function useContext$<TContext>(
	context: Context<TContext | null>,
): TContext | null {
	return useContext(context);
}
