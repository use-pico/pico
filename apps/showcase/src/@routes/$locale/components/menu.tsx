import { createFileRoute, useParams } from "@tanstack/react-router";
import {
	CheckIcon,
	EditIcon,
	ListIcon,
	Menu,
	MenuLink,
	SettingsIcon,
	Tx,
	UserIcon,
} from "@use-pico/client";

export const Route = createFileRoute("/$locale/components/menu")({
	component() {
		const { locale } = useParams({
			from: "/$locale",
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
							to={"/$locale/components/colors"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: true,
								}),
							})}
						>
							<Tx label={"Colors"} />
						</MenuLink>
						<MenuLink
							icon={SettingsIcon}
							to={"/$locale/components/alert"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: false,
								}),
							})}
						>
							<Tx label={"Alert"} />
						</MenuLink>
						<MenuLink
							icon={CheckIcon}
							to={"/$locale/components/badge"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: false,
								}),
							})}
						>
							<Tx label={"Badge"} />
						</MenuLink>
						<MenuLink
							icon={EditIcon}
							to={"/$locale/components/button"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: false,
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
							to={"/$locale/components/colors"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: true,
									vertical: true,
								}),
							})}
						>
							<Tx label={"Colors"} />
						</MenuLink>
						<MenuLink
							icon={SettingsIcon}
							to={"/$locale/components/alert"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: false,
									vertical: true,
								}),
							})}
						>
							<Tx label={"Alert"} />
						</MenuLink>
						<MenuLink
							icon={CheckIcon}
							to={"/$locale/components/badge"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: false,
									vertical: true,
								}),
							})}
						>
							<Tx label={"Badge"} />
						</MenuLink>
						<MenuLink
							icon={EditIcon}
							to={"/$locale/components/button"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: false,
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
							to={"/$locale/components/colors"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: true,
									subtle: true,
								}),
							})}
						>
							<Tx label={"Colors (active)"} />
						</MenuLink>
						<MenuLink
							icon={SettingsIcon}
							to={"/$locale/components/alert"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: false,
									subtle: true,
								}),
							})}
						>
							<Tx label={"Alert (subtle)"} />
						</MenuLink>
						<MenuLink
							icon={CheckIcon}
							to={"/$locale/components/badge"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: false,
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
							to={"/$locale/components/colors"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: true,
									inner: true,
								}),
							})}
						>
							<Tx label={"Colors (inner active)"} />
						</MenuLink>
						<MenuLink
							icon={SettingsIcon}
							to={"/$locale/components/alert"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: false,
									inner: true,
								}),
							})}
						>
							<Tx label={"Alert (inner)"} />
						</MenuLink>
						<MenuLink
							icon={CheckIcon}
							to={"/$locale/components/badge"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: false,
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
							to={"/$locale/components/colors"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: true,
									vertical: true,
									subtle: true,
								}),
							})}
						>
							<Tx label={"Colors (active + subtle + vertical)"} />
						</MenuLink>
						<MenuLink
							icon={SettingsIcon}
							to={"/$locale/components/alert"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: false,
									vertical: true,
									inner: true,
								}),
							})}
						>
							<Tx label={"Alert (inner + vertical)"} />
						</MenuLink>
						<MenuLink
							icon={CheckIcon}
							to={"/$locale/components/badge"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: true,
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
								to={"/$locale/components/colors"}
								params={{
									locale,
								}}
								cls={({ what }) => ({
									variant: what.variant({
										active: true,
										vertical: true,
									}),
								})}
							>
								<Tx label={"Colors"} />
							</MenuLink>
							<MenuLink
								icon={SettingsIcon}
								to={"/$locale/components/alert"}
								params={{
									locale,
								}}
								cls={({ what }) => ({
									variant: what.variant({
										active: false,
										vertical: true,
									}),
								})}
							>
								<Tx label={"Alert"} />
							</MenuLink>
							<MenuLink
								icon={CheckIcon}
								to={"/$locale/components/badge"}
								params={{
									locale,
								}}
								cls={({ what }) => ({
									variant: what.variant({
										active: false,
										vertical: true,
									}),
								})}
							>
								<Tx label={"Badge"} />
							</MenuLink>
							<MenuLink
								icon={EditIcon}
								to={"/$locale/components/button"}
								params={{
									locale,
								}}
								cls={({ what }) => ({
									variant: what.variant({
										active: false,
										vertical: true,
									}),
								})}
							>
								<Tx label={"Buttons"} />
							</MenuLink>
							<MenuLink
								icon={ListIcon}
								to={"/$locale/components/table"}
								params={{
									locale,
								}}
								cls={({ what }) => ({
									variant: what.variant({
										active: false,
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
							to={"/$locale/components/colors"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: true,
								}),
							})}
						>
							<Tx label={"Colors"} />
						</MenuLink>
						<MenuLink
							to={"/$locale/components/alert"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: false,
								}),
							})}
						>
							<Tx label={"Alert"} />
						</MenuLink>
						<MenuLink
							to={"/$locale/components/badge"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: false,
								}),
							})}
						>
							<Tx label={"Badge"} />
						</MenuLink>
						<MenuLink
							to={"/$locale/components/button"}
							params={{
								locale,
							}}
							cls={({ what }) => ({
								variant: what.variant({
									active: false,
								}),
							})}
						>
							<Tx label={"Buttons"} />
						</MenuLink>
					</Menu>
				</div>
			</div>
		);
	},
});
