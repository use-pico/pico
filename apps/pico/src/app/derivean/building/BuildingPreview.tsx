import { useParams } from "@tanstack/react-router";
import { LinkTo, ListIcon, Preview, TitlePreview, Tx } from "@use-pico/client";
import type { FC } from "react";
import type { BuildingSchema } from "~/app/derivean/building/BuildingSchema";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";

export namespace BuildingPreview {
	export interface Props extends Preview.PropsEx<BuildingSchema["~output"]> {
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
