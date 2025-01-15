import { useParams } from "@tanstack/react-router";
import { LinkTo, ListIcon, Preview, TitlePreview, Tx } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";

export namespace BlueprintPreview {
	export interface Data extends IdentitySchema.Type {
		name: string;
	}

	export interface Props extends Preview.PropsEx<Data> {
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
			actions={({ entity }) => {
				return (
					<>
						<LinkTo
							icon={ListIcon}
							to={"/$locale/apps/derivean/root/blueprint/list"}
							params={{ locale }}
						>
							<Tx label={"Blueprint list (label)"} />
						</LinkTo>

						<LinkTo
							icon={"icon-[ph--graph-light]"}
							to={"/$locale/apps/derivean/root/editor"}
							params={{ locale }}
							search={{ zoomTo: entity.id }}
						>
							<Tx label={"Editor (label)"} />
						</LinkTo>
					</>
				);
			}}
			{...props}
		/>
	);
};
