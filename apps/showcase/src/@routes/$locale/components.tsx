import { createFileRoute, Outlet, useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";

export const Route = createFileRoute("/$locale/components")({
	component() {
		const { locale } = useParams({ from: "/$locale" });

		return (
			<div className={tvc(["flex", "h-full"])}>
				<div
					className={tvc([
						"flex",
						"flex-col",
						"gap-4",
						"w-1/6",
						"border-r",
						"border-slate-300",
						"bg-slate-100",
						"h-screen",
						"p-4",
						"shadow-lg",
					])}
				>
					<h1
						className={tvc([
							"text-2xl",
							"font-bold",
							"border-b",
							"border-slate-300",
							"pb-2",
						])}
					>
						<Tx label={"@use-pico - Components"} />
					</h1>k

					<Menu variant={{ vertical: true }}>
						<MenuLink
							icon={"icon-[teenyicons--button-outline]"}
							to={"/$locale/components/button"}
							params={{ locale }}
							variant={{ vertical: true }}
						>
							<Tx label={"Buttons"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[lsicon--table-outline]"}
							to={"/$locale/components/table"}
							params={{ locale }}
							variant={{ vertical: true }}
						>
							<Tx label={"Table"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[vaadin--area-select]"}
							to={"/$locale/components/popup-select"}
							params={{ locale }}
							variant={{ vertical: true }}
						>
							<Tx label={"Popup Select"} />
						</MenuLink>
					</Menu>
				</div>
				<div className={tvc(["flex", "flex-1", "p-4"])}>
					<Outlet />
				</div>
			</div>
		);
	},
});
