"use client";

import { Separator } from "@/components/ui/shadcn/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/shadcn/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";

export default function DashboardProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<DashboardSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1 cursor-pointer" />
						<Separator orientation="vertical" className="mr-2 h-4" />
					</div>
				</header>
				<main className="h-full w-full container">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
