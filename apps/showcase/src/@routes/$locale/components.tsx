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

					<Menu vertical>
						<MenuLink
							icon={"icon-[ph--paint-brush]"}
							to={"/$locale/components/colors"}
							params={{
								locale,
							}}
							vertical
						>
							<Tx label={"Colors"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[ph--list]"}
							to={"/$locale/components/action-menu"}
							params={{
								locale,
							}}
							vertical
						>
							<Tx label={"Action menu"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[ph--warning]"}
							to={"/$locale/components/alert"}
							params={{
								locale,
							}}
							vertical
						>
							<Tx label={"Alert"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[ph--lightning]"}
							to={"/$locale/components/action"}
							params={{
								locale,
							}}
							vertical
						>
							<Tx label={"Action"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[ph--tag]"}
							to={"/$locale/components/badge"}
							params={{
								locale,
							}}
							vertical
						>
							<Tx label={"Badge"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[ph--cursor]"}
							to={"/$locale/components/button"}
							params={{
								locale,
							}}
							vertical
						>
							<Tx label={"Buttons"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[ph--table]"}
							to={"/$locale/components/table"}
							params={{
								locale,
							}}
							vertical
						>
							<Tx label={"Table"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[ph--credit-card]"}
							to={"/$locale/components/card"}
							params={{
								locale,
							}}
							vertical
						>
							<Tx label={"Card"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[ph--function]"}
							to={"/$locale/components/value-of"}
							params={{
								locale,
							}}
							vertical
						>
							<Tx label={"ValueOf"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[ph--info]"}
							to={"/$locale/components/status"}
							params={{
								locale,
							}}
							vertical
						>
							<Tx label={"Status"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[ph--star]"}
							to={"/$locale/components/icon"}
							params={{
								locale,
							}}
							vertical
						>
							<Tx label={"Icon"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[ph--text-t]"}
							to={"/$locale/components/title-preview"}
							params={{
								locale,
							}}
							vertical
						>
							<Tx label={"Title Preview"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[ph--eye]"}
							to={"/$locale/components/preview"}
							params={{
								locale,
							}}
							vertical
						>
							<Tx label={"Preview"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[ph--list-dashes]"}
							to={"/$locale/components/detail"}
							params={{
								locale,
							}}
							vertical
						>
							<Tx label={"Detail"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[ph--textbox]"}
							to={"/$locale/components/form"}
							params={{
								locale,
							}}
							vertical
						>
							<Tx label={"Form"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[ph--chart-line]"}
							to={"/$locale/components/progress"}
							params={{
								locale,
							}}
							vertical
						>
							<Tx label={"Progress"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[ph--list-plus]"}
							to={"/$locale/components/popup-select"}
							params={{
								locale,
							}}
							vertical
						>
							<Tx label={"Popup Select"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[ph--warning-circle]"}
							to={"/$locale/components/issues"}
							params={{
								locale,
							}}
							vertical
						>
							<Tx label={"Issues"} />
						</MenuLink>

						<MenuLink
							icon={"icon-[ph--dots-three-vertical]"}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "colors",
							}}
							vertical
						>
							<Tx label={"Menu"} />
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
