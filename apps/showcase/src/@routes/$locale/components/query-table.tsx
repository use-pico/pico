import { createFileRoute } from "@tanstack/react-router";
import {
	navigateOnCursor,
	navigateOnFilter,
	navigateOnFulltext,
	navigateOnSelection,
	QueryTable,
	Tx,
	withColumn,
	withQuery,
	withSourceSearchSchema,
} from "@use-pico/client";
import { type CursorSchema, FilterSchema } from "@use-pico/common";

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

const someData: SomeData[] = Array.from(
	{
		length: 30 * 100,
	},
	(_, i) => ({
		id: i.toString(),
		foo: `Foo ${i}`,
		bar: `Bar ${i}`,
	}),
);

const someQuery = withQuery<
	{
		cursor: CursorSchema.Type;
	},
	SomeData[]
>({
	keys(data) {
		return [
			"some-data2",
			data,
		];
	},
	async queryFn({ cursor }) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(
					someData.slice(
						cursor.page * cursor.size,
						cursor.page * cursor.size + cursor.size,
					),
				);
			}, 1500);
		});
	},
});

export const Route = createFileRoute("/$locale/components/query-table")({
	validateSearch,
	component() {
		const { filter, cursor, selection } = Route.useSearch();
		const navigate = Route.useNavigate();

		return (
			<div className="flex flex-col gap-4 w-full">
				<QueryTable
					withQuery={someQuery}
					columns={columns}
					request={{
						cursor,
					}}
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
						count: {
							filter: someData.length,
							total: someData.length,
							where: someData.length,
						},
						cursor,
						textTotal: <Tx label={"Number of items"} />,
						...navigateOnCursor(navigate),
					}}
				/>
			</div>
		);
	},
});
