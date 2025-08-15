import { createFileRoute } from "@tanstack/react-router";
import { Cursor, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/cls";
import type { ReactNode } from "react";
import { useState } from "react";

export const Route = createFileRoute("/$locale/components/cursor")({
	component() {
		const [cursorState1, setCursorState1] = useState({
			page: 0,
			size: 10,
		});
		const [cursorState2, setCursorState2] = useState({
			page: 2,
			size: 5,
		});
		const [cursorState3, setCursorState3] = useState({
			page: 5,
			size: 20,
		});

		return (
			<div
				className={tvc([
					"flex",
					"flex-col",
					"space-y-8",
				])}
			>
				{/* Basic Usage */}
				<Section title={<Tx label={"Basic Usage"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"Simple Pagination"} />}>
							<div className="p-4 border border-gray-300 rounded-md">
								<Cursor
									state={{
										value: cursorState1,
										set: setCursorState1,
									}}
									count={{
										where: 100,
										filter: 100,
										total: 100,
									}}
								/>
							</div>
						</Column>
						<Column label={<Tx label={"With Custom Text"} />}>
							<div className="p-4 border border-gray-300 rounded-md">
								<Cursor
									state={{
										value: cursorState2,
										set: setCursorState2,
									}}
									count={{
										where: 50,
										filter: 25,
										total: 50,
									}}
									textTotal={<Tx label={"Total records"} />}
								/>
							</div>
						</Column>
					</div>
				</Section>

				{/* Different Page Sizes */}
				<Section title={<Tx label={"Different Page Sizes"} />}>
					<div className="grid grid-cols-3 gap-6">
						<Column label={<Tx label={"Small Page Size (5)"} />}>
							<div className="p-4 border border-gray-300 rounded-md">
								<Cursor
									state={{
										value: {
											page: 0,
											size: 5,
										},
										set: (value) =>
											setCursorState1({
												...cursorState1,
												...value,
											}),
									}}
									count={{
										where: 100,
										filter: 100,
										total: 100,
									}}
								/>
							</div>
						</Column>
						<Column label={<Tx label={"Medium Page Size (10)"} />}>
							<div className="p-4 border border-gray-300 rounded-md">
								<Cursor
									state={{
										value: {
											page: 0,
											size: 10,
										},
										set: (value) =>
											setCursorState1({
												...cursorState1,
												...value,
											}),
									}}
									count={{
										where: 100,
										filter: 100,
										total: 100,
									}}
								/>
							</div>
						</Column>
						<Column label={<Tx label={"Large Page Size (20)"} />}>
							<div className="p-4 border border-gray-300 rounded-md">
								<Cursor
									state={{
										value: {
											page: 0,
											size: 20,
										},
										set: (value) =>
											setCursorState1({
												...cursorState1,
												...value,
											}),
									}}
									count={{
										where: 100,
										filter: 100,
										total: 100,
									}}
								/>
							</div>
						</Column>
					</div>
				</Section>

				{/* Different Page Positions */}
				<Section title={<Tx label={"Different Page Positions"} />}>
					<div className="grid grid-cols-3 gap-6">
						<Column label={<Tx label={"First Page"} />}>
							<div className="p-4 border border-gray-300 rounded-md">
								<Cursor
									state={{
										value: {
											page: 0,
											size: 10,
										},
										set: (value) =>
											setCursorState1({
												...cursorState1,
												...value,
											}),
									}}
									count={{
										where: 100,
										filter: 100,
										total: 100,
									}}
								/>
							</div>
						</Column>
						<Column label={<Tx label={"Middle Page"} />}>
							<div className="p-4 border border-gray-300 rounded-md">
								<Cursor
									state={{
										value: {
											page: 5,
											size: 10,
										},
										set: (value) =>
											setCursorState1({
												...cursorState1,
												...value,
											}),
									}}
									count={{
										where: 100,
										filter: 100,
										total: 100,
									}}
								/>
							</div>
						</Column>
						<Column label={<Tx label={"Last Page"} />}>
							<div className="p-4 border border-gray-300 rounded-md">
								<Cursor
									state={{
										value: {
											page: 9,
											size: 10,
										},
										set: (value) =>
											setCursorState1({
												...cursorState1,
												...value,
											}),
									}}
									count={{
										where: 100,
										filter: 100,
										total: 100,
									}}
								/>
							</div>
						</Column>
					</div>
				</Section>

				{/* Real-world Examples */}
				<Section title={<Tx label={"Real-world Examples"} />}>
					<div className="grid grid-cols-2 gap-6">
						<Column label={<Tx label={"User List"} />}>
							<div className="p-4 border border-gray-300 rounded-md">
								<div className="mb-4">
									<h3 className="text-lg font-semibold mb-2">
										Users
									</h3>
									<p className="text-sm text-gray-600">
										Showing users with pagination controls
									</p>
								</div>
								<Cursor
									state={{
										value: cursorState3,
										set: setCursorState3,
									}}
									count={{
										where: 250,
										filter: 250,
										total: 250,
									}}
									textTotal={<Tx label={"Total users"} />}
								/>
							</div>
						</Column>
						<Column label={<Tx label={"Filtered Results"} />}>
							<div className="p-4 border border-gray-300 rounded-md">
								<div className="mb-4">
									<h3 className="text-lg font-semibold mb-2">
										Search Results
									</h3>
									<p className="text-sm text-gray-600">
										Filtered results with pagination
									</p>
								</div>
								<Cursor
									state={{
										value: {
											page: 1,
											size: 15,
										},
										set: (value) =>
											setCursorState1({
												...cursorState1,
												...value,
											}),
									}}
									count={{
										where: 500,
										filter: 45,
										total: 500,
									}}
									textTotal={<Tx label={"Filtered items"} />}
								/>
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
