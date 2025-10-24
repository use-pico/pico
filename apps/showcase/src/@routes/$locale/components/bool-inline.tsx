import { createFileRoute } from "@tanstack/react-router";
import { BoolInline, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/cls";
import type { ReactNode } from "react";

export const Route = createFileRoute("/$locale/components/bool-inline")({
	component() {
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
						<Column label={<Tx label={"True Value"} />}>
							<BoolInline value={true} />
						</Column>
						<Column label={<Tx label={"False Value"} />}>
							<BoolInline value={false} />
						</Column>
					</div>
				</Section>

				{/* Custom Icons */}
				<Section title={<Tx label={"Custom Icons"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column
							label={<Tx label={"Custom Check/Uncheck Icons"} />}
						>
							<div className="space-y-2">
								<BoolInline
									value={true}
									checkIcon="icon-[ph--check-circle]"
									unCheckIcon="icon-[ph--x-circle]"
								/>
								<BoolInline
									value={false}
									checkIcon="icon-[ph--check-circle]"
									unCheckIcon="icon-[ph--x-circle]"
								/>
							</div>
						</Column>
						<Column label={<Tx label={"Star Icons"} />}>
							<div className="space-y-2">
								<BoolInline
									value={true}
									checkIcon="icon-[ph--star-fill]"
									unCheckIcon="icon-[ph--star]"
								/>
								<BoolInline
									value={false}
									checkIcon="icon-[ph--star-fill]"
									unCheckIcon="icon-[ph--star]"
								/>
							</div>
						</Column>
					</div>
				</Section>

				{/* Different Sizes */}
				<Section title={<Tx label={"Different Sizes"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Small Size"} />}>
							<div className="space-y-2">
								<BoolInline
									value={true}
									tweak={{
										variant: {
											size: "sm",
										},
									}}
								/>
								<BoolInline
									value={false}
									tweak={{
										variant: {
											size: "sm",
										},
									}}
								/>
							</div>
						</Column>
						<Column label={<Tx label={"Large Size"} />}>
							<div className="space-y-2">
								<BoolInline
									value={true}
									tweak={{
										variant: {
											size: "lg",
										},
									}}
								/>
								<BoolInline
									value={false}
									tweak={{
										variant: {
											size: "lg",
										},
									}}
								/>
							</div>
						</Column>
					</div>
				</Section>

				{/* Different Sizes */}
				<Section title={<Tx label={"Different Sizes"} />}>
					<div className="grid grid-cols-3 gap-6">
						<Column label={<Tx label={"Small Size"} />}>
							<div className="space-y-2">
								<BoolInline
									value={true}
									tweak={{
										variant: {
											size: "sm",
										},
									}}
								/>
								<BoolInline
									value={false}
									tweak={{
										variant: {
											size: "sm",
										},
									}}
								/>
							</div>
						</Column>
						<Column label={<Tx label={"Medium Size"} />}>
							<div className="space-y-2">
								<BoolInline
									value={true}
									tweak={{
										variant: {
											size: "md",
										},
									}}
								/>
								<BoolInline
									value={false}
									tweak={{
										variant: {
											size: "md",
										},
									}}
								/>
							</div>
						</Column>
						<Column label={<Tx label={"Large Size"} />}>
							<div className="space-y-2">
								<BoolInline
									value={true}
									tweak={{
										variant: {
											size: "lg",
										},
									}}
								/>
								<BoolInline
									value={false}
									tweak={{
										variant: {
											size: "lg",
										},
									}}
								/>
							</div>
						</Column>
					</div>
				</Section>

				{/* Real-world Examples */}
				<Section title={<Tx label={"Real-world Examples"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"User Status"} />}>
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<span className="text-sm">
										User Active:
									</span>
									<BoolInline value={true} />
								</div>
								<div className="flex items-center gap-2">
									<span className="text-sm">
										Email Verified:
									</span>
									<BoolInline value={false} />
								</div>
								<div className="flex items-center gap-2">
									<span className="text-sm">
										Premium Account:
									</span>
									<BoolInline value={true} />
								</div>
							</div>
						</Column>
						<Column label={<Tx label={"System Status"} />}>
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<span className="text-sm">Database:</span>
									<BoolInline value={true} />
								</div>
								<div className="flex items-center gap-2">
									<span className="text-sm">Cache:</span>
									<BoolInline value={true} />
								</div>
								<div className="flex items-center gap-2">
									<span className="text-sm">
										Maintenance Mode:
									</span>
									<BoolInline value={false} />
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
