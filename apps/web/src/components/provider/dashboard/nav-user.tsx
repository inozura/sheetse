"use client";

import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import AccountModal from "@/components/sections/account/account-modal";
import { useTheme } from "@/components/theme-provider";
import { Tooltip } from "@/components/ui/intent/tooltip";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/shadcn/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/shadcn/sidebar";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import { authClient } from "@/lib/auth-client";
import { toAcronym } from "@/utils/string";
import { IconMoonStar, IconSun } from "@intentui/icons";
import { redirect, useRouter } from "@tanstack/react-router";

export function NavUser() {
	const router = useRouter();
	const { isMobile } = useSidebar();
	const { setTheme, theme } = useTheme();
	const { data, isPending } = authClient.useSession();
	const [accountModalShow, setAccountModalShow] = useState(false);

	const handleThemeChange = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	const handleLogout = async () => {
		try {
			await authClient.signOut({
				fetchOptions: {
					onSuccess: () => {
						router.navigate({
							to: "/sign-in",
							replace: true,
						});
					},
				},
			});
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unknown error occurred");
			}
		}
	};

	if (isPending)
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
		<>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage
										src={data?.user.image ?? ""}
										alt={data?.user.name ?? data?.user?.email ?? ""}
									/>
									<AvatarFallback className="rounded-lg">
										{toAcronym(data?.user?.email!.split("@")[0] ?? "")}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									{data?.user.name && (
										<span className="truncate font-semibold">
											{data?.user.name}
										</span>
									)}
									<span className="truncate text-xs">{data?.user?.email}</span>
								</div>
								<ChevronsUpDown className="ml-auto size-4" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
							side={isMobile ? "bottom" : "right"}
							align="end"
							sideOffset={4}
						>
							<DropdownMenuLabel className="p-0 font-normal">
								<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
									<Avatar className="h-8 w-8 rounded-lg">
										<AvatarImage src={data?.user?.image ?? ""} />
										<AvatarFallback>
											{toAcronym(data?.user?.email!.split("@")[0] ?? "")}
										</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										{data?.user.name && (
											<span className="truncate font-semibold">
												{data?.user.name}
											</span>
										)}
										<span className="truncate text-xs">
											{data?.user?.email}
										</span>
									</div>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem onClick={() => setAccountModalShow(true)}>
									<BadgeCheck />
									Account
								</DropdownMenuItem>
								<Tooltip delay={300}>
									<Tooltip.Trigger>
										<DropdownMenuItem disabled>
											<Bell />
											Notifications
										</DropdownMenuItem>
									</Tooltip.Trigger>
									<Tooltip.Content placement="right">
										Cooming soon!
									</Tooltip.Content>
								</Tooltip>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={handleThemeChange}>
									{theme === "dark" ? <IconMoonStar /> : <IconSun />}
									Theme
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={handleLogout}>
								<LogOut />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>

			{/* Account Modal */}
			<AccountModal
				openModal={accountModalShow}
				setOpenModal={setAccountModalShow}
			/>
		</>
	);
}
