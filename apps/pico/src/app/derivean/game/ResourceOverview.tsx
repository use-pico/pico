import { More } from "@use-pico/client";
import type { withRepositorySchema } from "@use-pico/common";
import type { FC } from "react";
import type { StorageSchema } from "~/app/derivean/storage/StorageSchema";

export namespace ResourceOverview {
	export interface Props {
		entities: withRepositorySchema.Output<StorageSchema>[];
	}
}

export const ResourceOverview: FC<ResourceOverview.Props> = ({ entities }) => {
	return (
		<div className={"w-full"}>
			<More
				items={entities}
				render={({ entity }) => {
					return (
						<div>
							<div>{entity.resource.name}</div>
							<div>{entity.amount}</div>
						</div>
					);
				}}
			/>
		</div>
	);
};
