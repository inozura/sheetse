import { ButtonLoading } from "@/components/custom/button-loading";
import { Card } from "@/components/ui/intent/card";
import { Checkbox } from "@/components/ui/intent/checkbox";
import { Note } from "@/components/ui/intent/note";
import { Separator } from "@/components/ui/intent/separator";
import { TextField } from "@/components/ui/intent/text-field";
import { authClient } from "@/lib/auth-client";
import { IconBrandGoogle } from "@intentui/icons";
import { useForm } from "@tanstack/react-form";
import {
	Link,
	createFileRoute,
	redirect,
	useNavigate,
} from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/(auth)/sign-up")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: "Eshes - Signup",
			},
		],
	}),
});

function RouteComponent() {
	const navigate = useNavigate();

	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			setError(null);
			setIsLoading(true);

			const res = await authClient.signUp.email(
				{
					name: value.name,
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

			setIsLoading(false);

			if (res.error) setError(res.error.message ?? null);
		},
		onSubmitInvalid: (error) => {
			console.log("error", error);
		},
		validators: {
			onSubmit: z.object({
				name: z.string().min(3, "Name must be at least 3 characters"),
				email: z.string().email("Invalid email address"),
				password: z.string().min(8, "Password must be at least 8 characters"),
			}),
		},
	});

	const handleGoogleAuth = async () => {
		setError(null);

		const res = await authClient.signIn.social({
			provider: "google",
		});

		if (res.error) {
			setError(res.error.message ?? null);
		}
	};

	return (
		<div className="flex h-full w-full items-center justify-center">
			<Card className="md:w-[400px]">
				<Card.Header>
					<Card.Title>Sign up</Card.Title>
					<Card.Description>
						Choose your preferred sign up method
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<ButtonLoading
						className="w-full"
						intent="outline"
						loading={isLoading}
						onPress={handleGoogleAuth}
						loadingText="Processing..."
					>
						<IconBrandGoogle /> Signup with Google
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
							<form.Field name="name">
								{(field) => (
									<TextField
										autoFocus
										isRequired
										label="Full Name"
										name={field.name}
										onChange={field.handleChange}
										placeholder="Enter your full name"
										errorMessage={field.state.meta.errors
											.map((err) => err?.message)
											?.join(",")}
									/>
								)}
							</form.Field>

							<form.Field name="email">
								{(field) => (
									<TextField
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
								{(field) => {
									console.log(
										"field",
										field.state.meta.errors
											.map((err) => err?.message)
											?.join(","),
									);
									return (
										<TextField
											isRequired
											isRevealable
											type="password"
											name={field.name}
											label="Password"
											autoComplete="off"
											onChange={field.handleChange}
											placeholder="Enter your password"
											errorMessage={field.state.meta.errors
												.map((err) => err?.message)
												?.join(",")}
										/>
									);
								}}
							</form.Field>
							<div className="flex items-center justify-between">
								<Checkbox>Remember me</Checkbox>
							</div>
						</div>
						<ButtonLoading
							type="submit"
							className="my-5"
							loading={isLoading}
							loadingText="Signup..."
						>
							Register
						</ButtonLoading>
						<p className="text text-foreground text-center text-sm">
							Already have an account?{" "}
							<Link
								to="/sign-in"
								className="font-medium text-primary underline"
							>
								Sign in
							</Link>
						</p>
					</form>
				</Card.Content>
			</Card>
		</div>
	);
}
