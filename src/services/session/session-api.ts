import { Routes } from "@/app/_constants/Routes";
import { api } from "@/services/api";
import { handleApiError } from "@/services/error-handling";
import { AxiosError } from "axios";

export const sessionApi = {
	verifySession: async (handleAuthLogout?: () => void) => {
		try {
			const res = await api.post(Routes.api.auth.verifySession);
			return res.data;
		} catch (error: unknown) {
			return handleApiError(
				error as AxiosError,
				"Failed to verify session, please try again later.",
				handleAuthLogout
			);
		}
	}
}