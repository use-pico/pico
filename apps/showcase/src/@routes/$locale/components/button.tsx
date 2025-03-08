import { createFileRoute } from "@tanstack/react-router";
import { Button, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/common";

export const Route = createFileRoute("/$locale/components/button")({
	component() {
		return (
			<div className={tvc(["flex", "flex-col", "space-y-4"])}>
				<div className={tvc(["flex", "space-x-4"])}>
					<Button>
						<Tx label={"This is default button"} />
					</Button>

					<Button disabled>
						<Tx label={"This is default disabled button"} />
					</Button>
				</div>

				<div className={tvc(["flex", "space-x-4"])}>
					<Button variant={{ variant: "light" }}>
						<Tx label={"This is light button"} />
					</Button>

					<Button
						variant={{ variant: "light" }}
						disabled
					>
						<Tx label={"This is disabled light button"} />
					</Button>
				</div>

				<div className={tvc(["flex", "space-x-4"])}>
					<Button variant={{ variant: "subtle" }}>
						<Tx label={"This is subtle button"} />
					</Button>

					<Button
						variant={{ variant: "subtle" }}
						disabled
					>
						<Tx label={"This is disabled subtle button"} />
					</Button>
				</div>

				<div className={tvc(["flex", "space-x-4"])}>
					<Button variant={{ variant: "secondary" }}>
						<Tx label={"This is secondary button"} />
					</Button>

					<Button
						variant={{ variant: "secondary" }}
						disabled
					>
						<Tx label={"This is disabled secondary button"} />
					</Button>
				</div>

				<div className={tvc(["flex", "space-x-4"])}>
					<Button variant={{ variant: "danger" }}>
						<Tx label={"This is danger button"} />
					</Button>

					<Button
						variant={{ variant: "danger" }}
						disabled
					>
						<Tx label={"This is disabled danger button"} />
					</Button>
				</div>
			</div>
		);
	},
});
