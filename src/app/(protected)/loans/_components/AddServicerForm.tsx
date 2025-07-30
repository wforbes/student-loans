import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddServicerMutation } from "@/services/servicer/mutations";
import { Button } from "@/components/ui/button";
import { NewServicer } from "@/db/infra/types/Servicer";

export const FormSchema = z.object({
	name: z.string().min(1, {
		message: "Name must be at least 2 characters.",
	}),
})

export default function AddServicerForm({ done }: { done: () => void }) {
	const { mutate: addServicer, isPending } = useAddServicerMutation();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
		} as NewServicer,
	});
	const _submit = (data: z.infer<typeof FormSchema>) => {
		addServicer({
			name: data.name
		})
		form.reset()
		done()
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(_submit)} className="flex flex-col gap-2">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<div className="flex flex-row gap-2 justify-center items-center mt-3">
					<Button type="submit" disabled={isPending}>{isPending ? "Adding..." : "Add Servicer"}</Button>
					<Button type="button" onClick={() => {
						form.reset()
						done()
					}}>Cancel</Button>
				</div>
			</form>
		</Form>
	)
}