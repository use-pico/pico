import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
	navigateOnCursor,
	navigateOnFilter,
	navigateOnFulltext,
	navigateOnSelection,
	Table,
	Tx,
	withColumn,
	type withListCount,
	withSourceSearchSchema,
} from "@use-pico/client";
import { FilterSchema } from "@use-pico/common";
import type { FC } from "react";

const SearchSchema = withSourceSearchSchema({
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
		size: 12,
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
	validateSearch: zodValidator(SearchSchema),
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
			async queryFn(): Promise<withListCount.Result<SomeData>> {
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
				};
			},
		});
	},
	component() {
		const { list, count } = Route.useLoaderData();
		const { filter, cursor, selection } = Route.useSearch();
		const navigate = Route.useNavigate();

		return (
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
		);
	},
});
