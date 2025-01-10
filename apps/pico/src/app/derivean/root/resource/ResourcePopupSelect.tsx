import { PopupSelect, Tx, withListCount } from "@use-pico/client";
import type { IdentitySchema, TagSchema } from "@use-pico/common";
import type { FC } from "react";
import { z } from "zod";
import { kysely } from "~/app/derivean/db/kysely";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { ResourceTable } from "~/app/derivean/root/resource/ResourceTable";

interface Data extends IdentitySchema.Type {
	name: string;
	tags: TagSchema.Type[];
}

export namespace ResourcePopupSelect {
	export interface Props extends PopupSelect.PropsEx<Data> {
		group?: string;
	}
}

export const ResourcePopupSelect: FC<ResourcePopupSelect.Props> = ({
	group,
	...props
}) => {
	return (
		<PopupSelect<Data>
			icon={ResourceIcon}
			textTitle={<Tx label={"Select resource (title)"} />}
			textSelect={<Tx label={"Select resource (label)"} />}
			table={(table) => (
				<ResourceTable
					group={group}
					{...table}
				/>
			)}
			render={({ entity }) => {
				return entity.name;
			}}
			queryKey={"Resource"}
			query={async ({ filter, cursor }) => {
				return kysely.transaction().execute(async (tx) => {
					return withListCount({
						select: tx.selectFrom("Resource as r"),
						output: z.any(),
						filter,
						cursor,
					});
				});
			}}
			{...props}
		/>
	);
};
