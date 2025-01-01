import { withRepository } from "@use-pico/client";
import type { Database } from "@use-pico/common";
import { TagSchema } from "~/app/tag/TagSchema";

export namespace withTagRepository {
	export interface Props {
		database: Database.Instance;
		repository?: Partial<withRepository.Props<TagSchema>>;
	}

	export type Instance = ReturnType<typeof withTagRepository>;
}

export const withTagRepository = ({
	database,
	repository,
}: withTagRepository.Props) => {
	return withRepository({
		name: "TagRepository",
		schema: TagSchema,
		meta: {
			where: {
				code: "tag.code",
				group: "tag.group",
				id: "tag.id",
				idIn: "tag.id",
			},
			fulltext: ["tag.code", "tag.label", "tag.group", "tag.id"],
		},
		insert() {
			return database.kysely.insertInto("Tag");
		},
		update() {
			return database.kysely.updateTable("Tag");
		},
		remove() {
			return database.kysely.deleteFrom("Tag");
		},
		select() {
			return database.kysely.selectFrom("Tag as tag").selectAll("tag");
		},
		...repository,
	});
};
