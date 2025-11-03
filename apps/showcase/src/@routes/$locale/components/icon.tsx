import { createFileRoute } from "@tanstack/react-router";
// Import some existing icons from pico/client
import {
	ArrowDownIcon,
	ArrowRightIcon,
	ArrowUpIcon,
	BackIcon,
	CheckIcon,
	CloseIcon,
	ConfirmIcon,
	DownloadIcon,
	EditIcon,
	ErrorIcon,
	ExportIcon,
	ExternalIcon,
	FavouriteIcon,
	FavouriteOffIcon,
	FileIcon,
	Icon,
	ImportIcon,
	JobIcon,
	ListIcon,
	LoaderIcon,
	LogoutIcon,
	SettingsIcon,
	SpinnerIcon,
	TagIcon,
	TrashIcon,
	UploadIcon,
	UserIcon,
} from "@use-pico/client/icon";
import { Tx } from "@use-pico/client/ui/tx";
import { tvc } from "@use-pico/cls";
import type { ReactNode } from "react";

export const Route = createFileRoute("/$locale/components/icon")({
	component() {
		return (
			<div
				className={tvc([
					"flex",
					"flex-col",
					"space-y-8",
				])}
			>
				{/* Basic Icons */}
				<Section title={<Tx label={"Basic Icons"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Simple Icons"} />}>
							<div className="flex items-center space-x-4">
								<Icon icon={CheckIcon} />
								<Icon icon={UserIcon} />
								<Icon icon={EditIcon} />
								<Icon icon={TrashIcon} />
								<Icon icon={CloseIcon} />
							</div>
						</Column>
						<Column label={<Tx label={"Action Icons"} />}>
							<div className="flex items-center space-x-4">
								<Icon icon={DownloadIcon} />
								<Icon icon={UploadIcon} />
								<Icon icon={SettingsIcon} />
								<Icon icon={LogoutIcon} />
								<Icon icon={FavouriteIcon} />
							</div>
						</Column>
					</div>
				</Section>

				{/* Different Sizes */}
				<Section title={<Tx label={"Different Sizes"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"All Available Sizes"} />}>
							<div className="flex items-center space-x-4">
								<div className="flex flex-col items-center space-y-1">
									<Icon
										icon={UserIcon}
										tweak={{
											variant: {
												size: "xs",
											},
										}}
									/>
									<span className="text-xs text-gray-500">
										xs
									</span>
								</div>
								<div className="flex flex-col items-center space-y-1">
									<Icon
										icon={UserIcon}
										tweak={{
											variant: {
												size: "sm",
											},
										}}
									/>
									<span className="text-xs text-gray-500">
										sm
									</span>
								</div>
								<div className="flex flex-col items-center space-y-1">
									<Icon
										icon={UserIcon}
										tweak={{
											variant: {
												size: "md",
											},
										}}
									/>
									<span className="text-xs text-gray-500">
										md
									</span>
								</div>
								<div className="flex flex-col items-center space-y-1">
									<Icon
										icon={UserIcon}
										tweak={{
											variant: {
												size: "lg",
											},
										}}
									/>
									<span className="text-xs text-gray-500">
										lg
									</span>
								</div>
								<div className="flex flex-col items-center space-y-1">
									<Icon
										icon={UserIcon}
										tweak={{
											variant: {
												size: "xl",
											},
										}}
									/>
									<span className="text-xs text-gray-500">
										xl
									</span>
								</div>
							</div>
						</Column>
						<Column label={<Tx label={"Size Comparison"} />}>
							<div className="flex items-center space-x-4">
								<Icon
									icon={CheckIcon}
									tweak={{
										variant: {
											size: "xs",
										},
									}}
								/>
								<Icon
									icon={CheckIcon}
									tweak={{
										variant: {
											size: "sm",
										},
									}}
								/>
								<Icon
									icon={CheckIcon}
									tweak={{
										variant: {
											size: "md",
										},
									}}
								/>
								<Icon
									icon={CheckIcon}
									tweak={{
										variant: {
											size: "lg",
										},
									}}
								/>
								<Icon
									icon={CheckIcon}
									tweak={{
										variant: {
											size: "xl",
										},
									}}
								/>
							</div>
						</Column>
					</div>
				</Section>

				{/* Navigation Icons */}
				<Section title={<Tx label={"Navigation Icons"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Arrow Icons"} />}>
							<div className="flex items-center space-x-4">
								<Icon icon={ArrowUpIcon} />
								<Icon icon={ArrowDownIcon} />
								<Icon icon={ArrowRightIcon} />
								<Icon icon={BackIcon} />
							</div>
						</Column>
						<Column label={<Tx label={"Navigation Actions"} />}>
							<div className="flex items-center space-x-4">
								<Icon icon={ListIcon} />
								<Icon icon={FileIcon} />
								<Icon icon={TagIcon} />
								<Icon icon={JobIcon} />
							</div>
						</Column>
					</div>
				</Section>

				{/* Action Icons */}
				<Section title={<Tx label={"Action Icons"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Data Actions"} />}>
							<div className="flex items-center space-x-4">
								<Icon icon={ImportIcon} />
								<Icon icon={ExportIcon} />
								<Icon icon={ExternalIcon} />
								<Icon icon={ConfirmIcon} />
							</div>
						</Column>
						<Column label={<Tx label={"State Icons"} />}>
							<div className="flex items-center space-x-4">
								<Icon icon={FavouriteIcon} />
								<Icon icon={FavouriteOffIcon} />
								<Icon icon={CheckIcon} />
								<Icon icon={CloseIcon} />
							</div>
						</Column>
					</div>
				</Section>

				{/* Loading and Status Icons */}
				<Section title={<Tx label={"Loading and Status Icons"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Loading States"} />}>
							<div className="flex items-center space-x-4">
								<Icon icon={SpinnerIcon} />
								<Icon icon={LoaderIcon} />
								<Icon icon={ErrorIcon} />
							</div>
						</Column>
						<Column label={<Tx label={"Animated Loading"} />}>
							<div className="flex items-center space-x-4">
								<Icon
									icon={SpinnerIcon}
									tweak={{
										slot: {
											root: {
												class: [
													"animate-spin",
													"text-blue-500",
												],
											},
										},
									}}
								/>
								<Icon
									icon={LoaderIcon}
									tweak={{
										slot: {
											root: {
												class: [
													"animate-pulse",
													"text-green-500",
												],
											},
										},
									}}
								/>
							</div>
						</Column>
					</div>
				</Section>

				{/* Disabled State */}
				<Section title={<Tx label={"Disabled State"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Disabled Icons"} />}>
							<div className="flex items-center space-x-4">
								<Icon
									icon={EditIcon}
									tweak={{
										variant: {
											disabled: true,
										},
									}}
								/>
								<Icon
									icon={TrashIcon}
									tweak={{
										variant: {
											disabled: true,
										},
									}}
								/>
								<Icon
									icon={DownloadIcon}
									tweak={{
										variant: {
											disabled: true,
										},
									}}
								/>
								<Icon
									icon={FavouriteIcon}
									tweak={{
										variant: {
											disabled: true,
										},
									}}
								/>
							</div>
						</Column>
						<Column label={<Tx label={"Normal vs Disabled"} />}>
							<div className="flex items-center space-x-4">
								<div className="flex flex-col items-center space-y-2">
									<Icon icon={CheckIcon} />
									<span className="text-xs text-gray-500">
										Normal
									</span>
								</div>
								<div className="flex flex-col items-center space-y-2">
									<Icon
										icon={CheckIcon}
										tweak={{
											variant: {
												disabled: true,
											},
										}}
									/>
									<span className="text-xs text-gray-500">
										Disabled
									</span>
								</div>
							</div>
						</Column>
					</div>
				</Section>

				{/* Custom Styling */}
				<Section title={<Tx label={"Custom Styling"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Colored Icons"} />}>
							<div className="flex items-center space-x-4">
								<Icon
									icon={CheckIcon}
									tweak={{
										slot: {
											root: {
												class: [
													"text-green-500",
												],
											},
										},
									}}
								/>
								<Icon
									icon={ErrorIcon}
									tweak={{
										slot: {
											root: {
												class: [
													"text-red-500",
												],
											},
										},
									}}
								/>
								<Icon
									icon={FavouriteIcon}
									tweak={{
										slot: {
											root: {
												class: [
													"text-pink-500",
												],
											},
										},
									}}
								/>
								<Icon
									icon={SettingsIcon}
									tweak={{
										slot: {
											root: {
												class: [
													"text-blue-500",
												],
											},
										},
									}}
								/>
							</div>
						</Column>
						<Column label={<Tx label={"Interactive Icons"} />}>
							<div className="flex items-center space-x-4">
								<Icon
									icon={FavouriteIcon}
									tweak={{
										slot: {
											root: {
												class: [
													"text-gray-400",
													"hover:text-pink-500",
													"cursor-pointer",
													"transition-colors",
												],
											},
										},
									}}
								/>
								<Icon
									icon={EditIcon}
									tweak={{
										slot: {
											root: {
												class: [
													"text-gray-400",
													"hover:text-blue-500",
													"cursor-pointer",
													"transition-colors",
												],
											},
										},
									}}
								/>
								<Icon
									icon={TrashIcon}
									tweak={{
										slot: {
											root: {
												class: [
													"text-gray-400",
													"hover:text-red-500",
													"cursor-pointer",
													"transition-colors",
												],
											},
										},
									}}
								/>
							</div>
						</Column>
					</div>
				</Section>

				{/* Tone Variants */}
				<Section title={<Tx label={"Tone Variants"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column
							label={<Tx label={"All Tones (Light Theme)"} />}
						>
							<div className="flex items-center space-x-4">
								<Icon
									icon={CheckIcon}
									tweak={{
										variant: {
											tone: "primary",
											theme: "light",
										},
									}}
								/>
								<Icon
									icon={CheckIcon}
									tweak={{
										variant: {
											tone: "secondary",
											theme: "light",
										},
									}}
								/>
								<Icon
									icon={CheckIcon}
									tweak={{
										variant: {
											tone: "danger",
											theme: "light",
										},
									}}
								/>
								<Icon
									icon={CheckIcon}
									tweak={{
										variant: {
											tone: "warning",
											theme: "light",
										},
									}}
								/>
								<Icon
									icon={CheckIcon}
									tweak={{
										variant: {
											tone: "neutral",
											theme: "light",
										},
									}}
								/>
								<Icon
									icon={CheckIcon}
									tweak={{
										variant: {
											tone: "subtle",
											theme: "light",
										},
									}}
								/>
								<Icon
									icon={CheckIcon}
									tweak={{
										variant: {
											tone: "link",
											theme: "light",
										},
									}}
								/>
							</div>
						</Column>
						<Column label={<Tx label={"Inherit Tone (Default)"} />}>
							<div className="flex items-center space-x-4">
								<Icon
									icon={CheckIcon}
									tone={"unset"}
									theme={"light"}
								/>
								<Icon
									icon={CheckIcon}
									tone={"unset"}
									theme={"dark"}
								/>
								<span className="text-xs text-gray-500">
									Inherits parent styling
								</span>
							</div>
						</Column>
					</div>
				</Section>

				{/* Dark Theme Showcase */}
				<Section title={<Tx label={"Dark Theme Showcase"} />}>
					<div className="grid grid-cols-1 gap-6">
						<Column label={<Tx label={"Dark Theme Tones"} />}>
							<div className="bg-black p-6 rounded-lg">
								<div className="flex items-center space-x-4">
									<Icon
										icon={CheckIcon}
										tweak={{
											variant: {
												tone: "primary",
												theme: "dark",
											},
										}}
									/>
									<Icon
										icon={CheckIcon}
										tweak={{
											variant: {
												tone: "secondary",
												theme: "dark",
											},
										}}
									/>
									<Icon
										icon={CheckIcon}
										tweak={{
											variant: {
												tone: "danger",
												theme: "dark",
											},
										}}
									/>
									<Icon
										icon={CheckIcon}
										tweak={{
											variant: {
												tone: "warning",
												theme: "dark",
											},
										}}
									/>
									<Icon
										icon={CheckIcon}
										tweak={{
											variant: {
												tone: "neutral",
												theme: "dark",
											},
										}}
									/>
									<Icon
										icon={CheckIcon}
										tweak={{
											variant: {
												tone: "subtle",
												theme: "dark",
											},
										}}
									/>
									<Icon
										icon={CheckIcon}
										tweak={{
											variant: {
												tone: "link",
												theme: "dark",
											},
										}}
									/>
								</div>
							</div>
						</Column>
					</div>
				</Section>

				{/* Icon Categories */}
				<Section title={<Tx label={"Icon Categories"} />}>
					<div className="grid grid-cols-1 gap-6">
						<Column label={<Tx label={"All Available Icons"} />}>
							<div className="grid grid-cols-8 gap-4">
								<IconWithLabel
									icon={CheckIcon}
									label="Check"
								/>
								<IconWithLabel
									icon={UserIcon}
									label="User"
								/>
								<IconWithLabel
									icon={EditIcon}
									label="Edit"
								/>
								<IconWithLabel
									icon={TrashIcon}
									label="Trash"
								/>
								<IconWithLabel
									icon={CloseIcon}
									label="Close"
								/>
								<IconWithLabel
									icon={DownloadIcon}
									label="Download"
								/>
								<IconWithLabel
									icon={UploadIcon}
									label="Upload"
								/>
								<IconWithLabel
									icon={SettingsIcon}
									label="Settings"
								/>
								<IconWithLabel
									icon={LogoutIcon}
									label="Logout"
								/>
								<IconWithLabel
									icon={FavouriteIcon}
									label="Favourite"
								/>
								<IconWithLabel
									icon={FavouriteOffIcon}
									label="Favourite Off"
								/>
								<IconWithLabel
									icon={ArrowUpIcon}
									label="Arrow Up"
								/>
								<IconWithLabel
									icon={ArrowDownIcon}
									label="Arrow Down"
								/>
								<IconWithLabel
									icon={ArrowRightIcon}
									label="Arrow Right"
								/>
								<IconWithLabel
									icon={BackIcon}
									label="Back"
								/>
								<IconWithLabel
									icon={FileIcon}
									label="File"
								/>
								<IconWithLabel
									icon={ListIcon}
									label="List"
								/>
								<IconWithLabel
									icon={TagIcon}
									label="Tag"
								/>
								<IconWithLabel
									icon={JobIcon}
									label="Job"
								/>
								<IconWithLabel
									icon={ConfirmIcon}
									label="Confirm"
								/>
								<IconWithLabel
									icon={ImportIcon}
									label="Import"
								/>
								<IconWithLabel
									icon={ExportIcon}
									label="Export"
								/>
								<IconWithLabel
									icon={ExternalIcon}
									label="External"
								/>
								<IconWithLabel
									icon={SpinnerIcon}
									label="Spinner"
								/>
								<IconWithLabel
									icon={ErrorIcon}
									label="Error"
								/>
								<IconWithLabel
									icon={LoaderIcon}
									label="Loader"
								/>
							</div>
						</Column>
					</div>
				</Section>
			</div>
		);
	},
});

function IconWithLabel({ icon, label }: { icon: string; label: string }) {
	return (
		<div className="flex flex-col items-center space-y-1 p-2 border border-gray-200 rounded hover:bg-gray-50">
			<Icon icon={icon} />
			<span className="text-xs text-gray-600 text-center">{label}</span>
		</div>
	);
}

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
