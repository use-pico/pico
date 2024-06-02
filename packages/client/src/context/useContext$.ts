import {
    type Context,
    use
} from "react";

export function useContext$<TContext>(
	context: Context<TContext | null>
): TContext | null {
	return use(context);
}
