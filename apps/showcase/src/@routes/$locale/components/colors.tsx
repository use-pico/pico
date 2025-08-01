import { createFileRoute } from "@tanstack/react-router";
import { tvc } from "@use-pico/common";

export const Route = createFileRoute("/$locale/components/colors")({
	component() {
		return (
			<div
				className={tvc([
					"w-full",
					"flex",
					"flex-col",
					"gap-2",
				])}
			>
				<div
					className={tvc([
						"w-full",
						"px-8",
						"py-4",
						"text-xl",
						"bold",
						"bg-(--pico-color-primary-bg-default)",
						"border-(--pico-color-primary-border-default)",
						"text-(--pico-color-primary-text-default)",
						"shadow-(--pico-color-primary-shadow-default)",
						"hover:shadow-(--pico-color-primary-shadow-hover)",
						"hover:bg-(--pico-color-primary-bg-hover)",
						"hover:border-(--pico-color-primary-border-hover)",
						"hover:text-(--pico-color-primary-text-hover)",
					])}
				>
					Primary
				</div>

				<div
					className={tvc([
						"w-full",
						"px-8",
						"py-4",
						"text-xl",
						"bold",
						"bg-(--pico-color-secondary-bg-default)",
						"border-(--pico-color-secondary-border-default)",
						"text-(--pico-color-secondary-text-default)",
						"shadow-(--pico-color-secondary-shadow-default)",
						"hover:shadow-(--pico-color-secondary-shadow-hover)",
						"hover:bg-(--pico-color-secondary-bg-hover)",
						"hover:border-(--pico-color-secondary-border-hover)",
						"hover:text-(--pico-color-secondary-text-hover)",
					])}
				>
					Secondary
				</div>

				<div
					className={tvc([
						"w-full",
						"px-8",
						"py-4",
						"text-xl",
						"bold",
						"bg-(--pico-color-danger-bg-default)",
						"border-(--pico-color-danger-border-default)",
						"text-(--pico-color-danger-text-default)",
						"shadow-(--pico-color-danger-shadow-default)",
						"hover:shadow-(--pico-color-danger-shadow-hover)",
						"hover:bg-(--pico-color-danger-bg-hover)",
						"hover:border-(--pico-color-danger-border-hover)",
						"hover:text-(--pico-color-danger-text-hover)",
					])}
				>
					Danger
				</div>

				<div
					className={tvc([
						"w-full",
						"px-8",
						"py-4",
						"text-xl",
						"bold",
						"bg-(--pico-color-danger-light-bg-default)",
						"border-(--pico-color-danger-light-border-default)",
						"text-(--pico-color-danger-light-text-default)",
						"shadow-(--pico-color-danger-light-shadow-default)",
						"hover:shadow-(--pico-color-danger-light-shadow-hover)",
						"hover:bg-(--pico-color-danger-light-bg-hover)",
						"hover:border-(--pico-color-danger-light-border-hover)",
						"hover:text-(--pico-color-danger-light-text-hover)",
					])}
				>
					Danger - Light
				</div>

				<div
					className={tvc([
						"w-full",
						"px-8",
						"py-4",
						"text-xl",
						"bold",
						"bg-(--pico-color-neutral-bg-default)",
						"border-(--pico-color-neutral-border-default)",
						"text-(--pico-color-neutral-text-default)",
						"shadow-(--pico-color-neutral-shadow-default)",
						"hover:shadow-(--pico-color-neutral-shadow-hover)",
						"hover:bg-(--pico-color-neutral-bg-hover)",
						"hover:border-(--pico-color-neutral-border-hover)",
						"hover:text-(--pico-color-neutral-text-hover)",
					])}
				>
					Neutral
				</div>

				<div
					className={tvc([
						"w-full",
						"px-8",
						"py-4",
						"text-xl",
						"bold",
						"bg-(--pico-color-light-bg-default)",
						"border-(--pico-color-light-border-default)",
						"text-(--pico-color-light-text-default)",
						"shadow-(--pico-color-light-shadow-default)",
						"hover:shadow-(--pico-color-light-shadow-hover)",
						"hover:bg-(--pico-color-light-bg-hover)",
						"hover:border-(--pico-color-light-border-hover)",
						"hover:text-(--pico-color-light-text-hover)",
					])}
				>
					Light
				</div>

				<div
					className={tvc([
						"w-full",
						"px-8",
						"py-4",
						"text-xl",
						"bold",
						"bg-(--pico-color-subtle-bg-default)",
						"border-(--pico-color-subtle-border-default)",
						"text-(--pico-color-subtle-text-default)",
						"shadow-(--pico-color-subtle-shadow-default)",
						"hover:shadow-(--pico-color-subtle-shadow-hover)",
						"hover:bg-(--pico-color-subtle-bg-hover)",
						"hover:border-(--pico-color-subtle-border-hover)",
						"hover:text-(--pico-color-subtle-text-hover)",
					])}
				>
					Subtle
				</div>
			</div>
		);
	},
});
