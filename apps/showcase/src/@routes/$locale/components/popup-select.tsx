import { createFileRoute } from "@tanstack/react-router";
import {
    PopupSelect,
    Table,
    Tx,
    withColumn
} from "@use-pico/client";
import type { FC } from "react";

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
	}),
	column({
		name: "bar",
		header() {
			return <Tx label={"Bar column"} />;
		},
		render({ value }) {
			return value;
		},
	}),
];

namespace SomeTable {
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

const someData: SomeData[] = Array.from({ length: 10 }, (_, i) => ({
	id: i.toString(),
	foo: `Foo ${i}`,
	bar: `Bar ${i}`,
}));

export const Route = createFileRoute("/$locale/components/popup-select")({
	component() {
		return (
			<div>
				<div>
					<PopupSelect
						textTitle={<Tx label={"Selecting some data"} />}
						textSelect={<Tx label={"Select some data"} />}
						table={SomeTable}
						render={({ entity }) => {
							return `${entity.foo} - ${entity.bar}`;
						}}
						queryKey={"some-data"}
						query={async () => {
							return {
								count: {
									filter: someData.length,
									total: someData.length,
									where: someData.length,
								},
								data: someData,
							};
						}}
						onChange={(item) => {
							console.log("Selected", item);
						}}
					/>
				</div>
			</div>
		);
	},
});
