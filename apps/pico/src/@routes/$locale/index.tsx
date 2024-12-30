import { createFileRoute, useParams } from "@tanstack/react-router";
import { LinkTo } from "@use-pico/client";

export const Route = createFileRoute("/$locale/")({
	component: () => {
		const { locale } = useParams({ from: "/$locale" });

		return (
			<div
				className={
					"flex flex-col items-center justify-center h-screen w-screen"
				}
			>
				<div
					className={
						"rounded bg-slate-50 p-4 shadow-md border border-slate-300"
					}
				>
					<h1 className={"text-3xl text-center"}>Apps</h1>

					<ul>
						<li>
							<LinkTo
								icon={"icon-[bx--game]"}
								to={"/$locale/apps/derivean/public/login"}
								params={{ locale }}
							>
								DeRivean
							</LinkTo>
						</li>
					</ul>
				</div>
			</div>
		);
	},
});
