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
		 * A 1-based list of pages, centered on `page` if possible.
		 */
		pages: number[];
	}
}

/**
 * Generates a middle block of pages in 1-based numbering,
 * ensuring (2 * siblings + 1) pages around the current page whenever possible.
 */
export function cursorOf({
	page, // 0-based current page
	total, // total number of pages (0..total-1 are valid)
	siblings = 2,
}: cursorOf.Props): cursorOf.Pages {
	// Convert the 0-based current page to 1-based.
	const oneBasedPage = page + 1;

	// Desired number of pages in the middle block.
	const blockSize = 2 * siblings + 1;

	// If total pages <= blockSize, show all pages (1..total).
	if (total <= blockSize) {
		return {
			page,
			total,
			pages: range(1, total),
		};
	}

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

	return {
		page,
		total,
		pages: range(windowStart, windowEnd),
	};
}
