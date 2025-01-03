import {
    createFileRoute,
    redirect,
    useLoaderData,
    useParams,
} from "@tanstack/react-router";
import { AppLayout, LinkTo, LogoutIcon, ls } from "@use-pico/client";
import { GameIcon } from "~/app/derivean/icon/GameIcon";
import { Logo } from "~/app/derivean/logo/Logo";
import { RootMenu } from "~/app/derivean/root/RootMenu";
import { SessionSchema } from "~/app/schema/SessionSchema";

export const Route = createFileRoute("/$locale/apps/derivean/root")({
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
		return {
			session: await session(),
		};
	},

	component: () => {
		const { locale } = useParams({ from: "/$locale" });
		const { session } = useLoaderData({ from: "/$locale/apps/derivean/root" });

		return (
			<AppLayout
				logo={
					<LinkTo
						to={"/$locale/apps/derivean/root"}
						params={{ locale }}
					>
						<Logo />
					</LinkTo>
				}
				menu={<RootMenu />}
				actions={
					<>
						{session.name}
						<LinkTo
							icon={GameIcon}
							to={"/$locale/apps/derivean/game"}
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
			/>
		);
	},
});
