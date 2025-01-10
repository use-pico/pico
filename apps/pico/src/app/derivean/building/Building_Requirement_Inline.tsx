import { Icon, More } from "@use-pico/client";
import { toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { Building_Requirement_InlineCss } from "~/app/derivean/root/building/Building_Requirement_InlineCss";

export namespace Building_Requirement_Inline {
	interface Data extends IdentitySchema.Type {
		name: string;
		buildingBaseId: string;
		amount: number;
	}

	interface Diff extends IdentitySchema.Type {
		buildingBaseId: string;
		amount: number;
	}

	export interface Props
		extends Building_Requirement_InlineCss.Props<More.PropsEx<Data>> {
		requirements: Data[];
		diff?: Diff[];
	}
}

export const Building_Requirement_Inline: FC<
	Building_Requirement_Inline.Props
> = ({
	requirements,
	diff,
	variant,
	tva = Building_Requirement_InlineCss,
	css,
	...props
}) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<More
			items={requirements}
			render={({ entity }) => {
				const baseBuilding = diff?.find(
					(r) => r.buildingBaseId === entity.buildingBaseId,
				);

				return (
					<div className={tv.item()}>
						<div>{entity.name}</div>
						<div className={"text-md font-bold text-slate-500"}>
							x{toHumanNumber({ number: entity.amount })}
						</div>
						{baseBuilding ?
							<>
								{baseBuilding.amount > 0 ?
									<div className={"text-sm text-red-500"}>
										(-{toHumanNumber({ number: baseBuilding.amount })})
									</div>
								:	<Icon
										icon={"icon-[charm--cross]"}
										css={{
											base: ["text-red-500"],
										}}
									/>
								}
							</>
						: diff ?
							<Icon
								icon={"icon-[pajamas--check-sm]"}
								css={{
									base: ["text-emerald-600"],
								}}
							/>
						:	null}
					</div>
				);
			}}
			{...props}
		/>
	);
};
