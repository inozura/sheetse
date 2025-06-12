import DashboardProvider from "@/components/provider/dashboard/dashboard-provider";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/(dashboard)/files")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<DashboardProvider>
			<Outlet />
		</DashboardProvider>
	);
}
