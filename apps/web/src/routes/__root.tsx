import Loader from "@/components/loader";
import { AppProviders } from "@/components/provider/app-provider";
import { ORPCContext, link, type orpc } from "@/utils/orpc";
import { createORPCClient } from "@orpc/client";
import { createORPCReactQueryUtils } from "@orpc/react-query";
import type { RouterClient } from "@orpc/server";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	HeadContent,
	Outlet,
	createRootRouteWithContext,
	useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useState } from "react";
import type { appRouter } from "../../../server/src/routers";
import "../styles/global.css";

export interface RouterAppContext {
	orpc: typeof orpc;
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
	component: RootComponent,
	head: () => ({
		meta: [
			{
				title: "Eshes",
			},
			{
				name: "description",
				content: "My App is a web application",
			},
		],
		links: [
			{
				rel: "icon",
				href: "/favicon.ico",
			},
		],
	}),
});

function RootComponent() {
	const isFetching = useRouterState({
		select: (s) => s.isLoading,
	});

	const [client] = useState<RouterClient<typeof appRouter>>(() =>
		createORPCClient(link),
	);
	const [orpcUtils] = useState(() => createORPCReactQueryUtils(client));

	return (
		<>
			<HeadContent />
			<ORPCContext.Provider value={orpcUtils}>
				<AppProviders>
					<div className="h-svh">
						<Outlet />
					</div>
				</AppProviders>
			</ORPCContext.Provider>
			<TanStackRouterDevtools position="bottom-left" />
			<ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
		</>
	);
}
