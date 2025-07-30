import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services/query-keys";
import { useUtilities } from "@/services/useUtilities";
import { getServicers } from "@/services/servicer/fetchers";

export const useServicersQuery = () => {
	const { handleAuthLogout } = useUtilities();
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.servicers.all(),
		queryFn: () => getServicers(handleAuthLogout),
	});

	return { data, isLoading, isFetching, error };
}
