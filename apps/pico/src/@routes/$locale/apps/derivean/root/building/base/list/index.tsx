import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    handleOnFulltext,
    handleOnPage,
    handleOnSize,
    Tx,
} from "@use-pico/client";
import { withSearchSchema } from "@use-pico/common";
import { BaseBuildingRepository } from "~/app/derivean/building/base/BaseBuildingRepository";
import { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import { BaseBuildingTable } from "~/app/derivean/building/base/BaseBuildingTable";
import { kysely } from "~/app/derivean/db/db";

const SearchSchema = withSearchSchema({
	filter: BaseBuildingSchema.filter,
});

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/building/base/list/",
)({
	validateSearch: zodValidator(SearchSchema),
	loaderDeps({ search: { global, filter, cursor } }) {
		return {
			global,
			filter,
			cursor,
		};
	},
	loader: BaseBuildingRepository(kysely).withRouteListLoader(),
	component: () => {
		const { data, count } = Route.useLoaderData();
		const { global, filter, cursor, selection } = Route.useSearch();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<BaseBuildingTable
					table={{
						data,
						filter: {
							value: filter,
							set(value) {
								navigate({
									search: ({ cursor, ...prev }) => ({
										...prev,
										filter: value,
										cursor: { ...cursor, page: 0 },
									}),
								});
							},
						},
						selection: {
							type: "multi",
							value: selection,
							set(selection) {
								navigate({
									search(prev) {
										return {
											...prev,
											selection,
										};
									},
								});
							},
						},
					}}
					fulltext={{
						onFulltext: handleOnFulltext(navigate),
						value: global?.fulltext,
					}}
					cursor={{
						count,
						cursor,
						textTotal: <Tx label={"Number of items"} />,
						onPage: handleOnPage(navigate),
						onSize: handleOnSize(navigate),
					}}
				/>
			</div>
		);
	},
});
