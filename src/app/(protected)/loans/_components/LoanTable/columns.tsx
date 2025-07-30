"use client"

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/utils";
import { LoanWithServicer } from "@/db/infra/types/Loan";
import { useServicersQuery } from "@/services/servicer/queries";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";

const formatInterestRate = (interestRate: number) => {
	return `${interestRate.toFixed(3).replace(/\.?0+$/, '')}%`;
}

const formatDate = (date: string) => {
	return new Date(date).toLocaleDateString();
}

export const columns: ColumnDef<LoanWithServicer>[] = [
	
	{
		header: "Nickname",
		accessorKey: "nickname",
	},
	{
		header: "Servicer",
		accessorKey: "servicerId",
		cell: ({ row }) => {
			const servicerName = row.original.servicerName;
			return servicerName;
		}
	},
	{
		header: "Principle",
		accessorKey: "principle",
		cell: ({ row }) => {
			const principle = row.original.principle;
			return formatCurrency(principle);
		}
	},
	{
		header: "Interest Rate",
		accessorKey: "interestRate",
		cell: ({ row }) => {
			const interestRate = row.original.interestRate;
			// display at most 3 decimal places, without trailing zeros
			return formatInterestRate(interestRate);
		}
	},
	{
		header: "Date Opened",
		accessorKey: "dateOpened",
		cell: ({ row }) => {
			const dateOpened = row.original.dateOpened;
			return dateOpened ? formatDate(dateOpened) : "";
		}
	},
	/*
	{
		accessorKey: "interestPerDay",
		header: "Int/Day",
		cell: ({ row }) => {
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
	}*/
]
