import { createFileRoute } from "@tanstack/react-router";
import { BoolInput } from "@use-pico/client";
import { useState } from "react";

export const Route = createFileRoute("/$locale/components/bool-input")({
	component() {
		const [basicValue, setBasicValue] = useState(false);
		const [withLabelValue, setWithLabelValue] = useState(true);
		const [withDescriptionValue, setWithDescriptionValue] = useState(false);
		const [smallValue, setSmallValue] = useState(true);
		const [largeValue, setLargeValue] = useState(false);
		const [primaryValue, setPrimaryValue] = useState(true);
		const [dangerValue, setDangerValue] = useState(false);
		const [warningValue, setWarningValue] = useState(true);
		const [disabledValue, setDisabledValue] = useState(true);

		return (
			<div className="space-y-8">
				<div>
					<h2 className="text-2xl font-bold mb-4">
						BoolInput Component
					</h2>
					<p className="text-gray-600 mb-6">
						A clean, animated toggle switch component built with
						CLS.
					</p>
				</div>

				<div className="space-y-6">
					{/* Basic Toggle */}
					<div className="p-4 border rounded-lg">
						<h3 className="text-lg font-semibold mb-2">
							Basic Toggle
						</h3>
						<BoolInput
							value={basicValue}
							onChange={setBasicValue}
						/>
					</div>

					{/* With Label */}
					<div className="p-4 border rounded-lg">
						<h3 className="text-lg font-semibold mb-2">
							With Label
						</h3>
						<BoolInput
							value={withLabelValue}
							onChange={setWithLabelValue}
							label="Enable notifications"
						/>
					</div>

					{/* With Description */}
					<div className="p-4 border rounded-lg">
						<h3 className="text-lg font-semibold mb-2">
							With Description
						</h3>
						<BoolInput
							value={withDescriptionValue}
							onChange={setWithDescriptionValue}
							label="Dark mode"
							description="Switch between light and dark themes"
						/>
					</div>

					{/* Different Sizes */}
					<div className="p-4 border rounded-lg">
						<h3 className="text-lg font-semibold mb-2">
							Different Sizes
						</h3>
						<div className="space-y-4">
							<BoolInput
								value={smallValue}
								onChange={setSmallValue}
								label="Small toggle"
								cls={({ what }) => ({
									variant: what.variant({
										size: "sm",
									}),
								})}
							/>
							<BoolInput
								value={basicValue}
								onChange={setBasicValue}
								label="Medium toggle (default)"
								cls={({ what }) => ({
									variant: what.variant({
										size: "md",
									}),
								})}
							/>
							<BoolInput
								value={largeValue}
								onChange={setLargeValue}
								label="Large toggle"
								cls={({ what }) => ({
									variant: what.variant({
										size: "lg",
									}),
								})}
							/>
						</div>
					</div>

					{/* Different Tones */}
					<div className="p-4 border rounded-lg">
						<h3 className="text-lg font-semibold mb-2">
							Different Tones
						</h3>
						<div className="space-y-4">
							<BoolInput
								value={basicValue}
								onChange={setBasicValue}
								label="Neutral tone (default)"
								cls={({ what }) => ({
									variant: what.variant({
										tone: "neutral",
									}),
								})}
							/>
							<BoolInput
								value={primaryValue}
								onChange={setPrimaryValue}
								label="Primary tone"
								cls={({ what }) => ({
									variant: what.variant({
										tone: "primary",
									}),
								})}
							/>
							<BoolInput
								value={dangerValue}
								onChange={setDangerValue}
								label="Danger tone"
								cls={({ what }) => ({
									variant: what.variant({
										tone: "danger",
									}),
								})}
							/>
							<BoolInput
								value={warningValue}
								onChange={setWarningValue}
								label="Warning tone"
								cls={({ what }) => ({
									variant: what.variant({
										tone: "warning",
									}),
								})}
							/>
						</div>
					</div>

					{/* Disabled State */}
					<div className="p-4 border rounded-lg">
						<h3 className="text-lg font-semibold mb-2">
							Disabled State
						</h3>
						<BoolInput
							value={disabledValue}
							onChange={setDisabledValue}
							label="Disabled toggle"
							description="This toggle is disabled and cannot be changed"
							disabled
						/>
					</div>
				</div>
			</div>
		);
	},
});
