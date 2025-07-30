import { handleApiError } from "../error-handling";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useUtilities } from "../useUtilities";
import { useMutation } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { servicersApi } from "./servicers-api";

export const useAddServicerMutation = () => {
	const queryClient = useQueryClient();
	const { handleAuthLogout } = useUtilities();

	return useMutation({
		mutationFn: servicersApi.addServicer,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.servicers.all() });
		},
		onError: (error) => {
			handleApiError(error as AxiosError, "Failed to add servicer, please try again later.", handleAuthLogout);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.servicers.all() });
		}
	})
}