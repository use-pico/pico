import {
    createFileRoute,
    useParams,
    useRouteContext,
} from "@tanstack/react-router";
import { LinkTo } from "@use-pico/client";

export const Route = createFileRoute("/$locale/public/")({
	component: () => {
		const { locale } = useParams({ from: "/$locale" });
		const { tva } = useRouteContext({ from: "__root__" });
		const tv = tva().slots;

		return (
			<div className={tv.base()}>
				<LinkTo
					to={"/$locale/public/login"}
					params={{ locale }}
				>
					Login, pyco
				</LinkTo>
			</div>
		);
	},
});
