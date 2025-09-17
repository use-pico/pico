import { createFileRoute } from "@tanstack/react-router";
import { Container, Tx } from "@use-pico/client";

export const Route = createFileRoute("/$locale/components/container/")({
	component() {
		return (
			<div className="space-y-8 max-w-4xl">
				<div className="space-y-4">
					<Tx
						label="Container Component"
						size="xl"
						font="bold"
					/>
					<Tx
						label="The Container component is a flexible layout primitive that provides comprehensive control over sizing, positioning, overflow behavior, and theming. It's designed to be the foundation for building complex layouts with consistent spacing and visual styling."
						size="md"
					/>
				</div>

				{/* Basic Usage */}
				<div className="space-y-4">
					<Tx
						label="Basic Usage"
						size="lg"
						font="semi"
					/>
					<div className="space-y-4">
						<div className="space-y-2">
							<Tx
								label="Default Container (no styling applied)"
								size="sm"
								font="semi"
							/>
							<Container className="bg-gray-100 h-32 flex items-center justify-center">
								<Tx label="Default Container" />
							</Container>
						</div>

						<div className="space-y-2">
							<Tx
								label="Container with theming"
								size="sm"
								font="semi"
							/>
							<Container
								tone="primary"
								theme="light"
								border="default"
								round="md"
								square="md"
								className="h-32 flex items-center justify-center"
							>
								<Tx label="Themed Container" />
							</Container>
						</div>
					</div>
				</div>

				{/* Variant Overview */}
				<div className="space-y-4">
					<Tx
						label="Available Variants"
						size="lg"
						font="semi"
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<Tx
								label="Layout Control"
								size="md"
								font="semi"
							/>
							<ul className="space-y-1 text-sm">
								<li>
									<strong>height:</strong> full, dvh, auto
								</li>
								<li>
									<strong>width:</strong> full, dvw, auto
								</li>
								<li>
									<strong>orientation:</strong> vertical,
									horizontal, vertical-full, horizontal-full
								</li>
								<li>
									<strong>item:</strong> col, row, full
								</li>
								<li>
									<strong>position:</strong> absolute,
									relative
								</li>
							</ul>
						</div>

						<div className="space-y-2">
							<Tx
								label="Visual Styling"
								size="md"
								font="semi"
							/>
							<ul className="space-y-1 text-sm">
								<li>
									<strong>tone:</strong> primary, secondary,
									danger, warning, neutral, subtle, link
								</li>
								<li>
									<strong>theme:</strong> light, dark
								</li>
								<li>
									<strong>border:</strong> default, sm, md,
									lg, xl
								</li>
								<li>
									<strong>shadow:</strong> default, sm, md,
									lg, xl
								</li>
								<li>
									<strong>round:</strong> default, xs, sm, md,
									lg, xl, full
								</li>
							</ul>
						</div>

						<div className="space-y-2">
							<Tx
								label="Behavior Control"
								size="md"
								font="semi"
							/>
							<ul className="space-y-1 text-sm">
								<li>
									<strong>overflow:</strong> horizontal,
									vertical
								</li>
								<li>
									<strong>snap:</strong>{" "}
									horizontal-start/center/end,
									vertical-start/center/end
								</li>
								<li>
									<strong>gap:</strong> xs, sm, md, lg, xl
								</li>
								<li>
									<strong>square:</strong> xs, sm, md, lg, xl
									(padding)
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* TypeScript Usage */}
				<div className="space-y-4">
					<Tx
						label="TypeScript Integration"
						size="lg"
						font="semi"
					/>
					<div className="bg-gray-50 p-4 rounded-lg">
						<pre className="text-sm overflow-x-auto">
							{`import { Container } from "@use-pico/client";
import type { Cls } from "@use-pico/cls";
import { ContainerCls } from "@use-pico/client";

// Type-safe variant usage
type ToneVariant = Cls.VariantOf<ContainerCls, "tone">;
type ThemeVariant = Cls.VariantOf<ContainerCls, "theme">;
type BorderVariant = Cls.VariantOf<ContainerCls, "border">;

// Usage examples
<Container 
  tone="primary"
  theme="light"
  border="default"
  shadow="md"
  round="lg"
  orientation="vertical"
  gap="md"
  square="lg"
/>`}
						</pre>
					</div>
				</div>

				{/* Navigation to Specific Pages */}
				<div className="space-y-4">
					<Tx
						label="Explore Specific Features"
						size="lg"
						font="semi"
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Container
							tone="secondary"
							theme="light"
							border="default"
							round="md"
							square="md"
							className="text-center"
						>
							<Tx
								label="📐 Overflow & Snap"
								size="md"
								font="semi"
							/>
							<Tx
								label="Learn about scroll behavior and snap points"
								size="sm"
							/>
						</Container>

						<Container
							tone="warning"
							theme="light"
							border="default"
							round="md"
							square="md"
							className="text-center"
						>
							<Tx
								label="🔄 Orientation"
								size="md"
								font="semi"
							/>
							<Tx
								label="Explore grid layouts and orientations"
								size="sm"
							/>
						</Container>

						<Container
							tone="danger"
							theme="light"
							border="default"
							round="md"
							square="md"
							className="text-center"
						>
							<Tx
								label="📏 Sizing"
								size="md"
								font="semi"
							/>
							<Tx
								label="Control height, width, and responsive sizing"
								size="sm"
							/>
						</Container>

						<Container
							tone="link"
							theme="light"
							border="default"
							round="md"
							square="md"
							className="text-center"
						>
							<Tx
								label="🎨 Design & Theming"
								size="md"
								font="semi"
							/>
							<Tx
								label="Explore colors, borders, shadows, and rounding"
								size="sm"
							/>
						</Container>
					</div>
				</div>
			</div>
		);
	},
});
