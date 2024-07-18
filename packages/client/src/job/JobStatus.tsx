import type { FC } from "react";
import { td } from "../i18n/td";

export namespace JobStatus {
	export interface Props {
		status: number;
	}
}

export const JobStatus: FC<JobStatus.Props> = ({ status }) => {
	return td()(`Job Status [${status}]`);
};
