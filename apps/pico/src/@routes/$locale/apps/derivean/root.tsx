import {
    createFileRoute,
    useLoaderData,
    useParams,
} from "@tanstack/react-router";
import { AppLayout, LinkTo, LogoutIcon } from "@use-pico/client";
import { Logo } from "~/app/derivean/logo/Logo";
import { RootMenu } from "~/app/derivean/root/RootMenu";

export const Route = createFileRoute("/$locale/apps/derivean/root")({
	component: () => {
		const { locale } = useParams({ from: "/$locale" });
		const { session } = useLoaderData({ from: "/$locale/apps" });

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
