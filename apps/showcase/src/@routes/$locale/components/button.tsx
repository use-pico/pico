import { createFileRoute } from "@tanstack/react-router";
import type { PicoCls } from "@use-pico/client";
import {
	ArrowRightIcon,
	Button,
	CheckIcon,
	DownloadIcon,
	EditIcon,
	TrashIcon,
	Tx,
	UploadIcon,
} from "@use-pico/client";
import { type Cls, tvc } from "@use-pico/cls";
import type { ReactNode } from "react";

const tones: Cls.VariantOf<PicoCls, "tone">[] = [
	"primary",
	"secondary",
	"danger",
	"warning",
	"neutral",
	"subtle",
	"link",
];

const sizes = [
	"xs",
	"sm",
	"md",
	"lg",
	"xl",
] as const;

const themes: Cls.VariantOf<PicoCls, "theme">[] = [
	"light",
	"dark",
];

export const Route = createFileRoute("/$locale/components/button")({
	component() {
		return (
			<div
				className={tvc([
					"flex",
					"flex-col",
					"space-y-8",
					"w-full",
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
								<div className="flex items-center justify-center gap-2">
									{sizes.map((size) => (
										<Button
											key={`size-${size}-${theme}`}
											size={size}
											tone={"primary"}
											theme={theme}
											label={size}
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
						<Column label={<Tx label={"Default (Bordered)"} />}>
							{tones.map((tone) => (
								<Button
									key={`tone-light-${tone}`}
									tone={tone}
									theme="light"
									label={tone}
								/>
							))}
						</Column>

						<Column label={<Tx label={"Borderless"} />}>
							{tones.map((tone) => (
								<Button
									key={`tone-light-borderless-${tone}`}
									tone={tone}
									theme="light"
									label={`${tone} borderless`}
									tweak={{
										variant: {
											border: false,
										},
									}}
								/>
							))}
						</Column>

						<Column label={<Tx label={"Disabled"} />}>
							{tones.map((tone) => (
								<Button
									key={`tone-light-disabled-${tone}`}
									disabled
									tone={tone}
									theme="light"
									label={`${tone} disabled`}
								/>
							))}
						</Column>

						<Column label={<Tx label={"Borderless + Disabled"} />}>
							{tones.map((tone) => (
								<Button
									key={`tone-light-borderless-disabled-${tone}`}
									disabled
									tone={tone}
									theme="light"
									label={`${tone} borderless disabled`}
									tweak={{
										variant: {
											border: false,
										},
									}}
								/>
							))}
						</Column>
					</div>
				</Section>

				{/* Tones - Dark Theme */}
				<Section title={<Tx label={"Tones - Dark Theme"} />}>
					<div className="grid grid-cols-4 gap-6">
						<Column label={<Tx label={"Default (Bordered)"} />}>
							{tones.map((tone) => (
								<Button
									key={`tone-dark-${tone}`}
									tone={tone}
									theme="dark"
									label={tone}
								/>
							))}
						</Column>

						<Column label={<Tx label={"Borderless"} />}>
							{tones.map((tone) => (
								<Button
									key={`tone-dark-borderless-${tone}`}
									tone={tone}
									theme="dark"
									label={`${tone} borderless`}
									tweak={{
										variant: {
											border: false,
										},
									}}
								/>
							))}
						</Column>

						<Column label={<Tx label={"Disabled"} />}>
							{tones.map((tone) => (
								<Button
									key={`tone-dark-disabled-${tone}`}
									disabled
									tone={tone}
									theme="dark"
									label={`${tone} disabled`}
								/>
							))}
						</Column>

						<Column label={<Tx label={"Borderless + Disabled"} />}>
							{tones.map((tone) => (
								<Button
									key={`tone-dark-borderless-disabled-${tone}`}
									disabled
									tone={tone}
									theme="dark"
									label={`${tone} borderless disabled`}
									tweak={{
										variant: {
											border: false,
										},
									}}
								/>
							))}
						</Column>
					</div>
				</Section>

				{/* Size Combinations */}
				<Section title={<Tx label={"Size Combinations"} />}>
					<div className="grid grid-cols-2 gap-8">
						{themes.map((theme) => (
							<div
								key={`size-combinations-${theme}`}
								className="flex flex-col space-y-3"
							>
								<div className="text-sm font-medium text-slate-600">
									<Tx label={`${theme} theme`} />
								</div>
								<div className="grid grid-cols-4 gap-2">
									{sizes.map((size) => (
										<Column
											key={`size-${size}`}
											label={size}
										>
											{tones.map((tone) => (
												<Button
													key={`size-combination-${size}-${tone}-${theme}`}
													size={size}
													tone={tone}
													theme={theme}
													label={tone}
												/>
											))}
										</Column>
									))}
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
								<div className="flex flex-col space-y-2">
									{tones.map((tone) => (
										<Button
											key={`complete-${tone}-${theme}`}
											size="md"
											tone={tone}
											theme={theme}
											label={`${tone} ${theme}`}
										/>
									))}
								</div>
							</div>
						))}
					</div>
				</Section>

				{/* Icon Positions */}
				<Section title={<Tx label={"Icon Positions"} />}>
					<div className="grid grid-cols-2 gap-8">
						{themes.map((theme) => (
							<div
								key={`icon-position-${theme}`}
								className="flex flex-col space-y-3"
							>
								<div className="text-sm font-medium text-slate-600">
									<Tx label={`${theme} theme`} />
								</div>
								<div className="flex flex-col space-y-4">
									<Column
										label={
											<Tx label={"Icon Left (default)"} />
										}
									>
										<Button
											tone="primary"
											theme={theme}
											label="Save"
											iconEnabled={CheckIcon}
											iconPosition="left"
										/>
										<Button
											tone="secondary"
											theme={theme}
											label="Download"
											iconEnabled={DownloadIcon}
											iconPosition="left"
										/>
										<Button
											tone="danger"
											theme={theme}
											label="Delete"
											iconEnabled={TrashIcon}
											iconPosition="left"
										/>
										<Button
											tone="warning"
											theme={theme}
											label="Edit"
											iconEnabled={EditIcon}
											iconPosition="left"
										/>
									</Column>

									<Column label={<Tx label={"Icon Right"} />}>
										<Button
											tone="primary"
											theme={theme}
											label="Next"
											iconEnabled={ArrowRightIcon}
											iconPosition="right"
										/>
										<Button
											tone="secondary"
											theme={theme}
											label="Upload"
											iconEnabled={UploadIcon}
											iconPosition="right"
										/>
										<Button
											tone="neutral"
											theme={theme}
											label="Continue"
											iconEnabled={ArrowRightIcon}
											iconPosition="right"
										/>
										<Button
											tone="link"
											theme={theme}
											label="Proceed"
											iconEnabled={ArrowRightIcon}
											iconPosition="right"
										/>
									</Column>
								</div>
							</div>
						))}
					</div>
				</Section>

				{/* Icon Positions with Different Sizes */}
				<Section
					title={<Tx label={"Icon Positions - Size Variations"} />}
				>
					<div className="grid grid-cols-2 gap-8">
						<Column
							label={<Tx label={"Icon Left - Various Sizes"} />}
						>
							{sizes.map((size) => (
								<Button
									key={`icon-left-size-${size}`}
									size={size}
									tone="primary"
									theme="light"
									label={`${size} - Left Icon`}
									iconEnabled={CheckIcon}
									iconPosition="left"
								/>
							))}
						</Column>

						<Column
							label={<Tx label={"Icon Right - Various Sizes"} />}
						>
							{sizes.map((size) => (
								<Button
									key={`icon-right-size-${size}`}
									size={size}
									tone="primary"
									theme="light"
									label={`${size} - Right Icon`}
									iconEnabled={ArrowRightIcon}
									iconPosition="right"
								/>
							))}
						</Column>
					</div>
				</Section>

				{/* Icon Positions - Disabled State */}
				<Section
					title={<Tx label={"Icon Positions - Disabled State"} />}
				>
					<div className="grid grid-cols-2 gap-8">
						{themes.map((theme) => (
							<div
								key={`icon-disabled-${theme}`}
								className="flex flex-col space-y-3"
							>
								<div className="text-sm font-medium text-slate-600">
									<Tx label={`${theme} theme`} />
								</div>
								<div className="flex flex-col space-y-4">
									<Column
										label={
											<Tx
												label={"Disabled - Icon Left"}
											/>
										}
									>
										<Button
											disabled
											tone="primary"
											theme={theme}
											label="Disabled Left"
											iconEnabled={CheckIcon}
											iconDisabled={CheckIcon}
											iconPosition="left"
										/>
									</Column>

									<Column
										label={
											<Tx
												label={"Disabled - Icon Right"}
											/>
										}
									>
										<Button
											disabled
											tone="primary"
											theme={theme}
											label="Disabled Right"
											iconEnabled={ArrowRightIcon}
											iconDisabled={ArrowRightIcon}
											iconPosition="right"
										/>
									</Column>
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
			<div className="flex flex-col space-y-2">{children}</div>
		</div>
	);
}
