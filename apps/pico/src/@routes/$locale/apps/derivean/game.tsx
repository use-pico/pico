import {
    createFileRoute,
    Outlet,
    redirect,
    useLoaderData,
    useParams,
} from "@tanstack/react-router";
import { AppLayout, LinkTo, LogoutIcon, ls } from "@use-pico/client";
import { BuildingResourceRepository } from "~/app/derivean/building/resource/BuildingResourceRepository";
import { db } from "~/app/derivean/db/db";
import { GameMenu } from "~/app/derivean/game/GameMenu";
import { Logo } from "~/app/derivean/logo/Logo";
import { resourceSumOf } from "~/app/derivean/resource/resourceSumOf";
import { SessionSchema } from "~/app/schema/SessionSchema";

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
	async loader({ context: { session } }) {
		const $session = await session();

		return db.kysely.transaction().execute(async (tx) => {
			return {
				session: $session,
				resources: resourceSumOf({
					resources: await BuildingResourceRepository.list({
						tx,
						query: { where: { userId: $session.id } },
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
