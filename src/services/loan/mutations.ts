import { handleApiError } from "../error-handling";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useUtilities } from "../useUtilities";
import { useMutation } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { loansApi } from "./loans-api";

export const useAddLoanMutation = () => {
	const queryClient = useQueryClient();
	const { handleAuthLogout } = useUtilities();

	return useMutation({
		mutationFn: loansApi.addLoan,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.loans.all() });
		},
		onError: (error) => {
			handleApiError(error as AxiosError, "Failed to add loan, please try again later.", handleAuthLogout);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.loans.all() });
		}
	})
}