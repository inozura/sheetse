"use client";

import { ButtonLoading } from "@/components/custom/button-loading";
import { Button } from "@/components/ui/intent/button";
import { Modal } from "@/components/ui/intent/modal";
import { Note } from "@/components/ui/intent/note";
import { Separator } from "@/components/ui/intent/separator";
import { TextField } from "@/components/ui/intent/text-field";
import { Tooltip } from "@/components/ui/intent/tooltip";
import { authClient } from "@/lib/auth-client";
import { IconBrandGoogle } from "@intentui/icons";
import { useState } from "react";
import { toast } from "sonner";

export default function AccountSecurity() {
	const { data } = authClient.useSession();

	const [isLoading, setIsLoading] = useState(false);
	const [errorContent, setErrorContent] = useState<string | null>(null);
	const [passwordModal, setPasswordModal] = useState(false);

	if (!data) return;

	const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorContent(null);
		setIsLoading(true);

		const formData = new FormData(e.currentTarget);
		const currentPassword = formData.get("currentPassword") as string;
		const newPassword = formData.get("newPassword") as string;
		const confirmPassword = formData.get("confirmPassword") as string;

		if (newPassword !== confirmPassword) {
			setErrorContent("Password does not match");
			return;
		}

		await authClient.changePassword({
			currentPassword,
			newPassword,
			fetchOptions: {
				onError: (error) => {
					setErrorContent(error.error.message);
				},
				onSuccess: () => {
					toast.success("Password updated successfully");
					setPasswordModal(false);
				},
			},
		});

		setIsLoading(false);
	};

	return (
		<>
			<div className="flex flex-col items-start">
				<div className="flex flex-col md:flex-row justify-between items-center w-full my-5">
					<p className="mb-3 text-xl font-semibold">Password</p>
					<Button
						size="small"
						intent="primary"
						onPress={() => setPasswordModal(true)}
					>
						Change Password
					</Button>
				</div>
				<Separator className="my-1" />
				<div className="flex flex-col md:flex-row justify-between items-center w-full my-5">
					<p className="mb-3 text-xl font-semibold">Single sign-on</p>
					<Tooltip delay={300}>
						<Tooltip.Trigger>
							<Button size="small" intent="secondary" isDisabled>
								Active SSO
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content>Work in progress :)</Tooltip.Content>
					</Tooltip>
				</div>
			</div>

			<Modal
				isOpen={passwordModal}
				onOpenChange={(bool) => setPasswordModal(bool)}
			>
				<Modal.Content isBlurred size="sm">
					<Modal.Header>
						<Modal.Title>Change Password</Modal.Title>
					</Modal.Header>
					<form onSubmit={handlePasswordUpdate}>
						<Modal.Body className="pb-1">
							{errorContent && <Note intent="danger">{errorContent}</Note>}
							<TextField
								isRequired
								autoFocus
								label="Current Password"
								type="password"
								name="currentPassword"
								placeholder="Enter current password"
							/>
							<TextField
								isRequired
								label="New Password"
								type="password"
								name="newPassword"
								placeholder="Enter new password"
							/>
							<TextField
								isRequired
								label="Confirm Password"
								type="password"
								name="confirmPassword"
								placeholder="Enter confirm password"
							/>
							<Note intent="warning">
								After you change your password, you need to login again
							</Note>
						</Modal.Body>
						<Modal.Footer className="flex flex-row justify-end">
							<ButtonLoading
								type="submit"
								loadingText="Processing..."
								loading={isLoading}
							>
								Change Password
							</ButtonLoading>
						</Modal.Footer>
					</form>
				</Modal.Content>
			</Modal>
		</>
	);
}
