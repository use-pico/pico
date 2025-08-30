import { createFileRoute } from "@tanstack/react-router";
import {
	Action,
	ActionClick,
	ActionLink,
	ActionMenu,
	Alert,
	BoolInline,
	Button,
	DateInline,
	Icon,
	JustDropZone,
	LabelCount,
	LinkTo,
	LoadingOverlay,
	Menu,
	MenuGroup,
	MenuLink,
	PriceInline,
	Progress,
	Tab,
	TabList,
	TabPane,
	Tabs,
	Tags,
	Tx,
} from "@use-pico/client";
import { tvc } from "@use-pico/cls";
import { useState } from "react";

export const Route = createFileRoute("/$locale/components/misc")({
	component() {
		const [isLoading, setIsLoading] = useState(false);

		return (
			<div
				className={tvc([
					"flex",
					"flex-col",
					"space-y-8",
					"w-full",
				])}
			>
				{/* Tabs */}
				<Section title={<Tx label="Tabs" />}>
					<Tabs defaultTab="tab1">
						<TabList>
							<Tab tab="tab1">First Tab</Tab>
							<Tab tab="tab2">Second Tab</Tab>
							<Tab tab="tab3">Third Tab</Tab>
						</TabList>
						<TabPane tab="tab1">
							<div className="p-4 bg-slate-50 rounded">
								<Tx label="Content of first tab" />
							</div>
						</TabPane>
						<TabPane tab="tab2">
							<div className="p-4 bg-slate-50 rounded">
								<Tx label="Content of second tab" />
							</div>
						</TabPane>
						<TabPane tab="tab3">
							<div className="p-4 bg-slate-50 rounded">
								<Tx label="Content of third tab" />
							</div>
						</TabPane>
					</Tabs>
				</Section>

				{/* Tags */}
				<Section title={<Tx label="Tags" />}>
					<Tags
						tags={[
							{
								id: "1",
								label: "React",
								sort: 1,
							},
							{
								id: "2",
								label: "TypeScript",
								sort: 2,
							},
							{
								id: "3",
								label: "TailwindCSS",
								sort: 3,
							},
							{
								id: "4",
								label: "CLS",
								sort: 4,
							},
						]}
					/>
				</Section>

				{/* Loading Overlay */}
				<Section title={<Tx label="Loading Overlay" />}>
					<div className="relative h-32 bg-slate-100 rounded">
						<LoadingOverlay show={isLoading} />
						<div className="p-4">
							<Tx label="Content with loading overlay" />
						</div>
					</div>
					<Button
						onClick={() => setIsLoading(!isLoading)}
						className="mt-2"
					>
						<Tx
							label={isLoading ? "Hide Loading" : "Show Loading"}
						/>
					</Button>
				</Section>

				{/* Progress */}
				<Section title={<Tx label="Progress" />}>
					<div className="space-y-4">
						<Progress value={25} />
						<Progress value={50} />
						<Progress value={75} />
						<Progress value={100} />
					</div>
				</Section>

				{/* Action Menu */}
				<Section title={<Tx label="Action Menu" />}>
					<ActionMenu>
						<ActionClick
							onClick={() => console.log("Edit clicked")}
						>
							<Tx label="Edit" />
						</ActionClick>
						<ActionClick
							onClick={() => console.log("Delete clicked")}
						>
							<Tx label="Delete" />
						</ActionClick>
						<ActionLink
							to="/$locale/components/button"
							params={{
								locale: "en",
							}}
						>
							<Tx label="View Details" />
						</ActionLink>
					</ActionMenu>
				</Section>

				{/* Menu */}
				<Section title={<Tx label="Menu" />}>
					<Menu>
						<MenuGroup label="Menu Group">
							<MenuLink
								to="/$locale/components/button"
								params={{
									locale: "en",
								}}
							>
								<Tx label="Menu Item 1" />
							</MenuLink>
							<MenuLink
								to="/$locale/components/badge"
								params={{
									locale: "en",
								}}
							>
								<Tx label="Menu Item 2" />
							</MenuLink>
						</MenuGroup>
					</Menu>
				</Section>

				{/* Icon */}
				<Section title={<Tx label="Icon" />}>
					<div className="flex gap-4">
						<Icon icon="icon-[ph--heart]" />
						<Icon icon="icon-[ph--star]" />
						<Icon icon="icon-[ph--check]" />
						<Icon icon="icon-[ph--warning]" />
					</div>
				</Section>

				{/* Action */}
				<Section title={<Tx label="Action" />}>
					<div className="flex gap-4">
						<Action onClick={() => console.log("Primary action")} />
						<Action
							onClick={() => console.log("Secondary action")}
						/>
					</div>
				</Section>

				{/* Alert */}
				<Section title={<Tx label="Alert" />}>
					<div className="space-y-4">
						<Alert title="Info Alert">
							<Tx label="This is an info alert" />
						</Alert>
						<Alert title="Success Alert">
							<Tx label="This is a success alert" />
						</Alert>
						<Alert title="Warning Alert">
							<Tx label="This is a warning alert" />
						</Alert>
						<Alert title="Error Alert">
							<Tx label="This is an error alert" />
						</Alert>
					</div>
				</Section>

				{/* Bool Inline */}
				<Section title={<Tx label="Bool Inline" />}>
					<div className="space-y-2">
						<BoolInline value={true} />
						<BoolInline value={false} />
					</div>
				</Section>

				{/* Date Inline */}
				<Section title={<Tx label="Date Inline" />}>
					<DateInline date={new Date()} />
				</Section>

				{/* Just Drop Zone */}
				<Section title={<Tx label="Just Drop Zone" />}>
					<JustDropZone
						onDrop={(files) => console.log("Dropped files:", files)}
						accept={{
							"text/plain": [
								".txt",
							],
							"application/pdf": [
								".pdf",
							],
							"application/msword": [
								".doc",
							],
						}}
					>
						{() => (
							<div className="p-8 text-center border-2 border-dashed border-slate-300 rounded">
								<Tx label="Drop files here" />
							</div>
						)}
					</JustDropZone>
				</Section>

				{/* Label Count */}
				<Section title={<Tx label="Label Count" />}>
					<div className="space-y-2">
						<LabelCount
							label="Items"
							count={5}
						/>
						<LabelCount
							label="Users"
							count={12}
						/>
						<LabelCount
							label="Projects"
							count={0}
						/>
					</div>
				</Section>

				{/* Link To */}
				<Section title={<Tx label="Link To" />}>
					<LinkTo
						to="/$locale/components/button"
						params={{
							locale: "en",
						}}
					>
						<Tx label="Go to Button showcase" />
					</LinkTo>
				</Section>

				{/* Price Inline */}
				<Section title={<Tx label="Price Inline" />}>
					<div className="space-y-2">
						<PriceInline
							value={{
								price: 19.99,
								withVat: false,
							}}
						/>
						<PriceInline
							value={{
								price: 29.99,
								withVat: true,
							}}
						/>
						<PriceInline
							value={{
								price: 39.99,
								withVat: false,
							}}
						/>
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
	title: React.ReactNode;
	children: React.ReactNode;
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
