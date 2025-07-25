import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/app/_actions/user";

export default async function AccountPage() {
	const user = await getCurrentUser();
	
	return (
		<div className="container mx-auto px-4 md:px-6">
			<Card className="w-full max-w-5xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">Account</CardTitle>
					<CardDescription>
					</CardDescription>
				</CardHeader>
				<CardContent className="px-6 mt-0">
					<p>(TODO: Account)</p>
				</CardContent>
			</Card>
		</div>
	);
}