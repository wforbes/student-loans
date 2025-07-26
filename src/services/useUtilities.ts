import { Routes } from "@/app/_constants/Routes";
import { useRouter } from "next/navigation";

export const useUtilities = () => {
	const router = useRouter();

	const handleAuthLogout = () => {
		router.push(Routes.public.auth.login + (
			(window.location.pathname !== '/'
				&& window.location.pathname !== Routes.public.auth.login) // < avoid infinite redirect!
				? `?redirect=${encodeURIComponent(window.location.pathname)}` : ""));
	}

	return { handleAuthLogout };
}