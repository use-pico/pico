import { createFileRoute } from "@tanstack/react-router";
import { Tx } from "@use-pico/client";

export const Route = createFileRoute("/$locale/components/popup-select")({
	component() {
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
						{/* <div>{value ?? "-"}</div> */}
					</div>
				</div>
			</div>
		);
	},
});
