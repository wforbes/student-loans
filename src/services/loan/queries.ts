import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services/query-keys";
import { useUtilities } from "@/services/useUtilities";
import { getLoans } from "@/services/loan/fetchers";

export const useLoanQuery = () => {
	const { handleAuthLogout } = useUtilities();
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.loans.all(),
		queryFn: () => getLoans(handleAuthLogout),
	});

	return { data, isLoading, isFetching, error };
}
