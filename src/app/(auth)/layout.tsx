import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import { Routes } from "../_constants/Routes";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar homeRoute={Routes.public.home} />
			<main className="flex-1 flex flex-col py-16">
				{children}
			</main>
			<Footer />
		</div>
	)
}