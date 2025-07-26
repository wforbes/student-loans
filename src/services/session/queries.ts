import { verifySession } from "@/services/session/fetchers";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/services/query-keys";
import { useUtilities } from "@/services/useUtilities";

export const useSessionQuery = () => {
	const { handleAuthLogout } = useUtilities();
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: queryKeys.session.verify(),
		queryFn: () => verifySession(handleAuthLogout),
	});

	return { data, isLoading, isFetching, error };
}