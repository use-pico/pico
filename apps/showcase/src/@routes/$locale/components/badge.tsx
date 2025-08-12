import { createFileRoute } from "@tanstack/react-router";
import { Badge, Tx } from "@use-pico/client";
import { ClsProvider, tvc } from "@use-pico/cls";
import { PicoCls } from "node_modules/@use-pico/client/src/cls/PicoCls";
import type { ReactNode } from "react";

const OverriddenCls = PicoCls.extend(
	{
		slot: [],
		tokens: {},
		variant: {},
	},
	() => ({
		token: {},
		rules: [],
		defaults: {},
	}),
);

export const Route = createFileRoute("/$locale/components/badge")({
	component() {
		const tones = [
			"primary",
			"secondary",
			"danger",
			"neutral",
			"subtle",
		] as const;
		const sizes = [
			"xs",
			"sm",
			"md",
			"lg",
		] as const;

		return (
			<ClsProvider value={PicoCls.use(OverriddenCls)}>
				<div
					className={tvc([
						"flex",
						"flex-col",
						"space-y-8",
					])}
				>
					<Section title={<Tx label={"Sizes"} />}>
						<div
							className={tvc([
								"flex",
								"items-center",
								"flex-wrap",
								"gap-3",
							])}
						>
							{sizes.map((size) => (
								<Badge
									key={`size-${size}`}
									cls={({ what }) => ({
										variant: what.variant({
											size,
										}),
									})}
								>
									<Tx label={`Size: ${size}`} />
								</Badge>
							))}
						</div>
					</Section>

					<Section title={<Tx label={"Tones"} />}>
						<Row label={<Tx label={"Default"} />}>
							{tones.map((tone) => (
								<div
									className={tvc([
										"flex",
										"items-center",
										"gap-2",
									])}
									key={`tone-${tone}`}
								>
									<Badge
										cls={({ what }) => ({
											variant: what.variant({
												tone,
											}),
										})}
									>
										<Tx label={`${tone}`} />
									</Badge>
									{/* color swatch moved to colors.tsx */}
								</div>
							))}
						</Row>

						<Row label={<Tx label={"Borderless"} />}>
							{tones.map((tone) => (
								<Badge
									key={`tone-borderless-${tone}`}
									cls={({ what }) => ({
										variant: what.variant({
											tone,
											borderless: true,
										}),
									})}
								>
									<Tx label={`${tone} borderless`} />
								</Badge>
							))}
						</Row>

						<Row label={<Tx label={"Light"} />}>
							{tones.map((tone) => (
								<Badge
									key={`tone-light-${tone}`}
									cls={({ what }) => ({
										variant: what.variant({
											tone,
											light: true,
										}),
									})}
								>
									<Tx label={`${tone} light`} />
								</Badge>
							))}
						</Row>

						<Row label={<Tx label={"Light + Borderless"} />}>
							{tones.map((tone) => (
								<Badge
									key={`tone-light-borderless-${tone}`}
									cls={({ what }) => ({
										variant: what.variant({
											tone,
											light: true,
											borderless: true,
										}),
									})}
								>
									<Tx label={`${tone} light borderless`} />
								</Badge>
							))}
						</Row>
					</Section>

					<Section title={<Tx label={"Disabled"} />}>
						<Row label={<Tx label={"Default"} />}>
							{tones.map((tone) => (
								<Badge
									key={`disabled-${tone}`}
									cls={({ what }) => ({
										variant: what.variant({
											tone,
											disabled: true,
										}),
									})}
								>
									<Tx label={`${tone} disabled`} />
								</Badge>
							))}
						</Row>
						<Row label={<Tx label={"Light"} />}>
							{tones.map((tone) => (
								<Badge
									key={`disabled-light-${tone}`}
									cls={({ what }) => ({
										variant: what.variant({
											tone,
											light: true,
											disabled: true,
										}),
									})}
								>
									<Tx label={`${tone} light disabled`} />
								</Badge>
							))}
						</Row>
					</Section>
				</div>
			</ClsProvider>
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
				])}
			>
				{title}
			</div>
			{children}
		</div>
	);
}

function Row({ label, children }: { label: ReactNode; children: ReactNode }) {
	return (
		<div
			className={tvc([
				"flex",
				"items-center",
				"gap-4",
				"flex-wrap",
			])}
		>
			<div
				className={tvc([
					"w-40",
					"text-slate-500",
				])}
			>
				{label}
			</div>
			<div
				className={tvc([
					"flex",
					"gap-3",
					"flex-wrap",
				])}
			>
				{children}
			</div>
		</div>
	);
}
