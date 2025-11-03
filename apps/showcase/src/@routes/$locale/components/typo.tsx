import { createFileRoute } from "@tanstack/react-router";
import { Tx } from "@use-pico/client/ui/tx";
import { Typo } from "@use-pico/client/ui/typo";
import { tvc } from "@use-pico/cls";

export const Route = createFileRoute("/$locale/components/typo")({
	component() {
		const sizes = [
			"xs",
			"sm",
			"md",
			"lg",
			"xl",
		] as const;
		const fonts = [
			"normal",
			"semi",
			"bold",
		] as const;
		const tones = [
			"primary",
			"secondary",
			"danger",
			"warning",
			"neutral",
			"subtle",
			"link",
		] as const;

		return (
			<div
				className={tvc([
					"p-8",
					"space-y-8",
				])}
			>
				<div>
					<h1
						className={tvc([
							"text-3xl",
							"font-bold",
							"mb-4",
						])}
					>
						<Tx label={"Typography"} />
					</h1>
					<p
						className={tvc([
							"text-lg",
							"text-gray-600",
						])}
					>
						Explore TypoCls variants for size, font weight, tone,
						and theme control.
					</p>
				</div>

				{/* Size Variants */}
				<section
					className={tvc([
						"space-y-4",
					])}
				>
					<h2
						className={tvc([
							"text-2xl",
							"font-semibold",
							"border-b",
							"pb-2",
						])}
					>
						Size Variants
					</h2>
					<div
						className={tvc([
							"space-y-2",
						])}
					>
						{sizes.map((size) => (
							<div
								key={size}
								className={tvc([
									"flex",
									"items-center",
									"gap-4",
								])}
							>
								<span
									className={tvc([
										"w-16",
										"text-sm",
										"text-gray-500",
									])}
								>
									{size.toUpperCase()}
								</span>
								<Typo
									label="The quick brown fox jumps over the lazy dog"
									size={size}
								/>
							</div>
						))}
					</div>
				</section>

				{/* Font Weight Variants */}
				<section
					className={tvc([
						"space-y-4",
					])}
				>
					<h2
						className={tvc([
							"text-2xl",
							"font-semibold",
							"border-b",
							"pb-2",
						])}
					>
						Font Weight Variants
					</h2>
					<div
						className={tvc([
							"space-y-2",
						])}
					>
						{fonts.map((font) => (
							<div
								key={font}
								className={tvc([
									"flex",
									"items-center",
									"gap-4",
								])}
							>
								<span
									className={tvc([
										"w-16",
										"text-sm",
										"text-gray-500",
									])}
								>
									{font.toUpperCase()}
								</span>
								<Typo
									label="The quick brown fox jumps over the lazy dog"
									font={font}
								/>
							</div>
						))}
					</div>
				</section>

				{/* Italic Variants */}
				<section
					className={tvc([
						"space-y-4",
					])}
				>
					<h2
						className={tvc([
							"text-2xl",
							"font-semibold",
							"border-b",
							"pb-2",
						])}
					>
						Italic Variants
					</h2>
					<div
						className={tvc([
							"space-y-2",
						])}
					>
						<div
							className={tvc([
								"flex",
								"items-center",
								"gap-4",
							])}
						>
							<span
								className={tvc([
									"w-16",
									"text-sm",
									"text-gray-500",
								])}
							>
								NORMAL
							</span>
							<Typo
								label="The quick brown fox jumps over the lazy dog"
								italic={false}
							/>
						</div>
						<div
							className={tvc([
								"flex",
								"items-center",
								"gap-4",
							])}
						>
							<span
								className={tvc([
									"w-16",
									"text-sm",
									"text-gray-500",
								])}
							>
								ITALIC
							</span>
							<Typo
								label="The quick brown fox jumps over the lazy dog"
								italic={true}
							/>
						</div>
					</div>
				</section>

				{/* Tone Variants - Light Theme */}
				<section
					className={tvc([
						"space-y-4",
					])}
				>
					<h2
						className={tvc([
							"text-2xl",
							"font-semibold",
							"border-b",
							"pb-2",
						])}
					>
						Tone Variants - Light Theme
					</h2>
					<div
						className={tvc([
							"space-y-2",
						])}
					>
						{tones.map((tone) => (
							<div
								key={tone}
								className={tvc([
									"flex",
									"items-center",
									"gap-4",
								])}
							>
								<span
									className={tvc([
										"w-20",
										"text-sm",
										"text-gray-500",
									])}
								>
									{tone.toUpperCase()}
								</span>
								<Typo
									label="The quick brown fox jumps over the lazy dog"
									tone={tone}
									theme="light"
								/>
							</div>
						))}
					</div>
				</section>

				{/* Tone Variants - Dark Theme */}
				<section
					className={tvc([
						"space-y-4",
					])}
				>
					<h2
						className={tvc([
							"text-2xl",
							"font-semibold",
							"border-b",
							"pb-2",
						])}
					>
						Tone Variants - Dark Theme
					</h2>
					<div
						className={tvc([
							"bg-black",
							"p-6",
							"rounded-lg",
							"space-y-2",
						])}
					>
						{tones.map((tone) => (
							<div
								key={tone}
								className={tvc([
									"flex",
									"items-center",
									"gap-4",
								])}
							>
								<span
									className={tvc([
										"w-20",
										"text-sm",
										"text-gray-400",
									])}
								>
									{tone.toUpperCase()}
								</span>
								<Typo
									label="The quick brown fox jumps over the lazy dog"
									tone={tone}
									theme="dark"
								/>
							</div>
						))}
					</div>
				</section>

				{/* Combined Variants */}
				<section
					className={tvc([
						"space-y-4",
					])}
				>
					<h2
						className={tvc([
							"text-2xl",
							"font-semibold",
							"border-b",
							"pb-2",
						])}
					>
						Combined Variants
					</h2>
					<div
						className={tvc([
							"space-y-4",
						])}
					>
						{/* Large Bold Primary */}
						<div
							className={tvc([
								"space-y-2",
							])}
						>
							<span
								className={tvc([
									"text-sm",
									"text-gray-500",
								])}
							>
								Large Bold Primary (Light)
							</span>
							<Typo
								label="The quick brown fox jumps over the lazy dog"
								size="lg"
								font="bold"
								tone="primary"
								theme="light"
							/>
						</div>

						{/* Large Bold Primary Dark */}
						<div
							className={tvc([
								"space-y-2",
							])}
						>
							<span
								className={tvc([
									"text-sm",
									"text-gray-500",
								])}
							>
								Large Bold Primary (Dark)
							</span>
							<div
								className={tvc([
									"bg-black",
									"p-4",
									"rounded-lg",
								])}
							>
								<Typo
									label="The quick brown fox jumps over the lazy dog"
									size="lg"
									font="bold"
									tone="primary"
									theme="dark"
								/>
							</div>
						</div>

						{/* Small Semibold Danger */}
						<div
							className={tvc([
								"space-y-2",
							])}
						>
							<span
								className={tvc([
									"text-sm",
									"text-gray-500",
								])}
							>
								Small Semibold Danger (Light)
							</span>
							<Typo
								label="The quick brown fox jumps over the lazy dog"
								size="sm"
								font="semi"
								tone="danger"
								theme="light"
							/>
						</div>

						{/* Small Semibold Danger Dark */}
						<div
							className={tvc([
								"space-y-2",
							])}
						>
							<span
								className={tvc([
									"text-sm",
									"text-gray-500",
								])}
							>
								Small Semibold Danger (Dark)
							</span>
							<div
								className={tvc([
									"bg-black",
									"p-4",
									"rounded-lg",
								])}
							>
								<Typo
									label="The quick brown fox jumps over the lazy dog"
									size="sm"
									font="semi"
									tone="danger"
									theme="dark"
								/>
							</div>
						</div>

						{/* Extra Large Normal Link */}
						<div
							className={tvc([
								"space-y-2",
							])}
						>
							<span
								className={tvc([
									"text-sm",
									"text-gray-500",
								])}
							>
								Extra Large Normal Link (Light)
							</span>
							<Typo
								label="The quick brown fox jumps over the lazy dog"
								size="xl"
								font="normal"
								tone="link"
								theme="light"
							/>
						</div>

						{/* Extra Large Normal Link Dark */}
						<div
							className={tvc([
								"space-y-2",
							])}
						>
							<span
								className={tvc([
									"text-sm",
									"text-gray-500",
								])}
							>
								Extra Large Normal Link (Dark)
							</span>
							<div
								className={tvc([
									"bg-black",
									"p-4",
									"rounded-lg",
								])}
							>
								<Typo
									label="The quick brown fox jumps over the lazy dog"
									size="xl"
									font="normal"
									tone="link"
									theme="dark"
								/>
							</div>
						</div>

						{/* Medium Bold Italic Primary */}
						<div
							className={tvc([
								"space-y-2",
							])}
						>
							<span
								className={tvc([
									"text-sm",
									"text-gray-500",
								])}
							>
								Medium Bold Italic Primary (Light)
							</span>
							<Typo
								label="The quick brown fox jumps over the lazy dog"
								size="md"
								font="bold"
								tone="primary"
								theme="light"
								italic={true}
							/>
						</div>

						{/* Medium Bold Italic Primary Dark */}
						<div
							className={tvc([
								"space-y-2",
							])}
						>
							<span
								className={tvc([
									"text-sm",
									"text-gray-500",
								])}
							>
								Medium Bold Italic Primary (Dark)
							</span>
							<div
								className={tvc([
									"bg-black",
									"p-4",
									"rounded-lg",
								])}
							>
								<Typo
									label="The quick brown fox jumps over the lazy dog"
									size="md"
									font="bold"
									tone="primary"
									theme="dark"
									italic={true}
								/>
							</div>
						</div>
					</div>
				</section>

				{/* Interactive Examples */}
				<section
					className={tvc([
						"space-y-4",
					])}
				>
					<h2
						className={tvc([
							"text-2xl",
							"font-semibold",
							"border-b",
							"pb-2",
						])}
					>
						Interactive Examples
					</h2>
					<div
						className={tvc([
							"grid",
							"grid-cols-1",
							"md:grid-cols-2",
							"gap-6",
						])}
					>
						{/* Light Theme Card */}
						<div
							className={tvc([
								"border",
								"rounded-lg",
								"p-6",
								"space-y-4",
							])}
						>
							<h3
								className={tvc([
									"text-lg",
									"font-semibold",
								])}
							>
								Light Theme
							</h3>
							<Typo
								label="Primary Heading"
								size="lg"
								font="bold"
								tone="primary"
								theme="light"
							/>
							<Typo
								label="This is a neutral paragraph with medium size and normal weight."
								size="md"
								font="normal"
								tone="neutral"
								theme="light"
							/>
							<Typo
								label="Secondary text with small size and semibold weight."
								size="sm"
								font="semi"
								tone="secondary"
								theme="light"
							/>
						</div>

						{/* Dark Theme Card */}
						<div
							className={tvc([
								"bg-black",
								"rounded-lg",
								"p-6",
								"space-y-4",
							])}
						>
							<h3
								className={tvc([
									"text-lg",
									"font-semibold",
									"text-white",
								])}
							>
								Dark Theme
							</h3>
							<Typo
								label="Primary Heading"
								size="lg"
								font="bold"
								tone="primary"
								theme="dark"
							/>
							<Typo
								label="This is a neutral paragraph with medium size and normal weight."
								size="md"
								font="normal"
								tone="neutral"
								theme="dark"
							/>
							<Typo
								label="Secondary text with small size and semibold weight."
								size="sm"
								font="semi"
								tone="secondary"
								theme="dark"
							/>
						</div>
					</div>
				</section>
			</div>
		);
	},
});
