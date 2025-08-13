import { createFileRoute } from "@tanstack/react-router";
import { Action, TrashIcon, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/cls";

export const Route = createFileRoute("/$locale/components/action")({
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
				])}
			>
				{/* Tones */}
				<Section title={<Tx label={"Tones"} />}>
					<Row label={<Tx label={"Default"} />}>
						{tones.map((tone) => (
							<Action
								key={`tone-${tone}`}
								iconEnabled={TrashIcon}
								cls={({ what }) => ({
									variant: what.variant({
										tone,
									}),
								})}
							/>
						))}
					</Row>

					<Row label={<Tx label={"Borderless"} />}>
						{tones.map((tone) => (
							<Action
								key={`tone-borderless-${tone}`}
								iconEnabled={TrashIcon}
								cls={({ what }) => ({
									variant: what.variant({
										tone,
										borderless: true,
									}),
								})}
							/>
						))}
					</Row>

					<Row label={<Tx label={"Light"} />}>
						{tones.map((tone) => (
							<Action
								key={`tone-light-${tone}`}
								iconEnabled={TrashIcon}
								cls={({ what }) => ({
									variant: what.variant({
										tone,
										theme: "light",
									}),
								})}
							/>
						))}
					</Row>

					<Row label={<Tx label={"Light + Borderless"} />}>
						{tones.map((tone) => (
							<Action
								key={`tone-light-borderless-${tone}`}
								iconEnabled={TrashIcon}
								cls={({ what }) => ({
									variant: what.variant({
										tone,
										theme: "light",
										borderless: true,
									}),
								})}
							/>
						))}
					</Row>
				</Section>

				{/* Disabled */}
				<Section title={<Tx label={"Disabled"} />}>
					<Row label={<Tx label={"Default"} />}>
						{tones.map((tone) => (
							<Action
								key={`disabled-${tone}`}
								disabled
								iconDisabled={TrashIcon}
								cls={({ what }) => ({
									variant: what.variant({
										tone,
									}),
								})}
							/>
						))}
					</Row>
					<Row label={<Tx label={"Light"} />}>
						{tones.map((tone) => (
							<Action
								key={`disabled-light-${tone}`}
								disabled
								iconDisabled={TrashIcon}
								cls={({ what }) => ({
									variant: what.variant({
										tone,
										theme: "light",
									}),
								})}
							/>
						))}
					</Row>
				</Section>

				{/* Loading */}
				<Section title={<Tx label={"Loading"} />}>
					<Row label={<Tx label={"Default"} />}>
						{tones.map((tone) => (
							<Action
								key={`loading-${tone}`}
								loading
								iconEnabled={TrashIcon}
								cls={({ what }) => ({
									variant: what.variant({
										tone,
									}),
								})}
							/>
						))}
					</Row>
					<Row label={<Tx label={"Light"} />}>
						{tones.map((tone) => (
							<Action
								key={`loading-light-${tone}`}
								loading
								iconEnabled={TrashIcon}
								cls={({ what }) => ({
									variant: what.variant({
										tone,
										theme: "light",
									}),
								})}
							/>
						))}
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
			{children}
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
				"flex-wrap",
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
					"flex",
					"gap-3",
					"flex-wrap",
				])}
			>
				{children}
			</div>
		</div>
	);
}
