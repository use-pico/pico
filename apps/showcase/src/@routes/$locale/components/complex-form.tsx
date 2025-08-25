import { createFileRoute } from "@tanstack/react-router";
import { Button, FormField, Tx } from "@use-pico/client";
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

const _successMeta = {
	isDirty: true,
	isTouched: true,
	errors: undefined,
};

export const Route = createFileRoute("/$locale/components/complex-form")({
	component() {
		const firstNameId = useId();
		const lastNameId = useId();
		const emailId = useId();
		const phoneId = useId();
		const ageId = useId();
		const salaryId = useId();
		const birthDateId = useId();
		const startDateId = useId();
		const workStartId = useId();
		const workEndId = useId();
		const meetingTimeId = useId();
		const deadlineId = useId();
		const profilePhotoId = useId();
		const resumeId = useId();
		const documentsId = useId();
		const websiteId = useId();
		const linkedinId = useId();
		const githubId = useId();
		const experienceYearsId = useId();
		const experienceYearsValueId = useId();
		const preferredColorId = useId();
		const satisfactionId = useId();
		const satisfactionValueId = useId();
		const searchSkillsId = useId();
		const currentPasswordId = useId();
		const newPasswordId = useId();
		const confirmPasswordId = useId();

		return (
			<div
				className={tvc([
					"flex",
					"flex-col",
					"space-y-8",
					"w-full",
				])}
			>
				{/* Personal Information Section */}
				<Section title={<Tx label={"Personal Information"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Basic Text Inputs"} />}>
							<div className="space-y-4">
								<FormField
									name="first-name"
									label="First Name"
									required
									meta={sampleMeta}
								>
									<input
										type="text"
										id={firstNameId}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="Enter first name"
									/>
								</FormField>

								<FormField
									name="last-name"
									label="Last Name"
									required
									meta={errorMeta}
								>
									<input
										type="text"
										id={lastNameId}
										className="w-full px-3 py-2 border border-red-300 rounded-md bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500"
										placeholder="Enter last name"
									/>
								</FormField>

								<FormField
									name="email"
									label="Email Address"
									required
									hint="We'll never share your email"
									meta={multipleErrorsMeta}
								>
									<input
										type="email"
										id={emailId}
										className="w-full px-3 py-2 border border-red-300 rounded-md bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500"
										placeholder="Enter email address"
									/>
								</FormField>
							</div>
						</Column>

						<Column label={<Tx label={"Contact & Numbers"} />}>
							<div className="space-y-4">
								<FormField
									name="phone"
									label="Phone Number"
									meta={sampleMeta}
								>
									<input
										type="tel"
										id={phoneId}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="+1 (555) 123-4567"
									/>
								</FormField>

								<FormField
									name="age"
									label="Age"
									meta={sampleMeta}
								>
									<input
										type="number"
										id={ageId}
										min="0"
										max="120"
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="Enter age"
									/>
								</FormField>

								<FormField
									name="salary"
									label="Annual Salary"
									hint="Enter amount in USD"
									meta={sampleMeta}
								>
									<input
										type="number"
										id={salaryId}
										min="0"
										step="1000"
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="50000"
									/>
								</FormField>
							</div>
						</Column>
					</div>
				</Section>

				{/* Dates and Time Section */}
				<Section title={<Tx label={"Dates and Time"} />}>
					<div className="grid grid-cols-3 gap-6">
						<Column label={<Tx label={"Date Inputs"} />}>
							<div className="space-y-4">
								<FormField
									name="birth-date"
									label="Date of Birth"
									required
									meta={sampleMeta}
								>
									<input
										type="date"
										id={birthDateId}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									/>
								</FormField>

								<FormField
									name="start-date"
									label="Employment Start Date"
									meta={sampleMeta}
								>
									<input
										type="date"
										id={startDateId}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									/>
								</FormField>
							</div>
						</Column>

						<Column label={<Tx label={"Time Inputs"} />}>
							<div className="space-y-4">
								<FormField
									name="work-start"
									label="Work Start Time"
									meta={sampleMeta}
								>
									<input
										type="time"
										id={workStartId}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									/>
								</FormField>

								<FormField
									name="work-end"
									label="Work End Time"
									meta={sampleMeta}
								>
									<input
										type="time"
										id={workEndId}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									/>
								</FormField>
							</div>
						</Column>

						<Column label={<Tx label={"Date-Time Inputs"} />}>
							<div className="space-y-4">
								<FormField
									name="meeting-time"
									label="Meeting Date & Time"
									meta={sampleMeta}
								>
									<input
										type="datetime-local"
										id={meetingTimeId}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									/>
								</FormField>

								<FormField
									name="deadline"
									label="Project Deadline"
									meta={errorMeta}
								>
									<input
										type="datetime-local"
										id={deadlineId}
										className="w-full px-3 py-2 border border-red-300 rounded-md bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500"
									/>
								</FormField>
							</div>
						</Column>
					</div>
				</Section>

				{/* File and Media Section */}
				<Section title={<Tx label={"File and Media"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"File Uploads"} />}>
							<div className="space-y-4">
								<FormField
									name="profile-photo"
									label="Profile Photo"
									hint="JPG, PNG or GIF. Max 5MB"
									meta={sampleMeta}
								>
									<input
										type="file"
										id={profilePhotoId}
										accept="image/*"
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
									/>
								</FormField>

								<FormField
									name="resume"
									label="Resume/CV"
									required
									hint="PDF, DOC, or DOCX. Max 10MB"
									meta={errorMeta}
								>
									<input
										type="file"
										id={resumeId}
										accept=".pdf,.doc,.docx"
										className="w-full px-3 py-2 border border-red-300 rounded-md bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
									/>
								</FormField>

								<FormField
									name="documents"
									label="Additional Documents"
									hint="Multiple files allowed"
									meta={sampleMeta}
								>
									<input
										type="file"
										id={documentsId}
										multiple
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
									/>
								</FormField>
							</div>
						</Column>

						<Column label={<Tx label={"Media Inputs"} />}>
							<div className="space-y-4">
								<FormField
									name="website"
									label="Personal Website"
									hint="Include https://"
									meta={sampleMeta}
								>
									<input
										type="url"
										id={websiteId}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="https://example.com"
									/>
								</FormField>

								<FormField
									name="linkedin"
									label="LinkedIn Profile"
									meta={sampleMeta}
								>
									<input
										type="url"
										id={linkedinId}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="https://linkedin.com/in/username"
									/>
								</FormField>

								<FormField
									name="github"
									label="GitHub Profile"
									meta={sampleMeta}
								>
									<input
										type="url"
										id={githubId}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="https://github.com/username"
									/>
								</FormField>
							</div>
						</Column>
					</div>
				</Section>

				{/* Specialized Inputs Section */}
				<Section title={<Tx label={"Specialized Inputs"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Range and Color"} />}>
							<div className="space-y-4">
								<FormField
									name="experience-years"
									label="Years of Experience"
									hint="Drag to select"
									meta={sampleMeta}
								>
									<input
										type="range"
										id={experienceYearsId}
										min="0"
										max="30"
										step="1"
										className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
									/>
									<div className="text-sm text-gray-600 mt-1">
										<span id={experienceYearsValueId}>
											5
										</span>{" "}
										years
									</div>
								</FormField>

								<FormField
									name="preferred-color"
									label="Preferred Color"
									meta={sampleMeta}
								>
									<input
										type="color"
										id={preferredColorId}
										className="w-full h-12 border border-gray-300 rounded-md cursor-pointer"
									/>
								</FormField>

								<FormField
									name="satisfaction"
									label="Job Satisfaction Level"
									meta={sampleMeta}
								>
									<input
										type="range"
										id={satisfactionId}
										min="1"
										max="10"
										step="1"
										className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
									/>
									<div className="text-sm text-gray-600 mt-1">
										Level:{" "}
										<span id={satisfactionValueId}>5</span>
										/10
									</div>
								</FormField>
							</div>
						</Column>

						<Column label={<Tx label={"Search and Password"} />}>
							<div className="space-y-4">
								<FormField
									name="search-skills"
									label="Search Skills"
									hint="Search for specific skills"
									meta={sampleMeta}
								>
									<input
										type="search"
										id={searchSkillsId}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="Search skills..."
									/>
								</FormField>

								<FormField
									name="current-password"
									label="Current Password"
									required
									meta={sampleMeta}
								>
									<input
										type="password"
										id={currentPasswordId}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="Enter current password"
									/>
								</FormField>

								<FormField
									name="new-password"
									label="New Password"
									required
									hint="Minimum 8 characters, include uppercase, lowercase, number, and symbol"
									meta={errorMeta}
								>
									<input
										type="password"
										id={newPasswordId}
										className="w-full px-3 py-2 border border-red-300 rounded-md bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500"
										placeholder="Enter new password"
									/>
								</FormField>

								<FormField
									name="confirm-password"
									label="Confirm New Password"
									required
									meta={multipleErrorsMeta}
								>
									<input
										type="password"
										id={confirmPasswordId}
										className="w-full px-3 py-2 border border-red-300 rounded-md bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500"
										placeholder="Confirm new password"
									/>
								</FormField>
							</div>
						</Column>
					</div>
				</Section>

				{/* Inventory Selection Section */}
				<Section title={<Tx label={"Inventory Selection"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Single Item Selection"} />}>
							<div className="space-y-4">
								<FormField
									name="primary-item"
									label="Primary Inventory Item"
									required
									hint="Select the main item for this record"
									meta={sampleMeta}
								>
									<div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
										{/* Placeholder for InventoryItemPopupSelect */}
										<div className="text-gray-500 text-sm">
											Click to select inventory item...
										</div>
									</div>
								</FormField>

								<FormField
									name="secondary-item"
									label="Secondary Item"
									hint="Optional secondary item"
									meta={sampleMeta}
								>
									<div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
										<div className="text-gray-500 text-sm">
											Optional secondary item...
										</div>
									</div>
								</FormField>
							</div>
						</Column>

						<Column
							label={<Tx label={"Multiple Items Selection"} />}
						>
							<div className="space-y-4">
								<FormField
									name="related-items"
									label="Related Items"
									hint="Select multiple related items"
									meta={sampleMeta}
								>
									<div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 min-h-[42px]">
										<div className="text-gray-500 text-sm">
											Select multiple items...
										</div>
									</div>
								</FormField>

								<FormField
									name="replacement-items"
									label="Replacement Items"
									hint="Items that can replace the primary item"
									meta={errorMeta}
								>
									<div className="w-full px-3 py-2 border border-red-300 rounded-md bg-red-50 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500 min-h-[42px]">
										<div className="text-red-500 text-sm">
											Please select at least one
											replacement item
										</div>
									</div>
								</FormField>
							</div>
						</Column>
					</div>
				</Section>

				{/* Form Actions */}
				<Section title={<Tx label={"Form Actions"} />}>
					<div className="flex gap-4">
						<Button
							cls={({ what }) => ({
								variant: what.variant({
									size: "md",
								}),
							})}
						>
							<Tx label={"Save Changes"} />
						</Button>
						<Button
							cls={({ what }) => ({
								variant: what.variant({
									size: "md",
									tone: "secondary",
								}),
							})}
						>
							<Tx label={"Save as Draft"} />
						</Button>
						<Button
							cls={({ what }) => ({
								variant: what.variant({
									size: "md",
									tone: "danger",
								}),
							})}
						>
							<Tx label={"Cancel"} />
						</Button>
					</div>
				</Section>

				{/* Form Validation Summary */}
				<Section title={<Tx label={"Form Validation Summary"} />}>
					<div className="space-y-4">
						<div className="p-4 border border-yellow-300 rounded-md bg-yellow-50">
							<h4 className="font-semibold text-yellow-800 mb-2">
								<Tx label={"Form Validation Issues"} />
							</h4>
							<ul className="text-sm text-yellow-700 space-y-1">
								<li>• Last Name is required</li>
								<li>• Email format is invalid</li>
								<li>• Email already exists in system</li>
								<li>
									• Project deadline must be in the future
								</li>
								<li>• Resume file is required</li>
								<li>
									• Password must meet security requirements
								</li>
								<li>• Passwords do not match</li>
								<li>
									• At least one replacement item is required
								</li>
							</ul>
						</div>
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
