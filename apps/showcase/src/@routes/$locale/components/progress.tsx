import { createFileRoute } from "@tanstack/react-router";
import { Progress, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/cls";

export const Route = createFileRoute("/$locale/components/progress")({
	component() {
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
		] as const;

		return (
			<div
				className={tvc([
					"flex",
					"flex-col",
					"space-y-8",
					"w-full",
				])}
			>
				<Section
					title={
						<Tx label={"Tone Variants (md size, light theme)"} />
					}
				>
					{tones.map((tone) => (
						<Row
							key={`tone-${tone}`}
							label={<Tx label={tone} />}
						>
							<div className="w-full max-w-md">
								<Progress
									value={65}
									cls={({ what }) => ({
										variant: what.variant({
											tone,
											size: "md",
											theme: "light",
										}),
									})}
								/>
							</div>
						</Row>
					))}
				</Section>

				<Section
					title={<Tx label={"Tone Variants (md size, dark theme)"} />}
				>
					{tones.map((tone) => (
						<Row
							key={`tone-${tone}`}
							label={<Tx label={tone} />}
						>
							<div className="w-full max-w-md">
								<Progress
									value={65}
									cls={({ what }) => ({
										variant: what.variant({
											tone,
											size: "md",
											theme: "dark",
										}),
									})}
								/>
							</div>
						</Row>
					))}
				</Section>

				<Section
					title={
						<Tx
							label={"Size Variants (primary tone, light theme)"}
						/>
					}
				>
					{sizes.map((size) => (
						<Row
							key={`size-${size}`}
							label={<Tx label={size} />}
						>
							<div className="w-full max-w-md">
								<Progress
									value={65}
									cls={({ what }) => ({
										variant: what.variant({
											tone: "primary",
											size,
											theme: "light",
										}),
									})}
								/>
							</div>
						</Row>
					))}
				</Section>

				<Section title={<Tx label={"Different Values"} />}>
					<Row label={<Tx label={"25%"} />}>
						<div className="w-full max-w-md">
							<Progress
								value={25}
								cls={({ what }) => ({
									variant: what.variant({
										tone: "primary",
										size: "md",
										theme: "light",
									}),
								})}
							/>
						</div>
					</Row>
					<Row label={<Tx label={"50%"} />}>
						<div className="w-full max-w-md">
							<Progress
								value={50}
								cls={({ what }) => ({
									variant: what.variant({
										tone: "secondary",
										size: "md",
										theme: "light",
									}),
								})}
							/>
						</div>
					</Row>
					<Row label={<Tx label={"75%"} />}>
						<div className="w-full max-w-md">
							<Progress
								value={75}
								cls={({ what }) => ({
									variant: what.variant({
										tone: "warning",
										size: "md",
										theme: "light",
									}),
								})}
							/>
						</div>
					</Row>
					<Row label={<Tx label={"100%"} />}>
						<div className="w-full max-w-md">
							<Progress
								value={100}
								cls={({ what }) => ({
									variant: what.variant({
										tone: "primary",
										size: "md",
										theme: "light",
									}),
								})}
							/>
						</div>
					</Row>
				</Section>

				<Section
					title={<Tx label={"Combined Examples (Light Theme)"} />}
				>
					<Row label={<Tx label={"Danger Large"} />}>
						<div className="w-full max-w-md">
							<Progress
								value={80}
								cls={({ what }) => ({
									variant: what.variant({
										tone: "danger",
										size: "lg",
										theme: "light",
									}),
								})}
							/>
						</div>
					</Row>
					<Row label={<Tx label={"Subtle Small"} />}>
						<div className="w-full max-w-md">
							<Progress
								value={30}
								cls={({ what }) => ({
									variant: what.variant({
										tone: "subtle",
										size: "sm",
										theme: "light",
									}),
								})}
							/>
						</div>
					</Row>
					<Row label={<Tx label={"Neutral Extra Small"} />}>
						<div className="w-full max-w-md">
							<Progress
								value={45}
								cls={({ what }) => ({
									variant: what.variant({
										tone: "neutral",
										size: "xs",
										theme: "light",
									}),
								})}
							/>
						</div>
					</Row>
				</Section>

				<Section
					title={<Tx label={"Combined Examples (Dark Theme)"} />}
				>
					<Row label={<Tx label={"Danger Large"} />}>
						<div className="w-full max-w-md">
							<Progress
								value={80}
								cls={({ what }) => ({
									variant: what.variant({
										tone: "danger",
										size: "lg",
										theme: "dark",
									}),
								})}
							/>
						</div>
					</Row>
					<Row label={<Tx label={"Subtle Small"} />}>
						<div className="w-full max-w-md">
							<Progress
								value={30}
								cls={({ what }) => ({
									variant: what.variant({
										tone: "subtle",
										size: "sm",
										theme: "dark",
									}),
								})}
							/>
						</div>
					</Row>
					<Row label={<Tx label={"Neutral Extra Small"} />}>
						<div className="w-full max-w-md">
							<Progress
								value={45}
								cls={({ what }) => ({
									variant: what.variant({
										tone: "neutral",
										size: "xs",
										theme: "dark",
									}),
								})}
							/>
						</div>
					</Row>
				</Section>
			</div>
		);
	},
});

function Section({
	title,
	children,
}: {
	title: React.ReactNode;
	children: React.ReactNode;
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
				])}
			>
				{title}
			</div>
			<div
				className={tvc([
					"flex",
					"flex-col",
					"gap-3",
				])}
			>
				{children}
			</div>
		</div>
	);
}

function Row({
	label,
	children,
}: {
	label: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<div
			className={tvc([
				"flex",
				"items-center",
				"gap-4",
			])}
		>
			<div
				className={tvc([
					"w-40",
					"text-slate-500",
				])}
			>
				{label}
			</div>
			<div
				className={tvc([
					"flex-1",
				])}
			>
				{children}
			</div>
		</div>
	);
}
