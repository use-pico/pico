import {
    ActionClick,
    ActionMenu,
    EditIcon,
    Table,
    Tx,
    UserIcon,
    useTable,
    withColumn,
} from "@use-pico/client";
import type { FC } from "react";
import type { PlaygroundType } from "~/app/playground/PlaygroundType";

const column = withColumn<PlaygroundType>();

const columns = [
	column({
		name: "foo",
		header: () => {
			return <Tx label={"Foo"} />;
		},
		render({ value }) {
			return value;
		},
	}),
	column({
		name: "bar",
		header: () => {
			return <Tx label={"Bar"} />;
		},
		render({ value }) {
			return value;
		},
	}),
];

export namespace PlaygroundTable {
	export interface Props extends Table.PropsEx<PlaygroundType> {
		//
	}
}

export const PlaygroundTable: FC<PlaygroundTable.Props> = ({
	table,
	...props
}) => {
	return (
		<Table
			table={useTable({
				columns,
				...table,
			})}
			action={{
				row() {
					return (
						<ActionMenu>
							<ActionClick icon={EditIcon}>
								<Tx label={"Edit"} />
							</ActionClick>
							<ActionClick icon={UserIcon}>
								<Tx label={"Some value"} />
							</ActionClick>
						</ActionMenu>
					);
				},
			}}
			{...props}
		/>
	);
};
