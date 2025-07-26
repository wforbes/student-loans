import { decrypt } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JWTPayload } from "jose";
import { Routes } from "@/app/_constants/Routes";

export default async function middleware(req: NextRequest) {
	const protectedRoutes = Object.values(Routes.protected).map(route =>
		// when multi-type routes are added, use 'root' prop as base of the route
		/*typeof route === 'object' ? route?.root : route*/ 
		route
	);
	const authRoutes = Object.values(Routes.public.auth as Record<string, string>);
	const currentPath = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.some(route => currentPath.startsWith(route));
	const isAuthRoute = authRoutes.includes(currentPath);
	if (isProtectedRoute) {
		const cookie = (await cookies()).get('session')?.value;
		let session: JWTPayload | null = null;
		if (!!cookie) { // avoid decrypting empty cookie value
			session = await decrypt(cookie);
		}
		if (session?.userId === undefined || session?.userId === null) {
			return NextResponse.redirect(new URL('/login?redirect=' + encodeURIComponent(currentPath), req.url));
		}
	}
	if (isAuthRoute) {
		// ^ and user is already logged in, redirect to dashboard
		const cookie = (await cookies()).get('session')?.value;
		if (!!cookie) {
			return NextResponse.redirect(new URL(Routes.protected.dashboard, req.url));
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};