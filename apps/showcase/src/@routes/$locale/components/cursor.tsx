import { createFileRoute } from "@tanstack/react-router";
import { Cursor, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/cls";
import type { ReactNode } from "react";
import { useState } from "react";

export const Route = createFileRoute("/$locale/components/cursor")({
	component() {
		// Basic Usage states
		const [basicCursorState, setBasicCursorState] = useState({
			page: 0,
			size: 10,
		});
		const [customTextCursorState, setCustomTextCursorState] = useState({
			page: 2,
			size: 5,
		});

		// Page Sizes states
		const [smallPageCursorState, setSmallPageCursorState] = useState({
			page: 0,
			size: 5,
		});
		const [mediumPageCursorState, setMediumPageCursorState] = useState({
			page: 0,
			size: 10,
		});
		const [largePageCursorState, setLargePageCursorState] = useState({
			page: 0,
			size: 20,
		});

		// Page Positions states
		const [firstPageCursorState, setFirstPageCursorState] = useState({
			page: 0,
			size: 10,
		});
		const [middlePageCursorState, setMiddlePageCursorState] = useState({
			page: 5,
			size: 10,
		});
		const [lastPageCursorState, setLastPageCursorState] = useState({
			page: 9,
			size: 10,
		});

		// Real-world Examples states
		const [userListCursorState, setUserListCursorState] = useState({
			page: 5,
			size: 20,
		});
		const [filteredResultsCursorState, setFilteredResultsCursorState] =
			useState({
				page: 1,
				size: 15,
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
					<Column label={<Tx label={"Simple Pagination"} />}>
						<div className="p-4 border border-gray-300 rounded-md">
							<Cursor
								state={{
									value: basicCursorState,
									set: setBasicCursorState,
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
									value: customTextCursorState,
									set: setCustomTextCursorState,
								}}
								count={{
									where: 50,
									filter: 25,
									total: 50,
								}}
							/>
						</div>
					</Column>
				</Section>

				{/* Different Page Sizes */}
				<Section title={<Tx label={"Different Page Sizes"} />}>
					<Column label={<Tx label={"Small Page Size (5)"} />}>
						<div className="p-4 border border-gray-300 rounded-md">
							<Cursor
								state={{
									value: smallPageCursorState,
									set: setSmallPageCursorState,
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
									value: mediumPageCursorState,
									set: setMediumPageCursorState,
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
									value: largePageCursorState,
									set: setLargePageCursorState,
								}}
								count={{
									where: 100,
									filter: 100,
									total: 100,
								}}
							/>
						</div>
					</Column>
				</Section>

				{/* Different Page Positions */}
				<Section title={<Tx label={"Different Page Positions"} />}>
					<Column label={<Tx label={"First Page"} />}>
						<div className="p-4 border border-gray-300 rounded-md">
							<Cursor
								state={{
									value: firstPageCursorState,
									set: setFirstPageCursorState,
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
									value: middlePageCursorState,
									set: setMiddlePageCursorState,
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
									value: lastPageCursorState,
									set: setLastPageCursorState,
								}}
								count={{
									where: 100,
									filter: 100,
									total: 100,
								}}
							/>
						</div>
					</Column>
				</Section>

				{/* Real-world Examples */}
				<Section title={<Tx label={"Real-world Examples"} />}>
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
									value: userListCursorState,
									set: setUserListCursorState,
								}}
								count={{
									where: 250,
									filter: 250,
									total: 250,
								}}
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
									value: filteredResultsCursorState,
									set: setFilteredResultsCursorState,
								}}
								count={{
									where: 500,
									filter: 45,
									total: 500,
								}}
							/>
						</div>
					</Column>
				</Section>
			</div>
		);
	},
});

export function Section({
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

export function Column({
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
