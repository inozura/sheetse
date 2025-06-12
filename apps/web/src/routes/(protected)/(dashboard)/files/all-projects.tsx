import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/(protected)/(dashboard)/files/all-projects",
)({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(protected)/(dashboard)/files/all-projects"!</div>;
}
