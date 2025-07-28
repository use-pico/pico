import { createFileRoute } from "@tanstack/react-router";
import { Issues, Tx } from "@use-pico/client";

export const Route = createFileRoute("/$locale/components/issues")({
	component() {
		return (
			<div className={"flex flex-col gap-4"}>
				<h2>Default</h2>
				<Issues
					textTitle={<Tx label={"Default Issues"} />}
					items={[
						{
							id: "1",
							message: "Some error",
							type: "error",
						},
						{
							id: "2",
							message: "Some warning",
							type: "warning",
						},
						{
							id: "3",
							message: "Some info",
							type: "info",
						},
					]}
				/>

				<h2>Inline</h2>
				<Issues
					limit={5}
					items={[
						{
							id: "1",
							message: "Some error",
							type: "error",
						},
						{
							id: "2",
							message: "Some warning",
							type: "warning",
						},
						{
							id: "3",
							message: "Some info",
							type: "info",
						},
					]}
				/>
			</div>
		);
	},
});
