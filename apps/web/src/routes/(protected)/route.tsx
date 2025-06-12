import { authClient } from "@/lib/auth-client";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)")({
	component: RouteComponent,
	beforeLoad: async () => {
		const { data } = await authClient.getSession();

		if (!data) {
			return redirect({
				to: "/sign-in",
				replace: true,
			});
		}
	},
});

function RouteComponent() {
	return <Outlet />;
}
