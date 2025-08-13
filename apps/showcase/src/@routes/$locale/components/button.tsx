import { createFileRoute } from "@tanstack/react-router";
import { Button, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/cls";
import type { ReactNode } from "react";

const tones = [
	"primary",
	"secondary",
	"danger",
	"warning",
	"neutral",
	"subtle",
] as const;

const sizes = [
	"xs",
	"sm",
	"md",
] as const;

export const Route = createFileRoute("/$locale/components/button")({
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
					<div
						className={tvc([
							"flex",
							"items-center",
							"flex-wrap",
							"gap-3",
						])}
					>
						{sizes.map((size) => (
							<Button
								key={`size-${size}`}
								cls={({ what }) => ({
									variant: what.variant({
										size,
									}),
								})}
							>
								<Tx label={`Size: ${size}`} />
							</Button>
						))}
					</div>
				</Section>

				{/* Tones */}
				<Section title={<Tx label={"Tones"} />}>
					<Row label={<Tx label={"Default"} />}>
						{tones.map((tone) => (
							<Button
								key={`tone-${tone}`}
								cls={({ what }) => ({
									variant: what.variant({
										tone,
									}),
								})}
							>
								<Tx label={`${tone}`} />
							</Button>
						))}
					</Row>

					<Row label={<Tx label={"Borderless"} />}>
						{tones.map((tone) => (
							<Button
								key={`tone-borderless-${tone}`}
								cls={({ what }) => ({
									variant: what.variant({
										tone,
										borderless: true,
									}),
								})}
							>
								<Tx label={`${tone} borderless`} />
							</Button>
						))}
					</Row>

					<Row label={<Tx label={"Light"} />}>
						{tones.map((tone) => (
							<Button
								key={`tone-light-${tone}`}
								cls={({ what }) => ({
									variant: what.variant({
										tone,
										theme: "light",
									}),
								})}
							>
								<Tx label={`${tone} light`} />
							</Button>
						))}
					</Row>

					<Row label={<Tx label={"Light + Borderless"} />}>
						{tones.map((tone) => (
							<Button
								key={`tone-light-borderless-${tone}`}
								cls={({ what }) => ({
									variant: what.variant({
										tone,
										theme: "light",
										borderless: true,
									}),
								})}
							>
								<Tx label={`${tone} light borderless`} />
							</Button>
						))}
					</Row>
				</Section>

				{/* Disabled */}
				<Section title={<Tx label={"Disabled"} />}>
					<Row label={<Tx label={"Default"} />}>
						{tones.map((tone) => (
							<Button
								key={`disabled-${tone}`}
								disabled
								cls={({ what }) => ({
									variant: what.variant({
										tone,
									}),
								})}
							>
								<Tx label={`${tone} disabled`} />
							</Button>
						))}
					</Row>
					<Row label={<Tx label={"Light"} />}>
						{tones.map((tone) => (
							<Button
								key={`disabled-light-${tone}`}
								disabled
								cls={({ what }) => ({
									variant: what.variant({
										tone,
										theme: "light",
									}),
								})}
							>
								<Tx label={`${tone} light disabled`} />
							</Button>
						))}
					</Row>
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
