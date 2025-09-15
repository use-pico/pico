import { createFileRoute } from "@tanstack/react-router";
import {
	FavouriteIcon,
	FileIcon,
	ListIcon,
	SettingsIcon,
	Snapper,
	SnapperContent,
	SnapperItem,
	SnapperNav,
	TagIcon,
	Tx,
	UserIcon,
} from "@use-pico/client";
import { tvc } from "@use-pico/cls";
import type { ReactNode } from "react";

const orientations = [
	"vertical",
	"horizontal",
] as const;

const alignments = [
	"left",
	"right",
] as const;

// Create 20 pages with different icons and content
type Page = {
	id: string;
	icon: string;
	title: string;
};

const pages: Page[] = [
	{
		id: "page-1",
		icon: "icon-[ph--house-thin]",
		title: "Home",
	},
	{
		id: "page-2",
		icon: UserIcon,
		title: "Profile",
	},
	{
		id: "page-3",
		icon: SettingsIcon,
		title: "Settings",
	},
	{
		id: "page-4",
		icon: FileIcon,
		title: "Documents",
	},
	{
		id: "page-5",
		icon: TagIcon,
		title: "Tags",
	},
	{
		id: "page-6",
		icon: FavouriteIcon,
		title: "Favorites",
	},
	{
		id: "page-7",
		icon: ListIcon,
		title: "Lists",
	},
	{
		id: "page-8",
		icon: "icon-[ph--chart-bar-thin]",
		title: "Analytics",
	},
	{
		id: "page-9",
		icon: "icon-[ph--calendar-thin]",
		title: "Calendar",
	},
	{
		id: "page-10",
		icon: "icon-[ph--envelope-thin]",
		title: "Messages",
	},
	{
		id: "page-11",
		icon: "icon-[ph--camera-thin]",
		title: "Gallery",
	},
	{
		id: "page-12",
		icon: "icon-[ph--music-note-thin]",
		title: "Music",
	},
	{
		id: "page-13",
		icon: "icon-[ph--video-thin]",
		title: "Videos",
	},
	{
		id: "page-14",
		icon: "icon-[ph--book-thin]",
		title: "Library",
	},
	{
		id: "page-15",
		icon: "icon-[ph--map-pin-thin]",
		title: "Location",
	},
	{
		id: "page-16",
		icon: "icon-[ph--shopping-cart-thin]",
		title: "Store",
	},
	{
		id: "page-17",
		icon: "icon-[ph--game-controller-thin]",
		title: "Games",
	},
	{
		id: "page-18",
		icon: "icon-[ph--heart-thin]",
		title: "Health",
	},
	{
		id: "page-19",
		icon: "icon-[ph--lightbulb-thin]",
		title: "Ideas",
	},
	{
		id: "page-20",
		icon: "icon-[ph--star-thin]",
		title: "Reviews",
	},
];

export const Route = createFileRoute("/$locale/components/snapper")({
	component() {
		return (
			<div
				className={tvc([
					"flex",
					"flex-col",
					"space-y-8",
				])}
			>
				{/* Vertical Orientation */}
				<Section title={<Tx label={"Vertical Orientation"} />}>
					<div className="flex flex-col space-y-6">
						{alignments.map((align) => (
							<OrientationRow
								key={`vertical-${align}`}
								orientation="vertical"
								align={align}
								pages={pages}
							/>
						))}
					</div>
				</Section>

				{/* Horizontal Orientation */}
				<Section title={<Tx label={"Horizontal Orientation"} />}>
					<div className="flex flex-col space-y-6">
						<OrientationRow
							orientation="horizontal"
							pages={pages}
						/>
					</div>
				</Section>

				{/* Different Sizes */}
				<Section title={<Tx label={"Different Container Sizes"} />}>
					<div className="flex flex-col space-y-6">
						<SizeRow
							title="Small Container"
							height="h-64"
							orientation="vertical"
							align="right"
							pages={pages.slice(0, 5)}
						/>
						<SizeRow
							title="Medium Container"
							height="h-96"
							orientation="vertical"
							align="left"
							pages={pages.slice(0, 10)}
						/>
						<SizeRow
							title="Large Container"
							height="h-[32rem]"
							orientation="vertical"
							align="right"
							pages={pages}
						/>
					</div>
				</Section>
			</div>
		);
	},
});

function OrientationRow({
	orientation,
	align,
	pages,
}: {
	orientation: (typeof orientations)[number];
	align?: (typeof alignments)[number];
	pages: Page[];
}) {
	return (
		<div className="border border-slate-200 rounded-lg p-4">
			<div className="text-sm font-medium text-slate-700 mb-4 capitalize">
				{orientation} {align && `- ${align}`} Orientation
			</div>
			<div className="grid grid-cols-1 gap-8">
				<div className="flex flex-col space-y-3">
					<div className="text-sm font-medium text-slate-600">
						<Tx
							label={`${orientation} ${align || "default"} layout`}
						/>
					</div>
					<div
						className={`${orientation === "vertical" ? "h-96" : "h-64"} w-full border border-slate-300 rounded-lg overflow-hidden`}
					>
						<Snapper orientation={orientation}>
							<SnapperNav
								pages={pages}
								align={align}
								limit={3}
							/>
							<SnapperContent>
								{pages.map((page, index) => (
									<SnapperItem key={page.id}>
										<PageContent
											title={page.title}
											pageNumber={index + 1}
										/>
									</SnapperItem>
								))}
							</SnapperContent>
						</Snapper>
					</div>
				</div>
			</div>
		</div>
	);
}

function SizeRow({
	title,
	height,
	orientation,
	align,
	pages,
}: {
	title: string;
	height: string;
	orientation: (typeof orientations)[number];
	align?: (typeof alignments)[number];
	pages: Page[];
}) {
	return (
		<div className="border border-slate-200 rounded-lg p-4">
			<div className="text-sm font-medium text-slate-700 mb-4">
				{title}
			</div>
			<div className="flex flex-col space-y-3">
				<div className="text-sm font-medium text-slate-600">
					<Tx
						label={`${height} container with ${pages.length} pages`}
					/>
				</div>
				<div
					className={`${height} w-full border border-slate-300 rounded-lg overflow-hidden`}
				>
					<Snapper orientation={orientation}>
						<SnapperNav
							pages={pages}
							align={align}
						/>
						<SnapperContent>
							{pages.map((page, index) => (
								<SnapperItem key={page.id}>
									<PageContent
										title={page.title}
										pageNumber={index + 1}
									/>
								</SnapperItem>
							))}
						</SnapperContent>
					</Snapper>
				</div>
			</div>
		</div>
	);
}

function PageContent({
	title,
	pageNumber,
}: {
	title: string;
	pageNumber: number;
}) {
	return (
		<div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-slate-50 to-slate-100">
			<div className="text-center space-y-4">
				<h2 className="text-2xl font-bold text-slate-800">{title}</h2>
				<p className="text-slate-600 max-w-md">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</p>
				<div className="text-sm text-slate-500">
					Page {pageNumber} of 20
				</div>
			</div>
		</div>
	);
}

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
