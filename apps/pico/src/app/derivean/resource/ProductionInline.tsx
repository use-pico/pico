import { Badge, Icon, More } from "@use-pico/client";
import type { IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { CycleIcon } from "~/app/derivean/icon/CycleIcon";
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";

interface Data extends IdentitySchema.Type {
	name: string;
	amount: number;
	cycles: number;
	limit: number;
}

export namespace ProductionInline {
	export interface Props extends More.PropsEx<Data> {
		production: Data[];
	}
}

export const ProductionInline: FC<ProductionInline.Props> = ({
	production,
	...props
}) => {
	return (
		<More
			items={production}
			css={{ base: ["flex-col", "w-fit"] }}
			render={({ entity }) => {
				return (
					<div className={"flex flex-row gap-2"}>
						<Badge
							css={{
								base: ["flex", "items-center", "gap-2"],
							}}
						>
							<Icon icon={ResourceIcon} />
							{entity.name}
						</Badge>
						<Badge
							css={{
								base: [
									"bg-emerald-100",
									"border-emerald-500",
									"flex",
									"items-center",
									"gap-2",
								],
							}}
						>
							x{entity.amount}
						</Badge>
						<Badge
							css={{
								base: [
									"bg-amber-100",
									"border-amber-500",
									"flex",
									"items-center",
									"gap-2",
								],
							}}
						>
							<Icon icon={CycleIcon} />
							{entity.cycles}
						</Badge>
						<Badge
							css={{
								base: [
									"bg-purple-100",
									"border-purple-500",
									"flex",
									"items-center",
									"gap-2",
								],
							}}
						>
							<Icon icon={"icon-[hugeicons--limitation]"} />
							{entity.limit}
						</Badge>
					</div>
				);
			}}
			{...props}
		/>
	);
};
