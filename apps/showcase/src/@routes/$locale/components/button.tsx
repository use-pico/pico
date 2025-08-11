import { createFileRoute } from "@tanstack/react-router";
import { Button, Tx } from "@use-pico/client";
import { tvc } from "@use-pico/cls";

export const Route = createFileRoute("/$locale/components/button")({
	component() {
		return (
			<div
				className={tvc([
					"flex",
					"flex-col",
					"space-y-4",
				])}
			>
				<div
					className={tvc([
						"flex",
						"space-x-4",
					])}
				>
					<Button>
						<Tx label={"This is default button"} />
					</Button>

					<Button
						cls={({ what }) => ({
							variant: what.variant({
								borderless: true,
							}),
						})}
					>
						<Tx label={"This is default borderless button"} />
					</Button>

					<Button disabled>
						<Tx label={"This is default disabled button"} />
					</Button>
				</div>

				<div
					className={tvc([
						"flex",
						"space-x-4",
					])}
				>
					<Button
						cls={({ what }) => ({
							variant: what.variant({
								variant: "secondary",
							}),
						})}
					>
						<Tx label={"This is secondary button"} />
					</Button>

					<Button
						cls={({ what }) => ({
							variant: what.variant({
								variant: "secondary",
								borderless: true,
							}),
						})}
					>
						<Tx label={"This is secondary borderless button"} />
					</Button>

					<Button
						cls={({ what }) => ({
							variant: what.variant({
								variant: "secondary",
							}),
						})}
						disabled
					>
						<Tx label={"This is disabled secondary button"} />
					</Button>
				</div>

				<div
					className={tvc([
						"flex",
						"space-x-4",
					])}
				>
					<Button
						cls={({ what }) => ({
							variant: what.variant({
								light: true,
							}),
						})}
					>
						<Tx label={"This is light button"} />
					</Button>

					<Button
						cls={({ what }) => ({
							variant: what.variant({
								light: true,
								borderless: true,
							}),
						})}
					>
						<Tx label={"This is light borderless button"} />
					</Button>

					<Button
						cls={({ what }) => ({
							variant: what.variant({
								light: true,
							}),
						})}
						disabled
					>
						<Tx label={"This is disabled light button"} />
					</Button>
				</div>

				<div
					className={tvc([
						"flex",
						"space-x-4",
					])}
				>
					<Button
						cls={({ what }) => ({
							variant: what.variant({
								variant: "subtle",
							}),
						})}
					>
						<Tx label={"This is subtle button"} />
					</Button>

					<Button
						cls={({ what }) => ({
							variant: what.variant({
								variant: "subtle",
								borderless: true,
							}),
						})}
					>
						<Tx label={"This is subtle borderless button"} />
					</Button>

					<Button
						cls={({ what }) => ({
							variant: what.variant({
								variant: "subtle",
							}),
						})}
						disabled
					>
						<Tx label={"This is disabled subtle button"} />
					</Button>
				</div>

				<div
					className={tvc([
						"flex",
						"space-x-4",
					])}
				>
					<Button
						cls={({ what }) => ({
							variant: what.variant({
								variant: "neutral",
							}),
						})}
					>
						<Tx label={"This is neutral button"} />
					</Button>

					<Button
						cls={({ what }) => ({
							variant: what.variant({
								variant: "neutral",
								borderless: true,
							}),
						})}
					>
						<Tx label={"This is neutral borderless button"} />
					</Button>

					<Button
						cls={({ what }) => ({
							variant: what.variant({
								variant: "neutral",
							}),
						})}
						disabled
					>
						<Tx label={"This is disabled neutral button"} />
					</Button>
				</div>

				<div
					className={tvc([
						"flex",
						"space-x-4",
					])}
				>
					<Button
						cls={({ what }) => ({
							variant: what.variant({
								variant: "danger",
							}),
						})}
					>
						<Tx label={"This is danger button"} />
					</Button>

					<Button
						cls={({ what }) => ({
							variant: what.variant({
								variant: "danger",
								borderless: true,
							}),
						})}
					>
						<Tx label={"This is danger borderless button"} />
					</Button>

					<Button
						cls={({ what }) => ({
							variant: what.variant({
								variant: "danger",
							}),
						})}
						disabled
					>
						<Tx label={"This is disabled danger button"} />
					</Button>
				</div>

				<div
					className={tvc([
						"flex",
						"space-x-4",
					])}
				>
					<Button
						cls={({ what }) => ({
							variant: what.variant({
								variant: "danger",
								light: true,
							}),
						})}
					>
						<Tx label={"This is danger light button"} />
					</Button>

					<Button
						cls={({ what }) => ({
							variant: what.variant({
								variant: "danger",
								light: true,
								borderless: true,
							}),
						})}
					>
						<Tx label={"This is danger borderless button"} />
					</Button>

					<Button
						cls={({ what }) => ({
							variant: what.variant({
								variant: "danger",
								light: true,
							}),
						})}
						disabled
					>
						<Tx label={"This is disabled danger button"} />
					</Button>
				</div>
			</div>
		);
	},
});
