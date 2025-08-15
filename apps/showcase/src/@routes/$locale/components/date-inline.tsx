import { createFileRoute } from "@tanstack/react-router";
import { DateInline, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/cls";
import type { ReactNode } from "react";

export const Route = createFileRoute("/$locale/components/date-inline")({
	component() {
		const now = new Date();
		const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
		const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
		const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
		const futureDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

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
						<Column label={<Tx label={"Current Date"} />}>
							<DateInline value={now} />
						</Column>
						<Column label={<Tx label={"Past Date"} />}>
							<DateInline value={yesterday} />
						</Column>
					</div>
				</Section>

				{/* Different Formats */}
				<Section title={<Tx label={"Different Formats"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Short Format"} />}>
							<div className="space-y-2">
								<DateInline
									value={now}
									format="short"
								/>
								<DateInline
									value={yesterday}
									format="short"
								/>
								<DateInline
									value={lastWeek}
									format="short"
								/>
							</div>
						</Column>
						<Column label={<Tx label={"Long Format"} />}>
							<div className="space-y-2">
								<DateInline
									value={now}
									format="long"
								/>
								<DateInline
									value={yesterday}
									format="long"
								/>
								<DateInline
									value={lastWeek}
									format="long"
								/>
							</div>
						</Column>
					</div>
				</Section>

				{/* Relative Dates */}
				<Section title={<Tx label={"Relative Dates"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Recent Dates"} />}>
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<span className="text-sm">Now:</span>
									<DateInline
										value={now}
										relative
									/>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-sm">Yesterday:</span>
									<DateInline
										value={yesterday}
										relative
									/>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-sm">Last week:</span>
									<DateInline
										value={lastWeek}
										relative
									/>
								</div>
							</div>
						</Column>
						<Column label={<Tx label={"Future Dates"} />}>
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<span className="text-sm">Next week:</span>
									<DateInline
										value={futureDate}
										relative
									/>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-sm">Last month:</span>
									<DateInline
										value={lastMonth}
										relative
									/>
								</div>
							</div>
						</Column>
					</div>
				</Section>

				{/* Different Sizes */}
				<Section title={<Tx label={"Different Sizes"} />}>
					<div className="grid grid-cols-3 gap-6">
						<Column label={<Tx label={"Small Size"} />}>
							<DateInline
								value={now}
								cls={({ what }) => ({
									variant: what.variant({
										size: "sm",
									}),
								})}
							/>
						</Column>
						<Column label={<Tx label={"Medium Size"} />}>
							<DateInline
								value={now}
								cls={({ what }) => ({
									variant: what.variant({
										size: "md",
									}),
								})}
							/>
						</Column>
						<Column label={<Tx label={"Large Size"} />}>
							<DateInline
								value={now}
								cls={({ what }) => ({
									variant: what.variant({
										size: "lg",
									}),
								})}
							/>
						</Column>
					</div>
				</Section>

				{/* Different Tones */}
				<Section title={<Tx label={"Different Tones"} />}>
					<div className="grid grid-cols-3 gap-6">
						<Column label={<Tx label={"Primary Tone"} />}>
							<DateInline
								value={now}
								cls={({ what }) => ({
									variant: what.variant({
										tone: "primary",
									}),
								})}
							/>
						</Column>
						<Column label={<Tx label={"Secondary Tone"} />}>
							<DateInline
								value={now}
								cls={({ what }) => ({
									variant: what.variant({
										tone: "secondary",
									}),
								})}
							/>
						</Column>
						<Column label={<Tx label={"Neutral Tone"} />}>
							<DateInline
								value={now}
								cls={({ what }) => ({
									variant: what.variant({
										tone: "neutral",
									}),
								})}
							/>
						</Column>
					</div>
				</Section>

				{/* Real-world Examples */}
				<Section title={<Tx label={"Real-world Examples"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"User Activity"} />}>
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<span className="text-sm">Last login:</span>
									<DateInline
										value={yesterday}
										relative
									/>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">
										Account created:
									</span>
									<DateInline
										value={lastMonth}
										format="long"
									/>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">
										Last update:
									</span>
									<DateInline
										value={now}
										relative
									/>
								</div>
							</div>
						</Column>
						<Column label={<Tx label={"Document Timeline"} />}>
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<span className="text-sm">Created:</span>
									<DateInline
										value={lastWeek}
										format="short"
									/>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">Modified:</span>
									<DateInline
										value={yesterday}
										relative
									/>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">Due date:</span>
									<DateInline
										value={futureDate}
										format="long"
									/>
								</div>
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
