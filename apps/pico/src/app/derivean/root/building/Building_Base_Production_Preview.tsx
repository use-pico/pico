import { useParams } from "@tanstack/react-router";
import { LinkTo, Preview, TitlePreview, Tx } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { BuildingBaseIcon } from "~/app/derivean/icon/BuildingBaseIcon";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";

export namespace Building_Base_Production_Preview {
	export interface Data extends IdentitySchema.Type {
		name: string;
		buildingName: string;
		buildingBaseId: string;
	}

	export interface Props extends Preview.PropsEx<Data> {
		//
	}
}

export const Building_Base_Production_Preview: FC<
	Building_Base_Production_Preview.Props
> = (props) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Preview
			title={({ entity }) => (
				<TitlePreview
					icon={ProductionIcon}
					title={entity.name}
					subtitle={entity.buildingName}
				/>
			)}
			actions={({ entity }) => (
				<>
					<LinkTo
						icon={BuildingBaseIcon}
						to={"/$locale/apps/derivean/root/building/base/$id/production"}
						params={{ locale, id: entity.buildingBaseId }}
					>
						<Tx label={"Building base detail (label)"} />
					</LinkTo>
				</>
			)}
			{...props}
		/>
	);
};
