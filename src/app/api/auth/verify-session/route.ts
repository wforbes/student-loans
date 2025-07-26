import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/session';
import { JWTPayload } from 'jose';

export async function POST(request: NextRequest) {
	const cookie = request.cookies.get('session')?.value;
	let session: JWTPayload | null = null;
	try {
		if (cookie) { // todo: does this need a better check?
			session = await decrypt(cookie);
		}
		if (!session?.userId) {
			return NextResponse.json({ valid: false });
		}
	} catch (error: unknown) {
		console.error(error); // todo: set up logging service
		return NextResponse.json({ valid: false });
	}

	return NextResponse.json({ valid: true });
}