import {
    createFileRoute,
    Outlet,
    redirect,
    useLoaderData,
    useParams,
} from "@tanstack/react-router";
import { AppLayout, LinkTo, LogoutIcon, ls } from "@use-pico/client";
import { GameMenu } from "~/app/derivean/game/GameMenu";
import { ResourceOverview } from "~/app/derivean/game/ResourceOverview";
import { Logo } from "~/app/derivean/logo/Logo";
import { SessionSchema } from "~/app/schema/SessionSchema";

export const Route = createFileRoute("/$locale/apps/derivean/game")({
	component: () => {
		const { locale } = useParams({ from: "/$locale" });
		const { session, resources } = useLoaderData({
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
							icon={LogoutIcon}
							to={"/$locale/apps/derivean/public/logout"}
							params={{ locale }}
							preload={false}
						/>
					</>
				}
			>
				<ResourceOverview entities={resources} />

				<Outlet />
			</AppLayout>
		);
	},
	async loader({ context: { queryClient }, params: { locale } }) {
		try {
			return {
				session: SessionSchema.parse(ls.get("session")),
				resources: [],
			};
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (_) {
			throw redirect({
				to: `/$locale/apps/derivean/public/login`,
				params: { locale },
			});
		}
	},
});
