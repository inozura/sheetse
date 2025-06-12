import { getSession } from "@/lib/auth-client";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
	beforeLoad: async () => {
		const session = await getSession();

		if (session.data)
			return redirect({
				to: "/files",
				replace: true,
			});
	},
});
