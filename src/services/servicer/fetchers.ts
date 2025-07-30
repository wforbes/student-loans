import { Routes } from "@/app/_constants/Routes";
import { api } from "@/services/api";
import { handleApiError } from "@/services/error-handling";
import { AxiosError } from "axios";
import { Servicer } from "@/app/_types/Servicer";

export const getServicers = async (handleAuthLogout?: () => void) => {
	try {
		const res = await api.get(Routes.api.servicers.get);
		return res.data as Servicer[];
	} catch (error: unknown) {
		return handleApiError(
			error as AxiosError,
			"Failed to verify session, please try again later.",
			handleAuthLogout
		);
	}
}