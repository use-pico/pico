import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ls } from "@use-pico/client";
import { tvc } from "@use-pico/common";
import { RegisterForm } from "~/app/derivean/public/RegisterForm";

export const Route = createFileRoute("/$locale/apps/derivean/public/register")({
	component: () => {
		const navigate = useNavigate({
			from: "/$locale",
		});

		return (
			<div
				className={tvc([
					"flex",
					"justify-center",
					"h-screen",
					"bg-gradient-to-tr",
					"from-blue-700",
					"to-blue-400",
				])}
			>
				<div
					className={
						"flex flex-col bg-slate-100 p-20 w-1/2 m-10 drop-shadow-xl"
					}
				>
					<hr className={"my-12 h-0.5 border-t-0 bg-slate-300"} />
					<RegisterForm
						onSuccess={async (session) => {
							ls.set("session", session);
							await navigate({ to: "/$locale/apps/derivean/game" });
						}}
					/>
				</div>
			</div>
		);
	},
});
