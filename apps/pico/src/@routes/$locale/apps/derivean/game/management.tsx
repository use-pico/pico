import { useMutationState } from "@tanstack/react-query";
import {
    createFileRoute,
    Outlet,
    useLoaderData,
    useParams,
} from "@tanstack/react-router";
import { AppLayout, LinkTo, LogoutIcon } from "@use-pico/client";
import { CycleButton } from "~/app/derivean/game/CycleButton";
import { GameMenu } from "~/app/derivean/game/GameMenu";
import { Logo } from "~/app/derivean/logo/Logo";

export const Route = createFileRoute("/$locale/apps/derivean/game/management")({
	component() {
		const { locale } = useParams({ from: "/$locale" });
		const { session, cycle } = useLoaderData({
			from: "/$locale/apps/derivean/game",
		});

		const mutation = useMutationState({
			filters: {
				status: "pending",
				mutationKey: ["useCycleMutation"],
			},
			select(mutation) {
				return mutation.state.status;
			},
		});

		return (
			<AppLayout
				logo={
					<LinkTo
						to={"/$locale/apps/derivean/game/management"}
						params={{ locale }}
					>
						<Logo />
					</LinkTo>
				}
				menu={
					<div className={"flex flex-row items-center gap-4"}>
						<GameMenu />
						<CycleButton
							cycle={cycle}
							userId={session.id}
						/>
					</div>
				}
				actions={
					<>
						{session.name}
						<LinkTo
							icon={"icon-[clarity--crown-line]"}
							to={"/$locale/apps/derivean/root"}
							params={{ locale }}
						/>

						<LinkTo
							icon={LogoutIcon}
							to={"/$locale/apps/derivean/public/logout"}
							params={{ locale }}
							preload={false}
						/>
					</>
				}
				css={{
					base:
						mutation.length ?
							["select-none", "pointer-events-none", "opacity-50"]
						:	undefined,
				}}
			>
				<Outlet />
			</AppLayout>
		);
	},
});
