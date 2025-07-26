import { Routes } from "@/app/_constants/Routes";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";

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