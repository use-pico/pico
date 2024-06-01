/**
 * Helper method to generate a list of page numbers (for pagination).
 *
 * @group toolbox
 */
export namespace pagesOf {
    /**
     * Properties of the `pagesOf` method.
     */
    export interface Props {
        /**
         * Zero-indexed current page.
         */
        page: number;
        /**
         * Total count of pages.
         */
        total: number;
        /**
         * How many pages to show around the current one.
         */
        siblings?: number;
        /**
         * How many pages to show at the beginning and end.
         */
        boundaries?: number;
    }

    /**
     * Result of the `pagesOf` method.
     */
    export interface Pages {
        /**
         * Type of pagination.
         */
        type: "simple" | "start" | "end" | "both";
        /**
         * Current page from input.
         */
        page: number;
        /**
         * Total count of pages.
         */
        total: number;
        /**
         * Initial set of pages (when there are a lot of pages).
         */
        start: number[];
        /**
         * Middle pages (when there are a lot of pages).
         */
        pages: number[];
        /**
         * Last pages.
         */
        end: number[];
    }
}

const range = (start: number, end: number) => Array.from({length: end - start + 1}, (_, index) => index + start);

export const pagesOf = (
    {
        page,
        total,
        siblings = 1,
        boundaries = 1,
    }: pagesOf.Props
): pagesOf.Pages => {
    const $total = Math.max(Math.trunc(total), 0);
    const $pages = siblings * 2 + 3 + boundaries * 2;
    if ($pages >= $total) {
        return {
            type:  "simple",
            page,
            total,
            pages: range(1, $total),
            start: [],
            end:   [],
        };
    }

    const leftIndex = Math.max(page - siblings, boundaries);
    const rightIndex = Math.min(page + siblings, $total - boundaries);

    const shouldShowLeftDots = leftIndex > boundaries + 2;
    const shouldShowRightDots = rightIndex < $total - (boundaries + 1);

    if (!shouldShowLeftDots && shouldShowRightDots) {
        return {
            type:  "end",
            page,
            total,
            start: [],
            pages: range(1, siblings * 2 + boundaries + 2),
            end:   range(total - (boundaries - 1), $total),
        };
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
        return {
            type:  "start",
            page,
            total,
            start: range(1, boundaries),
            pages: range(total - (boundaries + 1 + 2 * siblings), $total),
            end:   [],
        };
    }

    return {
        type:  "both",
        page,
        total,
        start: range(1, boundaries),
        pages: range(leftIndex, rightIndex),
        end:   range($total - boundaries + 1, $total),
    };
};
