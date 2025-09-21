import { createFileRoute } from "@tanstack/react-router";
import { Button, PicoCls, Tx } from "@use-pico/client";
import { type Cls, tvc, VariantProvider } from "@use-pico/cls";
import { type ReactNode, useState } from "react";

const tones: Cls.VariantOf<PicoCls, "tone">[] = [
	"primary",
	"secondary",
	"danger",
	"warning",
	"neutral",
	"subtle",
	"link",
];

const sizes = [
	"xs",
	"sm",
	"md",
	"lg",
	"xl",
] as const;

const themes: Cls.VariantOf<PicoCls, "theme">[] = [
	"light",
	"dark",
];

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
											size={size}
											tone={"primary"}
											theme={theme}
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
									tone={tone}
									theme="light"
								>
									<Tx label={tone} />
								</Button>
							))}
						</Column>

						<Column label={<Tx label={"Borderless"} />}>
							{tones.map((tone) => (
								<Button
									key={`tone-light-borderless-${tone}`}
									tone={tone}
									theme="light"
									tweak={{
										variant: {
											border: false,
										},
									}}
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
									tone={tone}
									theme="light"
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
									tone={tone}
									theme="light"
									tweak={{
										variant: {
											border: false,
										},
									}}
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
									tone={tone}
									theme="dark"
								>
									<Tx label={tone} />
								</Button>
							))}
						</Column>

						<Column label={<Tx label={"Borderless"} />}>
							{tones.map((tone) => (
								<Button
									key={`tone-dark-borderless-${tone}`}
									tone={tone}
									theme="dark"
									tweak={{
										variant: {
											border: false,
										},
									}}
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
									tone={tone}
									theme="dark"
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
									tone={tone}
									theme="dark"
									tweak={{
										variant: {
											border: false,
										},
									}}
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
													size={size}
													tone={tone}
													theme={theme}
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
											size="md"
											tone={tone}
											theme={theme}
										>
											<Tx label={`${tone} ${theme}`} />
										</Button>
									))}
								</div>
							</div>
						))}
					</div>
				</Section>

				{/* ToneContext Examples */}
				<Section title={<Tx label={"ToneContext Examples"} />}>
					<div className="flex flex-col space-y-8">
						{/* Context Provided Tone/Theme */}
						<div className="flex flex-col space-y-4">
							<div className="text-sm font-medium text-slate-600">
								<Tx
									label={
										"Using ToneProvider - Buttons inherit context values"
									}
								/>
							</div>
							<div className="grid grid-cols-2 gap-8">
								{/* Danger + Dark Context */}
								<VariantProvider
									cls={PicoCls}
									variant={{
										tone: "danger",
										theme: "dark",
									}}
								>
									<div className="p-4 bg-slate-100 rounded-lg">
										<div className="text-xs text-slate-600 mb-3">
											<Tx
												label={
													"ToneProvider: danger + dark"
												}
											/>
										</div>
										<div className="flex flex-col space-y-2">
											<Button>
												<Tx
													label={
														"Default (inherits danger+dark)"
													}
												/>
											</Button>
											<Button tone="primary">
												<Tx
													label={
														"Override tone to primary"
													}
												/>
											</Button>
											<Button theme="light">
												<Tx
													label={
														"Override theme to light"
													}
												/>
											</Button>
											<Button
												tone="secondary"
												theme="light"
											>
												<Tx
													label={
														"Override both to secondary+light"
													}
												/>
											</Button>
										</div>
									</div>
								</VariantProvider>

								{/* Secondary + Light Context */}
								<VariantProvider
									cls={PicoCls}
									variant={{
										tone: "secondary",
										theme: "light",
									}}
								>
									<div className="p-4 bg-slate-100 rounded-lg">
										<div className="text-xs text-slate-600 mb-3">
											<Tx
												label={
													"ToneProvider: secondary + light"
												}
											/>
										</div>
										<div className="flex flex-col space-y-2">
											<Button>
												<Tx
													label={
														"Default (inherits secondary+light)"
													}
												/>
											</Button>
											<Button tone="warning">
												<Tx
													label={
														"Override tone to warning"
													}
												/>
											</Button>
											<Button theme="dark">
												<Tx
													label={
														"Override theme to dark"
													}
												/>
											</Button>
											<Button
												tone="danger"
												theme="dark"
											>
												<Tx
													label={
														"Override both to danger+dark"
													}
												/>
											</Button>
										</div>
									</div>
								</VariantProvider>
							</div>
						</div>

						{/* Dynamic Context Changes */}
						<div className="flex flex-col space-y-4">
							<div className="text-sm font-medium text-slate-600">
								<Tx
									label={
										"Dynamic Context with Interactive Controls"
									}
								/>
							</div>
							<ToneContextDemo />
						</div>

						{/* Nested Context */}
						<div className="flex flex-col space-y-4">
							<div className="text-sm font-medium text-slate-600">
								<Tx
									label={
										"Nested ToneContext - Inner context overrides outer"
									}
								/>
							</div>
							<VariantProvider
								cls={PicoCls}
								variant={{
									tone: "neutral",
									theme: "light",
								}}
							>
								<div className="p-4 bg-slate-100 rounded-lg">
									<div className="text-xs text-slate-600 mb-3">
										<Tx
											label={
												"Outer Context: neutral + light"
											}
										/>
									</div>
									<div className="flex flex-col space-y-3">
										<Button>
											<Tx
												label={"Outer context button"}
											/>
										</Button>

										<VariantProvider
											cls={PicoCls}
											variant={{
												tone: "warning",
												theme: "dark",
											}}
										>
											<div className="p-3 bg-slate-200 rounded border-2 border-dashed border-slate-400">
												<div className="text-xs text-slate-600 mb-2">
													<Tx
														label={
															"Inner Context: warning + dark"
														}
													/>
												</div>
												<div className="flex flex-col space-y-2">
													<Button>
														<Tx
															label={
																"Inner context button"
															}
														/>
													</Button>
													<Button tone="link">
														<Tx
															label={
																"Inner context with tone override"
															}
														/>
													</Button>
												</div>
											</div>
										</VariantProvider>

										<Button>
											<Tx
												label={"Back to outer context"}
											/>
										</Button>
									</div>
								</div>
							</VariantProvider>
						</div>
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

