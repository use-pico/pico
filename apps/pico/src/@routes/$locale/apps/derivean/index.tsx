import {
    createFileRoute,
    useLoaderData,
    useParams
} from "@tanstack/react-router";
import {
    AppLayout,
    LinkTo,
    LogoutIcon,
    Menu,
    MenuLink,
    Tx,
} from "@use-pico/client";
import { GameIcon } from "~/app/derivean/icon/GameIcon";
import { Logo } from "~/app/derivean/logo/Logo";

export const Route = createFileRoute("/$locale/apps/derivean/")({
	component: () => {
		const { locale } = useParams({ from: "/$locale" });
		const { session } = useLoaderData({ from: "/$locale/apps" });

		return (
			<AppLayout
				logo={
					<LinkTo>
						<Logo />
					</LinkTo>
				}
				menu={
					<Menu>
						<MenuLink
							icon={GameIcon}
							to={"/$locale/apps/derivean/game"}
							params={{ locale }}
						>
							<Tx label={"Game (menu)"} />
						</MenuLink>
					</Menu>
				}
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
			>
				bello!
			</AppLayout>
		);
	},
});
