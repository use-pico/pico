import { createFileRoute } from "@tanstack/react-router";
import { Select } from "@use-pico/client/ui/select";
import { Tx } from "@use-pico/client/ui/tx";
import { tvc } from "@use-pico/cls";
import type { ReactNode } from "react";

// Sample data for demonstrations
const sampleCountries = [
	{
		id: "us",
		name: "United States",
		code: "US",
		population: "331M",
	},
	{
		id: "ca",
		name: "Canada",
		code: "CA",
		population: "38M",
	},
	{
		id: "uk",
		name: "United Kingdom",
		code: "UK",
		population: "67M",
	},
	{
		id: "de",
		name: "Germany",
		code: "DE",
		population: "83M",
	},
	{
		id: "fr",
		name: "France",
		code: "FR",
		population: "67M",
	},
	{
		id: "jp",
		name: "Japan",
		code: "JP",
		population: "126M",
	},
	{
		id: "au",
		name: "Australia",
		code: "AU",
		population: "25M",
	},
	{
		id: "br",
		name: "Brazil",
		code: "BR",
		population: "213M",
	},
];

const sampleUsers = [
	{
		id: "1",
		name: "John Doe",
		email: "john@example.com",
		role: "Admin",
	},
	{
		id: "2",
		name: "Jane Smith",
		email: "jane@example.com",
		role: "User",
	},
	{
		id: "3",
		name: "Bob Johnson",
		email: "bob@example.com",
		role: "Editor",
	},
	{
		id: "4",
		name: "Alice Brown",
		email: "alice@example.com",
		role: "User",
	},
	{
		id: "5",
		name: "Charlie Wilson",
		email: "charlie@example.com",
		role: "Admin",
	},
];

const sampleCategories = [
	{
		id: "tech",
		name: "Technology",
		icon: "icon-[lucide--cpu]",
		count: 156,
	},
	{
		id: "design",
		name: "Design",
		icon: "icon-[lucide--palette]",
		count: 89,
	},
	{
		id: "marketing",
		name: "Marketing",
		icon: "icon-[lucide--megaphone]",
		count: 234,
	},
	{
		id: "finance",
		name: "Finance",
		icon: "icon-[lucide--dollar-sign]",
		count: 67,
	},
	{
		id: "hr",
		name: "Human Resources",
		icon: "icon-[lucide--users]",
		count: 45,
	},
];

const sampleStatuses = [
	{
		id: "active",
		name: "Active",
		color: "green",
	},
	{
		id: "inactive",
		name: "Inactive",
		color: "gray",
	},
	{
		id: "pending",
		name: "Pending",
		color: "yellow",
	},
	{
		id: "suspended",
		name: "Suspended",
		color: "red",
	},
];

