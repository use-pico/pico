import { PopupSelect, Tx } from "@use-pico/client";
import type { FC } from "react";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import type { ResourceSchema } from "~/app/derivean/resource/ResourceSchema";
import { ResourceSource } from "~/app/derivean/resource/ResourceSource";
import { ResourceTable } from "~/app/derivean/root/resource/ResourceTable";

export namespace ResourcePopupSelect {
	export interface Props
		extends PopupSelect.PropsEx<ResourceSchema["~output"]> {
		group?: string;
	}
}

export const ResourcePopupSelect: FC<ResourcePopupSelect.Props> = ({
	group,
	...props
}) => {
	return (
		<PopupSelect<ResourceSchema["~output"]>
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
			source={ResourceSource}
			{...props}
		/>
	);
};
