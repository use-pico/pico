import { createFileRoute } from "@tanstack/react-router";
import { Badge, PicoCls, Tx } from "@use-pico/client";
import { contract, TokenProvider, tvc } from "@use-pico/cls";
import type { ReactNode } from "react";

const OverriddenCls = contract(PicoCls.contract)
	.def()
	.defaults({
		tone: "primary",
		theme: "light",
	})
	.cls();

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
	"xl",
] as const;

const themes = [
	"light",
	"dark",
] as const;

export const Route = createFileRoute("/$locale/components/badge")({
	component() {
		return (
			<TokenProvider cls={PicoCls.use(OverriddenCls)}>
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
												size={size}
												theme={theme}
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
										tone={tone}
										theme="light"
									>
										<Tx label={tone} />
									</Badge>
								))}
							</Column>

							<Column label={<Tx label={"No Border"} />}>
								{tones.map((tone) => (
									<Badge
										key={`tone-light-no-border-${tone}`}
										tone={tone}
										theme="light"
										tweak={{
											variant: {
												border: false,
											},
										}}
									>
										<Tx label={`${tone} no border`} />
									</Badge>
								))}
							</Column>

							<Column label={<Tx label={"Disabled"} />}>
								{tones.map((tone) => (
									<Badge
										key={`tone-light-disabled-${tone}`}
										tone={tone}
										theme="light"
										disabled
									>
										<Tx label={`${tone} disabled`} />
									</Badge>
								))}
							</Column>

							<Column
								label={<Tx label={"No Border + Disabled"} />}
							>
								{tones.map((tone) => (
									<Badge
										key={`tone-light-no-border-disabled-${tone}`}
										tone={tone}
										theme="light"
										disabled
										tweak={{
											variant: {
												border: false,
											},
										}}
									>
										<Tx
											label={`${tone} no border disabled`}
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
										tone={tone}
										theme="dark"
									>
										<Tx label={tone} />
									</Badge>
								))}
							</Column>

							<Column label={<Tx label={"No Border"} />}>
								{tones.map((tone) => (
									<Badge
										key={`tone-dark-no-border-${tone}`}
										tone={tone}
										theme="dark"
										tweak={{
											variant: {
												border: false,
											},
										}}
									>
										<Tx label={`${tone} no border`} />
									</Badge>
								))}
							</Column>

							<Column label={<Tx label={"Disabled"} />}>
								{tones.map((tone) => (
									<Badge
										key={`tone-dark-disabled-${tone}`}
										tone={tone}
										theme="dark"
										disabled
									>
										<Tx label={`${tone} disabled`} />
									</Badge>
								))}
							</Column>

							<Column
								label={<Tx label={"No Border + Disabled"} />}
							>
								{tones.map((tone) => (
									<Badge
										key={`tone-dark-no-border-disabled-${tone}`}
										tone={tone}
										theme="dark"
										disabled
										tweak={{
											variant: {
												border: false,
											},
										}}
									>
										<Tx
											label={`${tone} no border disabled`}
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
														size={size}
														tone={tone}
														theme={theme}
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
												size="md"
												tone={tone}
												theme={theme}
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
			</TokenProvider>
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
