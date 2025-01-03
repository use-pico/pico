import { withRepository } from "@use-pico/client";
import { TagSchema } from "~/app/tag/TagSchema";

export namespace withTagRepository {
	export interface DatabaseType {
		Tag: TagSchema["~entity"];
	}

	export interface Props<TDatabase extends DatabaseType> {
		repository?: Partial<withRepository.Props<TDatabase, TagSchema>>;
	}

	export type Instance<TDatabase extends withTagRepository.DatabaseType> =
		ReturnType<typeof withTagRepository<TDatabase>>;
}

export const withTagRepository = <
	TDatabase extends withTagRepository.DatabaseType,
>({
	repository,
}: withTagRepository.Props<TDatabase>) => {
	return withRepository({
		name: "TagRepository",
		schema: TagSchema,
		meta: {
			where: {
				code: "t.code",
				group: "t.group",
				id: "t.id",
				idIn: "t.id",
			},
			fulltext: ["t.code", "t.label", "t.group", "t.id"],
		},
		select({ tx }) {
			return tx.selectFrom("Tag as t").selectAll("t");
		},
		mutation: {
			insert({ tx }) {
				return tx.insertInto("Tag");
			},
			update({ tx }) {
				return tx.updateTable("Tag");
			},
			remove({ tx }) {
				return tx.deleteFrom("Tag");
			},
		},
		...repository,
	});
};