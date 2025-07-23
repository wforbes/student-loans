"use client"
import { ColumnDef } from "@tanstack/react-table"
import { formatCurrency } from "@/lib/utils"

export type Loan = {
	id: string
	dateOpened: string
	principle: number
	interestRate: number
}

export const columns: ColumnDef<Loan>[] = [
	{
		accessorKey: "id",
		header: "ID"
	},
	{
		accessorKey: "dateOpened",
		header: "Opened",
		cell: (info) => {
			const dateVal = info.getValue() as string;
			const dateObj = new Date(dateVal);
			if (isNaN(dateObj.valueOf()) || dateObj.valueOf() === 0) {
				return "";
			}
			return dateObj.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
		}
	},
	{
		accessorKey: "principle",
		header: "Principle",
		cell: ({ row }) => {
			const principle = row.original.principle;
			return formatCurrency(principle);
		}
	},
	{
		accessorKey: "interestRate",
		header: "Interest Rate",
		cell: ({ row }) => {
			const interestRate = row.original.interestRate;
			// display at most 3 decimal places, without trailing zeros
			return `${interestRate.toFixed(3).replace(/\.?0+$/, '')}%`;
		}
	},
	{
		accessorKey: "interestPerDay",
		header: "Int/Day",
		cell: ({ row }) => {
			console.log(row.original.interestRate)
			const interestRate = row.original.interestRate;
			const principle = row.original.principle;
			const interestPerDay = ( (interestRate / 100) / 365) * principle;
			return formatCurrency(interestPerDay);
		}
	},
	{
		accessorKey: "interestPerMonth",
		header: "Int/Month",
		cell: ({ row }) => {
			const interestRate = row.original.interestRate;
			const principle = row.original.principle;
			// daily interest compounding, 30 days per month
			const interestPerMonth = (( interestRate / 100 ) / 365 ) * 30 * principle;
			return formatCurrency(interestPerMonth);
		}
	}
]