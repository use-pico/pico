import { createFileRoute } from "@tanstack/react-router";
import { Container, type ContainerCls } from "@use-pico/client/ui/container";
import { Tx } from "@use-pico/client/ui/tx";
import type { Cls } from "@use-pico/cls";

export const Route = createFileRoute("/$locale/components/container/design")({
	component() {
		const tones: Array<Cls.VariantOf<ContainerCls, "tone">> = [
			"primary",
			"secondary",
			"danger",
			"warning",
			"neutral",
			"subtle",
			"link",
		];

		const themes: Array<Cls.VariantOf<ContainerCls, "theme">> = [
			"light",
			"dark",
		];

		const borderSizes: Array<Cls.VariantOf<ContainerCls, "border">> = [
			"default",
			"sm",
			"md",
			"lg",
			"xl",
		];

		const shadowSizes: Array<Cls.VariantOf<ContainerCls, "shadow">> = [
			"default",
			"sm",
			"md",
			"lg",
			"xl",
		];

		const roundSizes: Array<Cls.VariantOf<ContainerCls, "round">> = [
			"default",
			"xs",
			"sm",
			"md",
			"lg",
			"xl",
			"full",
		];

		return (
			<div className="space-y-8 max-w-6xl">
				<div className="space-y-4">
					<Tx
						label="Container: Design & Theming"
						size="xl"
						font="bold"
					/>
					<Tx
						label="Explore the visual design capabilities of Container including tones, themes, borders, shadows, and rounding."
						size="md"
					/>
				</div>

				{/* Tone Showcase */}
				<div className="space-y-4">
					<Tx
						label="Tone Variants"
						size="lg"
						font="semi"
					/>
					<Tx
						label="Different color tones for various use cases"
						size="sm"
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{tones.map((tone) => (
							<div
								key={tone}
								className="space-y-2"
							>
								<Tx
									label={`tone='${tone}'`}
									size="sm"
									font="semi"
								/>
								<Container
									tone={tone}
									theme="light"
									border="default"
									round="md"
									square="md"
									tweak={{
										slot: {
											root: {
												class: [
													"h-20",
													"flex",
													"items-center",
													"justify-center",
												],
											},
										},
									}}
								>
									<Tx
										label={tone}
										size="sm"
										font="semi"
									/>
								</Container>
							</div>
						))}
					</div>
				</div>

				{/* Theme Comparison */}
				<div className="space-y-4">
					<Tx
						label="Light vs Dark Themes"
						size="lg"
						font="semi"
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{themes.map((theme) => (
							<div
								key={theme}
								className="space-y-4"
							>
								<Tx
									label={`theme='${theme}'`}
									size="md"
									font="semi"
								/>
								<div className="space-y-3">
									{tones.slice(0, 4).map((tone) => (
										<Container
											key={`${tone}-${theme}`}
											tone={tone}
											theme={theme}
											border="default"
											round="md"
											square="sm"
											tweak={{
												slot: {
													root: {
														class: [
															"h-16",
															"flex",
															"items-center",
															"justify-center",
														],
													},
												},
											}}
										>
											<Tx
												label={`${tone} ${theme}`}
												size="sm"
											/>
										</Container>
									))}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Border Variants */}
				<div className="space-y-4">
					<Tx
						label="Border Variants"
						size="lg"
						font="semi"
					/>
					<Tx
						label="Different border sizes - colors come from tone/theme"
						size="sm"
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{borderSizes.map((borderSize) => (
							<div
								key={borderSize}
								className="space-y-2"
							>
								<Tx
									label={`border='${borderSize}'`}
									size="sm"
									font="semi"
								/>
								<Container
									border={borderSize}
									tone="primary"
									theme="light"
									round="md"
									square="md"
									tweak={{
										slot: {
											root: {
												class: [
													"h-20",
													"flex",
													"items-center",
													"justify-center",
												],
											},
										},
									}}
								>
									<Tx
										label={`${borderSize} border`}
										size="sm"
									/>
								</Container>
							</div>
						))}
					</div>
				</div>

				{/* Shadow Variants */}
				<div className="space-y-4">
					<Tx
						label="Shadow Variants"
						size="lg"
						font="semi"
					/>
					<Tx
						label="Different shadow sizes - colors come from tone/theme"
						size="sm"
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{shadowSizes.map((shadowSize) => (
							<div
								key={shadowSize}
								className="space-y-2"
							>
								<Tx
									label={`shadow='${shadowSize}'`}
									size="sm"
									font="semi"
								/>
								<Container
									shadow={shadowSize}
									tone="secondary"
									theme="light"
									round="md"
									square="md"
									tweak={{
										slot: {
											root: {
												class: [
													"h-20",
													"flex",
													"items-center",
													"justify-center",
													"bg-white",
												],
											},
										},
									}}
								>
									<Tx
										label={`${shadowSize} shadow`}
										size="sm"
									/>
								</Container>
							</div>
						))}
					</div>
				</div>

				{/* Round Variants */}
				<div className="space-y-4">
					<Tx
						label="Round (Corner) Variants"
						size="lg"
						font="semi"
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{roundSizes.map((roundSize) => (
							<div
								key={roundSize}
								className="space-y-2"
							>
								<Tx
									label={`round='${roundSize}'`}
									size="sm"
									font="semi"
								/>
								<Container
									round={roundSize}
									tone="warning"
									theme="light"
									border="default"
									square="md"
									tweak={{
										slot: {
											root: {
												class: [
													"h-20",
													"flex",
													"items-center",
													"justify-center",
												],
											},
										},
									}}
								>
									<Tx
										label={roundSize}
										size="sm"
									/>
								</Container>
							</div>
						))}
					</div>
				</div>

				{/* Combined Examples */}
				<div className="space-y-4">
					<Tx
						label="Combined Design Examples"
						size="lg"
						font="semi"
					/>
					<Tx
						label="Showcasing how different design properties work together"
						size="sm"
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<Tx
								label="Card-like Design"
								size="sm"
								font="semi"
							/>
							<Container
								tone="neutral"
								theme="light"
								border="default"
								shadow="md"
								round="lg"
								square="lg"
								tweak={{
									slot: {
										root: {
											class: [
												"h-32",
												"flex",
												"items-center",
												"justify-center",
											],
										},
									},
								}}
							>
								<Tx label="Card Style Container" />
							</Container>
						</div>

						<div className="space-y-2">
							<Tx
								label="Alert-like Design"
								size="sm"
								font="semi"
							/>
							<Container
								tone="danger"
								theme="light"
								border="lg"
								round="md"
								square="md"
								tweak={{
									slot: {
										root: {
											class: [
												"h-32",
												"flex",
												"items-center",
												"justify-center",
											],
										},
									},
								}}
							>
								<Tx label="Alert Style Container" />
							</Container>
						</div>

						<div className="space-y-2">
							<Tx
								label="Button-like Design"
								size="sm"
								font="semi"
							/>
							<Container
								tone="primary"
								theme="light"
								border="default"
								shadow="default"
								round="full"
								square="lg"
								tweak={{
									slot: {
										root: {
											class: [
												"h-16",
												"flex",
												"items-center",
												"justify-center",
												"cursor-pointer",
												"hover:scale-105",
												"transition-transform",
											],
										},
									},
								}}
							>
								<Tx label="Button Style Container" />
							</Container>
						</div>

						<div className="space-y-2">
							<Tx
								label="Dark Theme Example"
								size="sm"
								font="semi"
							/>
							<Container
								tone="link"
								theme="dark"
								border="default"
								shadow="lg"
								round="xl"
								square="lg"
								tweak={{
									slot: {
										root: {
											class: [
												"h-32",
												"flex",
												"items-center",
												"justify-center",
											],
										},
									},
								}}
							>
								<Tx label="Dark Theme Container" />
							</Container>
						</div>
					</div>
				</div>

				{/* TypeScript Examples */}
				<div className="space-y-4">
					<Tx
						label="TypeScript Usage"
						size="lg"
						font="semi"
					/>
					<div className="bg-gray-50 p-4 rounded-lg">
						<pre className="text-sm overflow-x-auto">
							{`import { Container } from "@use-pico/client/ui/container";
import type { Cls } from "@use-pico/cls";
import { ContainerCls } from "@use-pico/client/ui/container";

// Type-safe design variants
type ToneVariant = Cls.VariantOf<ContainerCls, "tone">;
// "unset" | "primary" | "secondary" | "danger" | "warning" | "neutral" | "subtle" | "link"

type ThemeVariant = Cls.VariantOf<ContainerCls, "theme">;
// "unset" | "light" | "dark"

type BorderVariant = Cls.VariantOf<ContainerCls, "border">;
// "unset" | "default" | "sm" | "md" | "lg" | "xl"

type ShadowVariant = Cls.VariantOf<ContainerCls, "shadow">;
// "unset" | "default" | "sm" | "md" | "lg" | "xl"

type RoundVariant = Cls.VariantOf<ContainerCls, "round">;
// "unset" | "default" | "xs" | "sm" | "md" | "lg" | "xl" | "full"

// Complete design example
<Container 
  tone="primary"
  theme="light"
  border="default"
  shadow="md"
  round="lg"
  square="lg"
  orientation="vertical"
  gap="md"
>
  {/* Your content */}
</Container>

// Minimal styling (only what you need)
<Container border="sm" round="md">
  {/* Just border and rounding, no colors */}
</Container>`}
						</pre>
					</div>
				</div>

				{/* Design System Notes */}
				<div className="space-y-4">
					<Tx
						label="Design System Architecture"
						size="lg"
						font="semi"
					/>
					<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
						<Tx
							label="Key Benefits of the Separated Design System:"
							size="md"
							font="semi"
						/>
						<ul className="space-y-2 text-sm">
							<li>
								<strong>🎯 Separation of Concerns:</strong>{" "}
								Colors (tone/theme) are independent from sizing
								(border/shadow/round)
							</li>
							<li>
								<strong>🔧 Composable:</strong> Mix and match
								any combination without rule explosion
							</li>
							<li>
								<strong>📏 Efficient:</strong> Only 64 rules
								total instead of hundreds of combinations
							</li>
							<li>
								<strong>🎨 Consistent:</strong> All colors come
								from the centralized PicoCls design tokens
							</li>
							<li>
								<strong>⚡ Performance:</strong> "unset" means
								no styling applied until explicitly requested
							</li>
							<li>
								<strong>🛡️ Type Safe:</strong> Full TypeScript
								support for all variant combinations
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	},
});
