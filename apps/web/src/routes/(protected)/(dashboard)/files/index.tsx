import DashboardProvider from "@/components/provider/dashboard/dashboard-provider";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/(dashboard)/files/")({
	component: RouteComponent,
	beforeLoad: async () => {
		return redirect({
			to: "/files/recent",
		});
	},
});

function RouteComponent() {
	return (
		<DashboardProvider>
			<Outlet />
		</DashboardProvider>
	);
}
