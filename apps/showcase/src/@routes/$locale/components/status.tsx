import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@use-pico/client/ui/button";
import { Status } from "@use-pico/client/ui/status";
import { Tx } from "@use-pico/client/ui/tx";
import { Typo } from "@use-pico/client/ui/typo";
import { tvc } from "@use-pico/cls";
import type { ReactNode } from "react";

export const Route = createFileRoute("/$locale/components/status")({
	component() {
		return (
			<div
				className={tvc([
					"flex",
					"flex-col",
					"space-y-8",
				])}
			>
				{/* Basic Status */}
				<Section title={<Tx label={"Basic Status"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Simple Status"} />}>
							<Status
								textTitle="Welcome here!"
								textMessage="This is a simple status message without any icon."
							/>
						</Column>
						<Column label={<Tx label={"With Icon"} />}>
							<Status
								textTitle="Success"
								textMessage="Your action has been completed successfully."
								icon="icon-[mdi-light--check-circle]"
							/>
						</Column>
					</div>
				</Section>

				{/* Different Icons */}
				<Section title={<Tx label={"Different Icons"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Info Status"} />}>
							<Status
								textTitle="Information"
								textMessage="Here's some important information you should know."
								icon="icon-[mdi-light--information]"
							/>
						</Column>
						<Column label={<Tx label={"Warning Status"} />}>
							<Status
								textTitle="Warning"
								textMessage="Please review your input before proceeding."
								icon="icon-[mdi-light--alert-circle]"
							/>
						</Column>
					</div>
				</Section>

				{/* Error and Loading States */}
				<Section title={<Tx label={"Error and Loading States"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Error Status"} />}>
							<Status
								textTitle="Error Occurred"
								textMessage="Something went wrong. Please try again later."
								icon="icon-[pajamas--status-alert]"
							/>
						</Column>
						<Column label={<Tx label={"Loading Status"} />}>
							<Status
								textTitle="Loading..."
								textMessage="Please wait while we process your request."
								icon="icon-[fluent-mdl2--sync-status]"
							/>
						</Column>
					</div>
				</Section>

				{/* Status with Action Section */}
				<Section title={<Tx label={"Status with Actions"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"With Action Buttons"} />}>
							<Status
								textTitle="No Results Found"
								textMessage="We couldn't find any items matching your search criteria."
								icon="icon-[ph--empty]"
								action={
									<>
										<Button label="Clear Filters" />
										<Button label="Try Again" />
									</>
								}
							/>
						</Column>
						<Column label={<Tx label={"Error with Retry"} />}>
							<Status
								textTitle="Connection Lost"
								textMessage="Your internet connection appears to be unstable."
								icon="icon-[streamline-ultimate--wifi-off]"
								tone="danger"
								action={<Button label="Retry Connection" />}
							/>
						</Column>
					</div>
				</Section>

				{/* Status with Body Content */}
				<Section title={<Tx label={"Status with Body Content"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"With Custom Content"} />}>
							<Status
								textTitle="Empty State"
								textMessage="You haven't created any projects yet."
								icon="icon-[ph--folder]"
							>
								<div className="text-center">
									<Typo
										label="Get started by creating your first project"
										size="sm"
										tone="subtle"
									/>
									<div className="inline-flex items-center space-x-1 text-blue-500 hover:text-blue-600 cursor-pointer">
										<span>Create Project</span>
										<span className="text-xs">→</span>
									</div>
								</div>
							</Status>
						</Column>
						<Column label={<Tx label={"With Action Only"} />}>
							<Status
								textTitle="File Upload Complete"
								textMessage="Your file has been successfully uploaded to the server."
								icon="icon-[pixelarticons--upload]"
								tone="primary"
								action={
									<>
										<Button label="View File" />
										<Button label="Upload Another" />
									</>
								}
							/>
						</Column>
					</div>
				</Section>

				{/* Status with Both Action and Children */}
				<Section
					title={<Tx label={"Status with Action and Children"} />}
				>
					<div className="grid grid-cols-2 gap-6">
						<Column
							label={
								<Tx
									label={"Custom Content with Action Buttons"}
								/>
							}
						>
							<Status
								textTitle="Subscription Expired"
								textMessage="Your premium subscription has ended."
								icon="icon-[mdi-light--alert-circle]"
								tone="warning"
								action={
									<>
										<Button label="Renew Now" />
										<Button label="View Plans" />
									</>
								}
							>
								<div className="p-3 bg-amber-50 border border-amber-200 rounded">
									<Typo
										label="Benefits you'll lose:"
										size="sm"
										font="bold"
									/>
									<ul className="text-sm text-amber-700 list-disc list-inside">
										<li>Unlimited projects</li>
										<li>Priority support</li>
										<li>Advanced analytics</li>
									</ul>
								</div>
							</Status>
						</Column>
						<Column
							label={<Tx label={"Detailed Info with Actions"} />}
						>
							<Status
								textTitle="Update Available"
								textMessage="A new version of the application is ready to install."
								icon="icon-[mdi-light--information]"
								tone="primary"
								action={
									<>
										<Button label="Install Update" />
										<Button label="Release Notes" />
									</>
								}
							>
								<div className="p-3 bg-blue-50 border border-blue-200 rounded">
									<Typo
										label="Version 2.0.0"
										size="sm"
										font="bold"
									/>
									<ul className="text-sm text-blue-700 list-disc list-inside">
										<li>Dark mode support</li>
										<li>Improved performance</li>
										<li>Bug fixes</li>
									</ul>
								</div>
							</Status>
						</Column>
					</div>
				</Section>

				{/* Different Sizes and Layouts */}
				<Section title={<Tx label={"Different Layouts"} />}>
					<div className="grid grid-cols-1 gap-6">
						<Column label={<Tx label={"Large Status"} />}>
							<div className="max-w-2xl mx-auto">
								<Status
									textTitle="System Maintenance"
									textMessage="We're currently performing scheduled maintenance to improve our services. This may take up to 2 hours. We apologize for any inconvenience."
									icon="icon-[iconoir--tools]"
								>
									<div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
										<Typo
											label="Estimated completion: 2:00 PM EST"
											size="sm"
										/>
									</div>
								</Status>
							</div>
						</Column>
					</div>
				</Section>

				{/* Multiple Status Examples */}
				<Section title={<Tx label={"Multiple Status Examples"} />}>
					<div className="grid grid-cols-1 gap-4">
						<Column label={<Tx label={"Various Use Cases"} />}>
							<div className="space-y-6">
								<Status
									textTitle="Connection Lost"
									textMessage="Your internet connection appears to be unstable."
									icon="icon-[streamline-ultimate--wifi-off]"
								/>
								<Status
									textTitle="File Upload Complete"
									textMessage="Your file has been successfully uploaded to the server."
									icon="icon-[pixelarticons--upload]"
								/>
								<Status
									textTitle="Access Denied"
									textMessage="You don't have permission to access this resource."
									icon="icon-[pixelarticons--upload]"
								/>
							</div>
						</Column>
					</div>
				</Section>

				{/* Tone Variants */}
				<Section title={<Tx label={"Tone Variants"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Success Tones"} />}>
							<div className="space-y-4">
								<Status
									textTitle="Success"
									textMessage="Operation completed successfully."
									icon="icon-[mdi-light--check-circle]"
									tone="primary"
								/>
								<Status
									textTitle="Information"
									textMessage="Here's some helpful information."
									icon="icon-[mdi-light--information]"
									tone="secondary"
								/>
								<Status
									textTitle="Neutral"
									textMessage="This is a neutral status message."
									icon="icon-[mdi-light--circle]"
									tone="neutral"
								/>
							</div>
						</Column>
						<Column label={<Tx label={"Alert Tones"} />}>
							<div className="space-y-4">
								<Status
									textTitle="Warning"
									textMessage="Please review your input before proceeding."
									icon="icon-[mdi-light--alert-circle]"
									tone="warning"
								/>
								<Status
									textTitle="Error"
									textMessage="Something went wrong. Please try again."
									icon="icon-[pajamas--status-alert]"
									tone="danger"
								/>
								<Status
									textTitle="Subtle"
									textMessage="A subtle status message for less important info."
									icon="icon-[mdi-light--minus-circle]"
									tone="subtle"
								/>
							</div>
						</Column>
					</div>
				</Section>

				{/* Tone Comparison */}
				<Section title={<Tx label={"Tone Comparison"} />}>
					<div className="grid grid-cols-1 gap-6">
						<Column
							label={
								<Tx label={"Same Message, Different Tones"} />
							}
						>
							<div className="space-y-4">
								<Status
									textTitle="System Status"
									textMessage="All systems are operating normally."
									icon="icon-[mdi-light--check-circle]"
									tone="primary"
								/>
								<Status
									textTitle="System Status"
									textMessage="All systems are operating normally."
									icon="icon-[mdi-light--check-circle]"
									tone="secondary"
								/>
								<Status
									textTitle="System Status"
									textMessage="All systems are operating normally."
									icon="icon-[mdi-light--check-circle]"
									tone="neutral"
								/>
								<Status
									textTitle="System Status"
									textMessage="All systems are operating normally."
									icon="icon-[mdi-light--check-circle]"
									tone="subtle"
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
