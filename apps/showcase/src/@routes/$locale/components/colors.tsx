import { createFileRoute } from "@tanstack/react-router";
import { ColorsCls } from "@use-pico/client/cls";
import { tvc, useCls } from "@use-pico/cls";
import type { FC } from "react";

export const Route = createFileRoute("/$locale/components/colors")({
	component() {
		return (
			<div
				className={tvc([
					"flex",
					"flex-row",
					"gap-4",
				])}
			>
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
					<Swatch
						tone="link"
						theme="light"
						label="Link"
					/>
				</Section>

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
					<Swatch
						tone="link"
						theme="dark"
						label="Link"
					/>
				</Section>
			</div>
		);
	},
});

const Swatch: FC<{
	tone:
		| "primary"
		| "secondary"
		| "danger"
		| "warning"
		| "neutral"
		| "subtle"
		| "link";
	theme: "light" | "dark";
	label: string;
}> = ({ tone, theme, label }) => {
	const { slots } = useCls(ColorsCls, [
		{
			variant: {
				tone,
				theme,
			},
		},
	]);
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

export const Section: FC<{
	title: string;
	children: React.ReactNode;
}> = ({ title, children }) => {
	return (
		<div
			className={tvc([
				"flex-1",
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
