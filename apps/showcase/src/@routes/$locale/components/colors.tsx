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
				<Section title="Dark Theme">
					<Swatch
						tone="primary"
						theme="dark"
						label="Primary"
					/>
					<Swatch
						tone="secondary"
						theme="dark"
						label="Secondary"
					/>
					<Swatch
						tone="danger"
						theme="dark"
						label="Danger"
					/>
					<Swatch
						tone="warning"
						theme="dark"
						label="Warning"
					/>
					<Swatch
						tone="neutral"
						theme="dark"
						label="Neutral"
					/>
					<Swatch
						tone="subtle"
						theme="dark"
						label="Subtle"
					/>
				</Section>

				<Section title="Light Theme">
					<Swatch
						tone="primary"
						theme="light"
						label="Primary"
					/>
					<Swatch
						tone="secondary"
						theme="light"
						label="Secondary"
					/>
					<Swatch
						tone="danger"
						theme="light"
						label="Danger"
					/>
					<Swatch
						tone="warning"
						theme="light"
						label="Warning"
					/>
					<Swatch
						tone="neutral"
						theme="light"
						label="Neutral"
					/>
					<Swatch
						tone="subtle"
						theme="light"
						label="Subtle"
					/>
				</Section>
			</div>
		);
	},
});

const Swatch: FC<{
	tone: "primary" | "secondary" | "danger" | "warning" | "neutral" | "subtle";
	theme: "light" | "dark";
	label: string;
}> = ({ tone, theme, label }) => {
	const slots = useCls(ColorsCls, ({ what }) => ({
		variant: what.variant({
			tone,
			theme,
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
