import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/(dashboard)/files/trash")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(protected)/(dashboard)/files/trash"!</div>;
}
