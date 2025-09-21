import { createFileRoute } from "@tanstack/react-router";
import { BoolInput } from "@use-pico/client";
import { useState } from "react";

export const Route = createFileRoute("/$locale/components/bool-input")({
	component() {
		const [basicValue, setBasicValue] = useState(false);
		const [withLabelValue, setWithLabelValue] = useState(true);
		const [withDescriptionValue, setWithDescriptionValue] = useState(false);
		const [withStatusValue, setWithStatusValue] = useState(true);
		const [withStatusAndDescValue, setWithStatusAndDescValue] =
			useState(false);
		const [smallValue, setSmallValue] = useState(true);
		const [mediumValue, setMediumValue] = useState(false);
		const [largeValue, setLargeValue] = useState(true);
		const [neutralValue, setNeutralValue] = useState(false);
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

					{/* With Status Text */}
					<div className="p-4 border rounded-lg">
						<h3 className="text-lg font-semibold mb-2">
							With Status Text
						</h3>
						<BoolInput
							value={withStatusValue}
							onChange={setWithStatusValue}
							label="Auto-save"
							textOn="Enabled"
							textOff="Disabled"
						/>
					</div>

					{/* With Status Text and Description */}
					<div className="p-4 border rounded-lg">
						<h3 className="text-lg font-semibold mb-2">
							With Status Text and Description
						</h3>
						<BoolInput
							value={withStatusAndDescValue}
							onChange={setWithStatusAndDescValue}
							label="Notifications"
							description="Receive email notifications for updates"
							textOn="Active"
							textOff="Inactive"
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
								tweak={{
									variant: {
										size: "sm",
									},
								}}
							/>
							<BoolInput
								value={mediumValue}
								onChange={setMediumValue}
								label="Medium toggle (default)"
								tweak={{
									variant: {
										size: "md",
									},
								}}
							/>
							<BoolInput
								value={largeValue}
								onChange={setLargeValue}
								label="Large toggle"
								tweak={{
									variant: {
										size: "lg",
									},
								}}
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
								value={neutralValue}
								onChange={setNeutralValue}
								label="Neutral tone (default)"
								tweak={{
									variant: {
										tone: "neutral",
									},
								}}
							/>
							<BoolInput
								value={primaryValue}
								onChange={setPrimaryValue}
								label="Primary tone"
								tweak={{
									variant: {
										tone: "primary",
									},
								}}
							/>
							<BoolInput
								value={dangerValue}
								onChange={setDangerValue}
								label="Danger tone"
								tweak={{
									variant: {
										tone: "danger",
									},
								}}
							/>
							<BoolInput
								value={warningValue}
								onChange={setWarningValue}
								label="Warning tone"
								tweak={{
									variant: {
										tone: "warning",
									},
								}}
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
