import { createFileRoute } from "@tanstack/react-router";
import { Progress, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/cls";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

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

const themes = [
	"light",
	"dark",
] as const;

export const Route = createFileRoute("/$locale/components/progress")({
	component() {
		const [progressValue, setProgressValue] = useState(0);

		useEffect(() => {
			const interval = setInterval(() => {
				setProgressValue((prev) => {
					if (prev > 100) {
						return 0;
					}
					return prev + 10;
				});
			}, 500);

			return () => clearInterval(interval);
		}, []);

		return (
			<div
				className={tvc([
					"flex",
					"flex-col",
					"space-y-8",
					"w-full",
				])}
			>
				{/* Tones - Light Theme */}
				<Section title={<Tx label={"Tones - Light Theme"} />}>
					<div className="grid grid-cols-3 gap-6">
						{tones.map((tone) => (
							<Column
								key={`tone-light-${tone}`}
								label={tone}
							>
								<div className="w-full max-w-md">
									<Progress
										value={progressValue}
										tweak={{
											variant: {
												tone,
												size: "md",
												theme: "light",
											},
										}}
									/>
								</div>
							</Column>
						))}
					</div>
				</Section>

				{/* Tones - Dark Theme */}
				<Section title={<Tx label={"Tones - Dark Theme"} />}>
					<div className="grid grid-cols-3 gap-6">
						{tones.map((tone) => (
							<Column
								key={`tone-dark-${tone}`}
								label={tone}
							>
								<div className="w-full max-w-md">
									<Progress
										value={progressValue}
										tweak={{
											variant: {
												tone,
												size: "md",
												theme: "dark",
											},
										}}
									/>
								</div>
							</Column>
						))}
					</div>
				</Section>

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
								<div className="grid grid-cols-4 gap-4">
									{sizes.map((size) => (
										<Column
											key={`size-${size}`}
											label={size}
										>
											<div className="w-full max-w-md">
												<Progress
													value={progressValue}
													tweak={{
														variant: {
															tone: "primary",
															size,
															theme,
														},
													}}
												/>
											</div>
										</Column>
									))}
								</div>
							</div>
						))}
					</div>
				</Section>

				{/* Different Values */}
				<Section title={<Tx label={"Different Values"} />}>
					<div className="grid grid-cols-4 gap-6">
						<Column label={<Tx label={"25%"} />}>
							<div className="w-full max-w-md">
								<Progress
									value={25}
									tweak={{
										variant: {
											tone: "primary",
											size: "md",
											theme: "light",
										},
									}}
								/>
							</div>
						</Column>
						<Column label={<Tx label={"50%"} />}>
							<div className="w-full max-w-md">
								<Progress
									value={50}
									tweak={{
										variant: {
											tone: "secondary",
											size: "md",
											theme: "light",
										},
									}}
								/>
							</div>
						</Column>
						<Column label={<Tx label={"75%"} />}>
							<div className="w-full max-w-md">
								<Progress
									value={75}
									tweak={{
										variant: {
											tone: "warning",
											size: "md",
											theme: "light",
										},
									}}
								/>
							</div>
						</Column>
						<Column label={<Tx label={"100%"} />}>
							<div className="w-full max-w-md">
								<Progress
									value={100}
									tweak={{
										variant: {
											tone: "primary",
											size: "md",
											theme: "light",
										},
									}}
								/>
							</div>
						</Column>
					</div>
				</Section>

				{/* Combined Examples - Light Theme */}
				<Section
					title={<Tx label={"Combined Examples - Light Theme"} />}
				>
					<div className="grid grid-cols-3 gap-6">
						<Column label={<Tx label={"Danger Large"} />}>
							<div className="w-full max-w-md">
								<Progress
									value={progressValue}
									tweak={{
										variant: {
											tone: "danger",
											size: "lg",
											theme: "light",
										},
									}}
								/>
							</div>
						</Column>
						<Column label={<Tx label={"Subtle Small"} />}>
							<div className="w-full max-w-md">
								<Progress
									value={progressValue}
									tweak={{
										variant: {
											tone: "subtle",
											size: "sm",
											theme: "light",
										},
									}}
								/>
							</div>
						</Column>
						<Column label={<Tx label={"Neutral Extra Small"} />}>
							<div className="w-full max-w-md">
								<Progress
									value={progressValue}
									tweak={{
										variant: {
											tone: "neutral",
											size: "xs",
											theme: "light",
										},
									}}
								/>
							</div>
						</Column>
					</div>
				</Section>

				{/* Combined Examples - Dark Theme */}
				<Section
					title={<Tx label={"Combined Examples - Dark Theme"} />}
				>
					<div className="grid grid-cols-3 gap-6">
						<Column label={<Tx label={"Danger Large"} />}>
							<div className="w-full max-w-md">
								<Progress
									value={progressValue}
									tweak={{
										variant: {
											tone: "danger",
											size: "lg",
											theme: "dark",
										},
									}}
								/>
							</div>
						</Column>
						<Column label={<Tx label={"Subtle Small"} />}>
							<div className="w-full max-w-md">
								<Progress
									value={progressValue}
									tweak={{
										variant: {
											tone: "subtle",
											size: "sm",
											theme: "dark",
										},
									}}
								/>
							</div>
						</Column>
						<Column label={<Tx label={"Neutral Extra Small"} />}>
							<div className="w-full max-w-md">
								<Progress
									value={progressValue}
									tweak={{
										variant: {
											tone: "neutral",
											size: "xs",
											theme: "dark",
										},
									}}
								/>
							</div>
						</Column>
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
								<div className="grid grid-cols-3 gap-4">
									{tones.map((tone) => (
										<Column
											key={`complete-${tone}-${theme}`}
											label={tone}
										>
											<div className="w-full max-w-md">
												<Progress
													value={progressValue}
													tweak={{
														variant: {
															size: "md",
															tone,
															theme,
														},
													}}
												/>
											</div>
										</Column>
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
