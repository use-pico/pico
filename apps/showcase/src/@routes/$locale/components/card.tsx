import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@use-pico/client/ui/card";
import { Tx } from "@use-pico/client/ui/tx";
import { tvc } from "@use-pico/cls";
import type { ReactNode } from "react";

const sampleEntity = {
	id: "1",
	name: "John Doe",
	email: "john.doe@example.com",
	role: "Developer",
	department: "Engineering",
	startDate: "2023-01-15",
	salary: 75000,
	isActive: true,
	description:
		"A passionate developer with 5 years of experience in React and TypeScript.",
};

export const Route = createFileRoute("/$locale/components/card")({
	component() {
		return (
			<div
				className={tvc([
					"flex",
					"flex-col",
					"space-y-8",
				])}
			>
				{/* Basic Card */}
				<Section title={<Tx label={"Basic Card"} />}>
					<div className="grid grid-cols-1 gap-6">
						<Column label={<Tx label={"Default"} />}>
							<Card
								entity={sampleEntity}
								items={[
									{
										id: "name",
										label: "Name",
										render: ({ entity }) => entity.name,
									},
									{
										id: "email",
										label: "Email",
										render: ({ entity }) => entity.email,
									},
									{
										id: "role",
										label: "Role",
										render: ({ entity }) => entity.role,
									},
									{
										id: "department",
										label: "Department",
										render: ({ entity }) =>
											entity.department,
									},
								]}
							/>
						</Column>
					</div>
				</Section>

				{/* Inline Card */}
				<Section title={<Tx label={"Inline Card"} />}>
					<div className="grid grid-cols-1 gap-6">
						<Column label={<Tx label={"Inline Layout"} />}>
							<Card
								entity={sampleEntity}
								inline={true}
								items={[
									{
										id: "name",
										label: "Name",
										render: ({ entity }) => entity.name,
									},
									{
										id: "email",
										label: "Email",
										render: ({ entity }) => entity.email,
									},
									{
										id: "role",
										label: "Role",
										render: ({ entity }) => entity.role,
									},
									{
										id: "department",
										label: "Department",
										render: ({ entity }) =>
											entity.department,
									},
								]}
							/>
						</Column>
					</div>
				</Section>

				{/* Card with Hidden Items */}
				<Section title={<Tx label={"Card with Hidden Items"} />}>
					<div className="grid grid-cols-1 gap-6">
						<Column label={<Tx label={"Hidden Email"} />}>
							<Card
								entity={sampleEntity}
								hidden={[
									"email",
								]}
								items={[
									{
										id: "name",
										label: "Name",
										render: ({ entity }) => entity.name,
									},
									{
										id: "email",
										label: "Email",
										render: ({ entity }) => entity.email,
									},
									{
										id: "role",
										label: "Role",
										render: ({ entity }) => entity.role,
									},
									{
										id: "department",
										label: "Department",
										render: ({ entity }) =>
											entity.department,
									},
								]}
							/>
						</Column>
					</div>
				</Section>

				{/* Complex Card */}
				<Section title={<Tx label={"Complex Card"} />}>
					<div className="grid grid-cols-1 gap-6">
						<Column label={<Tx label={"Full Employee Details"} />}>
							<Card
								entity={sampleEntity}
								items={[
									{
										id: "name",
										label: "Full Name",
										render: ({ entity }) => entity.name,
									},
									{
										id: "email",
										label: "Email Address",
										render: ({ entity }) => entity.email,
									},
									{
										id: "role",
										label: "Job Role",
										render: ({ entity }) => entity.role,
									},
									{
										id: "department",
										label: "Department",
										render: ({ entity }) =>
											entity.department,
									},
									{
										id: "startDate",
										label: "Start Date",
										render: ({ entity }) =>
											entity.startDate,
									},
									{
										id: "salary",
										label: "Annual Salary",
										render: ({ entity }) =>
											`$${entity.salary.toLocaleString()}`,
									},
									{
										id: "isActive",
										label: "Status",
										render: ({ entity }) =>
											entity.isActive
												? "Active"
												: "Inactive",
									},
									{
										id: "description",
										label: "Description",
										render: ({ entity }) =>
											entity.description,
									},
								]}
							/>
						</Column>
					</div>
				</Section>

				{/* Multiple Cards */}
				<Section title={<Tx label={"Multiple Cards"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Employee 1"} />}>
							<Card
								entity={sampleEntity}
								items={[
									{
										id: "name",
										label: "Name",
										render: ({ entity }) => entity.name,
									},
									{
										id: "role",
										label: "Role",
										render: ({ entity }) => entity.role,
									},
								]}
							/>
						</Column>
						<Column label={<Tx label={"Employee 2"} />}>
							<Card
								entity={{
									...sampleEntity,
									name: "Jane Smith",
									email: "jane.smith@example.com",
									role: "Designer",
									department: "Design",
								}}
								items={[
									{
										id: "name",
										label: "Name",
										render: ({ entity }) => entity.name,
									},
									{
										id: "role",
										label: "Role",
										render: ({ entity }) => entity.role,
									},
								]}
							/>
						</Column>
					</div>
				</Section>
			</div>
		);
	},
});

export function Section({
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
