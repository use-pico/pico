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
import { InventorySource } from "~/app/derivean/inventory/InventorySource";
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
		const $session = await session();

		return kysely.transaction().execute(async (tx) => {
			return {
				session: $session,
				inventory: await InventorySource.list$({
					tx,
					where: { userId: $session.id },
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
						<CycleButton />
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
