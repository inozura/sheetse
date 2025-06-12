import { Button } from "@/components/ui/intent/button";
import { ProgressCircle } from "@/components/ui/intent/progress-circle";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Button> & {
	loading: boolean;
	loadingText?: string;
};

export function ButtonLoading({
	loading,
	children,
	loadingText = "Loading...",
	...props
}: Props) {
	return (
		<Button
			aria-disabled={loading}
			isPending={loading}
			isDisabled={loading}
			{...props}
		>
			<ProgressCircle show={loading} isIndeterminate aria-label={loadingText} />
			{loading ? loadingText : (children as React.ReactNode)}
		</Button>
	);
}
