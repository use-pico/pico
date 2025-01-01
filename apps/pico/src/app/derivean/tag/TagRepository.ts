import { db } from "~/app/derivean/db/db";
import { withTagRepository } from "~/app/tag/withTagRepository";

export const TagRepository = withTagRepository({
	database: db,
	repository: {
		invalidate: [
			// ...ResourceRepository.invalidate,
			// ...ResourceTagRepository.invalidate,
		],
	},
});
