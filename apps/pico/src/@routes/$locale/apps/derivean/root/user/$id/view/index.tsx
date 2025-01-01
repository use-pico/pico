import { createFileRoute } from "@tanstack/react-router";
import { UserRepository } from "~/app/derivean/user/UserRepository";

export const Route = createFileRoute(
	"/$locale/apps/derivean/root/user/$id/view/",
)({
	component: () => {
		return "yep";
	},

});
