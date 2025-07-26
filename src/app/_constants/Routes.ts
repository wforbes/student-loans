export const Routes = {
	api: {
		baseUrl: "/api",
		auth: {
			verifySession: "/auth/verify-session",
			signout: "/auth/signout"
		}
	},
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