import { PopupSelect, Tx } from "@use-pico/client";
import type { IdentitySchema, TagSchema } from "@use-pico/common";
import type { FC } from "react";
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
			useListQuery={null}
			{...props}
		/>
	);
};
