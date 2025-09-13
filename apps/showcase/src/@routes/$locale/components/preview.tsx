import { createFileRoute } from "@tanstack/react-router";
import { Button, Preview, TitlePreview, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/cls";
import type { ReactNode } from "react";

// Sample data for demonstrations
const sampleUser = {
	id: "1",
	name: "John Doe",
	email: "john.doe@example.com",
	role: "Admin",
	status: "active",
	lastLogin: "2024-01-15T10:30:00Z",
};

const sampleProject = {
	id: "2",
	name: "E-commerce Platform",
	description: "Modern e-commerce solution with React and Node.js",
	status: "in-progress",
	progress: 75,
	dueDate: "2024-03-15",
	team: [
		"Alice",
		"Bob",
		"Charlie",
	],
};

const sampleDocument = {
	id: "3",
	title: "API Documentation",
	type: "PDF",
	size: "2.5 MB",
	createdAt: "2024-01-10T09:00:00Z",
	modifiedAt: "2024-01-14T16:30:00Z",
	author: "Jane Smith",
};

export const Route = createFileRoute("/$locale/components/preview")({
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
							<Preview
								entity={sampleUser}
								title={({ entity }) => (
									<TitlePreview
										icon="UserIcon"
										title={entity.name}
									/>
								)}
							/>
						</Column>
						<Column label={<Tx label={"Title with Links"} />}>
							<Preview
								entity={sampleUser}
								title={({ entity }) => (
									<TitlePreview
										icon="UserIcon"
										title={entity.name}
										subtitle={entity.role}
									/>
								)}
								links={() => (
									<div className="flex items-center gap-2">
										<Button
											tweak={({ what }) => ({
												variant: what.variant({
													size: "xs",
												}),
											})}
										>
											View Profile
										</Button>
										<Button
											tweak={({ what }) => ({
												variant: what.variant({
													size: "xs",
													tone: "secondary",
												}),
											})}
										>
											Edit
										</Button>
									</div>
								)}
							/>
						</Column>
					</div>
				</Section>

				{/* With Actions */}
				<Section title={<Tx label={"With Actions"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Title and Actions"} />}>
							<Preview
								entity={sampleProject}
								title={({ entity }) => (
									<TitlePreview
										icon="FileIcon"
										title={entity.name}
									/>
								)}
								actions={() => (
									<div className="flex items-center gap-2">
										<Button
											tweak={({ what }) => ({
												variant: what.variant({
													size: "xs",
												}),
											})}
										>
											View Details
										</Button>
										<Button
											tweak={({ what }) => ({
												variant: what.variant({
													size: "xs",
													tone: "secondary",
												}),
											})}
										>
											Edit
										</Button>
										<Button
											tweak={({ what }) => ({
												variant: what.variant({
													size: "xs",
													tone: "danger",
												}),
											})}
										>
											Delete
										</Button>
									</div>
								)}
							/>
						</Column>
						<Column label={<Tx label={"Complete Layout"} />}>
							<Preview
								entity={sampleProject}
								title={({ entity }) => (
									<TitlePreview
										icon="FileIcon"
										title={entity.name}
										subtitle={entity.status}
									/>
								)}
								links={({ entity }) => (
									<div className="flex items-center gap-2">
										<span className="text-sm text-gray-500">
											Progress: {entity.progress}%
										</span>
									</div>
								)}
								actions={() => (
									<div className="flex items-center gap-2">
										<Button
											tweak={({ what }) => ({
												variant: what.variant({
													size: "xs",
												}),
											})}
										>
											View
										</Button>
										<Button
											tweak={({ what }) => ({
												variant: what.variant({
													size: "xs",
													tone: "secondary",
												}),
											})}
										>
											Edit
										</Button>
									</div>
								)}
								extra={({ entity }) => (
									<div className="flex items-center gap-2">
										<span className="text-sm text-gray-500">
											Due: {entity.dueDate}
										</span>
									</div>
								)}
							/>
						</Column>
					</div>
				</Section>

				{/* Document Examples */}
				<Section title={<Tx label={"Document Examples"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Document Preview"} />}>
							<Preview
								entity={sampleDocument}
								title={({ entity }) => (
									<TitlePreview
										icon="FileIcon"
										title={entity.title}
										subtitle={entity.type}
									/>
								)}
								links={() => (
									<div className="flex items-center gap-2">
										<Button
											tweak={({ what }) => ({
												variant: what.variant({
													size: "xs",
												}),
											})}
										>
											Download
										</Button>
										<Button
											tweak={({ what }) => ({
												variant: what.variant({
													size: "xs",
													tone: "secondary",
												}),
											})}
										>
											Share
										</Button>
									</div>
								)}
								actions={() => (
									<div className="flex items-center gap-2">
										<Button
											tweak={({ what }) => ({
												variant: what.variant({
													size: "xs",
												}),
											})}
										>
											Open
										</Button>
										<Button
											tweak={({ what }) => ({
												variant: what.variant({
													size: "xs",
													tone: "secondary",
												}),
											})}
										>
											Edit
										</Button>
										<Button
											tweak={({ what }) => ({
												variant: what.variant({
													size: "xs",
													tone: "danger",
												}),
											})}
										>
											Delete
										</Button>
									</div>
								)}
								extra={({ entity }) => (
									<div className="flex items-center gap-2">
										<span className="text-sm text-gray-500">
											{entity.size}
										</span>
										<span className="text-sm text-gray-500">
											•
										</span>
										<span className="text-sm text-gray-500">
											by {entity.author}
										</span>
									</div>
								)}
							/>
						</Column>
						<Column label={<Tx label={"Compact Document"} />}>
							<Preview
								entity={sampleDocument}
								title={({ entity }) => (
									<TitlePreview
										icon="FileIcon"
										title={entity.title}
									/>
								)}
								extra={({ entity }) => (
									<div className="flex items-center gap-2">
										<span className="text-sm text-gray-500">
											{entity.size}
										</span>
										<Button
											tweak={({ what }) => ({
												variant: what.variant({
													size: "xs",
												}),
											})}
										>
											Download
										</Button>
									</div>
								)}
							/>
						</Column>
					</div>
				</Section>

				{/* User Management Examples */}
				<Section title={<Tx label={"User Management Examples"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"User Profile"} />}>
							<Preview
								entity={sampleUser}
								title={({ entity }) => (
									<TitlePreview
										icon="UserIcon"
										title={entity.name}
										subtitle={entity.email}
									/>
								)}
								links={({ entity }) => (
									<div className="flex items-center gap-2">
										<span
											className={`text-xs px-2 py-1 rounded ${
												entity.status === "active"
													? "bg-green-100 text-green-800"
													: "bg-red-100 text-red-800"
											}`}
										>
											{entity.status}
										</span>
									</div>
								)}
								actions={() => (
									<div className="flex items-center gap-2">
										<Button
											tweak={({ what }) => ({
												variant: what.variant({
													size: "xs",
												}),
											})}
										>
											View Profile
										</Button>
										<Button
											tweak={({ what }) => ({
												variant: what.variant({
													size: "xs",
													tone: "secondary",
												}),
											})}
										>
											Edit
										</Button>
										<Button
											tweak={({ what }) => ({
												variant: what.variant({
													size: "xs",
													tone: "danger",
												}),
											})}
										>
											Deactivate
										</Button>
									</div>
								)}
								extra={({ entity }) => (
									<div className="flex items-center gap-2">
										<span className="text-sm text-gray-500">
											Last login:{" "}
											{new Date(
												entity.lastLogin,
											).toLocaleDateString()}
										</span>
									</div>
								)}
							/>
						</Column>
						<Column label={<Tx label={"User List Item"} />}>
							<Preview
								entity={sampleUser}
								title={({ entity }) => (
									<TitlePreview
										icon="UserIcon"
										title={entity.name}
									/>
								)}
								extra={({ entity }) => (
									<div className="flex items-center gap-2">
										<span className="text-sm text-gray-500">
											{entity.role}
										</span>
										<Button
											tweak={({ what }) => ({
												variant: what.variant({
													size: "xs",
												}),
											})}
										>
											View
										</Button>
									</div>
								)}
							/>
						</Column>
					</div>
				</Section>

				{/* Project Management Examples */}
				<Section title={<Tx label={"Project Management Examples"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Project Overview"} />}>
							<Preview
								entity={sampleProject}
								title={({ entity }) => (
									<TitlePreview
										icon="FileIcon"
										title={entity.name}
									/>
								)}
								links={({ entity }) => (
									<div className="flex items-center gap-2">
										<div className="w-20 bg-gray-200 rounded-full h-2">
											<div
												className="bg-blue-600 h-2 rounded-full"
												style={{
													width: `${entity.progress}%`,
												}}
											/>
										</div>
										<span className="text-sm text-gray-500">
											{entity.progress}%
										</span>
									</div>
								)}
								actions={() => (
									<div className="flex items-center gap-2">
										<Button
											tweak={({ what }) => ({
												variant: what.variant({
													size: "xs",
												}),
											})}
										>
											View Project
										</Button>
										<Button
											tweak={({ what }) => ({
												variant: what.variant({
													size: "xs",
													tone: "secondary",
												}),
											})}
										>
											Edit
										</Button>
									</div>
								)}
								extra={({ entity }) => (
									<div className="flex items-center gap-2">
										<span className="text-sm text-gray-500">
											Team: {entity.team.length} members
										</span>
									</div>
								)}
							/>
						</Column>
						<Column label={<Tx label={"Project Card"} />}>
							<Preview
								entity={sampleProject}
								title={({ entity }) => (
									<TitlePreview
										icon="FileIcon"
										title={entity.name}
									/>
								)}
								extra={({ entity }) => (
									<div className="flex items-center gap-2">
										<span className="text-sm text-gray-500">
											{entity.status}
										</span>
										<Button
											tweak={({ what }) => ({
												variant: what.variant({
													size: "xs",
												}),
											})}
										>
											Open
										</Button>
									</div>
								)}
							/>
						</Column>
					</div>
				</Section>

				{/* Custom Styling Examples */}
				<Section title={<Tx label={"Custom Styling Examples"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Highlighted Preview"} />}>
							<Preview
								entity={sampleUser}
								title={({ entity }) => (
									<TitlePreview
										icon="UserIcon"
										title={entity.name}
									/>
								)}
								tweak={({ what }) => ({
									slot: what.slot({
										root: what.css([
											"bg-blue-50",
											"border-blue-200",
											"border-2",
										]),
									}),
								})}
							/>
						</Column>
						<Column label={<Tx label={"Compact Layout"} />}>
							<Preview
								entity={sampleDocument}
								title={({ entity }) => (
									<TitlePreview
										icon="FileIcon"
										title={entity.title}
									/>
								)}
								tweak={({ what }) => ({
									slot: what.slot({
										root: what.css([
											"p-1",
											"gap-1",
										]),
									}),
								})}
							/>
						</Column>
					</div>
				</Section>

				{/* Real-world Examples */}
				<Section title={<Tx label={"Real-world Examples"} />}>
					<div className="grid grid-cols-1 gap-6">
						<Column label={<Tx label={"Dashboard Items"} />}>
							<div className="flex flex-col space-y-4">
								<Preview
									entity={sampleUser}
									title={({ entity }) => (
										<TitlePreview
											icon="UserIcon"
											title={entity.name}
											subtitle={entity.role}
										/>
									)}
									links={({ entity }) => (
										<div className="flex items-center gap-2">
											<span
												className={`text-xs px-2 py-1 rounded ${
													entity.status === "active"
														? "bg-green-100 text-green-800"
														: "bg-red-100 text-red-800"
												}`}
											>
												{entity.status}
											</span>
										</div>
									)}
									actions={() => (
										<div className="flex items-center gap-2">
											<Button
												tweak={({ what }) => ({
													variant: what.variant({
														size: "xs",
													}),
												})}
											>
												View
											</Button>
											<Button
												tweak={({ what }) => ({
													variant: what.variant({
														size: "xs",
														tone: "secondary",
													}),
												})}
											>
												Edit
											</Button>
										</div>
									)}
									extra={({ entity }) => (
										<div className="flex items-center gap-2">
											<span className="text-sm text-gray-500">
												Last login:{" "}
												{new Date(
													entity.lastLogin,
												).toLocaleDateString()}
											</span>
										</div>
									)}
								/>

								<Preview
									entity={sampleProject}
									title={({ entity }) => (
										<TitlePreview
											icon="FileIcon"
											title={entity.name}
										/>
									)}
									links={({ entity }) => (
										<div className="flex items-center gap-2">
											<div className="w-20 bg-gray-200 rounded-full h-2">
												<div
													className="bg-blue-600 h-2 rounded-full"
													style={{
														width: `${entity.progress}%`,
													}}
												/>
											</div>
											<span className="text-sm text-gray-500">
												{entity.progress}%
											</span>
										</div>
									)}
									actions={() => (
										<div className="flex items-center gap-2">
											<Button
												tweak={({ what }) => ({
													variant: what.variant({
														size: "xs",
													}),
												})}
											>
												View
											</Button>
											<Button
												tweak={({ what }) => ({
													variant: what.variant({
														size: "xs",
														tone: "secondary",
													}),
												})}
											>
												Edit
											</Button>
										</div>
									)}
									extra={({ entity }) => (
										<div className="flex items-center gap-2">
											<span className="text-sm text-gray-500">
												Due: {entity.dueDate}
											</span>
										</div>
									)}
								/>

								<Preview
									entity={sampleDocument}
									title={({ entity }) => (
										<TitlePreview
											icon="FileIcon"
											title={entity.title}
											subtitle={entity.type}
										/>
									)}
									links={() => (
										<div className="flex items-center gap-2">
											<Button
												tweak={({ what }) => ({
													variant: what.variant({
														size: "xs",
													}),
												})}
											>
												Download
											</Button>
											<Button
												tweak={({ what }) => ({
													variant: what.variant({
														size: "xs",
														tone: "secondary",
													}),
												})}
											>
												Share
											</Button>
										</div>
									)}
									actions={() => (
										<div className="flex items-center gap-2">
											<Button
												tweak={({ what }) => ({
													variant: what.variant({
														size: "xs",
													}),
												})}
											>
												Open
											</Button>
											<Button
												tweak={({ what }) => ({
													variant: what.variant({
														size: "xs",
														tone: "secondary",
													}),
												})}
											>
												Edit
											</Button>
										</div>
									)}
									extra={({ entity }) => (
										<div className="flex items-center gap-2">
											<span className="text-sm text-gray-500">
												{entity.size}
											</span>
											<span className="text-sm text-gray-500">
												•
											</span>
											<span className="text-sm text-gray-500">
												by {entity.author}
											</span>
										</div>
									)}
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
