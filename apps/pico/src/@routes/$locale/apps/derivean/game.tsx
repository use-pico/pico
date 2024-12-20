import {
    createFileRoute,
    useLoaderData,
    useParams,
} from "@tanstack/react-router";
import { AppLayout, LinkTo, LogoutIcon } from "@use-pico/client";
import { GameMenu } from "~/app/derivean/game/GameMenu";
import { Logo } from "~/app/derivean/logo/Logo";

export const Route = createFileRoute("/$locale/apps/derivean/game")({
	component: () => {
		const { locale } = useParams({ from: "/$locale" });
		const { session } = useLoaderData({ from: "/$locale/apps" });

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
							to={"/$locale/public/logout"}
							params={{ locale }}
							preload={false}
						/>
					</>
				}
			/>
		);
	},
});
