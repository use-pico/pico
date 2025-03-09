/**
 * Returns an array of consecutive integers [start..end].
 */
function range(start: number, end: number): number[] {
	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
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
	page, // 0-based current page
	total, // total number of pages (0..total-1 are valid)
	siblings = 2,
	boundary = 2,
}: cursorOf.Props): cursorOf.Pages {
	// Handle edge cases
	const validTotal = Math.max(0, total);
	const clampedPage = Math.max(0, Math.min(page, validTotal - 1));

	// Calculate the threshold for simplified display
	const fullPaginationThreshold = boundary * 2 + siblings * 2 + 1;

	// If total pages is small, return only the middle block
	if (validTotal <= fullPaginationThreshold) {
		return {
			page: clampedPage,
			total: validTotal,
			pages: validTotal > 0 ? range(1, validTotal) : [],
		};
	}

	// Calculate the boundary ranges
	const leftBoundaryEnd = boundary;
	const rightBoundaryStart = validTotal - boundary + 1;

	// Initialize result with boundaries
	const result: cursorOf.Pages = {
		page: clampedPage,
		total: validTotal,
		start: range(1, leftBoundaryEnd),
		end: range(rightBoundaryStart, validTotal),
	};

	// Convert the 0-based current page to 1-based
	const oneBasedPage = clampedPage + 1;

	// Calculate the ideal middle section size
	const middleSectionSize = siblings * 2 + 1;

	// Calculate the ideal centered window
	let idealWindowStart = oneBasedPage - siblings;
	let idealWindowEnd = oneBasedPage + siblings;

	// Shift right if off the left boundary
	if (idealWindowStart <= leftBoundaryEnd) {
		const shift = leftBoundaryEnd + 1 - idealWindowStart;
		idealWindowStart += shift;
		idealWindowEnd = Math.min(
			rightBoundaryStart - 1,
			idealWindowStart + middleSectionSize - 1,
		);
	}

	// Shift left if off the right boundary
	if (idealWindowEnd >= rightBoundaryStart) {
		const shift = idealWindowEnd - (rightBoundaryStart - 1);
		idealWindowEnd -= shift;
		idealWindowStart = Math.max(
			leftBoundaryEnd + 1,
			idealWindowEnd - middleSectionSize + 1,
		);
	}

	// Create the middle section if needed
	if (idealWindowStart <= idealWindowEnd) {
		result.pages = range(idealWindowStart, idealWindowEnd);
	}

	return result;
}
