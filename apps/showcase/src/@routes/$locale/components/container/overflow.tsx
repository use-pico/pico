import { createFileRoute } from "@tanstack/react-router";
import { Container, Tx } from "@use-pico/client";

export const Route = createFileRoute("/$locale/components/container/overflow")({
	component() {
		const items = Array.from(
			{
				length: 20,
			},
			(_, i) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: Sssht
					key={i}
					className="flex-shrink-0 w-32 h-20 bg-blue-200 border border-blue-300 rounded flex items-center justify-center text-sm font-medium"
				>
					Item {i + 1}
				</div>
			),
		);

		const verticalItems = Array.from(
			{
				length: 15,
			},
			(_, i) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: Sssht
					key={i}
					className="flex-shrink-0 h-16 bg-green-200 border border-green-300 rounded flex items-center justify-center text-sm font-medium"
				>
					Vertical Item {i + 1}
				</div>
			),
		);

		return (
			<div className="space-y-8 max-w-6xl">
				<div className="space-y-4">
					<Tx
						label="Container: Overflow & Snap"
						size="xl"
						font="bold"
					/>
					<Tx
						label="Explore how Container handles overflow behavior and snap scrolling for creating smooth scrollable layouts."
						size="md"
					/>
				</div>

				{/* Horizontal Overflow */}
				<div className="space-y-4">
					<Tx
						label="Horizontal Overflow"
						size="lg"
						font="semi"
					/>
					<div className="space-y-4">
						<div className="space-y-2">
							<Tx
								label="overflow='horizontal' - Scrollable horizontal content"
								size="sm"
								font="semi"
							/>
							<Container
								overflow="horizontal"
								orientation="horizontal"
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
								{items}
							</Container>
						</div>
					</div>
				</div>

				{/* Vertical Overflow */}
				<div className="space-y-4">
					<Tx
						label="Vertical Overflow"
						size="lg"
						font="semi"
					/>
					<div className="space-y-4">
						<div className="space-y-2">
							<Tx
								label="overflow='vertical' - Scrollable vertical content"
								size="sm"
								font="semi"
							/>
							<Container
								overflow="vertical"
								orientation="vertical"
								gap="sm"
								square="md"
								border="default"
								tone="secondary"
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
								{verticalItems}
							</Container>
						</div>
					</div>
				</div>

				{/* Horizontal Snap */}
				<div className="space-y-4">
					<Tx
						label="Horizontal Snap Scrolling"
						size="lg"
						font="semi"
					/>
					<div className="space-y-6">
						<div className="space-y-2">
							<Tx
								label="snap='horizontal-start' - Snap to start of items"
								size="sm"
								font="semi"
							/>
							<Container
								snap="horizontal-start"
								orientation="horizontal"
								gap="md"
								square="md"
								border="default"
								tone="warning"
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
								{items}
							</Container>
						</div>

						<div className="space-y-2">
							<Tx
								label="snap='horizontal-center' - Snap to center of items"
								size="sm"
								font="semi"
							/>
							<Container
								snap="horizontal-center"
								orientation="horizontal"
								gap="md"
								square="md"
								border="default"
								tone="danger"
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
								{items}
							</Container>
						</div>

						<div className="space-y-2">
							<Tx
								label="snap='horizontal-end' - Snap to end of items"
								size="sm"
								font="semi"
							/>
							<Container
								snap="horizontal-end"
								orientation="horizontal"
								gap="md"
								square="md"
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
								{items}
							</Container>
						</div>
					</div>
				</div>

				{/* Vertical Snap */}
				<div className="space-y-4">
					<Tx
						label="Vertical Snap Scrolling"
						size="lg"
						font="semi"
					/>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="space-y-2">
							<Tx
								label="snap='vertical-start'"
								size="sm"
								font="semi"
							/>
							<Container
								snap="vertical-start"
								orientation="vertical"
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
												"h-48",
											],
										},
									},
								}}
							>
								{verticalItems}
							</Container>
						</div>

						<div className="space-y-2">
							<Tx
								label="snap='vertical-center'"
								size="sm"
								font="semi"
							/>
							<Container
								snap="vertical-center"
								orientation="vertical"
								gap="sm"
								square="sm"
								border="default"
								tone="secondary"
								theme="light"
								round="md"
								tweak={{
									slot: {
										root: {
											class: [
												"h-48",
											],
										},
									},
								}}
							>
								{verticalItems}
							</Container>
						</div>

						<div className="space-y-2">
							<Tx
								label="snap='vertical-end'"
								size="sm"
								font="semi"
							/>
							<Container
								snap="vertical-end"
								orientation="vertical"
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
												"h-48",
											],
										},
									},
								}}
							>
								{verticalItems}
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

// Type-safe overflow variants
type OverflowVariant = Cls.VariantOf<ContainerCls, "overflow">;
// "unset" | "horizontal" | "vertical"

type SnapVariant = Cls.VariantOf<ContainerCls, "snap">;
// "unset" | "horizontal-start" | "horizontal-center" | "horizontal-end" | 
// "vertical-start" | "vertical-center" | "vertical-end"

// Usage
<Container 
  overflow="horizontal"
  snap="horizontal-center"
  orientation="horizontal"
  gap="md"
>
  {/* Scrollable content with snap points */}
</Container>`}
						</pre>
					</div>
				</div>
			</div>
		);
	},
});
