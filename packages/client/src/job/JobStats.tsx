import { cssOf, type JobSchema, type WithEntity } from "@use-pico/common";
import type { FC } from "react";
import { t } from "../i18n/t";
import { StatInline } from "../ui/StatInline";

export namespace JobStats {
	export interface Props extends WithEntity.Schema<JobSchema> {}
}

export const JobStats: FC<JobStats.Props> = ({ entity }) => {
	return (
		<div className={cssOf("flex flex-row items-center gap-4")}>
			<StatInline
				icon={"icon-[icon-park-outline--success]"}
				label={t()`Success count`}
				count={entity.successCount}
				css={["text-green-600"]}
			/>
			<StatInline
				icon={"icon-[material-symbols-light--error-outline]"}
				label={t()`Error count`}
				count={entity.errorCount}
				css={["text-red-600"]}
			/>
			<StatInline
				icon={"icon-[quill--warning]"}
				label={t()`Skip count`}
				count={entity.skipCount}
				css={["text-amber-600"]}
			/>
			<StatInline
				icon={"icon-[iconamoon--discount-thin]"}
				label={t()`Total count`}
				count={entity.total}
				css={["text-purple-600"]}
			/>
		</div>
	);
};
