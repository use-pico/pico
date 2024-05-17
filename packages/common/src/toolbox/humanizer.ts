import humanizeDuration, {HumanizerOptions} from "humanize-duration";

export const humanizer = (options?: HumanizerOptions) => humanizeDuration.humanizer({
    fallbacks:        ["en"],
    largest:          3,
    round:            true,
    maxDecimalPoints: 2,
    ...options,
});
