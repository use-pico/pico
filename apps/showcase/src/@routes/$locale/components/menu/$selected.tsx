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
			<div className="space-y-8 w-full">
				{/* Main Navigation Menu */}
				<div>
					<h3 className="text-lg font-semibold mb-4">
						Main Navigation Menu
					</h3>
					<Menu>
						<MenuLink
							icon={UserIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "main-dashboard",
							}}
							type="main"
							active={selected === "main-dashboard"}
						>
							<Tx label={"Dashboard"} />
						</MenuLink>
						<MenuLink
							icon={SettingsIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "main-settings",
							}}
							type="main"
							active={selected === "main-settings"}
						>
							<Tx label={"Settings"} />
						</MenuLink>
						<MenuLink
							icon={EditIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "main-content",
							}}
							type="main"
							active={selected === "main-content"}
						>
							<Tx label={"Content"} />
						</MenuLink>
						<MenuLink
							icon={ListIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "main-reports",
							}}
							type="main"
							active={selected === "main-reports"}
						>
							<Tx label={"Reports"} />
						</MenuLink>
					</Menu>
				</div>

				{/* Sub-level Menu Items */}
				<div>
					<h3 className="text-lg font-semibold mb-4">
						Sub-level Menu Items
					</h3>
					<Menu>
						<MenuLink
							icon={UserIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "sub-profile",
							}}
							type="sub"
							active={selected === "sub-profile"}
						>
							<Tx label={"Profile Settings"} />
						</MenuLink>
						<MenuLink
							icon={SettingsIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "sub-security",
							}}
							type="sub"
							active={selected === "sub-security"}
						>
							<Tx label={"Security"} />
						</MenuLink>
						<MenuLink
							icon={CheckIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "sub-notifications",
							}}
							type="sub"
							active={selected === "sub-notifications"}
						>
							<Tx label={"Notifications"} />
						</MenuLink>
						<MenuLink
							icon={EditIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "sub-posts",
							}}
							type="sub"
							active={selected === "sub-posts"}
						>
							<Tx label={"Posts"} />
						</MenuLink>
					</Menu>
				</div>

				{/* Third Level Menu Items */}
				<div>
					<h3 className="text-lg font-semibold mb-4">
						Third Level Menu Items
					</h3>
					<Menu>
						<MenuLink
							icon={UserIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "level-account",
							}}
							type="level"
							active={selected === "level-account"}
						>
							<Tx label={"Account Details"} />
						</MenuLink>
						<MenuLink
							icon={SettingsIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "level-privacy",
							}}
							type="level"
							active={selected === "level-privacy"}
						>
							<Tx label={"Privacy Settings"} />
						</MenuLink>
						<MenuLink
							icon={CheckIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "level-email",
							}}
							type="level"
							active={selected === "level-email"}
						>
							<Tx label={"Email Preferences"} />
						</MenuLink>
						<MenuLink
							icon={EditIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "level-drafts",
							}}
							type="level"
							active={selected === "level-drafts"}
						>
							<Tx label={"Draft Posts"} />
						</MenuLink>
					</Menu>
				</div>

				{/* Hierarchical Menu with All Levels */}
				<div>
					<h3 className="text-lg font-semibold mb-4">
						Hierarchical Menu with All Levels
					</h3>
					<Menu>
						{/* Main Level */}
						<MenuLink
							icon={UserIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "hierarchical-dashboard",
							}}
							type="main"
							active={selected === "hierarchical-dashboard"}
						>
							<Tx label={"Dashboard"} />
						</MenuLink>

						{/* Sub Level */}
						<MenuLink
							icon={SettingsIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "hierarchical-settings",
							}}
							type="sub"
							active={selected === "hierarchical-settings"}
						>
							<Tx label={"Settings"} />
						</MenuLink>

						{/* Third Level */}
						<MenuLink
							icon={CheckIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "hierarchical-advanced",
							}}
							type="level"
							active={selected === "hierarchical-advanced"}
						>
							<Tx label={"Advanced Settings"} />
						</MenuLink>
					</Menu>
				</div>

				{/* Vertical Menu with Hierarchy */}
				<div>
					<h3 className="text-lg font-semibold mb-4">
						Vertical Menu with Hierarchy
					</h3>
					<div className="w-fit">
						<Menu vertical>
							{/* Main Level */}
							<MenuLink
								icon={UserIcon}
								to={"/$locale/components/menu/$selected"}
								params={{
									locale,
									selected: "vertical-main",
								}}
								type="main"
								vertical
								active={selected === "vertical-main"}
							>
								<Tx label={"Main Navigation"} />
							</MenuLink>

							{/* Sub Level */}
							<MenuLink
								icon={SettingsIcon}
								to={"/$locale/components/menu/$selected"}
								params={{
									locale,
									selected: "vertical-sub",
								}}
								type="sub"
								vertical
								active={selected === "vertical-sub"}
							>
								<Tx label={"Sub Navigation"} />
							</MenuLink>

							{/* Third Level */}
							<MenuLink
								icon={CheckIcon}
								to={"/$locale/components/menu/$selected"}
								params={{
									locale,
									selected: "vertical-level",
								}}
								type="level"
								vertical
								active={selected === "vertical-level"}
							>
								<Tx label={"Deep Navigation"} />
							</MenuLink>
						</Menu>
					</div>
				</div>

				{/* Navigation Menu Example */}
				<div>
					<h3 className="text-lg font-semibold mb-4">
						Navigation Menu Example
					</h3>
					<div className="border rounded-lg p-4 bg-slate-50">
						<div className="w-fit">
							<Menu vertical>
								<MenuLink
									icon={UserIcon}
									to={"/$locale/components/menu/$selected"}
									params={{
										locale,
										selected: "nav-dashboard",
									}}
									type="main"
									vertical
									active={selected === "nav-dashboard"}
								>
									<Tx label={"Dashboard"} />
								</MenuLink>
								<MenuLink
									icon={SettingsIcon}
									to={"/$locale/components/menu/$selected"}
									params={{
										locale,
										selected: "nav-settings",
									}}
									type="main"
									vertical
									active={selected === "nav-settings"}
								>
									<Tx label={"Settings"} />
								</MenuLink>
								<MenuLink
									icon={EditIcon}
									to={"/$locale/components/menu/$selected"}
									params={{
										locale,
										selected: "nav-content",
									}}
									type="main"
									vertical
									active={selected === "nav-content"}
								>
									<Tx label={"Content"} />
								</MenuLink>
								<MenuLink
									icon={ListIcon}
									to={"/$locale/components/menu/$selected"}
									params={{
										locale,
										selected: "nav-reports",
									}}
									type="main"
									vertical
									active={selected === "nav-reports"}
								>
									<Tx label={"Reports"} />
								</MenuLink>
							</Menu>
						</div>
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
								selected: "noicon-main",
							}}
							type="main"
							active={selected === "noicon-main"}
						>
							<Tx label={"Main Item"} />
						</MenuLink>
						<MenuLink
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "noicon-sub",
							}}
							type="sub"
							active={selected === "noicon-sub"}
						>
							<Tx label={"Sub Item"} />
						</MenuLink>
						<MenuLink
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "noicon-level",
							}}
							type="level"
							active={selected === "noicon-level"}
						>
							<Tx label={"Deep Item"} />
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
							type="main"
							active={selected === "submenu-dashboard"}
						>
							<Tx label={"Dashboard"} />
						</MenuLink>
						<MenuGroup
							icon="icon-[ph--gear-six]"
							label={<Tx label={"Settings"} />}
							type="main"
							match={[
								{
									to: "/$locale/components/menu/$selected",
									params: {
										selected: "submenu-profile",
									},
								},
								{
									to: "/$locale/components/menu/$selected",
									params: {
										selected: "submenu-security",
									},
								},
								{
									to: "/$locale/components/menu/$selected",
									params: {
										selected: "submenu-notifications",
									},
								},
							]}
						>
							<MenuLink
								icon={UserIcon}
								to={"/$locale/components/menu/$selected"}
								params={{
									locale,
									selected: "submenu-profile",
								}}
								type="sub"
								active={selected === "submenu-profile"}
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
								type="sub"
								active={selected === "submenu-security"}
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
								type="sub"
								active={selected === "submenu-notifications"}
							>
								<Tx label={"Notifications"} />
							</MenuLink>
						</MenuGroup>
						<MenuGroup
							icon="icon-[ph--folder]"
							label={<Tx label={"Content"} />}
							type="main"
						>
							<MenuLink
								icon={EditIcon}
								to={"/$locale/components/menu/$selected"}
								params={{
									locale,
									selected: "submenu-posts",
								}}
								type="sub"
								active={selected === "submenu-posts"}
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
								type="sub"
								active={selected === "submenu-pages"}
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
								type="sub"
								active={selected === "submenu-media"}
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
							type="main"
							active={selected === "submenu-help"}
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
					<div className="w-fit">
						<Menu vertical>
							<MenuLink
								icon={UserIcon}
								to={"/$locale/components/menu/$selected"}
								params={{
									locale,
									selected: "vsubmenu-dashboard",
								}}
								type="main"
								vertical
								active={selected === "vsubmenu-dashboard"}
							>
								<Tx label={"Dashboard"} />
							</MenuLink>
							<MenuGroup
								icon="icon-[ph--gear-six]"
								label={<Tx label={"Settings"} />}
								type="main"
								vertical
							>
								<MenuLink
									icon={UserIcon}
									to={"/$locale/components/menu/$selected"}
									params={{
										locale,
										selected: "vsubmenu-profile",
									}}
									type="sub"
									vertical
									active={selected === "vsubmenu-profile"}
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
									type="sub"
									vertical
									active={selected === "vsubmenu-security"}
								>
									<Tx label={"Security"} />
								</MenuLink>
							</MenuGroup>
							<MenuGroup
								icon="icon-[ph--folder]"
								label={<Tx label={"Content"} />}
								type="main"
								vertical
							>
								<MenuLink
									icon={EditIcon}
									to={"/$locale/components/menu/$selected"}
									params={{
										locale,
										selected: "vsubmenu-posts",
									}}
									type="sub"
									vertical
									active={selected === "vsubmenu-posts"}
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
									type="sub"
									vertical
									active={selected === "vsubmenu-pages"}
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
								type="main"
								vertical
								active={selected === "vsubmenu-help"}
							>
								<Tx label={"Help"} />
							</MenuLink>
						</Menu>
					</div>
				</div>

				{/* Mixed Type Variants */}
				<div>
					<h3 className="text-lg font-semibold mb-4">
						Mixed Type Variants
					</h3>
					<Menu>
						<MenuLink
							icon={UserIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "mixed-main",
							}}
							type="main"
							active={selected === "mixed-main"}
						>
							<Tx label={"Main Type"} />
						</MenuLink>
						<MenuLink
							icon={SettingsIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "mixed-sub",
							}}
							type="sub"
							active={selected === "mixed-sub"}
						>
							<Tx label={"Sub Type"} />
						</MenuLink>
						<MenuLink
							icon={CheckIcon}
							to={"/$locale/components/menu/$selected"}
							params={{
								locale,
								selected: "mixed-level",
							}}
							type="level"
							active={selected === "mixed-level"}
						>
							<Tx label={"Level Type"} />
						</MenuLink>
					</Menu>
				</div>
			</div>
		);
	},
});
