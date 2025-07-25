import { Routes } from "../_constants/Routes";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen w-full">
			<Navbar homeRoute={Routes.protected.dashboard} />
			<main className="flex-1 py-12">
				{children}
			</main>
			<Footer />
		</div>
	)
}