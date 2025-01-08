import { useParams } from "@tanstack/react-router";
import { LinkTo, ListIcon, Preview, TitlePreview, Tx } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";

export interface Data extends IdentitySchema.Type {
	name: string;
}

export namespace BuildingPreview {
	export interface Props extends Preview.PropsEx<Data> {
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
					title={entity.name}
				/>
			)}
			actions={() => (
				<>
					<LinkTo
						icon={ListIcon}
						to={"/$locale/apps/derivean/game/building/list"}
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
