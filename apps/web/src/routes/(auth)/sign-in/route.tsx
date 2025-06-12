import { ButtonLoading } from "@/components/custom/button-loading";
import { Card } from "@/components/ui/intent/card";
import { Checkbox } from "@/components/ui/intent/checkbox";
import { Note } from "@/components/ui/intent/note";
import { Separator } from "@/components/ui/intent/separator";
import { TextField } from "@/components/ui/intent/text-field";
import { authClient } from "@/lib/auth-client";
import { IconBrandGoogle } from "@intentui/icons";
import { useForm } from "@tanstack/react-form";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/(auth)/sign-in")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: "Eshes - Signin",
			},
		],
	}),
});

function RouteComponent() {
	const navigate = useNavigate();

	const [error, setError] = useState<string | null>(null);

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			setError(null);

			const res = await authClient.signIn.email(
				{
					email: value.email,
					password: value.password,
				},
				{
					onSuccess: () => {
						navigate({
							to: "/files",
						});
					},
				},
			);

			if (res.error) setError(res.error.message ?? null);
		},
		onSubmitInvalid: (errors) => {
			console.log(errors);
		},
		validators: {
			onSubmit: z.object({
				email: z.string().email("Invalid email address"),
				password: z.string().min(8, "Password must be at least 8 characters"),
			}),
		},
	});

	const handleGoogleAuth = async () => {
		setError(null);

		const res = await authClient.signIn.social({
			provider: "google",
			callbackURL: `${window.location.origin}/files`,
		});

		if (res.error) {
			setError(res.error.message ?? null);
		}
	};

	return (
		<div className="flex h-full w-full items-center justify-center">
			<Card className="md:w-[400px]">
				<Card.Header>
					<Card.Title>Sign in</Card.Title>
					<Card.Description>
						Choose your preferred sign in method
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<ButtonLoading
						className="w-full"
						intent="outline"
						loading={form.state.isSubmitting}
						onPress={handleGoogleAuth}
					>
						<IconBrandGoogle /> Login with Google
					</ButtonLoading>

					<div className="my-4 flex items-center justify-center">
						<Separator className="w-[40%]" />
						<span className="mx-1 text-sm text-gray-500">OR</span>
						<Separator className="w-[40%]" />
					</div>

					{error && (
						<Note intent="danger" className="my-3">
							{error}
						</Note>
					)}

					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							void form.handleSubmit();
						}}
						className="flex min-w-64 flex-1 flex-col"
					>
						<div className="flex flex-col gap-2 [&>input]:mb-3">
							<form.Field name="email">
								{(field) => (
									<TextField
										autoFocus
										isRequired
										label="Email"
										name={field.name}
										onChange={field.handleChange}
										placeholder="Enter your email"
										errorMessage={field.state.meta.errors
											.map((err) => err?.message)
											?.join(",")}
									/>
								)}
							</form.Field>

							<form.Field name="password">
								{(field) => (
									<TextField
										isRequired
										isRevealable
										type="password"
										label="Password"
										name={field.name}
										onChange={field.handleChange}
										autoComplete="off"
										placeholder="Enter your password"
										errorMessage={field.state.meta.errors
											.map((err) => err?.message)
											?.join(",")}
									/>
								)}
							</form.Field>
							<div className="flex items-center justify-between">
								<Checkbox>Remember me</Checkbox>
								<Link
									to="/forgot-password"
									className="text-foreground text-xs underline"
								>
									Forgot Password?
								</Link>
							</div>
						</div>
						<ButtonLoading
							type="submit"
							className="my-5"
							loading={form.state.isSubmitting}
							loadingText="Signing in..."
						>
							Sign in
						</ButtonLoading>
						<p className="text text-foreground text-center text-sm">
							Don{"'"}t have an account?{" "}
							<Link
								to="/sign-up"
								className="font-medium text-primary underline"
							>
								Sign up
							</Link>
						</p>
					</form>
				</Card.Content>
			</Card>
		</div>
	);
}
