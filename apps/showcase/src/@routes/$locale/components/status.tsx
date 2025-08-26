import { createFileRoute } from "@tanstack/react-router";
import { Status, Tx } from "@use-pico/client";
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
								textTitle="Welcome!"
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

				{/* Status with Body Content */}
				<Section title={<Tx label={"Status with Body Content"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"With Action Buttons"} />}>
							<Status
								textTitle="No Results Found"
								textMessage="We couldn't find any items matching your search criteria."
								icon="icon-[ph--empty]"
							>
								<div className="flex justify-center space-x-4 mt-4">
									<button
										type="button"
										className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
									>
										Clear Filters
									</button>
									<button
										type="button"
										className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
									>
										Try Again
									</button>
								</div>
							</Status>
						</Column>
						<Column label={<Tx label={"With Custom Content"} />}>
							<Status
								textTitle="Empty State"
								textMessage="You haven't created any projects yet."
								icon="icon-[ph--folder]"
							>
								<div className="text-center mt-4">
									<p className="text-sm text-gray-500 mb-2">
										Get started by creating your first
										project
									</p>
									<div className="inline-flex items-center space-x-1 text-blue-500 hover:text-blue-600 cursor-pointer">
										<span>Create Project</span>
										<span className="text-xs">→</span>
									</div>
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
									<div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
										<p className="text-sm text-yellow-800">
											<strong>
												Estimated completion:
											</strong>{" "}
											2:00 PM EST
										</p>
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

				{/* Custom Icon Props */}
				<Section title={<Tx label={"Custom Icon Props"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Custom Icon Size"} />}>
							<Status
								textTitle="Custom Icon"
								textMessage="This status uses custom icon properties."
								icon="icon-[mdi-light--star]"
								iconProps={{
									cls: ({ what }) => ({
										slot: what.slot({
											root: what.css([
												"text-yellow-500",
												"opacity-75",
											]),
										}),
									}),
								}}
							/>
						</Column>
						<Column label={<Tx label={"Animated Icon"} />}>
							<Status
								textTitle="Processing"
								textMessage="Please wait while we process your data."
								icon="icon-[lets-icons--progress-light]"
								iconProps={{
									cls: ({ what }) => ({
										slot: what.slot({
											root: what.css([
												"animate-spin",
												"text-blue-500",
											]),
										}),
									}),
								}}
							/>
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