function ToneContextDemo() {
	const [contextTone, setContextTone] =
		useState<(typeof tones)[number]>("primary");
	const [contextTheme, setContextTheme] =
		useState<(typeof themes)[number]>("light");

	return (
		<div className="p-4 bg-slate-100 rounded-lg">
			<div className="flex flex-col space-y-4">
				{/* Controls */}
				<div className="flex flex-wrap gap-4">
					<div className="flex flex-col space-y-2">
						<div className="text-xs font-medium text-slate-600">
							<Tx label={"Context Tone"} />
						</div>
						<div className="flex flex-wrap gap-1">
							{tones.map((tone) => (
								<button
									key={tone}
									type="button"
									onClick={() => setContextTone(tone)}
									className={tvc([
										"px-2 py-1 text-xs rounded border",
										contextTone === tone
											? "bg-blue-100 border-blue-300 text-blue-800"
											: "bg-white border-gray-300 text-gray-700 hover:bg-gray-50",
									])}
								>
									{tone}
								</button>
							))}
						</div>
					</div>

					<div className="flex flex-col space-y-2">
						<div className="text-xs font-medium text-slate-600">
							<Tx label={"Context Theme"} />
						</div>
						<div className="flex gap-1">
							{themes.map((theme) => (
								<button
									key={theme}
									type="button"
									onClick={() => setContextTheme(theme)}
									className={tvc([
										"px-2 py-1 text-xs rounded border",
										contextTheme === theme
											? "bg-blue-100 border-blue-300 text-blue-800"
											: "bg-white border-gray-300 text-gray-700 hover:bg-gray-50",
									])}
								>
									{theme}
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Current Context Display */}
				<div className="text-xs text-slate-600">
					<Tx
						label={`Active ToneContext: ${contextTone} + ${contextTheme}`}
					/>
				</div>

				{/* Example Buttons */}
				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col space-y-2">
						<div className="text-xs font-medium text-slate-600">
							<Tx label={"Buttons using context"} />
						</div>
						<Button>
							<Tx label={"Default (inherits context)"} />
						</Button>
						<Button disabled>
							<Tx label={"Disabled (inherits context)"} />
						</Button>
						<Button size="sm">
							<Tx label={"Small size (inherits context)"} />
						</Button>
					</div>

					<div className="flex flex-col space-y-2">
						<div className="text-xs font-medium text-slate-600">
							<Tx label={"Buttons overriding context"} />
						</div>
						<Button tone="danger">
							<Tx label={"Override tone to danger"} />
						</Button>
						<Button
							theme={contextTheme === "light" ? "dark" : "light"}
						>
							<Tx
								label={`Override theme to ${contextTheme === "light" ? "dark" : "light"}`}
							/>
						</Button>
						<Button
							tone="neutral"
							theme="light"
						>
							<Tx label={"Override both to neutral+light"} />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
