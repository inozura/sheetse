"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/shadcn/avatar";
import { authClient } from "@/lib/auth-client";
import { toAcronym } from "@/utils/string";
import { IconCircleCheck, IconShieldCrossed } from "@intentui/icons";

export default function AccountProfile() {
	const { data } = authClient.useSession();

	if (!data) return;

	return (
		<div className="flex gap-8 flex-col md:flex-row items-start w-full pt-3 px-5">
			<Avatar className="h-14 w-14">
				<AvatarFallback>
					{toAcronym(data.user.email!.split("@")[0]!)}
				</AvatarFallback>
			</Avatar>
			<div className="flex flex-col items-start">
				<div className="mb-5">
					<p className="text-xl font-semibold mb-3">Registered with</p>
					<p>Email</p>
				</div>
				<div className="mb-5">
					<p className="text-xl font-semibold mb-3">Email</p>
					<p className="dark:text-gray-400">{data.user.email}</p>
				</div>
				<div className="mb-5">
					<p className="text-xl font-semibold mb-3">Verified</p>
					<p className="dark:text-gray-400">
						{data.user.emailVerified ? (
							<span className="flex flex-row">
								Email has been Verified{" "}
								<IconCircleCheck className="ms-2 text-green-500" />
							</span>
						) : (
							<span className="flex flex-row">
								Email has not Verified{" "}
								<IconShieldCrossed className="ms-2 text-red-500" />
							</span>
						)}
					</p>
				</div>
			</div>
		</div>
	);
}
