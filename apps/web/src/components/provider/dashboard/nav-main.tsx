"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/shadcn/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/shadcn/sidebar";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export function NavMain({
	title,
	items,
}: {
	title: string;
	items: {
		title: string;
		url: string;
		icon?: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
		}[];
	}[];
}) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>{title}</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item, index) => (
					<Collapsible
						key={item.title}
						asChild
						defaultOpen={item.isActive}
						className={cn(
							"group/collapsible animate-in slide-in-from-left",
							`duration-${150 * (index + 1)}`,
						)}
					>
						<SidebarMenuItem>
							{item.items && item.items.length > 0 ? (
								<>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton tooltip={item.title}>
											{item.icon && <item.icon />}
											<span>{item.title}</span>
											<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.items?.map((subItem) => (
												<SidebarMenuSubItem
													className="cursor-pointer"
													key={subItem.title}
												>
													<SidebarMenuSubButton asChild>
														<Link to={subItem.url}>
															<span>{subItem.title}</span>
														</Link>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</>
							) : (
								<Link to={item.url}>
									<SidebarMenuButton
										className="cursor-pointer"
										tooltip={item.title}
									>
										{item.icon && <item.icon />}
										<span>{item.title}</span>
									</SidebarMenuButton>
								</Link>
							)}
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
