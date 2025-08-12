import { createFileRoute } from "@tanstack/react-router";
import { ColorsCls } from "@use-pico/client";
import { tvc, useCls } from "@use-pico/cls";
import type { FC } from "react";

export const Route = createFileRoute("/$locale/components/colors")({
	component() {
		return (
			<div
				className={tvc([
					"w-full",
					"flex",
					"flex-col",
					"gap-4",
				])}
			>
				<Section title="Dark">
					<Swatch
						tone="primary"
						label="Primary"
					/>
					<Swatch
						tone="secondary"
						label="Secondary"
					/>
					<Swatch
						tone="danger"
						label="Danger"
					/>
					<Swatch
						tone="neutral"
						label="Neutral"
					/>
					<Swatch
						tone="subtle"
						label="Subtle"
					/>
				</Section>

				<Section title="Light">
					<Swatch
						tone="primary"
						light
						label="Primary (light)"
					/>
					<Swatch
						tone="secondary"
						light
						label="Secondary (light)"
					/>
					<Swatch
						tone="danger"
						light
						label="Danger (light)"
					/>
					<Swatch
						tone="neutral"
						light
						label="Neutral (light)"
					/>
					<Swatch
						tone="subtle"
						light
						label="Subtle (light)"
					/>
				</Section>
			</div>
		);
	},
});

const Swatch: FC<{
	tone: "primary" | "secondary" | "danger" | "neutral" | "subtle";
	light?: boolean;
	label: string;
}> = ({ tone, light = false, label }) => {
	const slots = useCls(ColorsCls, ({ what }) => ({
		variant: what.variant({
			tone,
			light,
		}),
	}));
	return (
		<div
			className={tvc([
				slots.root(),
				"w-full",
				"px-8",
				"py-4",
				"text-xl",
				"font-bold",
			])}
		>
			{label}
		</div>
	);
};

const Section: FC<{
	title: string;
	children: React.ReactNode;
}> = ({ title, children }) => {
	return (
		<div
			className={tvc([
				"flex",
				"flex-col",
				"gap-2",
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
			<div
				className={tvc([
					"flex",
					"flex-col",
					"gap-2",
				])}
			>
				{children}
			</div>
		</div>
	);
};
