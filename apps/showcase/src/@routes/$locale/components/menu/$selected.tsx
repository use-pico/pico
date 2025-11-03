import { createFileRoute, useParams } from "@tanstack/react-router";
import {
	CheckIcon,
	EditIcon,
	ListIcon,
	SettingsIcon,
	UserIcon,
} from "@use-pico/client/icon";
import { Menu, MenuGroup, MenuLink } from "@use-pico/client/ui/menu";
import { Tx } from "@use-pico/client/ui/tx";

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
							variantType="main"
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
							variantType="main"
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
							variantType="main"
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
							variantType="main"
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
							variantType="sub"
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
							variantType="sub"
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
							variantType="sub"
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
							variantType="sub"
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
							variantType="level"
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
							variantType="level"
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
							variantType="level"
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
							variantType="level"
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
							variantType="main"
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
							variantType="sub"
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
							variantType="level"
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
								variantType="main"
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
								variantType="sub"
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
								variantType="level"
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
									variantType="main"
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
									variantType="main"
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
									variantType="main"
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
									variantType="main"
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
							variantType="main"
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
							variantType="sub"
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
							variantType="level"
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
							variantType="main"
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
								variantType="sub"
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
								variantType="sub"
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
								variantType="sub"
								active={selected === "submenu-notifications"}
							>
								<Tx label={"Notifications"} />
							</MenuLink>
						</MenuGroup>
						<MenuGroup
							icon="icon-[ph--folder]"
							label={<Tx label={"Content"} />}
							type="main"
							match={[
								{
									to: "/$locale/components/menu/$selected",
									params: {
										selected: "submenu-posts",
									},
								},
								{
									to: "/$locale/components/menu/$selected",
									params: {
										selected: "submenu-pages",
									},
								},
								{
									to: "/$locale/components/menu/$selected",
									params: {
										selected: "submenu-media",
									},
								},
							]}
						>
							<MenuLink
								icon={EditIcon}
								to={"/$locale/components/menu/$selected"}
								params={{
									locale,
									selected: "submenu-posts",
								}}
								variantType="sub"
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
								variantType="sub"
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
								variantType="sub"
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
							variantType="main"
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
								variantType="main"
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
								match={[
									{
										to: "/$locale/components/menu/$selected",
										params: {
											selected: "vsubmenu-profile",
										},
									},
									{
										to: "/$locale/components/menu/$selected",
										params: {
											selected: "vsubmenu-security",
										},
									},
								]}
							>
								<MenuLink
									icon={UserIcon}
									to={"/$locale/components/menu/$selected"}
									params={{
										locale,
										selected: "vsubmenu-profile",
									}}
									variantType="sub"
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
									variantType="sub"
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
								match={[
									{
										to: "/$locale/components/menu/$selected",
										params: {
											selected: "vsubmenu-posts",
										},
									},
									{
										to: "/$locale/components/menu/$selected",
										params: {
											selected: "vsubmenu-pages",
										},
									},
								]}
							>
								<MenuLink
									icon={EditIcon}
									to={"/$locale/components/menu/$selected"}
									params={{
										locale,
										selected: "vsubmenu-posts",
									}}
									variantType="sub"
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
									variantType="sub"
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
								variantType="main"
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
							variantType="main"
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
							variantType="sub"
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
							variantType="level"
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
