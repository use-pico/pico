import { createFileRoute } from "@tanstack/react-router";
import { Alert, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/cls";

export const Route = createFileRoute("/$locale/components/alert")({
	component() {
		const tones = [
			"primary",
			"secondary",
			"danger",
			"neutral",
			"subtle",
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
				<Section title={<Tx label={"Default (dark)"} />}>
					{tones.map((tone) => (
						<Row
							key={`tone-${tone}`}
							label={<Tx label={tone} />}
						>
							<Alert
								title={`${tone} title`}
								message={`${tone} message`}
								cls={({ what }) => ({
									variant: what.variant({
										tone,
									}),
								})}
							>
								<Tx label={`${tone}`} />
							</Alert>
						</Row>
					))}
				</Section>

				<Section title={<Tx label={"Light"} />}>
					{tones.map((tone) => (
						<Row
							key={`tone-light-${tone}`}
							label={<Tx label={`${tone} light`} />}
						>
							<Alert
								title={`${tone} light title`}
								message={`${tone} light message`}
								cls={({ what }) => ({
									variant: what.variant({
										tone,
										light: true,
									}),
								})}
							>
								<Tx label={`${tone} light`} />
							</Alert>
						</Row>
					))}
				</Section>

				<Section title={<Tx label={"Clickable (dark)"} />}>
					{tones.map((tone) => (
						<Row
							key={`tone-clickable-${tone}`}
							label={<Tx label={`${tone} clickable`} />}
						>
							<Alert
								title={`${tone} clickable title`}
								message={`${tone} clickable message`}
								cls={({ what }) => ({
									variant: what.variant({
										tone,
									}),
								})}
								onClick={() => {}}
							>
								<Tx label={`${tone} clickable`} />
							</Alert>
						</Row>
					))}
				</Section>

				<Section title={<Tx label={"Clickable light"} />}>
					{tones.map((tone) => (
						<Row
							key={`tone-clickable-light-${tone}`}
							label={<Tx label={`${tone} clickable light`} />}
						>
							<Alert
								title={`${tone} clickable light title`}
								message={`${tone} clickable light message`}
								cls={({ what }) => ({
									variant: what.variant({
										tone,
										light: true,
									}),
								})}
								onClick={() => {}}
							>
								<Tx label={`${tone} clickable light`} />
							</Alert>
						</Row>
					))}
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
