import { Routes } from "@/app/_constants/Routes";
import { api } from "@/services/api";
import { handleApiError } from "@/services/error-handling";
import { AxiosError } from "axios";
import { Loan } from "@/app/_types/Loan";

export const getLoans = async (handleAuthLogout?: () => void) => {
	try {
		const res = await api.post(Routes.api.loans.get);
		return res.data;
	} catch (error: unknown) {
		return handleApiError(
			error as AxiosError,
			"Failed to verify session, please try again later.",
			handleAuthLogout
		);
	}
}