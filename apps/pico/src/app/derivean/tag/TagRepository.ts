import { db } from "~/app/derivean/db/db";
import { ResourceRepository } from "~/app/derivean/resource/ResourceRepository";
import { ResourceTagRepository } from "~/app/derivean/resource/tag/ResourceTagRepository";
import { withTagRepository } from "~/app/tag/withTagRepository";

export const TagRepository = withTagRepository({
	database: db,
	repository: {
		invalidate: [
			...ResourceRepository.invalidate,
			...ResourceTagRepository.invalidate,
		],
	},
});
