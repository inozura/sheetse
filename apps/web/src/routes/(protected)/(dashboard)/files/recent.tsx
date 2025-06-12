import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/(dashboard)/files/recent")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(protected)/(dashboard)/files/recent"!</div>;
}
