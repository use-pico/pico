import { createFileRoute } from "@tanstack/react-router";
import { Table, Tx, withColumn } from "@use-pico/client";
import { genId } from "@use-pico/common";
import Fuse from "fuse.js";
import { type FC, useState } from "react";

interface SomeData {
	id: string;
	foo: string;
	bar: string;
	rand: string;
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
	column({
		name: "rand",
		header() {
			return <Tx label={"Random column"} />;
		},
		render({ value }) {
			return value;
		},
		size: 12,
	}),
];

export namespace SomeTable {
	export interface Props extends Table.PropsEx<any, SomeData> {
		//
	}
}

const SomeTable: FC<SomeTable.Props> = (props) => {
	return (
		<Table
			columns={columns}
			withQuery={null as any}
			context={{}}
			{...props}
		/>
	);
};

const someData: SomeData[] = Array.from(
	{
		length: 30 * 12,
	},
	(_, i) => ({
		id: i.toString(),
		foo: `Foo ${i.toString().padStart(3, "0")}`,
		bar: `Bar ${i.toString().padStart(3, "0")}`,
		rand: genId(),
	}),
);

export const Route = createFileRoute("/$locale/components/popup-select")({
	component() {
		const [value, onChange] = useState<string | null>(null);
		const fuse = new Fuse(someData, {
			keys: [
				"id",
				"foo",
				"bar",
				"rand",
			],
		});

		return (
			<div>
				<div>
					{/* <PopupSelect
						textTitle={<Tx label={"Selecting some data"} />}
						textSelect={<Tx label={"Select some data"} />}
						table={SomeTable}
						render={({ entity }) => {
							return `${entity.foo} - ${entity.bar}`;
						}}
						queryKey={"some-data"}
						query={async ({
							filter,
							cursor = {
								page: 0,
								size: 15,
							},
						}) => {
							if (filter?.id) {
								const result = someData.filter(
									(d) => d.id === filter.id,
								);

								return {
									count: {
										filter: result.length,
										where: result.length,
										total: result.length,
									},
									list: result.slice(
										cursor.page * cursor.size,
										cursor.page * cursor?.size +
											cursor.size,
									),
								};
							}

							const result = filter?.fulltext
								? fuse
										.search(filter?.fulltext)
										.map(({ item }) => item)
								: someData;

							return {
								count: {
									filter: result.length,
									total: result.length,
									where: result.length,
								},
								list: result.slice(
									cursor.page * cursor.size,
									cursor.page * cursor?.size + cursor.size,
								),
							};
						}}
						value={value}
						onChange={onChange}
					/> */}
					<div className={"flex flex-row gap-2 items-center"}>
						<Tx label={"Selected value"} />
						<div>{value ?? "-"}</div>
					</div>
				</div>
			</div>
		);
	},
});
