import type { JobSchema } from "@use-pico/common";
import { type FC } from "react";
import { t } from "../i18n/t";
import { td } from "../i18n/td";
import { BoolInline } from "../ui/BoolInline";
import { Card } from "../ui/Card";
import { JobStats } from "./JobStats";
import { JobStatus } from "./JobStatus";

export namespace JobCard {
	export interface Props extends Card.PropsEx<JobSchema> {}
}

export const JobCard: FC<JobCard.Props> = ({ ...props }) => {
	return (
		<Card<JobSchema>
			items={[
				{
					id: "status",
					label: t()`Job status (label)`,
					render: ({ entity }) => <JobStatus status={entity.status} />,
				},
				{
					id: "service.human",
					label: t()`Job service - human (label)`,
					render: ({ entity }) => td()(`Service [${entity.service}]`),
				},
				{
					id: "service",
					label: t()`Job service (label)`,
					render: ({ entity }) => entity.service,
					css: ["text-slate-500"],
				},
				{
					id: "commit",
					label: t()`Job commit (label)`,
					render: ({ entity }) => (
						<BoolInline
							size={"3xl"}
							value={entity.commit}
						/>
					),
				},
				{
					id: "stats",
					label: t()`Job stats (label)`,
					render: JobStats,
				},
			]}
			{...props}
		/>
	);
};
