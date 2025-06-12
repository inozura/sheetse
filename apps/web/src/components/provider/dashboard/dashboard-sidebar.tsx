"use client";

import type * as React from "react";

import { NavMain } from "@/components/provider/dashboard/nav-main";
import { NavUser } from "@/components/provider/dashboard/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/shadcn/sidebar";
import { dashboardSidebar } from "@/constant/sidebar";
import { DashboardLogo } from "./dashboard-logo";

interface DashboardSidebarProps
	extends React.ComponentPropsWithoutRef<typeof Sidebar> {
	withRail?: boolean;
}

export function DashboardSidebar({
	withRail = false,
	...props
}: DashboardSidebarProps) {
	return (
		<Sidebar variant="inset" collapsible="icon" {...props}>
			<SidebarHeader>
				<DashboardLogo />
			</SidebarHeader>
			<SidebarContent>
				<NavMain title="Activity" items={dashboardSidebar.navMain} />
				<NavMain title="Group" items={dashboardSidebar.navSecondary} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			{withRail && <SidebarRail />}
		</Sidebar>
	);
}
