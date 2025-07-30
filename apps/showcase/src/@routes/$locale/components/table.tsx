import { createFileRoute } from "@tanstack/react-router";
import {
	ActionClick,
	ActionMenu,
	navigateOnCursor,
	navigateOnFilter,
	navigateOnFulltext,
	navigateOnSelection,
	Table,
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
					filter={{
						state: {
							value: filter,
							set: navigateOnFilter(navigate),
						},
					}}
					selection={{
						type: "multi",
						state: {
							value: selection,
							set: navigateOnSelection(navigate),
						},
					}}
					fulltext={{
						value: filter?.fulltext,
						set: navigateOnFulltext(filter?.fulltext, navigate),
					}}
					cursor={{
						count,
						cursor,
						textTotal: <Tx label={"Number of items"} />,
						...navigateOnCursor(navigate),
					}}
				/>

				<SomeTable
					actionWidth="4rem"
					data={list}
					filter={{
						state: {
							value: filter,
							set: navigateOnFilter(navigate),
						},
					}}
					fulltext={{
						value: filter?.fulltext,
						set: navigateOnFulltext(filter?.fulltext, navigate),
					}}
					cursor={{
						count,
						cursor,
						textTotal: <Tx label={"Number of items"} />,
						...navigateOnCursor(navigate),
					}}
					selection={{
						type: "multi",
						state: {
							value: selection,
							set: navigateOnSelection(navigate),
						},
					}}
					actionRow={() => {
						return (
							<ActionMenu>
								<ActionClick>
									<Tx label={"Action"} />
								</ActionClick>
							</ActionMenu>
						);
					}}
				/>
			</div>
		);
	},
});
