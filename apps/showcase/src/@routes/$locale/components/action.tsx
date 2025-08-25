import { createFileRoute } from "@tanstack/react-router";
import { Action, TrashIcon, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/cls";
import type { ReactNode } from "react";

const tones = [
	"primary",
	"secondary",
	"danger",
	"warning",
	"neutral",
	"subtle",
] as const;

const themes = [
	"light",
	"dark",
] as const;

const sizes = [
	"xs",
	"sm",
	"md",
	"lg",
] as const;

export const Route = createFileRoute("/$locale/components/action")({
	component() {
		return (
			<div
				className={tvc([
					"flex",
					"flex-col",
					"space-y-8",
				])}
			>
				{/* Sizes */}
				<Section title={<Tx label={"Sizes"} />}>
					<div className="grid grid-cols-2 gap-8">
						{themes.map((theme) => (
							<div
								key={`sizes-${theme}`}
								className="flex flex-col space-y-3"
							>
								<div className="text-sm font-medium text-slate-600">
									<Tx label={`${theme} theme`} />
								</div>
								<div className="flex flex-col items-center space-y-2">
									{sizes.map((size) => (
										<Action
											key={`size-${size}-${theme}`}
											iconEnabled={TrashIcon}
											cls={({ what }) => ({
												variant: what.variant({
													tone: "primary",
													theme,
													size,
												}),
											})}
										/>
									))}
								</div>
							</div>
						))}
					</div>
				</Section>

				{/* Tones - Light Theme */}
				<Section title={<Tx label={"Tones - Light Theme"} />}>
					<div className="grid grid-cols-4 gap-6">
						<Column label={<Tx label={"Default"} />}>
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
						</Column>

						<Column label={<Tx label={"Borderless"} />}>
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
						</Column>

						<Column label={<Tx label={"Disabled"} />}>
							{tones.map((tone) => (
								<Action
									key={`tone-light-disabled-${tone}`}
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
						</Column>

						<Column label={<Tx label={"Loading"} />}>
							{tones.map((tone) => (
								<Action
									key={`tone-light-loading-${tone}`}
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
						</Column>
					</div>
				</Section>

				{/* Tones - Dark Theme */}
				<Section title={<Tx label={"Tones - Dark Theme"} />}>
					<div className="grid grid-cols-4 gap-6">
						<Column label={<Tx label={"Default"} />}>
							{tones.map((tone) => (
								<Action
									key={`tone-dark-${tone}`}
									iconEnabled={TrashIcon}
									cls={({ what }) => ({
										variant: what.variant({
											tone,
											theme: "dark",
										}),
									})}
								/>
							))}
						</Column>

						<Column label={<Tx label={"Borderless"} />}>
							{tones.map((tone) => (
								<Action
									key={`tone-dark-borderless-${tone}`}
									iconEnabled={TrashIcon}
									cls={({ what }) => ({
										variant: what.variant({
											tone,
											theme: "dark",
											borderless: true,
										}),
									})}
								/>
							))}
						</Column>

						<Column label={<Tx label={"Disabled"} />}>
							{tones.map((tone) => (
								<Action
									key={`tone-dark-disabled-${tone}`}
									disabled
									iconDisabled={TrashIcon}
									cls={({ what }) => ({
										variant: what.variant({
											tone,
											theme: "dark",
										}),
									})}
								/>
							))}
						</Column>

						<Column label={<Tx label={"Loading"} />}>
							{tones.map((tone) => (
								<Action
									key={`tone-dark-loading-${tone}`}
									loading
									iconEnabled={TrashIcon}
									cls={({ what }) => ({
										variant: what.variant({
											tone,
											theme: "dark",
										}),
									})}
								/>
							))}
						</Column>
					</div>
				</Section>

				{/* Combined States */}
				<Section title={<Tx label={"Combined States"} />}>
					<div className="grid grid-cols-2 gap-8">
						{themes.map((theme) => (
							<div
								key={`combined-${theme}`}
								className="flex flex-col space-y-3"
							>
								<div className="text-sm font-medium text-slate-600">
									<Tx label={`${theme} theme`} />
								</div>
								<div className="grid grid-cols-3 gap-4">
									<Column
										label={
											<Tx
												label={"Borderless + Disabled"}
											/>
										}
									>
										{tones.map((tone) => (
											<Action
												key={`combined-${theme}-${tone}-borderless-disabled`}
												disabled
												iconDisabled={TrashIcon}
												cls={({ what }) => ({
													variant: what.variant({
														tone,
														theme,
														borderless: true,
													}),
												})}
											/>
										))}
									</Column>

									<Column
										label={
											<Tx
												label={"Borderless + Loading"}
											/>
										}
									>
										{tones.map((tone) => (
											<Action
												key={`combined-${theme}-${tone}-borderless-loading`}
												loading
												iconEnabled={TrashIcon}
												cls={({ what }) => ({
													variant: what.variant({
														tone,
														theme,
														borderless: true,
													}),
												})}
											/>
										))}
									</Column>

									<Column
										label={
											<Tx label={"Disabled + Loading"} />
										}
									>
										{tones.map((tone) => (
											<Action
												key={`combined-${theme}-${tone}-disabled-loading`}
												disabled
												loading
												iconDisabled={TrashIcon}
												cls={({ what }) => ({
													variant: what.variant({
														tone,
														theme,
													}),
												})}
											/>
										))}
									</Column>
								</div>
							</div>
						))}
					</div>
				</Section>

				{/* Complete Combinations */}
				<Section title={<Tx label={"Complete Combinations"} />}>
					<div className="grid grid-cols-2 gap-8">
						{themes.map((theme) => (
							<div
								key={`complete-${theme}`}
								className="flex flex-col space-y-3"
							>
								<div className="text-sm font-medium text-slate-600">
									<Tx label={`${theme} theme`} />
								</div>
								<div className="flex flex-col items-center space-y-2">
									{tones.map((tone) => (
										<Action
											key={`complete-${tone}-${theme}`}
											iconEnabled={TrashIcon}
											cls={({ what }) => ({
												variant: what.variant({
													tone,
													theme,
													borderless: false,
												}),
											})}
										/>
									))}
								</div>
							</div>
						))}
					</div>
				</Section>
			</div>
		);
	},
});

function Section({
	title,
	children,
}: {
	title: ReactNode;
	children: ReactNode;
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
					"font-medium",
				])}
			>
				{title}
			</div>
			{children}
		</div>
	);
}

function Column({
	label,
	children,
}: {
	label: ReactNode;
	children: ReactNode;
}) {
	return (
		<div className="flex flex-col space-y-2">
			<div className="text-xs text-slate-500 font-medium">{label}</div>
			<div className="flex flex-col items-center space-y-2">
				{children}
			</div>
		</div>
	);
}
