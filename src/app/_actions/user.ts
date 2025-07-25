'use server';

import { verifySession } from "@/app/_lib/session";
import { cache } from 'react';
import { RepositoryFactory } from "@/db/infra/repositories/RepositoryFactory";

export const getCurrentUser = cache(async () => {
	const session = await verifySession();
	if (!session || session.error) {
		return null;
	}
	if (!session.userId) {
		return null;
	}

	const user = await RepositoryFactory.getUserRepository()
		.getById(session.userId);

	if (!user) {
		return null;
	}

	return user;
});