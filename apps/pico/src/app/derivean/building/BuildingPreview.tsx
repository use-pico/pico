import { useParams } from "@tanstack/react-router";
import { LinkTo, ListIcon, Preview, TitlePreview, Tx } from "@use-pico/client";
import type { withRepositorySchema } from "@use-pico/common";
import type { FC } from "react";
import type { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";

export namespace BuildingPreview {
	export interface Props
		extends Preview.PropsEx<withRepositorySchema.Output<BuildingSchema>> {
		//
	}
}

export const BuildingPreview: FC<BuildingPreview.Props> = (props) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Preview
			title={({ entity }) => (
				<TitlePreview
					icon={BuildingIcon}
					title={entity.baseBuilding.name}
					subtitle={entity.baseBuilding.description}
				/>
			)}
			actions={() => (
				<>
					<LinkTo
						icon={ListIcon}
						to={"/$locale/apps/derivean/root/building/list"}
						params={{ locale }}
					>
						<Tx label={"Building list (label)"} />
					</LinkTo>
				</>
			)}
			{...props}
		/>
	);
};
