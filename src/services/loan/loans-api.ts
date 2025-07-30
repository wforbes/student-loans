import { EditLoan, NewLoan } from "@/db/infra/types/Loan";
import { api } from "../api";
import { Routes } from "@/app/_constants/Routes";

export const loansApi = {
	addLoan: async (data: NewLoan) => {
		const res = await api.put(Routes.api.loans.put, data);
		return res.data;
	},
	editLoan: async (data: EditLoan) => {
		const res = await api.put(Routes.api.loans.put, data);
		return res.data;
	},
	deleteLoan: async (id: string) => {
		const res = await api.delete(Routes.api.loans.delete(id));
		return res.data;
	}
}