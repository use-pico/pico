import { createFileRoute } from "@tanstack/react-router";
import { ActionClick, ActionMenu, Tx } from "@use-pico/client";

const tones = [
	"primary",
	"secondary",
	"danger",
	"warning",
	"neutral",
	"subtle",
] as const;

export const Route = createFileRoute("/$locale/components/action-menu")({
	component() {
		return (
			<div className="space-y-8">
				{/* Dark Theme */}
				<div>
					<h3 className="text-lg font-semibold mb-4">
						Dark Theme ActionMenu
					</h3>
					<ActionMenu>
						{tones.map((tone) => (
							<ActionClick
								key={`dark-${tone}`}
								tweak={({ what }) => ({
									variant: what.variant({
										tone,
										theme: "dark",
									}),
								})}
							>
								<Tx label={`${tone} (dark)`} />
							</ActionClick>
						))}
					</ActionMenu>
				</div>

				{/* Light Theme */}
				<div>
					<h3 className="text-lg font-semibold mb-4">
						Light Theme ActionMenu
					</h3>
					<ActionMenu>
						{tones.map((tone) => (
							<ActionClick
								key={`light-${tone}`}
								tweak={({ what }) => ({
									variant: what.variant({
										tone,
										theme: "light",
									}),
								})}
							>
								<Tx label={`${tone} (light)`} />
							</ActionClick>
						))}
					</ActionMenu>
				</div>

				{/* Disabled States */}
				<div>
					<h3 className="text-lg font-semibold mb-4">
						Disabled States
					</h3>
					<ActionMenu>
						<ActionClick
							tweak={({ what }) => ({
								variant: what.variant({
									tone: "primary",
									theme: "dark",
									disabled: true,
								}),
							})}
						>
							<Tx label={"Primary (disabled)"} />
						</ActionClick>
						<ActionClick
							tweak={({ what }) => ({
								variant: what.variant({
									tone: "danger",
									theme: "light",
									disabled: true,
								}),
							})}
						>
							<Tx label={"Danger (disabled)"} />
						</ActionClick>
						<ActionClick
							tweak={({ what }) => ({
								variant: what.variant({
									tone: "warning",
									theme: "dark",
									disabled: true,
								}),
							})}
						>
							<Tx label={"Warning (disabled)"} />
						</ActionClick>
					</ActionMenu>
				</div>

				{/* Loading States */}
				<div>
					<h3 className="text-lg font-semibold mb-4">
						Loading States
					</h3>
					<ActionMenu>
						<ActionClick
							tweak={({ what }) => ({
								variant: what.variant({
									tone: "primary",
									theme: "dark",
									loading: true,
								}),
							})}
						>
							<Tx label={"Primary (loading)"} />
						</ActionClick>
						<ActionClick
							tweak={({ what }) => ({
								variant: what.variant({
									tone: "secondary",
									theme: "light",
									loading: true,
								}),
							})}
						>
							<Tx label={"Secondary (loading)"} />
						</ActionClick>
						<ActionClick
							tweak={({ what }) => ({
								variant: what.variant({
									tone: "neutral",
									theme: "dark",
									loading: true,
								}),
							})}
						>
							<Tx label={"Neutral (loading)"} />
						</ActionClick>
					</ActionMenu>
				</div>

				{/* Mixed States */}
				<div>
					<h3 className="text-lg font-semibold mb-4">Mixed States</h3>
					<ActionMenu>
						<ActionClick
							tweak={({ what }) => ({
								variant: what.variant({
									tone: "danger",
									theme: "dark",
									loading: true,
									disabled: true,
								}),
							})}
						>
							<Tx label={"Danger (loading + disabled)"} />
						</ActionClick>
						<ActionClick
							tweak={({ what }) => ({
								variant: what.variant({
									tone: "warning",
									theme: "light",
									loading: true,
								}),
							})}
						>
							<Tx label={"Warning (loading)"} />
						</ActionClick>
						<ActionClick
							tweak={({ what }) => ({
								variant: what.variant({
									tone: "subtle",
									theme: "dark",
									disabled: true,
								}),
							})}
						>
							<Tx label={"Subtle (disabled)"} />
						</ActionClick>
					</ActionMenu>
				</div>

				{/* With Overlay */}
				<div>
					<h3 className="text-lg font-semibold mb-4">
						ActionMenu with Overlay
					</h3>
					<ActionMenu withOverlay>
						<ActionClick>
							<Tx label={"Default Action"} />
						</ActionClick>
						<ActionClick
							tweak={({ what }) => ({
								variant: what.variant({
									tone: "danger",
									theme: "dark",
								}),
							})}
						>
							<Tx label={"Danger Action"} />
						</ActionClick>
						<ActionClick
							tweak={({ what }) => ({
								variant: what.variant({
									tone: "warning",
									theme: "light",
								}),
							})}
						>
							<Tx label={"Warning Action"} />
						</ActionClick>
						<ActionClick
							tweak={({ what }) => ({
								variant: what.variant({
									tone: "primary",
									theme: "dark",
									disabled: true,
								}),
							})}
						>
							<Tx label={"Disabled Action"} />
						</ActionClick>
					</ActionMenu>
				</div>
			</div>
		);
	},
});
