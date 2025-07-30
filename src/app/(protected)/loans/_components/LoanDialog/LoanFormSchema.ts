import { z } from "zod";

export const FormSchema = z.object({
	nickname: z.string().min(1, {
		message: "Nickname must be at least 2 characters.",
	}),
	servicerId: z.string().min(1, {
		message: "Servicer ID must be at least 2 characters.",
	}),
	principle: z.string().transform((str) => {
		const num = parseFloat(str.toString());
		if (isNaN(num)) {
			return "";
		}
		// ensure number has 2 decimal places
		return num.toFixed(2);
	})
		.refine(val => parseFloat(val) > 0, { message: 'Money amount must be greater than 0' }),
	interestRate: z.string().refine(
		(value) => {
			const numStr = value.toString();
			const decimalPart = numStr.split('.')[1];
			return !decimalPart || decimalPart.length <= 3;
		},
		{
			message: 'Rate must have at most 3 decimal places',
		}
	),
	dateOpened: z.string().transform((dateString, ctx) => {
		const date = new Date(dateString);
		if (isNaN(date.getTime())) {
			/*ctx.addIssue({
			  code: "invalid_format",
			  message: 'Invalid date format',
			});*/
			return ""; // Important: Return something to satisfy the return type of transform
		}
		// return format YYYY-MM-DD
		return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
	})
})