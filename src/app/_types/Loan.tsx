export type Loan = {
	id: string;
	principle: number;
	interestRate: number;
	dateOpened: string;
}

export type LoanResponse = {
	loans: Loan[];
}