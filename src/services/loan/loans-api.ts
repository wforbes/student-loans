import { Loan } from "@/app/_types/Loan";
import { api } from "../api";
import { Routes } from "@/app/_constants/Routes";

export const loansApi = {
	addLoan: async (data: Loan) => {
		const res = await api.post(Routes.api.loans.put, data);
		return res.data;
	}
}