import { createFileRoute } from "@tanstack/react-router";
import { Detail, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/cls";
import type { ReactNode } from "react";

// Sample data for demonstrations
const sampleUserDetails = [
	{
		id: "personal",
		icon: "UserIcon",
		title: "Personal Information",
		item: [
			{
				id: "name",
				value: [
					{
						id: "first",
						label: "First Name",
						value: "John",
					},
					{
						id: "last",
						label: "Last Name",
						value: "Doe",
					},
				],
			},
			{
				id: "contact",
				value: [
					{
						id: "email",
						label: "Email",
						value: "john.doe@example.com",
					},
					{
						id: "phone",
						label: "Phone",
						value: "+1 (555) 123-4567",
					},
				],
			},
		],
	},
	{
		id: "professional",
		icon: "JobIcon",
		title: "Professional Information",
		item: [
			{
				id: "role",
				value: [
					{
						id: "title",
						label: "Job Title",
						value: "Senior Software Engineer",
					},
					{
						id: "department",
						label: "Department",
						value: "Engineering",
					},
				],
			},
			{
				id: "status",
				value: [
					{
						id: "employment",
						label: "Employment Status",
						value: "Full-time",
					},
					{
						id: "start",
						label: "Start Date",
						value: "January 15, 2023",
					},
				],
			},
		],
	},
];

const sampleProjectDetails = [
	{
		id: "overview",
		icon: "FileIcon",
		title: "Project Overview",
		item: [
			{
				id: "basic",
				value: [
					{
						id: "name",
						label: "Project Name",
						value: "E-commerce Platform",
					},
					{
						id: "status",
						label: "Status",
						value: "In Progress",
					},
				],
			},
			{
				id: "timeline",
				value: [
					{
						id: "start",
						label: "Start Date",
						value: "March 1, 2024",
					},
					{
						id: "due",
						label: "Due Date",
						value: "August 31, 2024",
					},
				],
			},
		],
	},
	{
		id: "team",
		icon: "UserIcon",
		title: "Team Members",
		item: [
			{
				id: "members",
				value: [
					{
						id: "lead",
						label: "Project Lead",
						value: "Alice Johnson",
					},
					{
						id: "dev",
						label: "Lead Developer",
						value: "Bob Smith",
					},
				],
			},
			{
				id: "progress",
				value: [
					{
						id: "completion",
						label: "Completion",
						value: "75%",
					},
					{
						id: "milestone",
						label: "Next Milestone",
						value: "API Integration",
					},
				],
			},
		],
	},
];

const sampleDocumentDetails = [
	{
		id: "metadata",
		icon: "FileIcon",
		title: "Document Information",
		item: [
			{
				id: "basic",
				value: [
					{
						id: "title",
						label: "Document Title",
						value: "API Documentation",
					},
					{
						id: "type",
						label: "File Type",
						value: "PDF",
					},
				],
			},
			{
				id: "details",
				value: [
					{
						id: "size",
						label: "File Size",
						value: "2.5 MB",
					},
					{
						id: "pages",
						label: "Pages",
						value: "45",
					},
				],
			},
		],
	},
	{
		id: "history",
		icon: "SettingsIcon",
		title: "Document History",
		item: [
			{
				id: "dates",
				value: [
					{
						id: "created",
						label: "Created",
						value: "January 10, 2024",
					},
					{
						id: "modified",
						label: "Last Modified",
						value: "January 14, 2024",
					},
				],
			},
			{
				id: "author",
				value: [
					{
						id: "creator",
						label: "Created By",
						value: "Jane Smith",
					},
					{
						id: "editor",
						label: "Last Edited By",
						value: "Mike Wilson",
					},
				],
			},
		],
	},
];

export const Route = createFileRoute("/$locale/components/detail")({
	component() {
		return (
			<div
				className={tvc([
					"flex",
					"flex-col",
					"space-y-8",
					"w-full",
				])}
			>
				{/* Basic Usage */}
				<ShowcaseSection title={<Tx label={"Basic Usage"} />}>
					<div className="grid grid-cols-1 gap-6">
						<ShowcaseColumn label={<Tx label={"User Details"} />}>
							<Detail>
								<Section></Section>
							</Detail>
						</ShowcaseColumn>
					</div>
				</ShowcaseSection>

				{/* Different Content Types */}
				<ShowcaseSection
					title={<Tx label={"Different Content Types"} />}
				>
					<div className="grid grid-cols-2 gap-6">
						<ShowcaseColumn
							label={<Tx label={"Project Details"} />}
						>
							<Detail section={sampleProjectDetails} />
						</ShowcaseColumn>
						<ShowcaseColumn
							label={<Tx label={"Document Details"} />}
						>
							<Detail section={sampleDocumentDetails} />
						</ShowcaseColumn>
					</div>
				</ShowcaseSection>

				{/* Borderless Variant */}
				<ShowcaseSection title={<Tx label={"Borderless Variant"} />}>
					<div className="grid grid-cols-1 gap-6">
						<ShowcaseColumn
							label={<Tx label={"Without Borders"} />}
						>
							<Detail
								section={sampleUserDetails}
								cls={({ what }) => ({
									variant: what.variant({
										borderless: true,
									}),
								})}
							/>
						</ShowcaseColumn>
					</div>
				</ShowcaseSection>

				{/* Custom Styling */}
				<ShowcaseSection title={<Tx label={"Custom Styling"} />}>
					<div className="grid grid-cols-2 gap-6">
						<ShowcaseColumn
							label={<Tx label={"Highlighted Sections"} />}
						>
							<Detail
								section={sampleUserDetails}
								cls={({ what }) => ({
									slot: what.slot({
										section: what.both(
											[
												"flex",
												"flex-col",
												"gap-4",
												"border",
												"p-4",
											],
											[
												"tone.primary.light.border",
												"tone.primary.light.bg",
												"round.md",
											],
										),
									}),
								})}
							/>
						</ShowcaseColumn>
						<ShowcaseColumn label={<Tx label={"Compact Layout"} />}>
							<Detail
								section={sampleProjectDetails}
								cls={({ what }) => ({
									slot: what.slot({
										section: what.both(
											[
												"flex",
												"flex-col",
												"gap-2",
												"border",
												"p-2",
											],
											[
												"tone.neutral.light.border",
												"tone.neutral.light.bg",
												"round.sm",
											],
										),
										value: what.both(
											[
												"flex-1",
												"flex-col",
												"gap-1",
												"border",
												"p-1",
											],
											[
												"tone.neutral.light.border",
												"round.sm",
											],
										),
									}),
								})}
							/>
						</ShowcaseColumn>
					</div>
				</ShowcaseSection>

				{/* Real-world Examples */}
				<ShowcaseSection title={<Tx label={"Real-world Examples"} />}>
					<div className="grid grid-cols-1 gap-6">
						<ShowcaseColumn
							label={<Tx label={"Complete User Profile"} />}
						>
							<Detail
								section={[
									...sampleUserDetails,
									...sampleProjectDetails,
								]}
							/>
						</ShowcaseColumn>
					</div>
				</ShowcaseSection>
			</div>
		);
	},
});

function ShowcaseSection({
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

function ShowcaseColumn({
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
