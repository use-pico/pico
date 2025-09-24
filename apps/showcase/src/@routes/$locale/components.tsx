import { createFileRoute, Outlet, useParams } from "@tanstack/react-router";
import { Menu, MenuGroup, MenuLink, Tx } from "@use-pico/client";
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
						"w-fit",
						"border-r",
						"border-slate-300",
						"bg-slate-100",
						"min-h-full",
						"items-center",
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
							"w-full",
						])}
					>
						<h1
							className={tvc([
								"text-2xl",
								"font-bold",
								"text-center",
							])}
						>
							<Tx
								label={"Components"}
								size={"xl"}
								font={"bold"}
							/>
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
							{/* Core UI Components */}
							<MenuGroup
								icon={"icon-[ph--puzzle-piece]"}
								label={<Tx label={"Core UI"} />}
								match={[
									{
										to: "/$locale/components/button",
									},
									{
										to: "/$locale/components/button-advanced",
									},
									{
										to: "/$locale/components/badge",
									},
									{
										to: "/$locale/components/alert",
									},
									{
										to: "/$locale/components/icon",
									},
									{
										to: "/$locale/components/progress",
									},
									{
										to: "/$locale/components/typo",
									},
									{
										to: "/$locale/components/highlighter",
									},
								]}
								vertical
							>
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
									icon={"icon-[ph--gear]"}
									to={"/$locale/components/button-advanced"}
									params={{
										locale,
									}}
									vertical
								>
									<Tx label={"Buttons Advanced"} />
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
									icon={"icon-[ph--text-t]"}
									to={"/$locale/components/typo"}
									params={{
										locale,
									}}
									vertical
								>
									<Tx label={"Typo"} />
								</MenuLink>

								<MenuLink
									icon={"icon-[ph--target]"}
									to={"/$locale/components/highlighter"}
									params={{
										locale,
									}}
									vertical
								>
									<Tx label={"Highlighter"} />
								</MenuLink>
							</MenuGroup>

							{/* Layout & Container */}
							<MenuGroup
								icon={"icon-[ph--layout]"}
								label={<Tx label={"Layout & Container"} />}
								match={[
									{
										to: "/$locale/components/container",
									},
									{
										to: "/$locale/components/container/overflow",
									},
									{
										to: "/$locale/components/container/orientation",
									},
									{
										to: "/$locale/components/container/sizing",
									},
									{
										to: "/$locale/components/container/design",
									},
								]}
								vertical
							>
								<MenuLink
									icon={"icon-[ph--layout]"}
									to={"/$locale/components/container"}
									params={{
										locale,
									}}
									vertical
								>
									<Tx label={"Container Overview"} />
								</MenuLink>

								<MenuLink
									icon={"icon-[ph--arrows-out]"}
									to={
										"/$locale/components/container/overflow"
									}
									params={{
										locale,
									}}
									vertical
								>
									<Tx label={"Overflow & Snap"} />
								</MenuLink>

								<MenuLink
									icon={"icon-[ph--arrows-clockwise]"}
									to={
										"/$locale/components/container/orientation"
									}
									params={{
										locale,
									}}
									vertical
								>
									<Tx label={"Orientation"} />
								</MenuLink>

								<MenuLink
									icon={"icon-[ph--resize]"}
									to={"/$locale/components/container/sizing"}
									params={{
										locale,
									}}
									vertical
								>
									<Tx label={"Sizing"} />
								</MenuLink>

								<MenuLink
									icon={"icon-[ph--palette]"}
									to={"/$locale/components/container/design"}
									params={{
										locale,
									}}
									vertical
								>
									<Tx label={"Design & Theming"} />
								</MenuLink>
							</MenuGroup>

							{/* Data Display Components */}
							<MenuGroup
								icon={"icon-[ph--table]"}
								label={<Tx label={"Data Display"} />}
								match={[
									{
										to: "/$locale/components/attr",
									},
									{
										to: "/$locale/components/detail",
									},
									{
										to: "/$locale/components/status",
									},
									{
										to: "/$locale/components/preview",
									},
									{
										to: "/$locale/components/title-preview",
									},
									{
										to: "/$locale/components/table",
									},
									{
										to: "/$locale/components/card",
									},
									{
										to: "/$locale/components/data",
									},
								]}
								vertical
							>
								<MenuLink
									icon={"icon-[ph--function]"}
									to={"/$locale/components/attr"}
									params={{
										locale,
									}}
									vertical
								>
									<Tx label={"Attr"} />
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
									icon={"icon-[ph--database]"}
									to={"/$locale/components/data"}
									params={{
										locale,
									}}
									vertical
								>
									<Tx label={"Data"} />
								</MenuLink>
							</MenuGroup>

							{/* Form Components */}
							<MenuGroup
								icon={"icon-[ph--textbox]"}
								label={<Tx label={"Form Components"} />}
								match={[
									{
										to: "/$locale/components/form",
									},
									{
										to: "/$locale/components/complex-form",
									},
									{
										to: "/$locale/components/bool-inline",
									},
									{
										to: "/$locale/components/bool-input",
									},
									{
										to: "/$locale/components/select",
									},
									{
										to: "/$locale/components/popup-select",
									},
									{
										to: "/$locale/components/date-inline",
									},
									{
										to: "/$locale/components/cursor",
									},
								]}
								vertical
							>
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
									icon={"icon-[ph--clipboard-text]"}
									to={"/$locale/components/complex-form"}
									params={{
										locale,
									}}
									vertical
								>
									<Tx label={"Complex Form"} />
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
									icon={"icon-[ph--caret-down]"}
									to={"/$locale/components/select"}
									params={{
										locale,
									}}
									vertical
								>
									<Tx label={"Select"} />
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
									icon={"icon-[ph--cursor-text]"}
									to={"/$locale/components/cursor"}
									params={{
										locale,
									}}
									vertical
								>
									<Tx label={"Cursor"} />
								</MenuLink>
							</MenuGroup>

							{/* Navigation & Actions */}
							<MenuGroup
								icon={"icon-[ph--lightning]"}
								label={<Tx label={"Navigation & Actions"} />}
								match={[
									{
										to: "/$locale/components/action",
									},
									{
										to: "/$locale/components/action-menu",
									},
									{
										to: "/$locale/components/menu/$selected",
									},
								]}
								vertical
							>
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
							</MenuGroup>

							{/* Utilities & Theming */}
							<MenuGroup
								icon={"icon-[ph--paint-brush]"}
								label={<Tx label={"Utilities & Theming"} />}
								match={[
									{
										to: "/$locale/components/colors",
									},
									{
										to: "/$locale/components/misc",
									},
									{
										to: "/$locale/components/issues",
									},
								]}
								vertical
							>
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
									icon={"icon-[ph--puzzle-piece]"}
									to={"/$locale/components/misc"}
									params={{
										locale,
									}}
									vertical
								>
									<Tx label={"Misc Components"} />
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
							</MenuGroup>

							{/* Examples & Demos */}
							<MenuGroup
								icon={"icon-[ph--flask]"}
								label={<Tx label={"Examples & Demos"} />}
								match={[
									{
										to: "/$locale/components/customer-detail",
									},
								]}
								vertical
							>
								<MenuLink
									icon={"icon-[ph--user-circle]"}
									to={"/$locale/components/customer-detail"}
									params={{
										locale,
									}}
									vertical
								>
									<Tx label={"Customer Detail"} />
								</MenuLink>
							</MenuGroup>
						</Menu>
					</div>
				</div>
				<div
					className={tvc([
						"flex-1",
						"p-4",
						"pb-16",
						"overflow-y-auto",
					])}
				>
					<Outlet />
				</div>
			</div>
		);
	},
});
