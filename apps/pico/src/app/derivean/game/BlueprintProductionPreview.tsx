import { useParams } from "@tanstack/react-router";
import { LinkTo, Preview, TitlePreview, Tx } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";

export namespace BlueprintProductionPreview {
	export interface Data extends IdentitySchema.Type {
		resource: string;
		blueprint: string;
		blueprintId: string;
	}

	export interface Props extends Preview.PropsEx<Data> {
		//
	}
}

export const BlueprintProductionPreview: FC<
	BlueprintProductionPreview.Props
> = (props) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Preview
			title={({ entity }) => (
				<TitlePreview
					icon={ProductionIcon}
					title={entity.resource}
					subtitle={entity.blueprint}
				/>
			)}
			actions={({ entity }) => (
				<>
					<LinkTo
						icon={BlueprintIcon}
						to={"/$locale/apps/derivean/game/blueprint/$id/production"}
						params={{ locale, id: entity.blueprintId }}
					>
						<Tx label={"Building base detail (label)"} />
					</LinkTo>
				</>
			)}
			{...props}
		/>
	);
};
