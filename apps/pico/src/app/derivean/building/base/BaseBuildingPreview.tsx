import { useParams } from "@tanstack/react-router";
import { LinkTo, ListIcon, Preview, TitlePreview, Tx } from "@use-pico/client";
import type { withRepositorySchema } from "@use-pico/common";
import type { FC } from "react";
import type { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";
import { BaseBuildingIcon } from "~/app/derivean/icon/BaseBuildingIcon";

export namespace BaseBuildingPreview {
	export interface Props
		extends Preview.PropsEx<withRepositorySchema.Output<BaseBuildingSchema>> {
		//
	}
}

export const BaseBuildingPreview: FC<BaseBuildingPreview.Props> = (props) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Preview
			title={({ entity }) => (
				<TitlePreview
					icon={BaseBuildingIcon}
					title={entity.name}
				/>
			)}
			actions={() => {
				return (
					<LinkTo
						icon={ListIcon}
						to={"/$locale/apps/derivean/root/building/base/list"}
						params={{ locale }}
					>
						<Tx label={"Base building list (label)"} />
					</LinkTo>
				);
			}}
			{...props}
		/>
	);
};
