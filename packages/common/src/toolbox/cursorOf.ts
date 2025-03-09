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
	siblings = 1,
	boundary = 1,
}: cursorOf.Props): cursorOf.Pages {
	// Early return if no pages
	if (total <= 0) {
		return { page, total };
	}

	// Convert the 0-based current page to 1-based.
	const oneBasedPage = page + 1;

	// Calculate the raw window around the current (1-based) page.
	let windowStart = oneBasedPage - siblings;
	let windowEnd = oneBasedPage + siblings;

	// Shift right if off the left edge.
	if (windowStart < 1) {
		const shift = 1 - windowStart;
		windowStart += shift;
		windowEnd += shift;
	}

	// Shift left if off the right edge.
	if (windowEnd > total) {
		const shift = windowEnd - total;
		windowStart -= shift;
		windowEnd -= shift;
	}

	// Final clamp for safety.
	windowStart = Math.max(windowStart, 1);
	windowEnd = Math.min(windowEnd, total);

	// Calculate the boundary ranges
	const leftBoundaryEnd = Math.min(boundary, total);
	const rightBoundaryStart = Math.max(1, total - boundary + 1);

	// Determine if sections are adjacent (no gap between them)
	const leftAdjacent = windowStart <= leftBoundaryEnd + 1;
	const rightAdjacent = windowEnd >= rightBoundaryStart - 1;

	const result: cursorOf.Pages = {
		page,
		total,
	};

	// Case 1: Both sides are adjacent (all connected)
	if (leftAdjacent && rightAdjacent) {
		result.start = range(1, total);
		return result;
	}

	// Case 2: Left adjacent only
	if (leftAdjacent) {
		result.start = range(1, windowEnd);
		result.end = range(rightBoundaryStart, total);
		return result;
	}

	// Case 3: Right adjacent only
	if (rightAdjacent) {
		result.start = range(1, leftBoundaryEnd);
		result.end = range(windowStart, total);
		return result;
	}

	// Case 4: No adjacency (three separate sections)
	result.start = range(1, leftBoundaryEnd);
	result.pages = range(windowStart, windowEnd);
	result.end = range(rightBoundaryStart, total);
	return result;
}
