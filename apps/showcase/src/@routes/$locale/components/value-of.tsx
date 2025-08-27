import { createFileRoute } from "@tanstack/react-router";
import { Badge, Tx, ValueOf } from "@use-pico/client";
import { tvc } from "@use-pico/cls";
import type { ReactNode } from "react";

const sampleData = {
	name: "John Doe",
	email: "john.doe@example.com",
	role: "Senior Developer",
	department: "Engineering",
	startDate: "2023-01-15",
	salary: 85000,
	isActive: true,
	skills: [
		"React",
		"TypeScript",
		"Node.js",
		"PostgreSQL",
	],
	projects: 12,
	rating: 4.8,
};

export const Route = createFileRoute("/$locale/components/value-of")({
	component() {
		return (
			<div
				className={tvc([
					"flex",
					"flex-col",
					"space-y-8",
				])}
			>
				{/* Basic ValueOf */}
				<Section title={<Tx label={"Basic ValueOf"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Default"} />}>
							<ValueOf
								label="Name"
								value={sampleData.name}
							/>
						</Column>
						<Column label={<Tx label={"Without Background"} />}>
							<ValueOf
								label="Email"
								value={sampleData.email}
							/>
						</Column>
					</div>
				</Section>

				{/* Inline ValueOf */}
				<Section title={<Tx label={"Inline ValueOf"} />}>
					<div className="grid grid-cols-1 gap-4">
						<Column label={<Tx label={"Inline Layout"} />}>
							<div className="flex flex-col space-y-2">
								<ValueOf
									inline
									label="Name:"
									value={sampleData.name}
								/>
								<ValueOf
									inline
									label="Email:"
									value={sampleData.email}
								/>
								<ValueOf
									inline
									label="Role:"
									value={sampleData.role}
								/>
								<ValueOf
									inline
									label="Department:"
									value={sampleData.department}
								/>
							</div>
						</Column>
					</div>
				</Section>

				{/* Different Data Types */}
				<Section title={<Tx label={"Different Data Types"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Text Values"} />}>
							<div className="flex flex-col space-y-2">
								<ValueOf
									label="Full Name"
									value={sampleData.name}
								/>
								<ValueOf
									label="Email Address"
									value={sampleData.email}
								/>
								<ValueOf
									label="Job Title"
									value={sampleData.role}
								/>
							</div>
						</Column>
						<Column label={<Tx label={"Numeric Values"} />}>
							<div className="flex flex-col space-y-2">
								<ValueOf
									label="Annual Salary"
									value={`$${sampleData.salary.toLocaleString()}`}
								/>
								<ValueOf
									label="Projects Completed"
									value={sampleData.projects}
								/>
								<ValueOf
									label="Performance Rating"
									value={`${sampleData.rating}/5.0`}
								/>
							</div>
						</Column>
					</div>
				</Section>

				{/* Complex Values */}
				<Section title={<Tx label={"Complex Values"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Array Values"} />}>
							<ValueOf
								label="Skills"
								value={
									<div className="flex flex-wrap gap-2">
										{sampleData.skills.map((skill) => (
											<Badge
												key={skill}
												cls={({ what }) => ({
													variant: what.variant({
														theme: "light",
													}),
												})}
											>
												{skill}
											</Badge>
										))}
									</div>
								}
							/>
						</Column>
						<Column label={<Tx label={"Boolean Values"} />}>
							<ValueOf
								label="Active Status"
								value={
									sampleData.isActive ? "Active" : "Inactive"
								}
							/>
						</Column>
					</div>
				</Section>

				{/* Multiple ValueOf Components */}
				<Section title={<Tx label={"Multiple ValueOf Components"} />}>
					<div className="grid grid-cols-1 gap-4">
						<Column label={<Tx label={"Employee Profile"} />}>
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col space-y-2">
									<ValueOf
										label="Personal Information"
										value=""
									/>
									<ValueOf
										inline
										label="Name:"
										value={sampleData.name}
									/>
									<ValueOf
										inline
										label="Email:"
										value={sampleData.email}
									/>
									<ValueOf
										inline
										label="Start Date:"
										value={sampleData.startDate}
									/>
								</div>
								<div className="flex flex-col space-y-2">
									<ValueOf
										label="Work Information"
										value=""
									/>
									<ValueOf
										inline
										label="Role:"
										value={sampleData.role}
									/>
									<ValueOf
										inline
										label="Department:"
										value={sampleData.department}
									/>
									<ValueOf
										inline
										label="Salary:"
										value={`$${sampleData.salary.toLocaleString()}`}
									/>
								</div>
							</div>
						</Column>
					</div>
				</Section>

				{/* Variant Combinations */}
				<Section title={<Tx label={"Variant Combinations"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Inline + Background"} />}>
							<div className="flex flex-col space-y-2">
								<ValueOf
									inline
									label="Name:"
									value={sampleData.name}
								/>
								<ValueOf
									inline
									label="Email:"
									value={sampleData.email}
								/>
							</div>
						</Column>
						<Column
							label={<Tx label={"Default + No Background"} />}
						>
							<div className="flex flex-col space-y-2">
								<ValueOf
									label="Role"
									value={sampleData.role}
								/>
								<ValueOf
									label="Department"
									value={sampleData.department}
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
