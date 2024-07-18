import {
	cssOf,
	type FilterSchema,
	type OrderBySchema,
	type QuerySchema,
	type WithIdentitySchema,
} from "@use-pico/common";
import { useSourceQuery } from "../query/useSourceQuery";
import type { List } from "./List";

export namespace Body {
	export interface Props<
		TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
		TSchema extends WithIdentitySchema,
	> extends Pick<
			List.Props<TQuerySchema, TSchema>,
			"withSourceQuery" | "withQueryStore" | "options" | "render" | "css"
		> {}
}

export const Body = <
	TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
	TSchema extends WithIdentitySchema,
>({
	withSourceQuery,
	withQueryStore,
	options,
	render: Render,
	css,
}: Body.Props<TQuerySchema, TSchema>) => {
	const result = useSourceQuery({
		store: withQueryStore,
		withSourceQuery,
		...options,
	});

	return (
		<div className={cssOf("flex flex-col gap-1", css?.root)}>
			{result.data?.map((entity) => (
				<div
					key={`list-entity-${entity.id}`}
					className={cssOf(css?.item)}
				>
					<Render entity={entity} />
				</div>
			))}
		</div>
	);
};
