import { useMutationState } from "@tanstack/react-query";
import {
    createFileRoute,
    Outlet,
    redirect,
    useLoaderData,
    useParams,
} from "@tanstack/react-router";
import { AppLayout, LinkTo, LogoutIcon, ls, withList } from "@use-pico/client";
import { CycleButton } from "~/app/derivean/game/CycleButton";
import { GameMenu } from "~/app/derivean/game/GameMenu";
import { InventorySchema } from "~/app/derivean/inventory/InventorySchema";
import { Logo } from "~/app/derivean/logo/Logo";
import { SessionSchema } from "~/app/derivean/schema/SessionSchema";

export const Route = createFileRoute("/$locale/apps/derivean/game")({
	async beforeLoad({ context, params: { locale } }) {
		return {
			...context,
			async session() {
				try {
					return SessionSchema.parse(ls.get("session"));
				} catch (_) {
					throw redirect({
						to: `/$locale/apps/derivean/public/login`,
						params: { locale },
					});
				}
			},
		};
	},
	async loader({ context: { kysely, session } }) {
		const user = await session();

		return kysely.transaction().execute(async (tx) => {
			return {
				session: user,
				inventory: await withList({
					select: tx
						.selectFrom("Inventory as i")
						.selectAll("i")
						.where(
							"i.id",
							"in",
							tx
								.selectFrom("User_Inventory as ui")
								.select("ui.inventoryId")
								.where("ui.userId", "=", user.id),
						),
					output: InventorySchema.entity,
				}),
			};
		});
	},
	component: () => {
		const { locale } = useParams({ from: "/$locale" });
		const { session } = useLoaderData({
			from: "/$locale/apps/derivean/game",
		});
		const mutation = useMutationState({
			filters: {
				status: "pending",
				mutationKey: ["useCycleMutation"],
			},
			select(mutation) {
				return mutation.state.status;
			},
		});

		return (
			<AppLayout
				logo={
					<LinkTo
						to={"/$locale/apps/derivean/game"}
						params={{ locale }}
					>
						<Logo />
					</LinkTo>
				}
				menu={
					<div className={"flex flex-row items-center gap-4"}>
						<GameMenu />
						<CycleButton userId={session.id} />
					</div>
				}
				actions={
					<>
						{session.name}
						<LinkTo
							icon={"icon-[clarity--crown-line]"}
							to={"/$locale/apps/derivean/root"}
							params={{ locale }}
						/>

						<LinkTo
							icon={LogoutIcon}
							to={"/$locale/apps/derivean/public/logout"}
							params={{ locale }}
							preload={false}
						/>
					</>
				}
				css={{
					base:
						mutation.length ?
							["select-none", "pointer-events-none", "opacity-50"]
						:	undefined,
				}}
			>
				<Outlet />
			</AppLayout>
		);
	},
});
