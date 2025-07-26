"use client";

import { appTitle } from "@/app/_constants";
import { Routes, isPublicRoute } from "@/app/_constants/Routes";
import { Button } from "@/components/ui/button";
import { Home, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useSessionQuery } from "@/services/session/queries";

export default function Navbar({ homeRoute }: { homeRoute: string }) {
	const router = useRouter();
	const pathname = usePathname();

	const { data, isLoading, isFetching } = useSessionQuery();

	const { valid: sessionValid } = !data ? { valid: false } : data;
	/*const data = {
		user: {
			email: "test@test.com",
			firstName: "Test",
			lastName: "User"
		}
	}*/

	const handleSignOut = async () => {
		try {
			await axios.post('/api/auth/signout');
			router.push('/login');
		} catch (error) {
			console.error('Failed to sign out:', error);
		}
	}

	return (
		<header data-testid="appbar" className="sticky top-0 z-40 w-full px-4 lg:px-6 h-14 flex border-b bg-background">
			<div className="w-full max-w-screen-2xl mx-auto flex items-center">
				<Link className="flex items-center justify-center z-10" href={homeRoute ?? "/"}>
					<span className="text-xl font-bold">
						{appTitle}
					</span>
				</Link>
			
				<div className="flex-1 flex justify-center">
					<nav className="hidden md:flex items-center justify-center w-full">
						<span>{/* Navbar links or announcement stuff can go here? */}</span>
					</nav>
				</div>
				<div className="flex gap-2 items-center">
					{isLoading || isFetching ? <Loader2 className="h-6 w-6 animate-spin" /> :
						sessionValid ? (
							<>
								{isPublicRoute(pathname) && <Button variant="outline" size="icon" className="z-10" onClick={() => router.push(Routes.protected.dashboard)}><Home /></Button>}
								<Button className="z-10" onClick={() => handleSignOut()}>Sign Out</Button>
							</>
						) : (
							<>
								<Button variant="outline" className="z-10" onClick={() => router.push(Routes.public.auth.signup)}>Sign Up</Button>
								<Button className="z-10" onClick={() => router.push(Routes.public.auth.login)}>Login</Button>
							</>
						)
					}
				</div>
			</div>
		</header>
	)
}