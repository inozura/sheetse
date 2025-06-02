import { Toast } from "../ui/intent/toast";
import { ThemeProvider } from "./theme-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			{children}
			<Toast />
		</ThemeProvider>
	);
}
