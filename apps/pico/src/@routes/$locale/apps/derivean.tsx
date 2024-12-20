import {
    createFileRoute,
    useLoaderData,
    useParams,
} from "@tanstack/react-router";
import { AppLayout, LinkTo, LogoutIcon } from "@use-pico/client";
import { DeRiveanMenu } from "~/app/derivean/DeRiveanMenu";

export const Route = createFileRoute("/$locale/apps/derivean")({
	component: () => {
		const { locale } = useParams({ from: "/$locale" });
		const { session } = useLoaderData({ from: "/$locale/apps" });

		return (
			<AppLayout
				menu={<DeRiveanMenu />}
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
