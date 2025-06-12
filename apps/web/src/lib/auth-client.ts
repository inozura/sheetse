import { env } from "@/env";
import { usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: env.VITE_SERVER_URL,
	plugins: [usernameClient()],
});

export const getSession = async () => await authClient.getSession();

export const getUser = async () => (await authClient.getSession()).data?.user;
