import { createFileRoute } from "@tanstack/react-router";
import { Action, TrashIcon, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/cls";
import type { ReactNode } from "react";

const tones = [
	"primary",
	"secondary",
	"danger",
	"warning",
	"neutral",
	"subtle",
	"link",
] as const;

const themes = [
	"light",
	"dark",
] as const;

const sizes = [
	"xs",
	"sm",
	"md",
	"lg",
	"xl",
] as const;

export const Route = createFileRoute("/$locale/components/action")({
	component() {
		return (
			<div
				className={tvc([
					"flex",
					"flex-col",
					"space-y-8",
				])}
			>
				{/* Sizes */}
				<Section title={<Tx label={"Sizes"} />}>
					<div className="flex flex-col space-y-6">
						{sizes.map((size) => (
							<SizeRow
								key={size}
								size={size}
							/>
						))}
					</div>
				</Section>

				{/* Tones by Row */}
				<Section title={<Tx label={"Tones by Row"} />}>
					<div className="flex flex-col space-y-6">
						{tones.map((tone) => (
							<ToneRow
								key={tone}
								tone={tone}
							/>
						))}
					</div>
				</Section>

				{/* Combined States by Tone */}
				<Section title={<Tx label={"Combined States by Tone"} />}>
					<div className="flex flex-col space-y-6">
						{tones.map((tone) => (
							<CombinedStatesRow
								key={tone}
								tone={tone}
							/>
						))}
					</div>
				</Section>
			</div>
		);
	},
});

function ToneRow({ tone }: { tone: (typeof tones)[number] }) {
	return (
		<div className="border border-slate-200 rounded-lg p-4">
			<div className="text-sm font-medium text-slate-700 mb-4 capitalize">
				{tone} Tone
			</div>
			<div className="grid grid-cols-2 gap-8">
				{themes.map((theme) => (
					<div
						key={`tone-${tone}-${theme}`}
						className="flex flex-col space-y-3"
					>
						<div className="text-sm font-medium text-slate-600">
							<Tx label={`${theme} theme`} />
						</div>
						<div className="grid grid-cols-4 gap-4">
							<Column label={<Tx label={"Default"} />}>
								<Action
									iconEnabled={TrashIcon}
									tone={tone}
									theme={theme}
								/>
							</Column>

							<Column label={<Tx label={"Borderless"} />}>
								<Action
									iconEnabled={TrashIcon}
									tone={tone}
									theme={theme}
									border={false}
								/>
							</Column>

							<Column label={<Tx label={"Disabled"} />}>
								<Action
									disabled
									iconDisabled={TrashIcon}
									tone={tone}
									theme={theme}
								/>
							</Column>

							<Column label={<Tx label={"Loading"} />}>
								<Action
									loading
									iconEnabled={TrashIcon}
									tone={tone}
									theme={theme}
								/>
							</Column>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function CombinedStatesRow({ tone }: { tone: (typeof tones)[number] }) {
	return (
		<div className="border border-slate-200 rounded-lg p-4">
			<div className="text-sm font-medium text-slate-700 mb-4 capitalize">
				{tone} Tone - Combined States
			</div>
			<div className="grid grid-cols-2 gap-8">
				{themes.map((theme) => (
					<div
						key={`combined-${tone}-${theme}`}
						className="flex flex-col space-y-3"
					>
						<div className="text-sm font-medium text-slate-600">
							<Tx label={`${theme} theme`} />
						</div>
						<div className="grid grid-cols-3 gap-4">
							<Column
								label={<Tx label={"Borderless + Disabled"} />}
							>
								<Action
									disabled
									iconDisabled={TrashIcon}
									tweak={{
										variant: {
											tone,
											theme,
											border: false,
										},
									}}
								/>
							</Column>

							<Column
								label={<Tx label={"Borderless + Loading"} />}
							>
								<Action
									loading
									iconEnabled={TrashIcon}
									tweak={{
										variant: {
											tone,
											theme,
											border: false,
										},
									}}
								/>
							</Column>

							<Column label={<Tx label={"Disabled + Loading"} />}>
								<Action
									disabled
									loading
									iconDisabled={TrashIcon}
									tweak={{
										variant: {
											tone,
											theme,
										},
									}}
								/>
							</Column>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function SizeRow({ size }: { size: (typeof sizes)[number] }) {
	return (
		<div className="border border-slate-200 rounded-lg p-4">
			<div className="text-sm font-medium text-slate-700 mb-4 capitalize">
				{size} Size
			</div>
			<div className="grid grid-cols-2 gap-8">
				{themes.map((theme) => (
					<div
						key={`size-${size}-${theme}`}
						className="flex flex-col space-y-3"
					>
						<div className="text-sm font-medium text-slate-600">
							<Tx label={`${theme} theme`} />
						</div>
						<div className="flex flex-col items-start space-y-2">
							<Action
								iconEnabled={TrashIcon}
								size={size}
								tweak={{
									variant: {
										tone: "primary",
										theme,
									},
								}}
							/>
						</div>
					</div>
				))}
			</div>
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
			<div className="flex flex-col items-start space-y-2">
				{children}
			</div>
		</div>
	);
}
