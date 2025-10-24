import { createFileRoute } from "@tanstack/react-router";
import { Fulltext, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/cls";
import type { ReactNode } from "react";
import { useState } from "react";

export const Route = createFileRoute("/$locale/components/fulltext")({
	component() {
		const [debounceValue, setDebounceValue] = useState<Fulltext.Value>("");
		const [submitValue, setSubmitValue] = useState<Fulltext.Value>("");
		const [clearableValue, setClearableValue] =
			useState<Fulltext.Value>("Some search text");

		return (
			<div
				className={tvc([
					"flex",
					"flex-col",
					"space-y-8",
					"w-full",
				])}
			>
				{/* Basic Usage with Debounce */}
				<Section title={<Tx label={"Basic Usage (Debounced)"} />}>
					<div className="flex flex-col space-y-4">
						<Column
							label={<Tx label={"Default Debounced Search"} />}
						>
							<div className="max-w-md">
								<Fulltext
									state={{
										value: debounceValue,
										set: setDebounceValue,
									}}
									textPlaceholder="Search with debounce..."
								/>
								<div className="mt-2 text-xs text-slate-500">
									Current value: {debounceValue || "(empty)"}
								</div>
							</div>
						</Column>
					</div>
				</Section>

				{/* With Submit Button */}
				<Section title={<Tx label={"With Submit Button"} />}>
					<div className="flex flex-col space-y-4">
						<Column label={<Tx label={"Submit Button Mode"} />}>
							<div className="max-w-md">
								<Fulltext
									state={{
										value: submitValue,
										set: setSubmitValue,
									}}
									textPlaceholder="Type and click submit or press Enter..."
									withSubmit
								/>
								<div className="mt-2 text-xs text-slate-500">
									Submitted value: {submitValue || "(empty)"}
								</div>
							</div>
						</Column>
					</div>
				</Section>

				{/* Clearable State */}
				<Section title={<Tx label={"Clearable State"} />}>
					<div className="flex flex-col space-y-4">
						<Column
							label={
								<Tx
									label={
										"Search with Value (shows clear button)"
									}
								/>
							}
						>
							<div className="max-w-md">
								<Fulltext
									state={{
										value: clearableValue,
										set: setClearableValue,
									}}
									textPlaceholder="Search..."
								/>
								<div className="mt-2 text-xs text-slate-500">
									Current value: {clearableValue || "(empty)"}
								</div>
							</div>
						</Column>
					</div>
				</Section>

				{/* Comparison */}
				<Section title={<Tx label={"Side-by-Side Comparison"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Debounced Mode"} />}>
							<Fulltext
								state={{
									value: debounceValue,
									set: setDebounceValue,
								}}
								textPlaceholder="Debounced search..."
							/>
						</Column>
						<Column label={<Tx label={"Submit Button Mode"} />}>
							<Fulltext
								state={{
									value: submitValue,
									set: setSubmitValue,
								}}
								textPlaceholder="Submit button search..."
								withSubmit
							/>
						</Column>
					</div>
				</Section>

				{/* Different Widths */}
				<Section title={<Tx label={"Different Widths"} />}>
					<div className="flex flex-col space-y-6">
						<Column label={<Tx label={"Full Width (default)"} />}>
							<Fulltext
								state={{
									value: debounceValue,
									set: setDebounceValue,
								}}
								textPlaceholder="Full width search..."
							/>
						</Column>
						<Column label={<Tx label={"Fixed Width (max-w-sm)"} />}>
							<div className="max-w-sm">
								<Fulltext
									state={{
										value: debounceValue,
										set: setDebounceValue,
									}}
									textPlaceholder="Small width search..."
								/>
							</div>
						</Column>
						<Column
							label={
								<Tx
									label={"Fixed Width (max-w-md) with Submit"}
								/>
							}
						>
							<div className="max-w-md">
								<Fulltext
									state={{
										value: submitValue,
										set: setSubmitValue,
									}}
									textPlaceholder="Medium width search..."
									withSubmit
								/>
							</div>
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

export function Column({
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
