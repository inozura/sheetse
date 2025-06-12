import { ThemeProvider } from "../theme-provider";
import { Toast } from "../ui/intent/toast";

export function AppProviders({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			{children}
			<Toast />
		</ThemeProvider>
	);
}
