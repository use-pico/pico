import type { RequestSchema, ResponseSchema } from "@use-pico/common";
import type { ReactNode } from "react";
import { toast } from "sonner";
import type { z } from "zod";
import { t } from "../i18n/t";
import { td } from "../i18n/td";
import { JobIcon } from "../icon/JobIcon";
import { TrashIcon } from "../icon/TrashIcon";
import { Button } from "../ui/Button";
import { Progress } from "../ui/Progress";
import { JobCard } from "./JobCard";
import type { useJobManager } from "./useJobManager";

/**
 * Simple button used to handle job execution and it's progress with additional controls.
 *
 * @group ui
 */
export namespace JobButton {
	export interface Props<
		TRequestSchema extends RequestSchema = z.ZodAny,
		TResponseSchema extends ResponseSchema = z.ZodAny,
	> extends Button.Props {
		jobManager: useJobManager.JobManager<TRequestSchema, TResponseSchema>;
		/**
		 * Request data to be sent to the job.
		 *
		 * If not provided, button is used only to track job progress.
		 */
		request?(): z.infer<TRequestSchema>;
		right?: ReactNode;
	}

	export type PropsEx<
		TRequestSchema extends RequestSchema = z.ZodAny,
		TResponseSchema extends ResponseSchema = z.ZodAny,
	> = Omit<Props<TRequestSchema, TResponseSchema>, "jobManager" | "request">;
}

export const JobButton = <
	TRequestSchema extends RequestSchema = z.ZodAny,
	TResponseSchema extends ResponseSchema = z.ZodAny,
>({
	jobManager,
	request,
	right,
	...props
}: JobButton.Props<TRequestSchema, TResponseSchema>) => {
	const start = jobManager.useStart();
	const interrupt = jobManager.useInterrupt();
	const $delete = jobManager.useDelete();
	const job = jobManager.useJob();
	jobManager.useStatusSuccess(({ job }) => {
		toast.success(td()(`Job [${job.service}] Success`));
	});
	const loading = jobManager.useIsRunning();
	return (
		<div className={"w-fit"}>
			<div className={'flex flex-row items-center'}>
				<Button
					icon={{
						enabled: JobIcon,
						disabled: JobIcon,
					}}
					loading={loading}
					disabled={loading || !request}
					onClick={request ? () => start.start(request()) : undefined}
					action={{
						items: [
							{
								type: "modal",
								id: "detail",
								label: t()`Job detail (label)`,
								title: t()`Job detail (title)`,
								icon: JobIcon,
								disabled: !job,
								content: () => {
									return (
										<div>
											{job ?
												<JobCard entity={job} />
											:	"-"}
										</div>
									);
								},
							},
							{
								type: "click",
								id: "interrupt",
								label: t()`Job interrupt (label)`,
								icon: "icon-[bi--sign-stop]",
								loading: interrupt.mutation.isPending,
								disabled: interrupt.mutation.isPending || !loading || !job,
								onClick: () => {
									interrupt.interrupt();
								},
							},
							{
								type: "click",
								id: "delete",
								label: t()`Job delete (label)`,
								icon: TrashIcon,
								loading: $delete.mutation.isPending,
								disabled: !job,
								onClick: () => {
									$delete.delete();
								},
							},
						],
					}}
					css={{
						button: "rounded-b-none",
						action: "rounded-br-none",
					}}
					{...props}
				/>
				{right}
			</div>
			<Progress
				value={loading && job ? job?.progress : 0}
				css={{
					root: "h-1 bg-slate-300 rounded-t-none",
					progress: "bg-blue-400 rounded-t-none",
				}}
			/>
		</div>
	);
};
