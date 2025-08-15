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
					"h-screen",
				])}
			>
				<div
					className={tvc([
						"flex",
						"flex-col",
						"w-1/6",
						"border-r",
						"border-slate-300",
						"bg-slate-100",
						"h-full",
						"shadow-lg",
					])}
				>
					<div
						className={tvc([
							"p-4",
							"border-b",
							"border-slate-300",
							"bg-slate-50",
							"flex-shrink-0",
						])}
					>
						<h1
							className={tvc([
								"text-2xl",
								"font-bold",
							])}
						>
							<Tx label={"@use-pico - Components"} />
						</h1>
					</div>

					<div
						className={tvc([
							"flex-1",
							"overflow-y-auto",
							"p-4",
						])}
					>
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
								icon={"icon-[ph--check-square]"}
								to={"/$locale/components/bool-inline"}
								params={{
									locale,
								}}
								vertical
							>
								<Tx label={"Bool Inline"} />
							</MenuLink>

							<MenuLink
								icon={
									"icon-[fluent--checkbox-checked-20-regular]"
								}
								to={"/$locale/components/bool-input"}
								params={{
									locale,
								}}
								vertical
							>
								<Tx label={"Bool Input"} />
							</MenuLink>

							<MenuLink
								icon={"icon-[ph--cursor-text]"}
								to={"/$locale/components/cursor"}
								params={{
									locale,
								}}
								vertical
							>
								<Tx label={"Cursor"} />
							</MenuLink>

							<MenuLink
								icon={"icon-[ph--calendar]"}
								to={"/$locale/components/date-inline"}
								params={{
									locale,
								}}
								vertical
							>
								<Tx label={"Date Inline"} />
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
				</div>
				<div
					className={tvc([
						"flex",
						"flex-1",
						"p-4",
						"overflow-y-auto",
					])}
				>
					<Outlet />
				</div>
			</div>
		);
	},
});
