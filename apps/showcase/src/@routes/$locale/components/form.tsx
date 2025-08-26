import { createFileRoute } from "@tanstack/react-router";
import { Button, FormError, FormField, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/cls";
import type { ReactNode } from "react";
import { useId } from "react";

// Sample form data for demonstrations
const sampleMeta = {
	isDirty: false,
	isTouched: false,
	errors: undefined,
};

const errorMeta = {
	isDirty: true,
	isTouched: true,
	errors: [
		{
			message: "This field is required",
		},
	],
};

const multipleErrorsMeta = {
	isDirty: true,
	isTouched: true,
	errors: [
		{
			message: "Email must be valid",
		},
		{
			message: "Email already exists",
		},
	],
};

export const Route = createFileRoute("/$locale/components/form")({
	component() {
		const basicUsernameId = useId();
		const basicEmailId = useId();
		const errorEmailId = useId();
		const multipleErrorsEmailId = useId();
		const disabledUsernameId = useId();
		const disabledErrorEmailId = useId();
		const exampleUsernameId = useId();
		const exampleEmailId = useId();
		const examplePasswordId = useId();
		const exampleConfirmPasswordId = useId();

		return (
			<div
				className={tvc([
					"flex",
					"flex-col",
					"space-y-8",
					"w-full",
				])}
			>
				{/* Basic Usage */}
				<Section title={<Tx label={"Basic Usage"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Basic Form Field"} />}>
							<FormField
								name="basic-username"
								label="Username"
								hint="Enter your username"
								meta={sampleMeta}
								id={basicUsernameId}
							>
								{(props) => (
									<input
										type="text"
										placeholder="Enter username"
										{...props}
									/>
								)}
							</FormField>
						</Column>
						<Column label={<Tx label={"Required Field"} />}>
							<FormField
								name="basic-email"
								label="Email Address"
								required
								meta={sampleMeta}
								id={basicEmailId}
							>
								{(props) => (
									<input
										type="email"
										placeholder="Enter email"
										{...props}
									/>
								)}
							</FormField>
						</Column>
					</div>
				</Section>

				{/* Error States */}
				<Section title={<Tx label={"Error States"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Single Error"} />}>
							<FormField
								name="error-email"
								label="Email Address"
								meta={errorMeta}
								required
								id={errorEmailId}
							>
								{(props) => (
									<input
										type="email"
										placeholder="Enter email"
										{...props}
									/>
								)}
							</FormField>
						</Column>
						<Column label={<Tx label={"Multiple Errors"} />}>
							<FormField
								name="multiple-errors-email"
								label="Email Address"
								meta={multipleErrorsMeta}
								id={multipleErrorsEmailId}
							>
								{(props) => (
									<input
										type="email"
										placeholder="Enter email"
										{...props}
									/>
								)}
							</FormField>
						</Column>
					</div>
				</Section>

				{/* Disabled States */}
				<Section title={<Tx label={"Disabled States"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Disabled Field"} />}>
							<FormField
								name="disabled-username"
								label="Username"
								disabled
								meta={sampleMeta}
								id={disabledUsernameId}
							>
								{(props) => (
									<input
										type="text"
										placeholder="Enter username"
										{...props}
									/>
								)}
							</FormField>
						</Column>
						<Column label={<Tx label={"Disabled with Error"} />}>
							<FormField
								name="disabled-error-email"
								label="Email Address"
								disabled
								meta={errorMeta}
								id={disabledErrorEmailId}
							>
								{(props) => (
									<input
										type="email"
										placeholder="Enter email"
										{...props}
									/>
								)}
							</FormField>
						</Column>
					</div>
				</Section>

				{/* Form Error Component */}
				<Section title={<Tx label={"Form Error Component"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Default Error Display"} />}>
							<FormError meta={errorMeta} />
						</Column>
						<Column label={<Tx label={"Highlighted Error"} />}>
							<FormError meta={errorMeta} />
						</Column>
					</div>
				</Section>

				{/* Multiple Errors */}
				<Section title={<Tx label={"Multiple Errors"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column
							label={<Tx label={"Multiple Errors Default"} />}
						>
							<FormError meta={multipleErrorsMeta} />
						</Column>
						<Column
							label={<Tx label={"Multiple Errors Highlighted"} />}
						>
							<FormError meta={multipleErrorsMeta} />
						</Column>
					</div>
				</Section>

				{/* Real-world Examples */}
				<Section title={<Tx label={"Real-world Examples"} />}>
					<div className="grid grid-cols-1 gap-6">
						<Column label={<Tx label={"Complete Form Example"} />}>
							<div className="space-y-4 max-w-md">
								<FormField
									name="example-username"
									label="Username"
									required
									hint="Choose a unique username"
									meta={errorMeta}
									id={exampleUsernameId}
								>
									{(props) => (
										<input
											type="text"
											placeholder="Enter username"
											{...props}
										/>
									)}
								</FormField>

								<FormField
									name="example-email"
									label="Email Address"
									required
									meta={sampleMeta}
									id={exampleEmailId}
								>
									{(props) => (
										<input
											type="email"
											placeholder="Enter email"
											{...props}
										/>
									)}
								</FormField>

								<FormField
									name="example-password"
									label="Password"
									required
									hint="Minimum 8 characters"
									meta={sampleMeta}
									id={examplePasswordId}
								>
									{(props) => (
										<input
											type="password"
											placeholder="Enter password"
											{...props}
										/>
									)}
								</FormField>

								<FormField
									name="example-confirm-password"
									label="Confirm Password"
									required
									meta={multipleErrorsMeta}
									id={exampleConfirmPasswordId}
								>
									{(props) => (
										<input
											type="password"
											placeholder="Confirm password"
											{...props}
										/>
									)}
								</FormField>

								<div className="flex gap-2">
									<Button
										cls={({ what }) => ({
											variant: what.variant({
												size: "sm",
											}),
										})}
									>
										Submit
									</Button>
									<Button
										cls={({ what }) => ({
											variant: what.variant({
												size: "sm",
												tone: "secondary",
											}),
										})}
									>
										Cancel
									</Button>
								</div>
							</div>
						</Column>
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
