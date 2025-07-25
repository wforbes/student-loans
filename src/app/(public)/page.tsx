import { Button } from "@/components/ui/button";
import { Routes } from "../_constants/Routes";
import Link from "next/link";
import { appTitle } from "../_constants";

export default function Home() {
	return (
		<>
			<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
				<div className="container px-4 md:px-6 mx-auto">
				<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
					<div className="container px-4 md:px-6 mx-auto">
						<div className="flex flex-col items-center space-y-4 text-center">
							<div className="space-y-2">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
									{appTitle}
								</h1>
								<h2 className="text-sm font-bold tracking-tighter sm:text-md md:text-lg lg:text-lg/none">
									(Early Access Alpha Prototype - Not for production use)
								</h2>
								<p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
									Plan your student loan payments.
								</p>
							</div>
							<div className="space-x-4">
								<Button asChild>
									<Link href={Routes.public.auth.signup}>Get Started</Link>
								</Button>
								<Button variant="outline" disabled>
									<Link href="#features">Learn More</Link>
								</Button>
							</div>
						</div>
					</div>
				</section>
				</div>
			</section>
		</>
	);
}