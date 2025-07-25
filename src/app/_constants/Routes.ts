export const Routes = {
	public: {
		home: "/",
		auth: {
			signup: "/signup",
			login: "/login"
		}
	},
	protected: {
		dashboard: "/dashboard"
	}
} as const;

export const isPublicRoute = (pathname: string) => {
	return Object.keys(Routes.public)
		.some(route => Routes.public[route as keyof typeof Routes.public] === pathname);
}