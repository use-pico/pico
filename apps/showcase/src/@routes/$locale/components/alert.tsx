import { createFileRoute } from "@tanstack/react-router";
import { Alert, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/cls";

export const Route = createFileRoute("/$locale/components/alert")({
	component() {
		const tones = [
			"primary",
			"secondary",
			"danger",
			"warning",
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
				<Section title={<Tx label={"Light Theme - Title Only"} />}>
					{tones.map((tone) => (
						<Row
							key={`tone-light-title-${tone}`}
							label={<Tx label={tone} />}
						>
							<Alert
								title={`${tone} alert`}
								tweak={{
									variant: {
										tone,
										theme: "light",
									},
								}}
							/>
						</Row>
					))}
				</Section>

				<Section title={<Tx label={"Light Theme - Title + Icon"} />}>
					{tones.map((tone) => (
						<Row
							key={`tone-light-icon-${tone}`}
							label={<Tx label={tone} />}
						>
							<Alert
								icon="icon-[ph--info]"
								title={`${tone} alert with icon`}
								tweak={{
									variant: {
										tone,
										theme: "light",
									},
								}}
							/>
						</Row>
					))}
				</Section>

				<Section title={<Tx label={"Light Theme - Title + Message"} />}>
					{tones.map((tone) => (
						<Row
							key={`tone-light-message-${tone}`}
							label={<Tx label={tone} />}
						>
							<Alert
								title={`${tone} alert`}
								message={`This is a ${tone} alert with a descriptive message that provides additional context and information.`}
								tweak={{
									variant: {
										tone,
										theme: "light",
									},
								}}
							/>
						</Row>
					))}
				</Section>

				<Section
					title={
						<Tx label={"Light Theme - Title + Icon + Message"} />
					}
				>
					{tones.map((tone) => (
						<Row
							key={`tone-light-full-${tone}`}
							label={<Tx label={tone} />}
						>
							<Alert
								icon="icon-[ph--info]"
								title={`${tone} alert`}
								message={`This is a ${tone} alert with both an icon and a descriptive message that provides additional context and information.`}
								tweak={{
									variant: {
										tone,
										theme: "light",
									},
								}}
							/>
						</Row>
					))}
				</Section>

				<Section title={<Tx label={"Light Theme - Clickable"} />}>
					{tones.map((tone) => (
						<Row
							key={`tone-light-clickable-${tone}`}
							label={<Tx label={tone} />}
						>
							<Alert
								icon="icon-[ph--info]"
								title={`${tone} clickable alert`}
								message={`This ${tone} alert is clickable and can be used for interactive notifications.`}
								onClick={() => {}}
								tweak={{
									variant: {
										tone,
										theme: "light",
									},
								}}
							/>
						</Row>
					))}
				</Section>

				<Section title={<Tx label={"Dark Theme - Title Only"} />}>
					{tones.map((tone) => (
						<Row
							key={`tone-dark-title-${tone}`}
							label={<Tx label={tone} />}
						>
							<Alert
								title={`${tone} alert`}
								tweak={{
									variant: {
										tone,
									},
								}}
							/>
						</Row>
					))}
				</Section>

				<Section title={<Tx label={"Dark Theme - Title + Icon"} />}>
					{tones.map((tone) => (
						<Row
							key={`tone-dark-icon-${tone}`}
							label={<Tx label={tone} />}
						>
							<Alert
								icon="icon-[ph--info]"
								title={`${tone} alert with icon`}
								tweak={{
									variant: {
										tone,
									},
								}}
							/>
						</Row>
					))}
				</Section>

				<Section title={<Tx label={"Dark Theme - Title + Message"} />}>
					{tones.map((tone) => (
						<Row
							key={`tone-dark-message-${tone}`}
							label={<Tx label={tone} />}
						>
							<Alert
								title={`${tone} alert`}
								message={`This is a ${tone} alert with a descriptive message that provides additional context and information.`}
								tweak={{
									variant: {
										tone,
									},
								}}
							/>
						</Row>
					))}
				</Section>

				<Section
					title={<Tx label={"Dark Theme - Title + Icon + Message"} />}
				>
					{tones.map((tone) => (
						<Row
							key={`tone-dark-full-${tone}`}
							label={<Tx label={tone} />}
						>
							<Alert
								icon="icon-[ph--info]"
								title={`${tone} alert`}
								message={`This is a ${tone} alert with both an icon and a descriptive message that provides additional context and information.`}
								tweak={{
									variant: {
										tone,
									},
								}}
							/>
						</Row>
					))}
				</Section>

				<Section title={<Tx label={"Dark Theme - Clickable"} />}>
					{tones.map((tone) => (
						<Row
							key={`tone-dark-clickable-${tone}`}
							label={<Tx label={tone} />}
						>
							<Alert
								icon="icon-[ph--info]"
								title={`${tone} clickable alert`}
								message={`This ${tone} alert is clickable and can be used for interactive notifications.`}
								onClick={() => {}}
								tweak={{
									variant: {
										tone,
									},
								}}
							/>
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
				"flex-col",
				"gap-2",
			])}
		>
			<div
				className={tvc([
					"text-sm",
					"text-slate-500",
					"font-medium",
				])}
			>
				{label}
			</div>
			<div
				className={tvc([
					"w-full",
				])}
			>
				{children}
			</div>
		</div>
	);
}
