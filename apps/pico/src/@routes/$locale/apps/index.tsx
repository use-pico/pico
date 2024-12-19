import { createFileRoute, useParams } from "@tanstack/react-router";
import { LinkTo } from "@use-pico/client";

export const Route = createFileRoute("/$locale/apps/")({
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
								to={"/$locale/apps/derivean"}
								params={{ locale }}
							>
								DeRivean
							</LinkTo>
						</li>
						<li>
							<LinkTo
								icon={"icon-[ph--money]"}
								to={"/$locale/apps/monye"}
								params={{ locale }}
							>
								Monye
							</LinkTo>
						</li>
						<li>
							<LinkTo
								icon={"icon-[zondicons--play-outline]"}
								to={"/$locale/apps/playground"}
								params={{ locale }}
							>
								Playground
							</LinkTo>
						</li>
					</ul>
				</div>
			</div>
		);
	},
});
