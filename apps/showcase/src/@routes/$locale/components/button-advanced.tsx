import { createFileRoute } from "@tanstack/react-router";
import { PicoCls } from "@use-pico/client/cls";
import { Button } from "@use-pico/client/ui/button";
import { Tx } from "@use-pico/client/ui/tx";
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

const themes: Cls.VariantOf<PicoCls, "theme">[] = [
	"light",
	"dark",
];

export const Route = createFileRoute("/$locale/components/button-advanced")({
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
				{/* VariantProvider Examples */}
				<Section
					title={
						<Tx
							theme="light"
							label={"VariantProvider Examples"}
						/>
					}
				>
					<div className="flex flex-col space-y-8">
						{/* Context Provided Tone/Theme */}
						<div className="flex flex-col space-y-4">
							<div className="text-sm font-medium text-slate-600">
								<Tx
									theme="light"
									label={
										"Using VariantProvider - Buttons inherit context values"
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
												theme="light"
												label={
													"VariantProvider: danger + dark"
												}
											/>
										</div>
										<div className="flex flex-col space-y-2">
											<Button label="Default (inherits danger+dark)" />
											<Button
												tone="primary"
												label="Override tone to primary"
											/>
											<Button
												theme="light"
												label="Override theme to light"
											/>
											<Button
												tone="secondary"
												theme="light"
												label="Override both to secondary+light"
											/>
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
												theme="light"
												label={
													"VariantProvider: secondary + light"
												}
											/>
										</div>
										<div className="flex flex-col space-y-2">
											<Button label="Default (inherits secondary+light)" />
											<Button
												tone="warning"
												label="Override tone to warning"
											/>
											<Button
												theme="dark"
												label="Override theme to dark"
											/>
											<Button
												tone="danger"
												theme="dark"
												label="Override both to danger+dark"
											/>
										</div>
									</div>
								</VariantProvider>
							</div>
						</div>

						{/* Dynamic Context Changes */}
						<div className="flex flex-col space-y-4">
							<div className="text-sm font-medium text-slate-600">
								<Tx
									theme="light"
									label={
										"Dynamic Context with Interactive Controls"
									}
								/>
							</div>
							<VariantProviderDemo />
						</div>

						{/* Nested Context */}
						<div className="flex flex-col space-y-4">
							<div className="text-sm font-medium text-slate-600">
								<Tx
									theme="light"
									label={
										"Nested VariantProvider - Inner context overrides outer"
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
											theme="light"
											label={
												"Outer Context: neutral + light"
											}
										/>
									</div>
									<div className="flex flex-col space-y-3">
										<Button label="Outer context button" />

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
														theme="light"
														label={
															"Inner Context: warning + dark"
														}
													/>
												</div>
												<div className="flex flex-col space-y-2">
													<Button label="Inner context button" />
													<Button
														tone="link"
														label="Inner context with tone override"
													/>
												</div>
											</div>
										</VariantProvider>

										<Button label="Back to outer context" />
									</div>
								</div>
							</VariantProvider>
						</div>
					</div>
				</Section>

				{/* Tweak Examples */}
				<Section
					title={
						<Tx
							theme="light"
							label={"Tweak Examples"}
						/>
					}
				>
					<div className="flex flex-col space-y-6">
						{/* Borderless Examples */}
						<div className="flex flex-col space-y-4">
							<div className="text-sm font-medium text-slate-600">
								<Tx
									theme="light"
									label={"Borderless Variants"}
								/>
							</div>
							<div className="grid grid-cols-2 gap-8">
								{themes.map((theme) => (
									<div
										key={`borderless-${theme}`}
										className="flex flex-col space-y-3"
									>
										<div className="text-sm font-medium text-slate-600">
											<Tx
												theme="light"
												label={`${theme} theme`}
											/>
										</div>
										<div className="flex flex-col space-y-2">
											{tones.map((tone) => (
												<Button
													key={`borderless-${tone}-${theme}`}
													tone={tone}
													theme={theme}
													label={`${tone} borderless`}
													tweak={{
														variant: {
															border: false,
														},
													}}
												/>
											))}
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Custom Tweak Examples */}
						<div className="flex flex-col space-y-4">
							<div className="text-sm font-medium text-slate-600">
								<Tx
									theme="light"
									label={"Custom Tweak Combinations"}
								/>
							</div>
							<div className="grid grid-cols-2 gap-8">
								{themes.map((theme) => (
									<div
										key={`custom-${theme}`}
										className="flex flex-col space-y-3"
									>
										<div className="text-sm font-medium text-slate-600">
											<Tx
												theme="light"
												label={`${theme} theme`}
											/>
										</div>
										<div className="flex flex-col space-y-2">
											<Button
												tone="primary"
												theme={theme}
												label="Primary borderless"
												tweak={{
													variant: {
														border: false,
													},
												}}
											/>
											<Button
												tone="danger"
												theme={theme}
												label="Danger borderless disabled"
												tweak={{
													variant: {
														border: false,
													},
												}}
												disabled
											/>
											<Button
												tone="warning"
												theme={theme}
												size="sm"
												label="Warning small borderless"
												tweak={{
													variant: {
														border: false,
													},
												}}
											/>
										</div>
									</div>
								))}
							</div>
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

export function VariantProviderDemo() {
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
							<Tx
								theme="light"
								label={"Context Tone"}
							/>
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
							<Tx
								theme="light"
								label={"Context Theme"}
							/>
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
						theme="light"
						label={`Active VariantProvider: ${contextTone} + ${contextTheme}`}
					/>
				</div>

				{/* Example Buttons */}
				<VariantProvider
					cls={PicoCls}
					variant={{
						tone: contextTone,
						theme: contextTheme,
					}}
				>
					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col space-y-2">
							<div className="text-xs font-medium text-slate-600">
								<Tx
									theme="light"
									label={"Buttons using context"}
								/>
							</div>
							<Button label="Default (inherits context)" />
							<Button
								disabled
								label="Disabled (inherits context)"
							/>
							<Button
								size="sm"
								label="Small size (inherits context)"
							/>
						</div>

						<div className="flex flex-col space-y-2">
							<div className="text-xs font-medium text-slate-600">
								<Tx
									theme="light"
									label={"Buttons overriding context"}
								/>
							</div>
							<Button
								tone="danger"
								label="Override tone to danger"
							/>
							<Button
								theme={
									contextTheme === "light" ? "dark" : "light"
								}
								label={`Override theme to ${contextTheme === "light" ? "dark" : "light"}`}
							/>
							<Button
								tone="neutral"
								theme="light"
								label="Override both to neutral+light"
							/>
						</div>
					</div>
				</VariantProvider>
			</div>
		</div>
	);
}
