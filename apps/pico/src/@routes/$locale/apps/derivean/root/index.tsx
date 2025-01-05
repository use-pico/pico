import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Button, toast, Tx } from "@use-pico/client";
import { translator } from "@use-pico/common";
import { kysely } from "~/app/derivean/db/db";
import { seed } from "~/app/derivean/db/seed";
import { GameIcon } from "~/app/derivean/icon/GameIcon";

export const Route = createFileRoute("/$locale/apps/derivean/root/")({
	component() {
		const mutation = useMutation({
			mutationKey: ["base-game"],
			async mutationFn() {
				return toast.promise(seed(kysely), {
					success: translator.text("Base game installed (toast)"),
					error: translator.text("Base game installation failed (toast)"),
					loading: translator.text("Installing base game (toast)"),
				});
			},
		});

		return (
			<div className={"flex items-center justify-center mt-10"}>
				<Button
					iconEnabled={GameIcon}
					loading={mutation.isPending}
					onClick={() => mutation.mutate()}
				>
					<Tx label={"Install base game (label)"} />
				</Button>
			</div>
		);
	},
});
