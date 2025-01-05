import {
    createFileRoute,
    Outlet,
    redirect,
    useLoaderData,
    useParams,
} from "@tanstack/react-router";
import { AppLayout, LinkTo, LogoutIcon, ls } from "@use-pico/client";
import { BuildingResourceSource } from "~/app/derivean/building/resource/BuildingResourceSource";
import { GameMenu } from "~/app/derivean/game/GameMenu";
import { Logo } from "~/app/derivean/logo/Logo";
import { resourceSumOf } from "~/app/derivean/resource/resourceSumOf";
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
				resources: resourceSumOf({
					resources: await BuildingResourceSource.list$({
						tx,
						where: { userId: $session.id },
					}),
				}),
			};
		});
	},
	component: () => {
		const { locale } = useParams({ from: "/$locale" });
		const { session } = useLoaderData({
			from: "/$locale/apps/derivean/game",
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
				menu={<GameMenu />}
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
			>
				<Outlet />
			</AppLayout>
		);
	},
});
