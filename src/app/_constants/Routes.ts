export const Routes = {
	api: {
		baseUrl: "/api",
		auth: {
			verifySession: "/auth/verify-session",
			signout: "/auth/signout"
		},
		loans: {
			get: "/loans",
			put: "/loans",
			delete: (id: string) => `/loans/${id}`
		},
		servicers: {
			get: "/servicers",
			put: "/servicers"
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
		dashboard: "/dashboard",
		loans: "/loans",
		servicers: "/servicers"
	}
} as const;

export const isPublicRoute = (pathname: string) => {
	return Object.keys(Routes.public)
		.some(route => Routes.public[route as keyof typeof Routes.public] === pathname);
}