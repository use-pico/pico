import { PopupSelect } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { kysely } from "~/app/derivean/db/db";
import { TagTable } from "~/app/derivean/root/tag/TagTable";
import { withTagListCount } from "~/app/derivean/tag/withTagListCount";

interface Data extends IdentitySchema.Type {
	code: string;
	label: string;
	group?: string | null;
	sort: number;
}

export namespace TagPopupSelect {
	export interface Props extends PopupSelect.PropsEx<Data> {
		group?: string;
	}
}

export const TagPopupSelect: FC<TagPopupSelect.Props> = ({
	group,
	...props
}) => {
	return (
		<PopupSelect<Data>
			table={(props) => (
				<TagTable
					group={group}
					{...props}
				/>
			)}
			render={({ entity }) => {
				return entity.label;
			}}
			queryKey={"Tag"}
			query={async ({ filter, cursor }) => {
				return kysely.transaction().execute(async (tx) => {
					return withTagListCount({
						tx,
						filter,
						cursor,
					});
				});
			}}
			{...props}
		/>
	);
};
