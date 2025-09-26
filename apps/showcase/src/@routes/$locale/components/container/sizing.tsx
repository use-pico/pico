import { createFileRoute } from "@tanstack/react-router";
import { Container, Tx } from "@use-pico/client";

export const Route = createFileRoute("/$locale/components/container/sizing")({
	component() {
		return (
			<div className="space-y-8 max-w-6xl">
				<div className="space-y-4">
					<Tx
						label="Container: Sizing"
						size="xl"
						font="bold"
					/>
					<Tx
						label="Explore how Container handles different sizing behaviors for responsive and fixed layouts."
						size="md"
					/>
				</div>

				{/* Height Variants */}
				<div className="space-y-4">
					<Tx
						label="Height Variants"
						size="lg"
						font="semi"
					/>
					<div className="space-y-6">
						<div className="space-y-2">
							<Tx
								label="height='full' - Takes full height of parent container"
								size="sm"
								font="semi"
							/>
							<div className="h-32 border-2 border-dashed border-gray-300 relative">
								<Container
									height="full"
									width="auto"
									border="default"
									tone="primary"
									theme="light"
									round="md"
									square="md"
									tweak={{
										slot: {
											root: {
												class: [
													"flex",
													"items-center",
													"justify-center",
												],
											},
										},
									}}
								>
									<Tx label="Full Height Container" />
								</Container>
							</div>
						</div>

						<div className="space-y-2">
							<Tx
								label="height='dvh' - Uses dynamic viewport height (100dvh)"
								size="sm"
								font="semi"
							/>
							<div className="h-48 border-2 border-dashed border-gray-300 relative overflow-hidden">
								<Container
									height="dvh"
									border="default"
									tone="secondary"
									theme="light"
									round="md"
									square="md"
									tweak={{
										slot: {
											root: {
												class: [
													"flex",
													"items-center",
													"justify-center",
												],
											},
										},
									}}
								>
									<Tx label="Dynamic Viewport Height" />
								</Container>
							</div>
						</div>

						<div className="space-y-2">
							<Tx
								label="height='auto' - Adjusts to content height"
								size="sm"
								font="semi"
							/>
							<Container
								height="auto"
								width="auto"
								border="default"
								tone="warning"
								theme="light"
								round="md"
								square="md"
								tweak={{
									slot: {
										root: {
											class: [
												"flex",
												"items-center",
												"justify-center",
											],
										},
									},
								}}
							>
								<Tx label="Auto Height - fits content" />
							</Container>
						</div>
					</div>
				</div>

				{/* Width Variants */}
				<div className="space-y-4">
					<Tx
						label="Width Variants"
						size="lg"
						font="semi"
					/>
					<div className="space-y-6">
						<div className="space-y-2">
							<Tx
								label="width='full' - Takes full width of parent"
								size="sm"
								font="semi"
							/>
							<Container
								width="full"
								height="auto"
								border="default"
								tone="danger"
								theme="light"
								round="md"
								square="md"
								tweak={{
									slot: {
										root: {
											class: [
												"flex",
												"items-center",
												"justify-center",
											],
										},
									},
								}}
							>
								<Tx label="Full Width Container" />
							</Container>
						</div>

						<div className="space-y-2">
							<Tx
								label="width='dvw' - Uses dynamic viewport width (100dvw)"
								size="sm"
								font="semi"
							/>
							<div className="overflow-x-auto">
								<Container
									width="dvw"
									height="auto"
									border="default"
									tone="subtle"
									theme="light"
									round="md"
									square="md"
									tweak={{
										slot: {
											root: {
												class: [
													"flex",
													"items-center",
													"justify-center",
													"min-w-max",
												],
											},
										},
									}}
								>
									<Tx label="Dynamic Viewport Width (may overflow)" />
								</Container>
							</div>
						</div>

						<div className="space-y-2">
							<Tx
								label="width='auto' - Adjusts to content width"
								size="sm"
								font="semi"
							/>
							<Container
								width="auto"
								height="auto"
								border="default"
								tone="link"
								theme="light"
								round="md"
								square="md"
								tweak={{
									slot: {
										root: {
											class: [
												"flex",
												"items-center",
												"justify-center",
											],
										},
									},
								}}
							>
								<Tx label="Auto Width" />
							</Container>
						</div>
					</div>
				</div>

				{/* Gap Variants */}
				<div className="space-y-4">
					<Tx
						label="Gap Variants"
						size="lg"
						font="semi"
					/>
					<Tx
						label="Control spacing between child elements"
						size="sm"
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{(
							[
								"xs",
								"sm",
								"md",
								"lg",
								"xl",
							] as const
						).map((gapSize) => (
							<div
								key={gapSize}
								className="space-y-2"
							>
								<Tx
									label={`gap='${gapSize}'`}
									size="sm"
									font="semi"
								/>
								<Container
									layout="vertical"
									gap={gapSize}
									square="sm"
									border="default"
									tone="primary"
									theme="light"
									round="md"
									tweak={{
										slot: {
											root: {
												class: [
													"h-40",
												],
											},
										},
									}}
								>
									<div className="bg-blue-100 border border-blue-200 rounded p-2 text-center text-xs">
										Item 1
									</div>
									<div className="bg-blue-100 border border-blue-200 rounded p-2 text-center text-xs">
										Item 2
									</div>
									<div className="bg-blue-100 border border-blue-200 rounded p-2 text-center text-xs">
										Item 3
									</div>
								</Container>
							</div>
						))}
					</div>
				</div>

				{/* Square (Padding) Variants */}
				<div className="space-y-4">
					<Tx
						label="Square (Padding) Variants"
						size="lg"
						font="semi"
					/>
					<Tx
						label="Control internal padding of the container"
						size="sm"
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{(
							[
								"xs",
								"sm",
								"md",
								"lg",
								"xl",
							] as const
						).map((squareSize) => (
							<div
								key={squareSize}
								className="space-y-2"
							>
								<Tx
									label={`square='${squareSize}'`}
									size="sm"
									font="semi"
								/>
								<Container
									square={squareSize}
									border="default"
									tone="secondary"
									theme="light"
									round="md"
									tweak={{
										slot: {
											root: {
												class: [
													"w-full",
												],
											},
										},
									}}
								>
									<div className="bg-teal-100 border border-teal-200 rounded text-center text-xs py-2">
										Content with {squareSize} padding
									</div>
								</Container>
							</div>
						))}
					</div>
				</div>

				{/* Position Variants */}
				<div className="space-y-4">
					<Tx
						label="Position Variants"
						size="lg"
						font="semi"
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<Tx
								label="position='relative' - Relative positioning context"
								size="sm"
								font="semi"
							/>
							<div className="h-32 border-2 border-dashed border-gray-300 relative">
								<Container
									position="relative"
									border="default"
									tone="warning"
									theme="light"
									round="md"
									square="md"
									tweak={{
										slot: {
											root: {
												class: [
													"h-full",
													"flex",
													"items-center",
													"justify-center",
												],
											},
										},
									}}
								>
									<Tx label="Relative Container" />
									<div className="absolute top-2 right-2 bg-yellow-200 text-xs px-2 py-1 rounded">
										Absolute child
									</div>
								</Container>
							</div>
						</div>

						<div className="space-y-2">
							<Tx
								label="position='absolute' - Absolute positioning"
								size="sm"
								font="semi"
							/>
							<div className="h-32 border-2 border-dashed border-gray-300 relative">
								<Container
									position="absolute"
									border="default"
									tone="danger"
									theme="light"
									round="md"
									square="sm"
									tweak={{
										slot: {
											root: {
												class: [
													"top-4",
													"left-4",
													"right-4",
													"bottom-4",
													"flex",
													"items-center",
													"justify-center",
												],
											},
										},
									}}
								>
									<Tx label="Absolute Container" />
								</Container>
							</div>
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
							{`import { Container } from "@use-pico/client";
import type { Cls } from "@use-pico/cls";
import { ContainerCls } from "@use-pico/client";

// Type-safe sizing variants
type HeightVariant = Cls.VariantOf<ContainerCls, "height">;
// "full" | "dvh" | "auto"

type WidthVariant = Cls.VariantOf<ContainerCls, "width">;
// "full" | "dvw" | "auto"

type GapVariant = Cls.VariantOf<ContainerCls, "gap">;
// "unset" | "xs" | "sm" | "md" | "lg" | "xl"

type SquareVariant = Cls.VariantOf<ContainerCls, "square">;
// "unset" | "xs" | "sm" | "md" | "lg" | "xl"

type PositionVariant = Cls.VariantOf<ContainerCls, "position">;
// "unset" | "absolute" | "relative"

// Responsive layout example
<Container 
  height="full"
  width="full"
  layout="vertical"
  gap="lg"
  square="xl"
  position="relative"
>
  {/* Your content */}
</Container>`}
						</pre>
					</div>
				</div>
			</div>
		);
	},
});
