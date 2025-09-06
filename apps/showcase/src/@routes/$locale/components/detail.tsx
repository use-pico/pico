import { createFileRoute } from "@tanstack/react-router";
import { Attr, Detail, Flow, Section, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/cls";
import type { ReactNode } from "react";

// Sample data for demonstrations (unused - replaced with individual components)
/*
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
*/

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
				{/* Single Section Examples */}
				<ShowcaseSection
					title={<Tx label={"Single Section Examples"} />}
				>
					<div className="grid grid-cols-1 gap-6">
						<ShowcaseColumn
							label={<Tx label={"Simple User Profile"} />}
						>
							<Detail>
								<Flow direction="col">
									<Section
										title={<Tx label="User Profile" />}
									>
										<Attr
											label={<Tx label="Name" />}
											value="John Doe"
										/>
										<Attr
											label={<Tx label="Email" />}
											value="john@example.com"
										/>
										<Attr
											label={<Tx label="Role" />}
											value="Developer"
										/>
									</Section>
								</Flow>
							</Detail>
						</ShowcaseColumn>
					</div>
				</ShowcaseSection>

				{/* Two Section Examples */}
				<ShowcaseSection title={<Tx label={"Two Section Examples"} />}>
					<div className="grid grid-cols-2 gap-6">
						<ShowcaseColumn
							label={<Tx label={"Personal & Professional"} />}
						>
							<Detail>
								<Flow direction="col">
									<Section
										title={
											<Tx label="Personal Information" />
										}
									>
										<Attr
											label={<Tx label="First Name" />}
											value="John"
										/>
										<Attr
											label={<Tx label="Last Name" />}
											value="Doe"
										/>
										<Attr
											label={<Tx label="Email" />}
											value="john.doe@example.com"
										/>
										<Attr
											label={<Tx label="Phone" />}
											value="+1 (555) 123-4567"
										/>
									</Section>
								</Flow>
								<Flow direction="row">
									<Section
										title={
											<Tx label="Professional Information" />
										}
									>
										<Attr
											label={<Tx label="Job Title" />}
											value="Senior Software Engineer"
										/>
										<Attr
											label={<Tx label="Department" />}
											value="Engineering"
										/>
										<Attr
											label={
												<Tx label="Employment Status" />
											}
											value="Full-time"
										/>
										<Attr
											label={<Tx label="Start Date" />}
											value="January 15, 2023"
										/>
									</Section>
								</Flow>
							</Detail>
						</ShowcaseColumn>
						<ShowcaseColumn
							label={<Tx label={"Project Overview"} />}
						>
							<Detail>
								<Flow direction="row">
									<Section
										title={<Tx label="Project Details" />}
									>
										<Attr
											label={<Tx label="Project Name" />}
											value="E-commerce Platform"
										/>
										<Attr
											label={<Tx label="Status" />}
											value="In Progress"
										/>
										<Attr
											label={<Tx label="Priority" />}
											value="High"
										/>
									</Section>
								</Flow>
								<Flow direction="col">
									<Section title={<Tx label="Timeline" />}>
										<Attr
											label={<Tx label="Start Date" />}
											value="March 1, 2024"
										/>
										<Attr
											label={<Tx label="Due Date" />}
											value="August 31, 2024"
										/>
										<Attr
											label={<Tx label="Progress" />}
											value="75%"
										/>
									</Section>
								</Flow>
							</Detail>
						</ShowcaseColumn>
					</div>
				</ShowcaseSection>

				{/* Complex Multi-Section Examples */}
				<ShowcaseSection
					title={<Tx label={"Complex Multi-Section Examples"} />}
				>
					<div className="grid grid-cols-1 gap-6">
						<ShowcaseColumn
							label={
								<Tx
									label={
										"Complete Employee Profile (6 Sections)"
									}
								/>
							}
						>
							<Detail>
								<Flow direction="col">
									<Section
										title={
											<Tx label="Personal Information" />
										}
									>
										<Attr
											label={<Tx label="Full Name" />}
											value="Alice Johnson"
										/>
										<Attr
											label={<Tx label="Email" />}
											value="alice.johnson@company.com"
										/>
										<Attr
											label={<Tx label="Phone" />}
											value="+1 (555) 987-6543"
										/>
										<Attr
											label={<Tx label="Address" />}
											value="123 Main St, City, State 12345"
										/>
									</Section>
								</Flow>
								<Flow direction="row">
									<Section
										title={
											<Tx label="Employment Details" />
										}
									>
										<Attr
											label={<Tx label="Employee ID" />}
											value="EMP-001"
										/>
										<Attr
											label={<Tx label="Job Title" />}
											value="Senior Software Engineer"
										/>
										<Attr
											label={<Tx label="Department" />}
											value="Engineering"
										/>
										<Attr
											label={<Tx label="Manager" />}
											value="Bob Smith"
										/>
									</Section>
								</Flow>
								<Flow direction="col">
									<Section
										title={<Tx label="Work Schedule" />}
									>
										<Attr
											label={
												<Tx label="Employment Type" />
											}
											value="Full-time"
										/>
										<Attr
											label={<Tx label="Start Date" />}
											value="January 15, 2023"
										/>
										<Attr
											label={<Tx label="Work Hours" />}
											value="9:00 AM - 5:00 PM"
										/>
										<Attr
											label={<Tx label="Remote Status" />}
											value="Hybrid"
										/>
									</Section>
								</Flow>
								<Flow direction="row">
									<Section
										title={<Tx label="Compensation" />}
									>
										<Attr
											label={<Tx label="Salary" />}
											value="$120,000"
										/>
										<Attr
											label={<Tx label="Bonus" />}
											value="$15,000"
										/>
										<Attr
											label={<Tx label="Benefits" />}
											value="Health, Dental, 401k"
										/>
									</Section>
								</Flow>
								<Flow direction="col">
									<Section
										title={
											<Tx label="Performance & Goals" />
										}
									>
										<Attr
											label={<Tx label="Last Review" />}
											value="December 2023"
										/>
										<Attr
											label={<Tx label="Rating" />}
											value="Exceeds Expectations"
										/>
										<Attr
											label={<Tx label="Current Goals" />}
											value="Lead new project initiative"
										/>
										<Attr
											label={<Tx label="Next Review" />}
											value="June 2024"
										/>
									</Section>
								</Flow>
								<Flow direction="row">
									<Section
										title={
											<Tx label="Skills & Certifications" />
										}
									>
										<Attr
											label={
												<Tx label="Primary Skills" />
											}
											value="React, TypeScript, Node.js"
										/>
										<Attr
											label={
												<Tx label="Certifications" />
											}
											value="AWS Certified Developer"
										/>
										<Attr
											label={<Tx label="Languages" />}
											value="English, Spanish"
										/>
									</Section>
								</Flow>
							</Detail>
						</ShowcaseColumn>
					</div>
				</ShowcaseSection>

				{/* Mixed Flow Directions */}
				<ShowcaseSection title={<Tx label={"Mixed Flow Directions"} />}>
					<div className="grid grid-cols-2 gap-6">
						<ShowcaseColumn
							label={<Tx label={"Product Information"} />}
						>
							<Detail>
								<Flow direction="col">
									<Section
										title={<Tx label="Product Details" />}
									>
										<Attr
											label={<Tx label="Product Name" />}
											value="Premium Wireless Headphones"
										/>
										<Attr
											label={<Tx label="SKU" />}
											value="PWH-2024-001"
										/>
										<Attr
											label={<Tx label="Category" />}
											value="Electronics"
										/>
									</Section>
								</Flow>
								<Flow direction="col">
									<Section title={<Tx label="Pricing" />}>
										<Attr
											label={<Tx label="Price" />}
											value="$299.99"
										/>
										<Attr
											label={<Tx label="Discount" />}
											value="20%"
										/>
									</Section>
								</Flow>
								<Flow direction="row">
									<Section
										title={<Tx label="Specifications" />}
									>
										<Attr
											label={<Tx label="Battery Life" />}
											value="30 hours"
										/>
										<Attr
											label={<Tx label="Connectivity" />}
											value="Bluetooth 5.0"
										/>
										<Attr
											label={<Tx label="Weight" />}
											value="250g"
										/>
									</Section>
								</Flow>
							</Detail>
						</ShowcaseColumn>
						<ShowcaseColumn
							label={<Tx label={"Order Information"} />}
						>
							<Detail>
								<Flow direction="row">
									<Section
										title={<Tx label="Order Details" />}
									>
										<Attr
											label={<Tx label="Order ID" />}
											value="ORD-2024-001"
										/>
										<Attr
											label={<Tx label="Status" />}
											value="Shipped"
										/>
									</Section>
								</Flow>
								<Flow direction="col">
									<Section title={<Tx label="Shipping" />}>
										<Attr
											label={
												<Tx label="Tracking Number" />
											}
											value="1Z999AA1234567890"
										/>
										<Attr
											label={<Tx label="Carrier" />}
											value="FedEx"
										/>
										<Attr
											label={
												<Tx label="Expected Delivery" />
											}
											value="January 20, 2024"
										/>
									</Section>
								</Flow>
								<Flow direction="row">
									<Section title={<Tx label="Customer" />}>
										<Attr
											label={<Tx label="Name" />}
											value="Jane Smith"
										/>
										<Attr
											label={<Tx label="Email" />}
											value="jane@example.com"
										/>
									</Section>
								</Flow>
							</Detail>
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
