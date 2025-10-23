import { createFileRoute } from "@tanstack/react-router";
import { Container, Tx } from "@use-pico/client";

export const Route = createFileRoute(
	"/$locale/components/container/orientation",
)({
	component() {
		const sampleItems = Array.from(
			{
				length: 6,
			},
			(_, i) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: Sssht
					key={i}
					className="bg-indigo-100 border border-indigo-200 rounded p-3 text-center text-sm font-medium"
				>
					Item {i + 1}
				</div>
			),
		);

		return (
			<div className="space-y-8 max-w-6xl">
				<div className="space-y-4">
					<Tx
						label="Container: Orientation"
						size="xl"
						font="bold"
					/>
					<Tx
						label="Explore how Container handles different orientations using CSS Grid for flexible layouts."
						size="md"
					/>
				</div>

				{/* Default (No Grid) */}
				<div className="space-y-4">
					<Tx
						label="Default Layout"
						size="lg"
						font="semi"
					/>
					<div className="space-y-2">
						<Tx
							label="orientation='unset' - No grid layout applied"
							size="sm"
							font="semi"
						/>
						<Container
							gap="md"
							square="md"
							border="default"
							tone="neutral"
							theme="light"
							round="md"
							tweak={{
								slot: {
									root: {
										class: [
											"h-32",
										],
									},
								},
							}}
						>
							{sampleItems}
						</Container>
					</div>
				</div>

				{/* Horizontal Orientations */}
				<div className="space-y-4">
					<Tx
						label="Horizontal Orientations"
						size="lg"
						font="semi"
					/>
					<div className="space-y-6">
						<div className="space-y-2">
							<Tx
								label="orientation='horizontal' - Grid flow column with auto-sizing"
								size="sm"
								font="semi"
							/>
							<Container
								layout="horizontal"
								gap="md"
								square="md"
								border="default"
								tone="primary"
								theme="light"
								round="md"
								tweak={{
									slot: {
										root: {
											class: [
												"h-32",
											],
										},
									},
								}}
							>
								{sampleItems}
							</Container>
						</div>

						<div className="space-y-2">
							<Tx
								label="orientation='horizontal-full' - Grid flow column with full width items"
								size="sm"
								font="semi"
							/>
							<Container
								layout="horizontal-full"
								gap="md"
								square="md"
								border="default"
								tone="secondary"
								theme="light"
								round="md"
								tweak={{
									slot: {
										root: {
											class: [
												"h-32",
											],
										},
									},
								}}
							>
								{sampleItems.slice(0, 3)}
							</Container>
						</div>
					</div>
				</div>

				{/* Vertical Orientations */}
				<div className="space-y-4">
					<Tx
						label="Vertical Orientations"
						size="lg"
						font="semi"
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<Tx
								label="orientation='vertical' - Grid flow row with auto-sizing"
								size="sm"
								font="semi"
							/>
							<Container
								layout="vertical"
								gap="sm"
								square="sm"
								border="default"
								tone="warning"
								theme="light"
								round="md"
								tweak={{
									slot: {
										root: {
											class: [
												"h-64",
											],
										},
									},
								}}
							>
								{sampleItems}
							</Container>
						</div>

						<div className="space-y-2">
							<Tx
								label="orientation='vertical-full' - Grid flow row with full height items"
								size="sm"
								font="semi"
							/>
							<Container
								layout="vertical-full"
								gap="sm"
								square="sm"
								border="default"
								tone="danger"
								theme="light"
								round="md"
								tweak={{
									slot: {
										root: {
											class: [
												"h-64",
											],
										},
									},
								}}
							>
								{sampleItems.slice(0, 3)}
							</Container>
						</div>
					</div>
				</div>

				{/* Item Variants */}
				<div className="space-y-4">
					<Tx
						label="Item Sizing Helpers"
						size="lg"
						font="semi"
					/>
					<Tx
						label="These variants help control how items behave within the container"
						size="sm"
					/>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="space-y-2">
							<Tx
								label="item='col' - Full height, auto width"
								size="sm"
								font="semi"
							/>
							<Container
								layout="horizontal"
								gap="sm"
								square="sm"
								border="default"
								tone="link"
								theme="light"
								round="md"
								tweak={{
									slot: {
										root: {
											class: [
												"h-32",
											],
										},
									},
								}}
							>
								<div className="bg-purple-100 border border-purple-200 rounded p-2 text-center text-sm">
									Column Item
								</div>
								<div className="bg-purple-100 border border-purple-200 rounded p-2 text-center text-sm">
									Another Column
								</div>
							</Container>
						</div>

						<div className="space-y-2">
							<Tx
								label="item='row' - Full width, auto height"
								size="sm"
								font="semi"
							/>
							<Container
								layout="vertical"
								gap="sm"
								square="sm"
								border="default"
								tone="subtle"
								theme="light"
								round="md"
								tweak={{
									slot: {
										root: {
											class: [
												"h-32",
											],
										},
									},
								}}
							>
								<div className="bg-amber-100 border border-amber-200 rounded p-2 text-center text-sm">
									Row Item 1
								</div>
								<div className="bg-amber-100 border border-amber-200 rounded p-2 text-center text-sm">
									Row Item 2
								</div>
							</Container>
						</div>

						<div className="space-y-2">
							<Tx
								label="item='full' - Full width and height"
								size="sm"
								font="semi"
							/>
							<Container
								layout="vertical"
								gap="sm"
								square="sm"
								border="default"
								tone="primary"
								theme="light"
								round="md"
								tweak={{
									slot: {
										root: {
											class: [
												"h-32",
											],
										},
									},
								}}
							>
								<div className="bg-rose-100 border border-rose-200 rounded p-2 text-center text-sm flex items-center justify-center">
									Full Item
								</div>
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
							{`import { Container } from "@use-pico/client";
import type { Cls } from "@use-pico/cls";
import { ContainerCls } from "@use-pico/client";

// Type-safe overflow and snap variants
type OverflowVariant = Cls.VariantOf<ContainerCls, "overflow">;
// "unset" | "horizontal" | "vertical"

type SnapVariant = Cls.VariantOf<ContainerCls, "snap">;
// "unset" | "horizontal-start" | "horizontal-center" | "horizontal-end" | 
// "vertical-start" | "vertical-center" | "vertical-end"

type OrientationVariant = Cls.VariantOf<ContainerCls, "orientation">;
// "unset" | "vertical" | "vertical-full" | "horizontal" | "horizontal-full"

type ItemVariant = Cls.VariantOf<ContainerCls, "item">;
// "unset" | "col" | "row" | "full"

// Horizontal scrolling with snap
<Container 
  overflow="horizontal"
  snap="horizontal-center"
  orientation="horizontal"
  gap="md"
  item="col"
>
  {/* Content */}
</Container>

// Vertical scrolling
<Container 
  overflow="vertical"
  orientation="vertical"
  gap="sm"
  item="row"
>
  {/* Content */}
</Container>`}
						</pre>
					</div>
				</div>
			</div>
		);
	},
});
