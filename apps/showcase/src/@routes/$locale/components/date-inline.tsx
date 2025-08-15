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
							<DateInline date={now} />
						</Column>
						<Column label={<Tx label={"Past Date"} />}>
							<DateInline date={yesterday} />
						</Column>
					</div>
				</Section>

				{/* Different Dates */}
				<Section title={<Tx label={"Different Dates"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Various Dates"} />}>
							<div className="space-y-2">
								<DateInline date={now} />
								<DateInline date={yesterday} />
								<DateInline date={lastWeek} />
								<DateInline date={lastMonth} />
								<DateInline date={futureDate} />
							</div>
						</Column>
						<Column label={<Tx label={"With Fallback"} />}>
							<div className="space-y-2">
								<DateInline
									date={undefined}
									fallback={now}
								/>
								<DateInline
									date={null}
									fallback={yesterday}
								/>
								<DateInline
									date={undefined}
									fallback={lastWeek}
								/>
							</div>
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
									<DateInline date={yesterday} />
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">
										Account created:
									</span>
									<DateInline date={lastMonth} />
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">
										Last update:
									</span>
									<DateInline date={now} />
								</div>
							</div>
						</Column>
						<Column label={<Tx label={"Document Timeline"} />}>
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<span className="text-sm">Created:</span>
									<DateInline date={lastWeek} />
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">Modified:</span>
									<DateInline date={yesterday} />
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">Due date:</span>
									<DateInline date={futureDate} />
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
