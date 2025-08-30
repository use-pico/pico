import { createFileRoute } from "@tanstack/react-router";
import {
	ActionClick,
	ActionMenu,
	Badge,
	Button,
	DateInline,
	Icon,
	LabelCount,
	LoadingOverlay,
	Preview,
	PriceInline,
	Progress,
	TitlePreview,
	Tx,
} from "@use-pico/client";
import { tvc } from "@use-pico/cls";
import { useState } from "react";

// Mock customer data
const customerData = {
	id: "CUST-001",
	name: "John Smith",
	email: "john.smith@example.com",
	phone: "+1 (555) 123-4567",
	status: "active",
	joinDate: new Date("2023-01-15"),
	lastLogin: new Date("2024-01-15"),
	subscription: {
		plan: "premium",
		status: "active",
		nextBilling: new Date("2024-02-15"),
		amount: 29.99,
	},
	usage: {
		storage: 75, // percentage
		bandwidth: 45, // percentage
		projects: 8,
		teamMembers: 3,
	},
	recentActivity: [
		{
			id: "1",
			action: "Project created",
			timestamp: new Date("2024-01-14"),
			project: "E-commerce App",
		},
		{
			id: "2",
			action: "File uploaded",
			timestamp: new Date("2024-01-13"),
			project: "Portfolio Website",
		},
		{
			id: "3",
			action: "Team member added",
			timestamp: new Date("2024-01-12"),
			project: "Mobile App",
		},
		{
			id: "4",
			action: "Payment processed",
			timestamp: new Date("2024-01-10"),
			project: null,
		},
	],
};

