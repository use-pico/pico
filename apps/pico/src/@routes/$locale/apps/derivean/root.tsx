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
	loader({ params: { locale } }) {
		try {
			return {
				session: SessionSchema.parse(ls.get("session")),
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
