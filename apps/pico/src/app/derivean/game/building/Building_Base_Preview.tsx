import { useParams } from "@tanstack/react-router";
import { LinkTo, ListIcon, Preview, TitlePreview, Tx } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { BuildingBaseIcon } from "~/app/derivean/icon/BuildingBaseIcon";

export namespace Building_Base_Preview {
	export interface Data extends IdentitySchema.Type {
		name: string;
	}

	export interface Props extends Preview.PropsEx<Data> {
		//
	}
}

export const Building_Base_Preview: FC<Building_Base_Preview.Props> = (
	props,
) => {
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
						to={"/$locale/apps/derivean/game/building/list"}
						params={{ locale }}
					>
						<Tx label={"Building base list (label)"} />
					</LinkTo>
				);
			}}
			{...props}
		/>
	);
};
