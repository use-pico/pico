import { createFileRoute } from "@tanstack/react-router";
import { BoolInput, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/cls";
import type { ReactNode } from "react";

export const Route = createFileRoute("/$locale/components/bool-input")({
	component() {
		return (
			<div
				className={tvc([
					"flex",
					"flex-col",
					"space-y-8",
				])}
			>
				{/* Basic Usage */}
				<Section title={<Tx label={"Basic Usage"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Default Checkbox"} />}>
							<BoolInput
								name="basic-checkbox"
								label="Accept terms and conditions"
							/>
						</Column>
						<Column label={<Tx label={"With Description"} />}>
							<BoolInput
								name="basic-checkbox-desc"
								label="Subscribe to newsletter"
								description="Receive updates about new features and releases"
							/>
						</Column>
					</div>
				</Section>

				{/* Different Sizes */}
				<Section title={<Tx label={"Different Sizes"} />}>
					<div className="grid grid-cols-3 gap-6">
						<Column label={<Tx label={"Small Size"} />}>
							<BoolInput
								name="small-checkbox"
								label="Small checkbox"
								cls={({ what }) => ({
									variant: what.variant({
										size: "sm",
									}),
								})}
							/>
						</Column>
						<Column label={<Tx label={"Medium Size"} />}>
							<BoolInput
								name="medium-checkbox"
								label="Medium checkbox"
								cls={({ what }) => ({
									variant: what.variant({
										size: "md",
									}),
								})}
							/>
						</Column>
						<Column label={<Tx label={"Large Size"} />}>
							<BoolInput
								name="large-checkbox"
								label="Large checkbox"
								cls={({ what }) => ({
									variant: what.variant({
										size: "lg",
									}),
								})}
							/>
						</Column>
					</div>
				</Section>

				{/* Different Tones */}
				<Section title={<Tx label={"Different Tones"} />}>
					<div className="grid grid-cols-3 gap-6">
						<Column label={<Tx label={"Primary Tone"} />}>
							<BoolInput
								name="primary-checkbox"
								label="Primary checkbox"
								cls={({ what }) => ({
									variant: what.variant({
										tone: "primary",
									}),
								})}
							/>
						</Column>
						<Column label={<Tx label={"Danger Tone"} />}>
							<BoolInput
								name="danger-checkbox"
								label="Danger checkbox"
								cls={({ what }) => ({
									variant: what.variant({
										tone: "danger",
									}),
								})}
							/>
						</Column>
						<Column label={<Tx label={"Warning Tone"} />}>
							<BoolInput
								name="warning-checkbox"
								label="Warning checkbox"
								cls={({ what }) => ({
									variant: what.variant({
										tone: "warning",
									}),
								})}
							/>
						</Column>
					</div>
				</Section>

				{/* States */}
				<Section title={<Tx label={"Different States"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Disabled State"} />}>
							<BoolInput
								name="disabled-checkbox"
								label="Disabled checkbox"
								disabled
							/>
						</Column>
						<Column label={<Tx label={"Required Field"} />}>
							<BoolInput
								name="required-checkbox"
								label="Required checkbox"
								required
							/>
						</Column>
					</div>
				</Section>

				{/* Real-world Examples */}
				<Section title={<Tx label={"Real-world Examples"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"User Preferences"} />}>
							<div className="space-y-4">
								<BoolInput
									name="email-notifications"
									label="Email notifications"
									description="Receive notifications via email"
								/>
								<BoolInput
									name="push-notifications"
									label="Push notifications"
									description="Receive push notifications in browser"
								/>
								<BoolInput
									name="marketing-emails"
									label="Marketing emails"
									description="Receive promotional content"
								/>
							</div>
						</Column>
						<Column label={<Tx label={"Account Settings"} />}>
							<div className="space-y-4">
								<BoolInput
									name="two-factor"
									label="Two-factor authentication"
									description="Enable 2FA for enhanced security"
									required
								/>
								<BoolInput
									name="public-profile"
									label="Public profile"
									description="Make your profile visible to others"
								/>
								<BoolInput
									name="auto-login"
									label="Remember me"
									description="Stay logged in for 30 days"
								/>
							</div>
						</Column>
					</div>
				</Section>
			</div>
		);
	},
});

function Section({
	title,
	children,
}: {
	title: ReactNode;
	children: ReactNode;
}) {
	return (
		<div
			className={tvc([
				"flex",
				"flex-col",
				"space-y-3",
			])}
		>
			<div
				className={tvc([
					"text-sm",
					"text-slate-600",
					"font-medium",
				])}
			>
				{title}
			</div>
			{children}
		</div>
	);
}

function Column({
	label,
	children,
}: {
	label: ReactNode;
	children: ReactNode;
}) {
	return (
		<div className="flex flex-col space-y-2">
			<div className="text-xs text-slate-500 font-medium">{label}</div>
			<div className="flex flex-col space-y-2">{children}</div>
		</div>
	);
}
