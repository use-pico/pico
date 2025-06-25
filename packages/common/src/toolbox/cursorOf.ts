/**
 * Returns an array of consecutive integers [start..end].
 */
function range(start: number, end: number): number[] {
	if (start > end) {
		return [];
	}
	return Array.from(
		{
			length: end - start + 1,
		},
		(_, i) => start + i,
	);
}

export namespace cursorOf {
	export interface Props {
		/**
		 * 0-based current page (0 means the 1st page).
		 */
		page: number;
		/**
		 * Total number of pages (e.g. 10 means valid pages are [0..9]).
		 */
		total: number;
		/**
		 * How many pages to show around the current page.
		 */
		siblings?: number;
		/**
		 * How many boundary pages to show at start and end.
		 */
		boundary?: number;
	}

	export interface Pages {
		/**
		 * 0-based current page from input.
		 */
		page: number;
		/**
		 * Total number of pages.
		 */
		total: number;
		/**
		 * Array of pages to show at the start.
		 */
		start?: number[];
		/**
		 * Array of pages to show in the middle (if separated from start/end).
		 */
		pages?: number[];
		/**
		 * Array of pages to show at the end.
		 */
		end?: number[];
	}
}

/**
 * Generates a pagination cursor with boundary pages and sibling pages around the current page.
 * Returns start, middle, and end page arrays in 1-based numbering.
 */
export function cursorOf({
	page,
	total,
	siblings = 2,
	boundary = 1,
}: cursorOf.Props): cursorOf.Pages {
	const validTotal = Math.max(0, total);
	const clampedPage = Math.max(
		0,
		Math.min(page, validTotal > 0 ? validTotal - 1 : 0),
	);

	if (validTotal === 0) {
		return {
			page: 0,
			total: 0,
		};
	}

	const simpleThreshold = boundary * 2 + siblings * 2 + 1;
	if (validTotal <= simpleThreshold) {
		return {
			page: clampedPage,
			total: validTotal,
			pages: range(1, validTotal),
		};
	}

	const leftBoundary = boundary;
	const rightBoundary = validTotal - boundary + 1;

	const result: cursorOf.Pages = {
		page: clampedPage,
		total: validTotal,
		start: range(1, leftBoundary),
		end: range(rightBoundary, validTotal),
	};

	const oneBasedPage = clampedPage + 1;

	const middleSize = siblings * 2 + 1;
	let middleStart = oneBasedPage - siblings;
	let middleEnd = oneBasedPage + siblings;

	if (middleStart <= leftBoundary) {
		middleStart = leftBoundary + 1;
		middleEnd = Math.min(middleStart + middleSize - 1, rightBoundary - 1);
	} else if (middleEnd >= rightBoundary) {
		middleEnd = rightBoundary - 1;
		middleStart = Math.max(leftBoundary + 1, middleEnd - middleSize + 1);
	}

	if (middleStart <= middleEnd) {
		result.pages = range(middleStart, middleEnd);
	}

	return result;
}
