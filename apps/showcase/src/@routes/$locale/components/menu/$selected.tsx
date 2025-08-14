import { createFileRoute, useParams } from "@tanstack/react-router";
import {
	CheckIcon,
	EditIcon,
	ListIcon,
	Menu,
	MenuGroup,
	MenuLink,
	SettingsIcon,
	Tx,
	UserIcon,
} from "@use-pico/client";

export const Route = createFileRoute("/$locale/components/menu/$selected")({
	component() {
		const { locale, selected } = useParams({
			from: "/$locale/components/menu/$selected",
		});

		return (
			<div className="space-y-8">
				{/* Horizontal Menu */}
				<div>
					<h3 className="text-lg font-semibold mb-4">
						Horizontal Menu
					</h3>
					<Menu>
						<MenuLink
							icon={UserIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "colors",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "colors",
								}),
							})}
						>
							<Tx label={"Colors"} />
						</MenuLink>
						<MenuLink
							icon={SettingsIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "alert",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "alert",
								}),
							})}
						>
							<Tx label={"Alert"} />
						</MenuLink>
						<MenuLink
							icon={CheckIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "badge",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "badge",
								}),
							})}
						>
							<Tx label={"Badge"} />
						</MenuLink>
						<MenuLink
							icon={EditIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "button",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "button",
								}),
							})}
						>
							<Tx label={"Buttons"} />
						</MenuLink>
					</Menu>
				</div>

				{/* Vertical Menu */}
				<div>
					<h3 className="text-lg font-semibold mb-4">
						Vertical Menu
					</h3>
					<Menu
						cls={({ what }) => ({
							variant: what.variant({
								vertical: true,
							}),
						})}
					>
						<MenuLink
							icon={UserIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "vertical-colors",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "vertical-colors",
									vertical: true,
								}),
							})}
						>
							<Tx label={"Colors"} />
						</MenuLink>
						<MenuLink
							icon={SettingsIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "vertical-alert",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "vertical-alert",
									vertical: true,
								}),
							})}
						>
							<Tx label={"Alert"} />
						</MenuLink>
						<MenuLink
							icon={CheckIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "vertical-badge",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "vertical-badge",
									vertical: true,
								}),
							})}
						>
							<Tx label={"Badge"} />
						</MenuLink>
						<MenuLink
							icon={EditIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "vertical-button",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "vertical-button",
									vertical: true,
								}),
							})}
						>
							<Tx label={"Buttons"} />
						</MenuLink>
					</Menu>
				</div>

				{/* Subtle Menu Links */}
				<div>
					<h3 className="text-lg font-semibold mb-4">
						Subtle Menu Links
					</h3>
					<Menu>
						<MenuLink
							icon={UserIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "subtle-colors",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "subtle-colors",
									subtle: true,
								}),
							})}
						>
							<Tx label={"Colors (active)"} />
						</MenuLink>
						<MenuLink
							icon={SettingsIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "subtle-alert",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "subtle-alert",
									subtle: true,
								}),
							})}
						>
							<Tx label={"Alert (subtle)"} />
						</MenuLink>
						<MenuLink
							icon={CheckIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "subtle-badge",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "subtle-badge",
									subtle: true,
								}),
							})}
						>
							<Tx label={"Badge (subtle)"} />
						</MenuLink>
					</Menu>
				</div>

				{/* Inner Menu Links */}
				<div>
					<h3 className="text-lg font-semibold mb-4">
						Inner Menu Links
					</h3>
					<Menu>
						<MenuLink
							icon={UserIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "inner-colors",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "inner-colors",
									inner: true,
								}),
							})}
						>
							<Tx label={"Colors (inner active)"} />
						</MenuLink>
						<MenuLink
							icon={SettingsIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "inner-alert",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "inner-alert",
									inner: true,
								}),
							})}
						>
							<Tx label={"Alert (inner)"} />
						</MenuLink>
						<MenuLink
							icon={CheckIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "inner-badge",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "inner-badge",
									inner: true,
								}),
							})}
						>
							<Tx label={"Badge (inner)"} />
						</MenuLink>
					</Menu>
				</div>

				{/* Mixed Variants */}
				<div>
					<h3 className="text-lg font-semibold mb-4">
						Mixed Variants
					</h3>
					<Menu
						cls={({ what }) => ({
							variant: what.variant({
								vertical: true,
							}),
						})}
					>
						<MenuLink
							icon={UserIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "mixed-colors",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "mixed-colors",
									vertical: true,
									subtle: true,
								}),
							})}
						>
							<Tx label={"Colors (active + subtle + vertical)"} />
						</MenuLink>
						<MenuLink
							icon={SettingsIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "mixed-alert",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "mixed-alert",
									vertical: true,
									inner: true,
								}),
							})}
						>
							<Tx label={"Alert (inner + vertical)"} />
						</MenuLink>
						<MenuLink
							icon={CheckIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "mixed-badge",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "mixed-badge",
									vertical: true,
									inner: true,
									subtle: true,
								}),
							})}
						>
							<Tx label={"Badge (all variants)"} />
						</MenuLink>
					</Menu>
				</div>

				{/* Navigation Menu Example */}
				<div>
					<h3 className="text-lg font-semibold mb-4">
						Navigation Menu Example
					</h3>
					<div className="border rounded-lg p-4 bg-slate-50">
						<Menu
							cls={({ what }) => ({
								variant: what.variant({
									vertical: true,
								}),
							})}
						>
							<MenuLink
								icon={UserIcon}
								to={"/$locale/components/menu/$selected"}
								params={{
									locale,
									selected: "nav-colors",
								}}
								cls={({ what }) => ({
									variant: what.variant({
										active: selected === "nav-colors",
										vertical: true,
									}),
								})}
							>
								<Tx label={"Colors"} />
							</MenuLink>
							<MenuLink
								icon={SettingsIcon}
								to={"/$locale/components/menu/$selected"}
								params={{
									locale,
									selected: "nav-alert",
								}}
								cls={({ what }) => ({
									variant: what.variant({
										active: selected === "nav-alert",
										vertical: true,
									}),
								})}
							>
								<Tx label={"Alert"} />
							</MenuLink>
							<MenuLink
								icon={CheckIcon}
								to={"/$locale/components/menu/$selected"}
								params={{
									locale,
									selected: "nav-badge",
								}}
								cls={({ what }) => ({
									variant: what.variant({
										active: selected === "nav-badge",
										vertical: true,
									}),
								})}
							>
								<Tx label={"Badge"} />
							</MenuLink>
							<MenuLink
								icon={EditIcon}
								to={"/$locale/components/menu/$selected"}
								params={{
									locale,
									selected: "nav-button",
								}}
								cls={({ what }) => ({
									variant: what.variant({
										active: selected === "nav-button",
										vertical: true,
									}),
								})}
							>
								<Tx label={"Buttons"} />
							</MenuLink>
							<MenuLink
								icon={ListIcon}
								to={"/$locale/components/menu/$selected"}
								params={{
									locale,
									selected: "nav-table",
								}}
								cls={({ what }) => ({
									variant: what.variant({
										active: selected === "nav-table",
										vertical: true,
									}),
								})}
							>
								<Tx label={"Table"} />
							</MenuLink>
						</Menu>
					</div>
				</div>

				{/* Menu without Icons */}
				<div>
					<h3 className="text-lg font-semibold mb-4">
						Menu without Icons
					</h3>
					<Menu>
						<MenuLink
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "noicon-colors",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "noicon-colors",
								}),
							})}
						>
							<Tx label={"Colors"} />
						</MenuLink>
						<MenuLink
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "noicon-alert",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "noicon-alert",
								}),
							})}
						>
							<Tx label={"Alert"} />
						</MenuLink>
						<MenuLink
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "noicon-badge",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "noicon-badge",
								}),
							})}
						>
							<Tx label={"Badge"} />
						</MenuLink>
						<MenuLink
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "noicon-button",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "noicon-button",
								}),
							})}
						>
							<Tx label={"Buttons"} />
						</MenuLink>
					</Menu>
				</div>

				{/* Menu with Submenus */}
				<div>
					<h3 className="text-lg font-semibold mb-4">
						Menu with Submenus
					</h3>
					<Menu>
						<MenuLink
							icon={UserIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "submenu-dashboard",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "submenu-dashboard",
								}),
							})}
						>
							<Tx label={"Dashboard"} />
						</MenuLink>
						<MenuGroup
							icon="icon-[ph--gear-six]"
							label={<Tx label={"Settings"} />}
						>
							<MenuLink
								icon={UserIcon}
								to={"/$locale/components/menu/$selected"}
								params={{
									locale,
									selected: "submenu-profile",
								}}
								cls={({ what }) => ({
									variant: what.variant({
										active: selected === "submenu-profile",
									}),
								})}
							>
								<Tx label={"Profile Settings"} />
							</MenuLink>
							<MenuLink
								icon={SettingsIcon}
								to={"/$locale/components/menu/$selected"}
								params={{
									locale,
									selected: "submenu-security",
								}}
								cls={({ what }) => ({
									variant: what.variant({
										active: selected === "submenu-security",
									}),
								})}
							>
								<Tx label={"Security"} />
							</MenuLink>
							<MenuLink
								icon={CheckIcon}
								to={"/$locale/components/menu/$selected"}
								params={{
									locale,
									selected: "submenu-notifications",
								}}
								cls={({ what }) => ({
									variant: what.variant({
										active:
											selected ===
											"submenu-notifications",
									}),
								})}
							>
								<Tx label={"Notifications"} />
							</MenuLink>
						</MenuGroup>
						<MenuGroup
							icon="icon-[ph--folder]"
							label={<Tx label={"Content"} />}
						>
							<MenuLink
								icon={EditIcon}
								to={"/$locale/components/menu/$selected"}
								params={{
									locale,
									selected: "submenu-posts",
								}}
								cls={({ what }) => ({
									variant: what.variant({
										active: selected === "submenu-posts",
									}),
								})}
							>
								<Tx label={"Posts"} />
							</MenuLink>
							<MenuLink
								icon={ListIcon}
								to={"/$locale/components/menu/$selected"}
								params={{
									locale,
									selected: "submenu-pages",
								}}
								cls={({ what }) => ({
									variant: what.variant({
										active: selected === "submenu-pages",
									}),
								})}
							>
								<Tx label={"Pages"} />
							</MenuLink>
							<MenuLink
								icon={CheckIcon}
								to={"/$locale/components/menu/$selected"}
								params={{
									locale,
									selected: "submenu-media",
								}}
								cls={({ what }) => ({
									variant: what.variant({
										active: selected === "submenu-media",
									}),
								})}
							>
								<Tx label={"Media"} />
							</MenuLink>
						</MenuGroup>
						<MenuLink
							icon={EditIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "submenu-help",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "submenu-help",
								}),
							})}
						>
							<Tx label={"Help"} />
						</MenuLink>
					</Menu>
				</div>

				{/* Vertical Menu with Submenus */}
				<div>
					<h3 className="text-lg font-semibold mb-4">
						Vertical Menu with Submenus
					</h3>
					<Menu
						cls={({ what }) => ({
							variant: what.variant({
								vertical: true,
							}),
						})}
					>
						<MenuLink
							icon={UserIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "vsubmenu-dashboard",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "vsubmenu-dashboard",
									vertical: true,
								}),
							})}
						>
							<Tx label={"Dashboard"} />
						</MenuLink>
						<MenuGroup
							icon="icon-[ph--gear-six]"
							label={<Tx label={"Settings"} />}
						>
							<MenuLink
								icon={UserIcon}
								to={"/$locale/components/menu/$selected"}
								params={{
									locale,
									selected: "vsubmenu-profile",
								}}
								cls={({ what }) => ({
									variant: what.variant({
										active: selected === "vsubmenu-profile",
										vertical: true,
									}),
								})}
							>
								<Tx label={"Profile Settings"} />
							</MenuLink>
							<MenuLink
								icon={SettingsIcon}
								to={"/$locale/components/menu/$selected"}
								params={{
									locale,
									selected: "vsubmenu-security",
								}}
								cls={({ what }) => ({
									variant: what.variant({
										active:
											selected === "vsubmenu-security",
										vertical: true,
									}),
								})}
							>
								<Tx label={"Security"} />
							</MenuLink>
						</MenuGroup>
						<MenuGroup
							icon="icon-[ph--folder]"
							label={<Tx label={"Content"} />}
						>
							<MenuLink
								icon={EditIcon}
								to={"/$locale/components/menu/$selected"}
								params={{
									locale,
									selected: "vsubmenu-posts",
								}}
								cls={({ what }) => ({
									variant: what.variant({
										active: selected === "vsubmenu-posts",
										vertical: true,
									}),
								})}
							>
								<Tx label={"Posts"} />
							</MenuLink>
							<MenuLink
								icon={ListIcon}
								to={"/$locale/components/menu/$selected"}
								params={{
									locale,
									selected: "vsubmenu-pages",
								}}
								cls={({ what }) => ({
									variant: what.variant({
										active: selected === "vsubmenu-pages",
										vertical: true,
									}),
								})}
							>
								<Tx label={"Pages"} />
							</MenuLink>
						</MenuGroup>
						<MenuLink
							icon={EditIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "vsubmenu-help",
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: selected === "vsubmenu-help",
									vertical: true,
								}),
							})}
						>
							<Tx label={"Help"} />
						</MenuLink>
					</Menu>
				</div>
			</div>
		);
	},
});
