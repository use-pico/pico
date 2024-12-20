import { useParams } from "@tanstack/react-router";
import { LinkTo, ListIcon, Preview, TitlePreview, Tx } from "@use-pico/client";
import type { FC } from "react";
import type { BlueprintSchema } from "~/app/derivean/blueprint/schema/BlueprintSchema";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";

export namespace BlueprintPreview {
	export interface Props extends Preview.PropsEx<BlueprintSchema.Type> {
		//
	}
}

export const BlueprintPreview: FC<BlueprintPreview.Props> = (props) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Preview
			title={({ entity }) => (
				<TitlePreview
					icon={BlueprintIcon}
					title={entity.name}
				/>
			)}
			actions={() => {
				return (
					<LinkTo
						icon={ListIcon}
						to={"/$locale/apps/derivean/root/blueprint/list"}
						params={{ locale }}
					>
						<Tx label={"Blueprint list (label)"} />
					</LinkTo>
				);
			}}
			{...props}
		/>
	);
};
