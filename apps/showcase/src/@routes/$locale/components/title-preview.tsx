import { createFileRoute } from "@tanstack/react-router";
import { TitlePreview } from "@use-pico/client/ui/title-preview";
import { Tx } from "@use-pico/client/ui/tx";
import { tvc } from "@use-pico/cls";
import type { ReactNode } from "react";

export const Route = createFileRoute("/$locale/components/title-preview")({
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
						<Column label={<Tx label={"Title Only"} />}>
							<TitlePreview title="Welcome to Dashboard" />
						</Column>
						<Column label={<Tx label={"Title with Icon"} />}>
							<TitlePreview
								icon="UserIcon"
								title="User Profile"
							/>
						</Column>
					</div>
				</Section>

				{/* With Subtitle */}
				<Section title={<Tx label={"With Subtitle"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Title and Subtitle"} />}>
							<TitlePreview
								title="Project Overview"
								subtitle="Manage your projects and tasks"
							/>
						</Column>
						<Column
							label={<Tx label={"Title, Icon and Subtitle"} />}
						>
							<TitlePreview
								icon="SettingsIcon"
								title="Settings"
								subtitle="Configure your application preferences"
							/>
						</Column>
					</div>
				</Section>

				{/* Different Content Types */}
				<Section title={<Tx label={"Different Content Types"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Simple Text"} />}>
							<TitlePreview
								icon="CheckIcon"
								title="Task Completed"
								subtitle="All items have been processed successfully"
							/>
						</Column>
						<Column label={<Tx label={"Complex Content"} />}>
							<TitlePreview
								icon="FileIcon"
								title={
									<span>
										Document{" "}
										<span className="text-blue-500">
											#12345
										</span>
									</span>
								}
								subtitle={
									<span>
										Last modified:{" "}
										<span className="text-gray-500">
											2 hours ago
										</span>
									</span>
								}
							/>
						</Column>
					</div>
				</Section>

				{/* Different Icons */}
				<Section title={<Tx label={"Different Icons"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Action Icons"} />}>
							<div className="flex flex-col space-y-3">
								<TitlePreview
									icon="EditIcon"
									title="Edit Profile"
									subtitle="Update your personal information"
								/>
								<TitlePreview
									icon="DownloadIcon"
									title="Download Report"
									subtitle="Export data in various formats"
								/>
								<TitlePreview
									icon="UploadIcon"
									title="Upload Files"
									subtitle="Add new documents to the system"
								/>
							</div>
						</Column>
						<Column label={<Tx label={"Status Icons"} />}>
							<div className="flex flex-col space-y-3">
								<TitlePreview
									icon="CheckIcon"
									title="Success"
									subtitle="Operation completed successfully"
								/>
								<TitlePreview
									icon="ErrorIcon"
									title="Error"
									subtitle="Something went wrong"
								/>
								<TitlePreview
									icon="SpinnerIcon"
									title="Loading"
									subtitle="Please wait while we process your request"
								/>
							</div>
						</Column>
					</div>
				</Section>

				{/* Navigation Examples */}
				<Section title={<Tx label={"Navigation Examples"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Page Headers"} />}>
							<div className="flex flex-col space-y-3">
								<TitlePreview
									icon="ListIcon"
									title="User Management"
									subtitle="Manage system users and permissions"
								/>
								<TitlePreview
									icon="TagIcon"
									title="Categories"
									subtitle="Organize content with tags and categories"
								/>
								<TitlePreview
									icon="JobIcon"
									title="Tasks"
									subtitle="Track and manage your daily tasks"
								/>
							</div>
						</Column>
						<Column label={<Tx label={"Section Headers"} />}>
							<div className="flex flex-col space-y-3">
								<TitlePreview
									icon="FavouriteIcon"
									title="Favorites"
									subtitle="Your bookmarked items"
								/>
								<TitlePreview
									icon="ExternalIcon"
									title="External Links"
									subtitle="Quick access to external resources"
								/>
								<TitlePreview
									icon="BackIcon"
									title="Recent Activity"
									subtitle="Your latest actions and updates"
								/>
							</div>
						</Column>
					</div>
				</Section>

				{/* Custom Styling Examples */}
				<Section title={<Tx label={"Custom Styling Examples"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Custom Classes"} />}>
							<TitlePreview
								icon="SettingsIcon"
								title="Custom Styled"
								subtitle="With additional styling applied"
								tweak={{
									slot: {
										root: {
											class: [
												"bg-blue-50",
												"p-4",
												"rounded-lg",
												"border",
												"border-blue-200",
											],
										},
										title: {
											class: [
												"text-blue-800",
											],
										},
										subtitle: {
											class: [
												"text-blue-600",
											],
										},
									},
								}}
							/>
						</Column>
						<Column label={<Tx label={"Compact Layout"} />}>
							<TitlePreview
								icon="UserIcon"
								title="Compact Title"
								subtitle="With reduced spacing"
								tweak={{
									slot: {
										root: {
											class: [
												"gap-1",
											],
										},
										title: {
											class: [
												"text-base",
											],
										},
										subtitle: {
											class: [
												"text-sm",
											],
										},
									},
								}}
							/>
						</Column>
					</div>
				</Section>

				{/* Real-world Examples */}
				<Section title={<Tx label={"Real-world Examples"} />}>
					<div className="grid grid-cols-1 gap-6">
						<Column label={<Tx label={"Dashboard Sections"} />}>
							<div className="flex flex-col space-y-4">
								<TitlePreview
									icon="UserIcon"
									title="User Dashboard"
									subtitle="Welcome back, John Doe"
								/>
								<TitlePreview
									icon="FileIcon"
									title="Recent Documents"
									subtitle="5 documents modified in the last 7 days"
								/>
								<TitlePreview
									icon="SettingsIcon"
									title="System Settings"
									subtitle="Configure application preferences and security"
								/>
								<TitlePreview
									icon="ExportIcon"
									title="Data Export"
									subtitle="Download your data in CSV, JSON, or PDF format"
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
