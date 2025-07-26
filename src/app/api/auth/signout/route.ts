import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { MESSAGES } from '@/app/_constants';

export async function POST() {
	try {
		(await cookies()).delete('session');
		return NextResponse.json({ success: true, message: MESSAGES.SIGN_OUT_SUCCESS }, { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ success: false, message: error.message }, { status: 500 });
		}
		return NextResponse.json({ success: false, message: MESSAGES.SIGN_OUT_ERROR }, { status: 500 });
	}
}