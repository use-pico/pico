import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/")({
	beforeLoad: async ({ context: { queryClient }, params: { locale } }) => {
        //
        
		// if (ticket) {
		// 	throw redirect({
		// 		to: `/$locale/${ticket.site}`,
		// 	});
		// }
		// throw redirect({
		// 	to: `/$locale/public`,
		// 	params: { locale },
		// });
	},
});
