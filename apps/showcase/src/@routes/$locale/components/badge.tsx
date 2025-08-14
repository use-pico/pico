import { createFileRoute } from "@tanstack/react-router";
import { Badge, Tx } from "@use-pico/client";
import { ClsProvider, tvc } from "@use-pico/cls";
import { PicoCls } from "node_modules/@use-pico/client/src/cls/PicoCls";
import type { ReactNode } from "react";

const OverriddenCls = PicoCls.extend(
	{
		slot: [],
		tokens: [],
		variant: {},
	},
	() => ({
		token: {           
        },
		rules: [],
		defaults: {},
	}),
);  

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
	"lg",
] as const;

const themes = [
	"light",
	"dark",
] as const;

export const Route = createFileRoute("/$locale/components/badge")({
	component() {
		return (
			<ClsProvider value={PicoCls.use(OverriddenCls)}>
				<div
					className={tvc([
						"flex",
						"flex-col",
						"space-y-8",
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
									<div className="flex items-center justify-center gap-3">
										{sizes.map((size) => (
											<Badge
												key={`size-${size}-${theme}`}
												cls={({ what }) => ({
													variant: what.variant({
														size,
														theme,
													}),
												})}
											>
												<Tx label={size} />
											</Badge>
										))}
									</div>
								</div>
							))}
						</div>
					</Section>

					{/* Tones - Light Theme */}
					<Section title={<Tx label={"Tones - Light Theme"} />}>
						<div className="grid grid-cols-4 gap-6">
							<Column label={<Tx label={"Default"} />}>
								{tones.map((tone) => (
									<Badge
										key={`tone-light-${tone}`}
										cls={({ what }) => ({
											variant: what.variant({
												tone,
												theme: "light",
											}),
										})}
									>
										<Tx label={tone} />
									</Badge>
								))}
							</Column>

							<Column label={<Tx label={"Borderless"} />}>
								{tones.map((tone) => (
									<Badge
										key={`tone-light-borderless-${tone}`}
										cls={({ what }) => ({
											variant: what.variant({
												tone,
												theme: "light",
												borderless: true,
											}),
										})}
									>
										<Tx label={`${tone} borderless`} />
									</Badge>
								))}
							</Column>

							<Column label={<Tx label={"Disabled"} />}>
								{tones.map((tone) => (
									<Badge
										key={`tone-light-disabled-${tone}`}
										cls={({ what }) => ({
											variant: what.variant({
												tone,
												theme: "light",
												disabled: true,
											}),
										})}
									>
										<Tx label={`${tone} disabled`} />
									</Badge>
								))}
							</Column>

							<Column
								label={<Tx label={"Borderless + Disabled"} />}
							>
								{tones.map((tone) => (
									<Badge
										key={`tone-light-borderless-disabled-${tone}`}
										cls={({ what }) => ({
											variant: what.variant({
												tone,
												theme: "light",
												borderless: true,
												disabled: true,
											}),
										})}
									>
										<Tx
											label={`${tone} borderless disabled`}
										/>
									</Badge>
								))}
							</Column>
						</div>
					</Section>

					{/* Tones - Dark Theme */}
					<Section title={<Tx label={"Tones - Dark Theme"} />}>
						<div className="grid grid-cols-4 gap-6">
							<Column label={<Tx label={"Default"} />}>
								{tones.map((tone) => (
									<Badge
										key={`tone-dark-${tone}`}
										cls={({ what }) => ({
											variant: what.variant({
												tone,
												theme: "dark",
											}),
										})}
									>
										<Tx label={tone} />
									</Badge>
								))}
							</Column>

							<Column label={<Tx label={"Borderless"} />}>
								{tones.map((tone) => (
									<Badge
										key={`tone-dark-borderless-${tone}`}
										cls={({ what }) => ({
											variant: what.variant({
												tone,
												theme: "dark",
												borderless: true,
											}),
										})}
									>
										<Tx label={`${tone} borderless`} />
									</Badge>
								))}
							</Column>

							<Column label={<Tx label={"Disabled"} />}>
								{tones.map((tone) => (
									<Badge
										key={`tone-dark-disabled-${tone}`}
										cls={({ what }) => ({
											variant: what.variant({
												tone,
												theme: "dark",
												disabled: true,
											}),
										})}
									>
										<Tx label={`${tone} disabled`} />
									</Badge>
								))}
							</Column>

							<Column
								label={<Tx label={"Borderless + Disabled"} />}
							>
								{tones.map((tone) => (
									<Badge
										key={`tone-dark-borderless-disabled-${tone}`}
										cls={({ what }) => ({
											variant: what.variant({
												tone,
												theme: "dark",
												borderless: true,
												disabled: true,
											}),
										})}
									>
										<Tx
											label={`${tone} borderless disabled`}
										/>
									</Badge>
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
									<div className="grid grid-cols-4 gap-4">
										{sizes.map((size) => (
											<Column
												key={`size-${size}`}
												label={size}
											>
												{tones.map((tone) => (
													<Badge
														key={`size-combination-${size}-${tone}-${theme}`}
														cls={({ what }) => ({
															variant:
																what.variant({
																	size,
																	tone,
																	theme,
																}),
														})}
													>
														<Tx label={tone} />
													</Badge>
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
											<Badge
												key={`complete-${tone}-${theme}`}
												cls={({ what }) => ({
													variant: what.variant({
														size: "md",
														tone,
														theme,
														borderless: false,
													}),
												})}
											>
												<Tx
													label={`${tone} ${theme}`}
												/>
											</Badge>
										))}
									</div>
								</div>
							))}
						</div>
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