export const Route = createFileRoute("/$locale/components/customer-detail")({
	component() {
		const [isLoading, setIsLoading] = useState(false);
		const [selectedTab, setSelectedTab] = useState("overview");

		return (
			<div
				className={tvc([
					"flex",
					"flex-col",
					"space-y-6",
					"w-full",
				])}
			>
				{/* Header with Preview component */}
				<Preview
					entity={customerData}
					title={({ entity }) => (
						<TitlePreview
							icon="icon-[ph--user-circle]"
							title={entity.name}
							subtitle={`Customer ID: ${entity.id}`}
						/>
					)}
					links={({ entity }) => (
						<div className="flex gap-2">
							<Button size="sm">
								<Icon icon="icon-[ph--envelope]" />
								<Tx label="Send Email" />
							</Button>
							<Button size="sm">
								<Icon icon="icon-[ph--phone]" />
								<Tx label="Call" />
							</Button>
						</div>
					)}
					actions={({ entity }) => (
						<div className="flex gap-2">
							<ActionMenu>
								{/* Primary tone - Edit action */}
								<ActionClick
									onClick={() => console.log("Edit customer")}
									cls={({ what }) => ({
										variant: what.variant({
											tone: "primary",
											theme: "light",
										}),
									})}
								>
									<Icon icon="icon-[ph--pencil]" />
									<Tx label="Edit" />
								</ActionClick>

								{/* Secondary tone - View details */}
								<ActionClick
									onClick={() => console.log("View details")}
									cls={({ what }) => ({
										variant: what.variant({
											tone: "secondary",
											theme: "light",
										}),
									})}
								>
									<Icon icon="icon-[ph--eye]" />
									<Tx label="View Details" />
								</ActionClick>

								{/* Warning tone - Suspend action */}
								<ActionClick
									onClick={() =>
										console.log("Suspend customer")
									}
									cls={({ what }) => ({
										variant: what.variant({
											tone: "warning",
											theme: "light",
										}),
									})}
								>
									<Icon icon="icon-[ph--pause]" />
									<Tx label="Suspend" />
								</ActionClick>

								{/* Danger tone - Delete action */}
								<ActionClick
									onClick={() =>
										console.log("Delete customer")
									}
									cls={({ what }) => ({
										variant: what.variant({
											tone: "danger",
											theme: "light",
										}),
									})}
								>
									<Icon icon="icon-[ph--trash]" />
									<Tx label="Delete" />
								</ActionClick>

								{/* Neutral tone - Export data */}
								<ActionClick
									onClick={() => console.log("Export data")}
									cls={({ what }) => ({
										variant: what.variant({
											tone: "neutral",
											theme: "light",
										}),
									})}
								>
									<Icon icon="icon-[ph--download]" />
									<Tx label="Export" />
								</ActionClick>

								{/* Subtle tone - Send notification */}
								<ActionClick
									onClick={() =>
										console.log("Send notification")
									}
									cls={({ what }) => ({
										variant: what.variant({
											tone: "subtle",
											theme: "light",
										}),
									})}
								>
									<Icon icon="icon-[ph--bell]" />
									<Tx label="Notify" />
								</ActionClick>

								{/* Loading state - Refresh */}
								<ActionClick
									onClick={() => console.log("Refresh data")}
									loading={true}
								>
									<Tx label="Refreshing..." />
								</ActionClick>

								{/* Disabled state - Premium feature */}
								<ActionClick
									onClick={() =>
										console.log("Premium feature")
									}
									cls={({ what }) => ({
										variant: what.variant({
											tone: "primary",
											theme: "light",
											disabled: true,
										}),
									})}
								>
									<Icon icon="icon-[ph--crown]" />
									<Tx label="Premium Feature" />
								</ActionClick>
							</ActionMenu>
						</div>
					)}
					extra={({ entity }) => (
						<div className="flex items-center gap-2">
							<Badge>
								<Tx label={entity.status} />
							</Badge>
							<Badge>
								<Tx label={entity.subscription.plan} />
							</Badge>
						</div>
					)}
				/>

				{/* Navigation Tabs */}
				<div className="flex gap-4 p-4 bg-slate-50 rounded-lg">
					<Button
						onClick={() => setSelectedTab("overview")}
						cls={({ what }) => ({
							variant: what.variant({
								tone:
									selectedTab === "overview"
										? "primary"
										: "secondary",
							}),
						})}
					>
						<Tx label="Overview" />
					</Button>
					<Button
						onClick={() => setSelectedTab("subscription")}
						cls={({ what }) => ({
							variant: what.variant({
								tone:
									selectedTab === "subscription"
										? "primary"
										: "secondary",
							}),
						})}
					>
						<Tx label="Subscription" />
					</Button>
					<Button
						onClick={() => setSelectedTab("usage")}
						cls={({ what }) => ({
							variant: what.variant({
								tone:
									selectedTab === "usage"
										? "primary"
										: "secondary",
							}),
						})}
					>
						<Tx label="Usage" />
					</Button>
					<Button
						onClick={() => setSelectedTab("activity")}
						cls={({ what }) => ({
							variant: what.variant({
								tone:
									selectedTab === "activity"
										? "primary"
										: "secondary",
							}),
						})}
					>
						<Tx label="Activity" />
					</Button>
				</div>

				{/* Content based on selected tab */}
				{selectedTab === "overview" && (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Customer Information */}
						<div className="p-6 bg-white rounded-lg border border-slate-200">
							<TitlePreview
								icon="icon-[ph--user]"
								title="Personal Information"
								subtitle="Customer details and contact information"
							/>
							<div className="mt-4 space-y-3">
								<div className="flex justify-between">
									<span className="text-sm text-slate-600">
										Full Name:
									</span>
									<span className="font-medium">
										{customerData.name}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-slate-600">
										Email:
									</span>
									<span className="font-medium">
										{customerData.email}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-slate-600">
										Phone:
									</span>
									<span className="font-medium">
										{customerData.phone}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-slate-600">
										Join Date:
									</span>
									<DateInline date={customerData.joinDate} />
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-slate-600">
										Last Login:
									</span>
									<DateInline date={customerData.lastLogin} />
								</div>
							</div>
						</div>

						{/* Subscription Status */}
						<div className="p-6 bg-white rounded-lg border border-slate-200">
							<TitlePreview
								icon="icon-[ph--credit-card]"
								title="Subscription Status"
								subtitle="Current plan and billing information"
							/>
							<div className="mt-4 space-y-3">
								<div className="flex justify-between items-center">
									<span className="text-sm text-slate-600">
										Plan:
									</span>
									<Badge>
										<Tx
											label={
												customerData.subscription.plan
											}
										/>
									</Badge>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm text-slate-600">
										Status:
									</span>
									<Badge>
										<Tx
											label={
												customerData.subscription.status
											}
										/>
									</Badge>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm text-slate-600">
										Next Billing:
									</span>
									<DateInline
										date={
											customerData.subscription
												.nextBilling
										}
									/>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm text-slate-600">
										Amount:
									</span>
									<PriceInline
										value={{
											price: customerData.subscription
												.amount,
											withVat: false,
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				)}

				{selectedTab === "usage" && (
					<div className="space-y-6">
						{/* Usage Statistics */}
						<div className="p-6 bg-white rounded-lg border border-slate-200">
							<TitlePreview
								icon="icon-[ph--chart-bar]"
								title="Resource Usage"
								subtitle="Current usage of allocated resources"
							/>
							<div className="mt-6 space-y-4">
								<div>
									<div className="flex justify-between items-center mb-2">
										<span className="text-sm font-medium">
											Storage Usage
										</span>
										<span className="text-sm text-slate-600">
											{customerData.usage.storage}%
										</span>
									</div>
									<Progress
										value={customerData.usage.storage}
									/>
								</div>

								<div>
									<div className="flex justify-between items-center mb-2">
										<span className="text-sm font-medium">
											Bandwidth Usage
										</span>
										<span className="text-sm text-slate-600">
											{customerData.usage.bandwidth}%
										</span>
									</div>
									<Progress
										value={customerData.usage.bandwidth}
									/>
								</div>
							</div>
						</div>

						{/* Usage Metrics */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="p-4 bg-white rounded-lg border border-slate-200 text-center">
								<LabelCount
									label="Active Projects"
									count={customerData.usage.projects}
								/>
							</div>
							<div className="p-4 bg-white rounded-lg border border-slate-200 text-center">
								<LabelCount
									label="Team Members"
									count={customerData.usage.teamMembers}
								/>
							</div>
							<div className="p-4 bg-white rounded-lg border border-slate-200 text-center">
								<LabelCount
									label="Days Active"
									count={Math.floor(
										(Date.now() -
											customerData.joinDate.getTime()) /
											(1000 * 60 * 60 * 24),
									)}
								/>
							</div>
						</div>
					</div>
				)}

				{selectedTab === "activity" && (
					<div className="p-6 bg-white rounded-lg border border-slate-200">
						<TitlePreview
							icon="icon-[ph--clock]"
							title="Recent Activity"
							subtitle="Customer's latest actions and interactions"
						/>
						<div className="mt-4">
							<table className="w-full border-collapse">
								<thead>
									<tr className="border-b border-slate-200">
										<th className="text-left py-2 px-4 font-medium">
											Action
										</th>
										<th className="text-left py-2 px-4 font-medium">
											Project
										</th>
										<th className="text-left py-2 px-4 font-medium">
											Timestamp
										</th>
									</tr>
								</thead>
								<tbody>
									{customerData.recentActivity.map(
										(activity) => (
											<tr
												key={activity.id}
												className="border-b border-slate-100"
											>
												<td className="py-2 px-4">
													{activity.action}
												</td>
												<td className="py-2 px-4">
													{activity.project || "-"}
												</td>
												<td className="py-2 px-4">
													<DateInline
														date={
															activity.timestamp
														}
													/>
												</td>
											</tr>
										),
									)}
								</tbody>
							</table>
						</div>
					</div>
				)}

				{selectedTab === "subscription" && (
					<div className="space-y-6">
						{/* Subscription Details */}
						<div className="p-6 bg-white rounded-lg border border-slate-200">
							<TitlePreview
								icon="icon-[ph--credit-card]"
								title="Subscription Details"
								subtitle="Plan information and billing cycle"
							/>
							<div className="mt-4 space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="text-sm font-medium text-slate-700">
											Current Plan
										</label>
										<div className="mt-1">
											<Badge>
												<Tx
													label={
														customerData
															.subscription.plan
													}
												/>
											</Badge>
										</div>
									</div>
									<div>
										<label className="text-sm font-medium text-slate-700">
											Billing Cycle
										</label>
										<div className="mt-1 text-sm text-slate-600">
											<Tx label="Monthly" />
										</div>
									</div>
								</div>

								<div className="border-t pt-4">
									<div className="flex justify-between items-center">
										<span className="text-sm font-medium">
											Next Billing Date
										</span>
										<DateInline
											date={
												customerData.subscription
													.nextBilling
											}
										/>
									</div>
									<div className="flex justify-between items-center mt-2">
										<span className="text-sm font-medium">
											Amount
										</span>
										<PriceInline
											value={{
												price: customerData.subscription
													.amount,
												withVat: false,
											}}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Plan Features */}
						<div className="p-6 bg-white rounded-lg border border-slate-200">
							<TitlePreview
								icon="icon-[ph--check-circle]"
								title="Plan Features"
								subtitle="Included features and limitations"
							/>
							<div className="mt-4 space-y-2">
								<div className="flex items-center gap-2">
									<Icon icon="icon-[ph--check]" />
									<Tx label="Unlimited projects" />
								</div>
								<div className="flex items-center gap-2">
									<Icon icon="icon-[ph--check]" />
									<Tx label="Up to 10 team members" />
								</div>
								<div className="flex items-center gap-2">
									<Icon icon="icon-[ph--check]" />
									<Tx label="100GB storage" />
								</div>
								<div className="flex items-center gap-2">
									<Icon icon="icon-[ph--check]" />
									<Tx label="Priority support" />
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Loading Overlay Demo */}
				<div className="relative">
					<Button
						onClick={() => setIsLoading(!isLoading)}
						className="mb-4"
					>
						<Tx
							label={
								isLoading
									? "Hide Loading"
									: "Show Loading Overlay"
							}
						/>
					</Button>

					<div className="relative h-32 bg-slate-100 rounded border">
						<LoadingOverlay show={isLoading} />
						<div className="p-4">
							<Tx label="This area shows a loading overlay when activated" />
						</div>
					</div>
				</div>
			</div>
		);
	},
});
