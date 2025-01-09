import { useParams } from "@tanstack/react-router";
import { LinkTo, ListIcon, Preview, TitlePreview, Tx } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";

interface Data extends IdentitySchema.Type {
	name: string;
}

export namespace ResourceProductionPreview {
	export interface Props extends Preview.PropsEx<Data> {
		//
	}
}

export const ResourceProductionPreview: FC<ResourceProductionPreview.Props> = (
	props,
) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Preview
			title={({ entity }) => (
				<TitlePreview
					icon={ProductionIcon}
					title={entity.name}
				/>
			)}
			actions={() => (
				<>
					<LinkTo
						icon={ListIcon}
						to={"/$locale/apps/derivean/root/resource/production/list"}
						params={{ locale }}
					>
						<Tx label={"Resource production list (label)"} />
					</LinkTo>
				</>
			)}
			{...props}
		/>
	);
};