export const Route = createFileRoute("/$locale/components/select")({
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
				{/* Basic Select */}
				<Section title={<Tx label={"Basic Select"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Default"} />}>
							<Select
								items={sampleCountries}
								render={({ entity }) => entity.name}
								textSelect="Select a country"
							/>
						</Column>
						<Column label={<Tx label={"With Icon"} />}>
							<Select
								items={sampleCountries}
								icon="icon-[lucide--globe]"
								render={({ entity }) => entity.name}
								textSelect="Select a country"
							/>
						</Column>
					</div>
				</Section>

				{/* Sizes */}
				<Section title={<Tx label={"Sizes"} />}>
					<div className="grid grid-cols-1 gap-4">
						<Column label={<Tx label={"Different Sizes"} />}>
							<div className="flex flex-col space-y-3">
								<Select
									items={sampleCountries}
									size="xs"
									render={({ entity }) => entity.name}
									textSelect="Extra Small"
								/>
								<Select
									items={sampleCountries}
									size="sm"
									render={({ entity }) => entity.name}
									textSelect="Small"
								/>
								<Select
									items={sampleCountries}
									size="md"
									render={({ entity }) => entity.name}
									textSelect="Medium"
								/>
								<Select
									items={sampleCountries}
									size="lg"
									render={({ entity }) => entity.name}
									textSelect="Large"
								/>
							</div>
						</Column>
					</div>
				</Section>

				{/* States */}
				<Section title={<Tx label={"States"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Disabled"} />}>
							<Select
								items={sampleCountries}
								disabled
								render={({ entity }) => entity.name}
								textSelect="Disabled select"
							/>
						</Column>
						<Column label={<Tx label={"With Clear Button"} />}>
							<Select
								items={sampleCountries}
								allowClear
								render={({ entity }) => entity.name}
								textSelect="Select with clear"
							/>
						</Column>
					</div>
				</Section>

				{/* Complex Rendering */}
				<Section title={<Tx label={"Complex Rendering"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"User with Role"} />}>
							<Select
								items={sampleUsers}
								icon="icon-[lucide--user]"
								render={({ entity }) => (
									<div className="flex flex-col">
										<span className="font-medium">
											{entity.name}
										</span>
										<span className="text-sm text-slate-500">
											{entity.role}
										</span>
									</div>
								)}
								textSelect="Select a user"
							/>
						</Column>
						<Column label={<Tx label={"Category with Count"} />}>
							<Select
								items={sampleCategories}
								render={({ entity }) => (
									<div className="flex items-center justify-between w-full">
										<div className="flex items-center gap-2">
											<span className="text-slate-400">
												{entity.icon}
											</span>
											<span>{entity.name}</span>
										</div>
										<span className="text-sm text-slate-500">
											({entity.count})
										</span>
									</div>
								)}
								textSelect="Select a category"
							/>
						</Column>
					</div>
				</Section>

				{/* Status Selection */}
				<Section title={<Tx label={"Status Selection"} />}>
					<div className="grid grid-cols-1 gap-4">
						<Column label={<Tx label={"Status with Colors"} />}>
							<Select
								items={sampleStatuses}
								icon="icon-[lucide--circle]"
								render={({ entity }) => (
									<div className="flex items-center gap-2">
										<div
											className={`w-2 h-2 rounded-full bg-${entity.color}-500`}
										/>
										<span>{entity.name}</span>
									</div>
								)}
								textSelect="Select status"
							/>
						</Column>
					</div>
				</Section>

				{/* Controlled Select */}
				<Section title={<Tx label={"Controlled Select"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"With Default Value"} />}>
							<Select
								items={sampleCountries}
								defaultValue="us"
								render={({ entity }) => entity.name}
								textSelect="Select a country"
							/>
						</Column>
						<Column label={<Tx label={"With Custom Text"} />}>
							<Select
								items={sampleCountries}
								render={({ entity }) =>
									`${entity.name} (${entity.code})`
								}
								textSelect="Choose your country"
							/>
						</Column>
					</div>
				</Section>

				{/* Real-world Examples */}
				<Section title={<Tx label={"Real-world Examples"} />}>
					<div className="grid grid-cols-1 gap-6">
						<Column label={<Tx label={"Language Selector"} />}>
							<Select
								items={[
									{
										id: "en",
										name: "English",
										flag: "🇺🇸",
									},
									{
										id: "es",
										name: "Español",
										flag: "🇪🇸",
									},
									{
										id: "fr",
										name: "Français",
										flag: "🇫🇷",
									},
									{
										id: "de",
										name: "Deutsch",
										flag: "🇩🇪",
									},
									{
										id: "ja",
										name: "日本語",
										flag: "🇯🇵",
									},
								]}
								icon="icon-[lucide--languages]"
								render={({ entity }) => (
									<div className="flex items-center gap-2">
										<span className="text-lg">
											{entity.flag}
										</span>
										<span>{entity.name}</span>
									</div>
								)}
								textSelect="Select language"
							/>
						</Column>

						<Column label={<Tx label={"Theme Selector"} />}>
							<Select
								items={[
									{
										id: "light",
										name: "Light",
										icon: "icon-[lucide--sun]",
									},
									{
										id: "dark",
										name: "Dark",
										icon: "icon-[lucide--moon]",
									},
									{
										id: "auto",
										name: "Auto",
										icon: "icon-[lucide--monitor]",
									},
								]}
								render={({ entity }) => (
									<div className="flex items-center gap-2">
										<span className="text-slate-400">
											{entity.icon}
										</span>
										<span>{entity.name}</span>
									</div>
								)}
								textSelect="Choose theme"
							/>
						</Column>

						<Column label={<Tx label={"File Type Filter"} />}>
							<Select
								items={[
									{
										id: "all",
										name: "All Files",
										icon: "icon-[lucide--file]",
										count: 1247,
									},
									{
										id: "doc",
										name: "Documents",
										icon: "icon-[lucide--file-text]",
										count: 456,
									},
									{
										id: "img",
										name: "Images",
										icon: "icon-[lucide--image]",
										count: 234,
									},
									{
										id: "vid",
										name: "Videos",
										icon: "icon-[lucide--video]",
										count: 89,
									},
									{
										id: "aud",
										name: "Audio",
										icon: "icon-[lucide--music]",
										count: 67,
									},
								]}
								render={({ entity }) => (
									<div className="flex items-center justify-between w-full">
										<div className="flex items-center gap-2">
											<span className="text-slate-400">
												{entity.icon}
											</span>
											<span>{entity.name}</span>
										</div>
										<span className="text-sm text-slate-500">
											({entity.count})
										</span>
									</div>
								)}
								textSelect="Filter by type"
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
