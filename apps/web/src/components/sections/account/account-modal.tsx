import { Modal } from "@/components/ui/intent/modal";
import { Tabs } from "@/components/ui/intent/tabs";
import { IconPerson, IconUnlocked } from "@intentui/icons";
import AccountProfile from "./profile";
import AccountSecurity from "./security";

interface AccountModalProps {
	openModal: boolean;
	setOpenModal: (open: boolean) => void;
}

export default function AccountModal({
	openModal,
	setOpenModal,
}: AccountModalProps) {
	return (
		<Modal isOpen={openModal} onOpenChange={(bool) => setOpenModal(bool)}>
			<Modal.Content classNames={{ content: "p-5 md:min-h-[35vh]" }}>
				<Tabs aria-label="account-tab" className="py-3">
					<Tabs.List>
						<Tabs.Tab id="profile">
							<IconPerson /> Profile
						</Tabs.Tab>
						<Tabs.Tab id="security">
							<IconUnlocked /> Security
						</Tabs.Tab>
					</Tabs.List>
					<Tabs.Panel id="profile">
						<AccountProfile />
					</Tabs.Panel>
					<Tabs.Panel id="security">
						<AccountSecurity />
					</Tabs.Panel>
				</Tabs>
			</Modal.Content>
		</Modal>
	);
}
