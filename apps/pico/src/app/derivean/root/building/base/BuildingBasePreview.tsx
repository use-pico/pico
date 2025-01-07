import { useParams } from "@tanstack/react-router";
import { LinkTo, ListIcon, Preview, TitlePreview, Tx } from "@use-pico/client";
import type { FC } from "react";
import type { BuildingBaseSchema } from "~/app/derivean/building/base/BuildingBaseSchema";
import { BuildingBaseIcon } from "~/app/derivean/icon/BuildingBaseIcon";

export namespace BuildingBasePreview {
	export interface Props
		extends Preview.PropsEx<BuildingBaseSchema["~output"]> {
		//
	}
}

export const BuildingBasePreview: FC<BuildingBasePreview.Props> = (props) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Preview
			title={({ entity }) => (
				<TitlePreview
					icon={BuildingBaseIcon}
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
