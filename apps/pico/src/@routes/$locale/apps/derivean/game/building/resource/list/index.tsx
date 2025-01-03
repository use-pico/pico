import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import {
    handleOnFulltext,
    handleOnPage,
    handleOnSize,
    Tx,
} from "@use-pico/client";
import { withSearchSchema } from "@use-pico/common";
import { BuildingResourceRepository } from "~/app/derivean/building/resource/BuildingResourceRepository";
import { BuildingResourceSchema } from "~/app/derivean/building/resource/BuildingResourceSchema";
import { BuildingResourceTable } from "~/app/derivean/building/resource/BuildingResourceTable";
import { kysely } from "~/app/derivean/db/db";
import { AmountInline } from "~/app/derivean/game/AmountInline";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

const SearchSchema = withSearchSchema({
	filter: BuildingResourceSchema.filter,
});

const loader = BuildingResourceRepository(kysely).withRouteListLoader();

export const Route = createFileRoute(
	"/$locale/apps/derivean/game/building/resource/list/",
)({
	validateSearch: zodValidator(SearchSchema),
	loaderDeps({ search: { global, filter, cursor } }) {
		return {
			global,
			filter,
			cursor,
		};
	},
	async loader({ context, deps }) {
		const session = await context.session();

		return loader({
			context,
			deps: {
				...deps,
				where: {
					userId: session.id,
				},
			},
		});
	},
	component() {
		const { data, count } = Route.useLoaderData();
		const { global, filter, cursor, selection } = Route.useSearch();
		const navigate = Route.useNavigate();
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<AmountInline
					icon={ResourceIcon}
					title={<Tx label={"Resource sum (label)"} />}
					amount={data}
				/>

				<BuildingResourceTable
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
