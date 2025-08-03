import { createFileRoute } from "@tanstack/react-router";
import {
	TableControl,
	TableNavigationState,
	Tx,
	withColumn,
	withQuery,
	withSourceSearchSchema,
} from "@use-pico/client";
import {
	type CountSchema,
	EntitySchema,
	FilterSchema,
	fulltextOf,
	OrderSchema,
	withSourceSchema,
} from "@use-pico/common";
import type { FC } from "react";
import z from "zod";

const { validateSearch } = withSourceSearchSchema({
	filter: FilterSchema,
});

const SomeDataSchema = z.object({
	...EntitySchema.shape,
	foo: z.string(),
	bar: z.string(),
});

namespace SomeDataSchema {
	export type Type = z.infer<typeof SomeDataSchema>;
}

const SomeDataSourceSchema = withSourceSchema({
	entity: SomeDataSchema,
	filter: FilterSchema,
	sort: z.object({
		name: OrderSchema,
	}),
});

type SomeDataSourceSchema = typeof SomeDataSourceSchema;

const someDataQuery = withQuery<
	withSourceSchema.Query<SomeDataSourceSchema>,
	SomeDataSchema.Type[]
>({
	keys(data) {
		return [
			"some-data",
			data,
		];
	},
	async queryFn({ filter, cursor }) {
		return new Promise((resolve) => {
			setTimeout(() => {
				let arr = Array.from(
					{
						length: 30 * 10,
					},
					(_, i) => ({
						id: i.toString(),
						foo: `Foo ${i}`,
						bar: `Bar ${i}`,
					}),
				);

				if (cursor) {
					arr = arr.slice(
						cursor.page * cursor.size,
						cursor.page * cursor.size + cursor.size,
					);
				}

				if (filter?.fulltext) {
					arr = arr.filter((item) => {
						return fulltextOf({
							source: item,
							fulltext: filter.fulltext,
						});
					});
				}

				resolve(arr);
			}, 1500);
		});
	},
});

const someDataCountQuery = withQuery<
	withSourceSchema.Query<SomeDataSourceSchema>,
	CountSchema.Type
>({
	keys(data) {
		return [
			"some-data-count",
			data,
		];
	},
	async queryFn() {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					total: 300,
					where: 300,
					filter: 600,
				});
			}, 750);
		});
	},
});

const column = withColumn<SomeDataSchema.Type>();

const columns = [
	column({
		name: "foo",
		header() {
			return <Tx label={"Foo column"} />;
		},
		render({ value }) {
			return value;
		},
		size: 12,
	}),
	column({
		name: "bar",
		header() {
			return <Tx label={"Bar column"} />;
		},
		render({ value }) {
			return value;
		},
		size: "auto",
	}),
];

export namespace SomeTable {
	export interface Props
		extends TableControl.PropsEx<
			withSourceSchema.Query<SomeDataSourceSchema>,
			SomeDataSchema.Type
		> {
		//
	}
}

const SomeTable: FC<SomeTable.Props> = (props) => {
	return (
		<TableControl
			withQuery={someDataQuery}
			columns={columns}
			context={{}}
			{...props}
		/>
	);
};

export const Route = createFileRoute("/$locale/components/table")({
	validateSearch,
	component() {
		const { filter, cursor, selection } = Route.useSearch();
		const navigate = Route.useNavigate();

		return (
			<div className="flex flex-col gap-4 w-full">
				<SomeTable
					request={{
						filter,
						cursor,
					}}
					// actionTable={{
					// 	width: "4rem",
					// }}
					// filter={TableNavigationState.useFilter(filter, navigate)}
					fulltext={TableNavigationState.fulltext(
						filter?.fulltext,
						navigate,
					)}
					cursor={TableNavigationState.cursorWithCount(
						{
							withCountQuery: someDataCountQuery,
							textTotal: <Tx label={"Number of items"} />,
						},
						navigate,
					)}
					// cursor={TableNavigationState.useCursorWithCount(
					// 	{
					// 		count,
					// 		cursor,
					// 		textTotal: <Tx label={"Number of items"} />,
					// 	},
					// 	navigate,
					// )}
					// selection={TableNavigationState.useSelection(
					// 	"multi",
					// 	selection,
					// 	navigate,
					// )}
					// actionRow={{
					// 	action() {
					// 		return (
					// 			<ActionMenu withOverlay>
					// 				<ActionClick>
					// 					<Tx label={"Action"} />
					// 				</ActionClick>
					// 			</ActionMenu>
					// 		);
					// 	},
					// }}
				/>
			</div>
		);
	},
});
