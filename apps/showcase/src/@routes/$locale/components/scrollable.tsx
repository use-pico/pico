import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@use-pico/client/ui/container";
import { Fade } from "@use-pico/client/ui/fade";
import { Tx } from "@use-pico/client/ui/tx";
import { tvc } from "@use-pico/cls";
import { type ReactNode, useRef } from "react";

const Section = ({
	title,
	children,
}: {
	title: ReactNode;
	children: ReactNode;
}) => (
	<div className="flex flex-col space-y-4">
		<h3 className="text-lg font-semibold text-slate-800">{title}</h3>
		{children}
	</div>
);

const ScrollableDemo = ({
	layout,
	height = "h-64",
	contentHeight = "h-96",
}: {
	layout: "grid" | "flex" | "absolute";
	height?: string;
	contentHeight?: string;
}) => {
	const scrollableRef = useRef<HTMLDivElement>(null);

	return (
		<div className="flex flex-col space-y-2">
			<div className="text-sm font-medium text-slate-600">{layout}</div>
			<div
				className={tvc([
					height,
					"border",
					"border-slate-300",
					"rounded-lg",
				])}
			>
				<Container position={"relative"}>
					<Fade scrollableRef={scrollableRef} />

					<Container
						ref={scrollableRef}
						layout={"vertical"}
						scroll={"vertical"}
					>
						<div
							className={tvc([
								contentHeight,
								"p-4",
								"bg-linear-to-b",
								"from-blue-50",
								"to-purple-50",
							])}
						>
							<div className="space-y-4">
								<h4 className="text-lg font-semibold">
									Scrollable Content
								</h4>
								<p className="text-slate-700">
									This content is scrollable and demonstrates
									the fade effect at the top and bottom. The
									fade effect appears when there's content to
									scroll to.
								</p>
								<div className="space-y-2">
									{[
										1,
										2,
										3,
										4,
										5,
										6,
										7,
										8,
										9,
										10,
									].map((i) => (
										<div
											key={i}
											className="p-3 bg-white rounded border border-slate-200"
										>
											<div className="font-medium">
												Item {i}
											</div>
											<div className="text-sm text-slate-600">
												This is item number {i} in the
												scrollable list. Notice how the
												fade effect appears at the top
												and bottom when scrolling.
											</div>
										</div>
									))}
								</div>
								<p className="text-slate-700">
									Scroll up and down to see the fade effect in
									action. The fade indicates when there's more
									content to scroll to.
								</p>
							</div>
						</div>
					</Container>
				</Container>
			</div>
		</div>
	);
};

export const Route = createFileRoute("/$locale/components/scrollable")({
	component() {
		return (
			<div
				className={tvc([
					"flex",
					"flex-col",
					"space-y-8",
					"w-full",
					"p-6",
				])}
			>
				<div className="space-y-2">
					<h1 className="text-3xl font-bold text-slate-900">
						<Tx label={"Scrollable"} />
					</h1>
					<p className="text-slate-600">
						A scrollable container with fade effects that indicate
						scrollable content.
					</p>
				</div>

				{/* Grid Layout */}
				<Section title={<Tx label={"Grid Layout"} />}>
					<ScrollableDemo
						layout="grid"
						height="h-64"
						contentHeight="h-80"
					/>
				</Section>

				{/* Usage Example */}
				<Section title={<Tx label={"Usage Example"} />}>
					<div className="bg-slate-50 p-4 rounded-lg">
						<pre className="text-sm text-slate-700 overflow-x-auto">
							{`import { Scrollable } from "@use-pico/client";

<Scrollable layout="grid">
  <div className="h-96 p-4">
    {/* Your scrollable content */}
  </div>
</Scrollable>`}
						</pre>
					</div>
				</Section>
			</div>
		);
	},
});
