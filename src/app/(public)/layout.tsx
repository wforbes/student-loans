import { Routes } from "../_constants/Routes";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen w-full">
			<Navbar homeRoute={Routes.public.home} />
			<main className="flex-1">
				{children}
			</main>
			<Footer />
		</div>
	)
}