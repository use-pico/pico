import type { Database } from "~/app/derivean/db/Database";
import { withTagRepository } from "~/app/tag/withTagRepository";

export const TagRepository = withTagRepository<Database>({
	repository: {
		invalidate: [
			// ...ResourceRepository.invalidate,
			// ...ResourceTagRepository.invalidate,
		],
	},
});
