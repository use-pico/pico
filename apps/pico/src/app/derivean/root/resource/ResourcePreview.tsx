import { useParams } from "@tanstack/react-router";
import { LinkTo, ListIcon, Preview, TitlePreview, Tx } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

interface Data extends IdentitySchema.Type {
	name: string;
}

export namespace ResourcePreview {
	export interface Props extends Preview.PropsEx<Data> {
		//
	}
}

export const ResourcePreview: FC<ResourcePreview.Props> = (props) => {
	const { locale } = useParams({ from: "/$locale" });

	return (
		<Preview
			title={({ entity }) => (
				<TitlePreview
					icon={ResourceIcon}
					title={entity.name}
				/>
			)}
			actions={() => (
				<>
					<LinkTo
						icon={ListIcon}
						to={"/$locale/apps/derivean/root/resource/list"}
						params={{ locale }}
					>
						<Tx label={"Resource list (label)"} />
					</LinkTo>
				</>
			)}
			{...props}
		/>
	);
};
