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
	"link",
] as const;

const sizes = [
	"xs",
	"sm",
	"md",
	"lg",
] as const;

const themes = [
	"light",
	"dark",
] as const;

export const Route = createFileRoute("/$locale/components/button")({
	component() {
		return (
			<div
				className={tvc([
					"flex",
					"flex-col",
					"space-y-8",
					"w-full",
				])}
			>
				{/* Sizes */}
				<Section title={<Tx label={"Sizes"} />}>
					<div className="grid grid-cols-2 gap-8">
						{themes.map((theme) => (
							<div
								key={`sizes-${theme}`}
								className="flex flex-col space-y-3"
							>
								<div className="text-sm font-medium text-slate-600">
									<Tx label={`${theme} theme`} />
								</div>
								<div className="flex items-center justify-center gap-2">
									{sizes.map((size) => (
										<Button
											key={`size-${size}-${theme}`}
											cls={({ what }) => ({
												variant: what.variant({
													size,
													theme,
												}),
											})}
										>
											<Tx label={size} />
										</Button>
									))}
								</div>
							</div>
						))}
					</div>
				</Section>

				{/* Tones - Light Theme */}
				<Section title={<Tx label={"Tones - Light Theme"} />}>
					<div className="grid grid-cols-4 gap-6">
						<Column label={<Tx label={"Default (Bordered)"} />}>
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
									<Tx label={tone} />
								</Button>
							))}
						</Column>

						<Column label={<Tx label={"Borderless"} />}>
							{tones.map((tone) => (
								<Button
									key={`tone-light-borderless-${tone}`}
									cls={({ what }) => ({
										variant: what.variant({
											tone,
											theme: "light",
											border: false,
										}),
									})}
								>
									<Tx label={`${tone} borderless`} />
								</Button>
							))}
						</Column>

						<Column label={<Tx label={"Disabled"} />}>
							{tones.map((tone) => (
								<Button
									key={`tone-light-disabled-${tone}`}
									disabled
									cls={({ what }) => ({
										variant: what.variant({
											tone,
											theme: "light",
										}),
									})}
								>
									<Tx label={`${tone} disabled`} />
								</Button>
							))}
						</Column>

						<Column label={<Tx label={"Borderless + Disabled"} />}>
							{tones.map((tone) => (
								<Button
									key={`tone-light-borderless-disabled-${tone}`}
									disabled
									cls={({ what }) => ({
										variant: what.variant({
											tone,
											theme: "light",
											border: false,
										}),
									})}
								>
									<Tx label={`${tone} borderless disabled`} />
								</Button>
							))}
						</Column>
					</div>
				</Section>

				{/* Tones - Dark Theme */}
				<Section title={<Tx label={"Tones - Dark Theme"} />}>
					<div className="grid grid-cols-4 gap-6">
						<Column label={<Tx label={"Default (Bordered)"} />}>
							{tones.map((tone) => (
								<Button
									key={`tone-dark-${tone}`}
									cls={({ what }) => ({
										variant: what.variant({
											tone,
											theme: "dark",
										}),
									})}
								>
									<Tx label={tone} />
								</Button>
							))}
						</Column>

						<Column label={<Tx label={"Borderless"} />}>
							{tones.map((tone) => (
								<Button
									key={`tone-dark-borderless-${tone}`}
									cls={({ what }) => ({
										variant: what.variant({
											tone,
											theme: "dark",
											border: false,
										}),
									})}
								>
									<Tx label={`${tone} borderless`} />
								</Button>
							))}
						</Column>

						<Column label={<Tx label={"Disabled"} />}>
							{tones.map((tone) => (
								<Button
									key={`tone-dark-disabled-${tone}`}
									disabled
									cls={({ what }) => ({
										variant: what.variant({
											tone,
											theme: "dark",
										}),
									})}
								>
									<Tx label={`${tone} disabled`} />
								</Button>
							))}
						</Column>

						<Column label={<Tx label={"Borderless + Disabled"} />}>
							{tones.map((tone) => (
								<Button
									key={`tone-dark-borderless-disabled-${tone}`}
									disabled
									cls={({ what }) => ({
										variant: what.variant({
											tone,
											theme: "dark",
											border: false,
										}),
									})}
								>
									<Tx label={`${tone} borderless disabled`} />
								</Button>
							))}
						</Column>
					</div>
				</Section>

				{/* Size Combinations */}
				<Section title={<Tx label={"Size Combinations"} />}>
					<div className="grid grid-cols-2 gap-8">
						{themes.map((theme) => (
							<div
								key={`size-combinations-${theme}`}
								className="flex flex-col space-y-3"
							>
								<div className="text-sm font-medium text-slate-600">
									<Tx label={`${theme} theme`} />
								</div>
								<div className="grid grid-cols-4 gap-2">
									{sizes.map((size) => (
										<Column
											key={`size-${size}`}
											label={size}
										>
											{tones.map((tone) => (
												<Button
													key={`size-combination-${size}-${tone}-${theme}`}
													cls={({ what }) => ({
														variant: what.variant({
															size,
															tone,
															theme,
														}),
													})}
												>
													<Tx label={tone} />
												</Button>
											))}
										</Column>
									))}
								</div>
							</div>
						))}
					</div>
				</Section>

				{/* Complete Combinations */}
				<Section title={<Tx label={"Complete Combinations"} />}>
					<div className="grid grid-cols-2 gap-8">
						{themes.map((theme) => (
							<div
								key={`complete-${theme}`}
								className="flex flex-col space-y-3"
							>
								<div className="text-sm font-medium text-slate-600">
									<Tx label={`${theme} theme`} />
								</div>
								<div className="flex flex-col space-y-2">
									{tones.map((tone) => (
										<Button
											key={`complete-${tone}-${theme}`}
											cls={({ what }) => ({
												variant: what.variant({
													size: "md",
													tone,
													theme,
												}),
											})}
										>
											<Tx label={`${tone} ${theme}`} />
										</Button>
									))}
								</div>
							</div>
						))}
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
