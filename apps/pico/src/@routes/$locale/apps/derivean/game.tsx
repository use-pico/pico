import { useMutationState } from "@tanstack/react-query";
import {
    createFileRoute,
    Outlet,
    redirect,
    useLoaderData,
    useParams,
} from "@tanstack/react-router";
import { AppLayout, LinkTo, LogoutIcon, ls } from "@use-pico/client";
import { CycleButton } from "~/app/derivean/game/CycleButton";
import { GameMenu } from "~/app/derivean/game/GameMenu";
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
	async loader({ context: { queryClient, kysely, session } }) {
		const user = await session();

		return {
			session: user,
			inventory: await queryClient.ensureQueryData({
				queryKey: ["User_Inventory"],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return tx
							.selectFrom("Inventory as i")
							.innerJoin("User_Inventory as ui", "ui.inventoryId", "i.id")
							.select(["i.id", "i.amount", "i.limit", "i.resourceId"])
							.where("ui.userId", "=", user.id)
							.execute();
					});
				},
			}),
			buildingCounts: await queryClient.ensureQueryData({
				queryKey: ["Building"],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return tx
							.selectFrom("Building as b")
							.innerJoin("Blueprint as bl", "bl.id", "b.blueprintId")
							.select([
								"b.blueprintId",
								"bl.name",
								(eb) => eb.fn.count<number>("b.id").as("count"),
							])
							.where("b.userId", "=", user.id)
							.groupBy("b.blueprintId")
							.execute();
					});
				},
			}),
			cycle: await queryClient.ensureQueryData({
				queryKey: ["Cycle"],
				async queryFn() {
					return kysely.transaction().execute(async (tx) => {
						return (
							await tx
								.selectFrom("Cycle as c")
								.select((eb) => eb.fn.count<number>("c.id").as("count"))
								.where("c.userId", "=", user.id)
								.executeTakeFirstOrThrow()
						).count;
					});
				},
			}),
		};
	},
	component: () => {
		const { locale } = useParams({ from: "/$locale" });
		const { session, cycle } = useLoaderData({
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
						<CycleButton
							cycle={cycle}
							userId={session.id}
						/>
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
