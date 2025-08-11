import { createFileRoute, Outlet, useParams } from "@tanstack/react-router";
import { Menu, MenuLink, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/cls";

export const Route = createFileRoute("/$locale/components")({
	component() {
		const { locale } = useParams({
			from: "/$locale",
		});

		return (
			<div
				className={tvc([
					"flex",
					"h-full",
				])}
			>
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
					</h1>

					<Menu
						cls={({ what }) => ({
							variant: what.variant({
								vertical: true,
							}),
						})}
					>
						<MenuLink
							icon={"icon-[bx--color-fill]"}
							to={"/$locale/components/colors"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									vertical: true,
								}),
							})}
						>
							<Tx label={"Colors"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[ic--baseline-menu]"}
							to={"/$locale/components/action-menu"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									vertical: true,
								}),
							})}
						>
							<Tx label={"Action menu"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[mdi-light--alert]"}
							to={"/$locale/components/alert"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									vertical: true,
								}),
							})}
						>
							<Tx label={"Alert"} />
						</MenuLink>

						<MenuLink
							icon={
								"icon-[material-symbols-light--flash-on-outline-rounded]"
							}
							to={"/$locale/components/action"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									vertical: true,
								}),
							})}
						>
							<Tx label={"Action"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[proicons--badge]"}
							to={"/$locale/components/badge"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									vertical: true,
								}),
							})}
						>
							<Tx label={"Badge"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[teenyicons--button-outline]"}
							to={"/$locale/components/button"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									vertical: true,
								}),
							})}
						>
							<Tx label={"Buttons"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[lsicon--table-outline]"}
							to={"/$locale/components/table"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									vertical: true,
								}),
							})}
						>
							<Tx label={"Table"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[vaadin--area-select]"}
							to={"/$locale/components/popup-select"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									vertical: true,
								}),
							})}
						>
							<Tx label={"Popup Select"} />
						</MenuLink>

						<MenuLink
							icon={
								"icon-[material-symbols-light--flash-on-outline-rounded]"
							}
							to={"/$locale/components/issues"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									vertical: true,
								}),
							})}
						>
							<Tx label={"Issues"} />
						</MenuLink>
					</Menu>
				</div>
				<div
					className={tvc([
						"flex",
						"flex-1",
						"p-4",
						"overflow-hidden",
					])}
				>
					<Outlet />
				</div>
			</div>
		);
	},
});
