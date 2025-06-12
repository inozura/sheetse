"use client";

import * as React from "react";

import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/shadcn/sidebar";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import { authClient } from "@/lib/auth-client";
import { IconBrandNotion } from "@intentui/icons";

export function DashboardLogo() {
	const { data } = authClient.useSession();

	if (!data?.session)
		return (
			<div className="flex flex-row items-center gap-2 p-[3px] w-full">
				<Skeleton className="h-7 w-7 rounded-lg" />
				<div className="space-y-2">
					<Skeleton className="h-[17px] w-[150px]" />
					<Skeleton className="h-[17px] w-[150px]" />
				</div>
			</div>
		);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
						<IconBrandNotion />
					</div>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-semibold">Sheesh</span>
						<span className="truncate text-xs">{data.user.email}</span>
					</div>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
