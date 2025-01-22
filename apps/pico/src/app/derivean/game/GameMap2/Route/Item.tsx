import { useParams } from "@tanstack/react-router";
import { LinkTo } from "@use-pico/client";
import type { Entity } from "@use-pico/common";
import type { FC } from "react";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

export namespace Item {
	export interface Props extends Entity.Type<any> {
		//
	}
}

export const Item: FC<Item.Props> = ({ entity }) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<div
			className={
				"flex flex-row gap-2 items-center justify-between border border-slate-200 hover:bg-slate-100 p-4"
			}
		>
			<LinkTo
				icon={"icon-[cil--arrow-right]"}
				to={"/$locale/apps/derivean/map/building/$id/routes"}
				params={{ locale, id: entity.fromId }}
				search={{ zoomToId: entity.toId }}
			>
				{entity.toName}
			</LinkTo>
			<LinkTo
				icon={ResourceIcon}
				to={"/$locale/apps/derivean/map/route/$id/resources"}
				params={{ locale, id: entity.id }}
			/>
		</div>
	);
};
