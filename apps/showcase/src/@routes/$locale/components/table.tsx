import { createFileRoute } from "@tanstack/react-router";
import {
	ActionClick,
	ActionMenu,
	Table,
	TableNavigationState,
	Tx,
	withColumn,
	withSourceSearchSchema,
} from "@use-pico/client";
import { FilterSchema } from "@use-pico/common";
import type { FC } from "react";

const { validateSearch } = withSourceSearchSchema({
	filter: FilterSchema,
});

interface SomeData {
	id: string;
	foo: string;
	bar: string;
}

const column = withColumn<SomeData>();

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
	export interface Props extends Table.PropsEx<SomeData> {
		//
	}
}

const SomeTable: FC<SomeTable.Props> = (props) => {
	return (
		<Table
			columns={columns}
			{...props}
		/>
	);
};

const someData: SomeData[] = Array.from(
	{
		length: 30 * 10,
	},
	(_, i) => ({
		id: i.toString(),
		foo: `Foo ${i}`,
		bar: `Bar ${i}`,
	}),
);

export const Route = createFileRoute("/$locale/components/table")({
	validateSearch,
	loaderDeps: ({ search: { filter, cursor } }) => ({
		filter,
		cursor,
	}),
	async loader({ context: { queryClient }, deps: { filter, cursor } }) {
		return queryClient.ensureQueryData({
			queryKey: [
				"some-data",
				{
					filter,
					cursor,
				},
			],
			async queryFn() {
				return {
					count: {
						filter: someData.length,
						total: someData.length,
						where: someData.length,
					},
					list: someData.slice(
						cursor.page * cursor.size,
						cursor.page * cursor.size + cursor.size,
					),
				} as const;
			},
		});
	},
	component() {
		const { list, count } = Route.useLoaderData();
		const { filter, cursor, selection } = Route.useSearch();
		const navigate = Route.useNavigate();

		return (
			<div className="flex flex-col gap-4 w-full">
				<SomeTable
					data={list}
					filter={TableNavigationState.filter(filter, navigate)}
					selection={TableNavigationState.selection(
						"multi",
						selection,
						navigate,
					)}
					fulltext={TableNavigationState.fulltext(
						filter?.fulltext,
						navigate,
					)}
					cursor={TableNavigationState.cursorWithCount(
						{
							count,
							cursor,
							textTotal: <Tx label={"Number of items"} />,
						},
						navigate,
					)}
				/>

				<SomeTable
					actionTable={{
						width: "4rem",
					}}
					data={list}
					filter={TableNavigationState.filter(filter, navigate)}
					fulltext={TableNavigationState.fulltext(
						filter?.fulltext,
						navigate,
					)}
					cursor={TableNavigationState.cursorWithCount(
						{
							count,
							cursor,
							textTotal: <Tx label={"Number of items"} />,
						},
						navigate,
					)}
					selection={TableNavigationState.selection(
						"multi",
						selection,
						navigate,
					)}
					actionRow={{
						action() {
							return (
								<ActionMenu withOverlay>
									<ActionClick>
										<Tx label={"Action"} />
									</ActionClick>
								</ActionMenu>
							);
						},
					}}
				/>
			</div>
		);
	},
});
