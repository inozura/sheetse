import { IconClock, IconFolderBox, IconTrashPaper } from "@intentui/icons";

export const dashboardSidebar = {
	navMain: [
		{
			title: "Recent",
			url: "/files/recent",
			icon: IconClock,
			isActive: true,
			items: [],
		},
	],
	navSecondary: [
		{
			title: "All Projects",
			url: "/files/all-projects",
			icon: IconFolderBox,
			isActive: false,
			items: [],
		},
		{
			title: "Trash",
			url: "/files/trash",
			icon: IconTrashPaper,
			isActive: false,
			items: [],
		},
	],
};
