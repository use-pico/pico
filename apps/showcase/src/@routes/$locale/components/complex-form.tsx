import { createFileRoute } from "@tanstack/react-router";
import { Button, FormField, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/cls";
import type { ReactNode } from "react";
import { useId } from "react";
import { InventoryItemPopupSelect } from "~/app/inventory/ui/InventoryItemPopupSelect";

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
									type="text"
									id={firstNameId}
									placeholder="Enter first name"
								/>

								<FormField
									name="last-name"
									label="Last Name"
									required
									meta={errorMeta}
									type="text"
									id={lastNameId}
									placeholder="Enter last name"
								/>

								<FormField
									name="email"
									label="Email Address"
									required
									hint="We'll never share your email"
									meta={multipleErrorsMeta}
									type="email"
									id={emailId}
									placeholder="Enter email address"
								/>
							</div>
						</Column>

						<Column label={<Tx label={"Contact & Numbers"} />}>
							<div className="space-y-4">
								<FormField
									name="phone"
									label="Phone Number"
									meta={sampleMeta}
									type="tel"
									id={phoneId}
									placeholder="+1 (555) 123-4567"
								/>

								<FormField
									name="age"
									label="Age"
									meta={sampleMeta}
									type="number"
									id={ageId}
									min="0"
									max="120"
									placeholder="Enter age"
								/>

								<FormField
									name="salary"
									label="Annual Salary"
									hint="Enter amount in USD"
									meta={sampleMeta}
									type="number"
									id={salaryId}
									min="0"
									step="1000"
									placeholder="50000"
								/>
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
									type="date"
									id={birthDateId}
								/>

								<FormField
									name="start-date"
									label="Employment Start Date"
									meta={sampleMeta}
									type="date"
									id={startDateId}
								/>
							</div>
						</Column>

						<Column label={<Tx label={"Time Inputs"} />}>
							<div className="space-y-4">
								<FormField
									name="work-start"
									label="Work Start Time"
									meta={sampleMeta}
									type="time"
									id={workStartId}
								/>

								<FormField
									name="work-end"
									label="Work End Time"
									meta={sampleMeta}
									type="time"
									id={workEndId}
								/>
							</div>
						</Column>

						<Column label={<Tx label={"Date-Time Inputs"} />}>
							<div className="space-y-4">
								<FormField
									name="meeting-time"
									label="Meeting Date & Time"
									meta={sampleMeta}
									type="datetime-local"
									id={meetingTimeId}
								/>

								<FormField
									name="deadline"
									label="Project Deadline"
									meta={errorMeta}
									type="datetime-local"
									id={deadlineId}
								/>
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
									type="file"
									id={profilePhotoId}
									accept="image/*"
								/>

								<FormField
									name="resume"
									label="Resume/CV"
									required
									hint="PDF, DOC, or DOCX. Max 10MB"
									meta={errorMeta}
									type="file"
									id={resumeId}
									accept=".pdf,.doc,.docx"
								/>

								<FormField
									name="documents"
									label="Additional Documents"
									hint="Multiple files allowed"
									meta={sampleMeta}
									type="file"
									id={documentsId}
									multiple
								/>
							</div>
						</Column>

						<Column label={<Tx label={"Media Inputs"} />}>
							<div className="space-y-4">
								<FormField
									name="website"
									label="Personal Website"
									hint="Include https://"
									meta={sampleMeta}
									type="url"
									id={websiteId}
									placeholder="https://example.com"
								/>

								<FormField
									name="linkedin"
									label="LinkedIn Profile"
									meta={sampleMeta}
									type="url"
									id={linkedinId}
									placeholder="https://linkedin.com/in/username"
								/>

								<FormField
									name="github"
									label="GitHub Profile"
									meta={sampleMeta}
									type="url"
									id={githubId}
									placeholder="https://github.com/username"
								/>
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
									type="range"
									id={experienceYearsId}
									min="0"
									max="30"
									step="1"
								/>
								<div className="text-sm text-gray-600 mt-1">
									<span id={experienceYearsValueId}>5</span>{" "}
									years
								</div>

								<FormField
									name="preferred-color"
									label="Preferred Color"
									meta={sampleMeta}
									type="color"
									id={preferredColorId}
								/>

								<FormField
									name="satisfaction"
									label="Job Satisfaction Level"
									meta={sampleMeta}
									type="range"
									id={satisfactionId}
									min="1"
									max="10"
									step="1"
								/>
								<div className="text-sm text-gray-600 mt-1">
									Level:{" "}
									<span id={satisfactionValueId}>5</span>
									/10
								</div>
							</div>
						</Column>

						<Column label={<Tx label={"Search and Password"} />}>
							<div className="space-y-4">
								<FormField
									name="search-skills"
									label="Search Skills"
									hint="Search for specific skills"
									meta={sampleMeta}
									type="search"
									id={searchSkillsId}
									placeholder="Search skills..."
								/>

								<FormField
									name="current-password"
									label="Current Password"
									required
									meta={sampleMeta}
									type="password"
									id={currentPasswordId}
									placeholder="Enter current password"
								/>

								<FormField
									name="new-password"
									label="New Password"
									required
									hint="Minimum 8 characters, include uppercase, lowercase, number, and symbol"
									meta={errorMeta}
									type="password"
									id={newPasswordId}
									placeholder="Enter new password"
								/>

								<FormField
									name="confirm-password"
									label="Confirm New Password"
									required
									meta={multipleErrorsMeta}
									type="password"
									id={confirmPasswordId}
									placeholder="Confirm new password"
								/>
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
								/>

								<FormField
									name="secondary-item"
									label="Secondary Item"
									hint="Optional secondary item"
									meta={sampleMeta}
								/>
							</div>
						</Column>

						<Column
							label={<Tx label={"Multiple Items Selection"} />}
						>
							<div className="space-y-4">
								<InventoryItemPopupSelect
									mode={"single"}
									state={{
										set() {
											//
										},
										value: [],
									}}
								/>

								<FormField
									name="replacement-items"
									label="Replacement Items"
									hint="Items that can replace the primary item"
									meta={errorMeta}
								/>
							</div>
						</Column>
					</div>
				</Section>

				{/* Style Comparison Section */}
				<Section title={<Tx label={"Style Comparison"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Simple FormField"} />}>
							<div className="space-y-4">
								<FormField
									name="simple-text"
									meta={sampleMeta}
									type="text"
									placeholder="Enter some text"
								/>

								<FormField
									name="simple-email"
									meta={errorMeta}
									type="email"
									placeholder="Enter email"
								/>
							</div>
						</Column>

						<Column
							label={<Tx label={"InventoryItemPopupSelect"} />}
						>
							<div className="space-y-4">
								<InventoryItemPopupSelect
									mode="single"
									state={{
										set() {
											//
										},
										value: [],
									}}
								/>

								<InventoryItemPopupSelect
									mode="multi"
									state={{
										set() {
											//
										},
										value: [],
									}}
								/>
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
