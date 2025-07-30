import { api } from "@/services/api";
import { Routes } from "@/app/_constants/Routes";
import { InsertServicer } from "@/app/_types/Servicer";

export const servicersApi = {
	addServicer: async (data: InsertServicer) => {
		const res = await api.put(Routes.api.servicers.put, data);
		return res.data;
	}
}