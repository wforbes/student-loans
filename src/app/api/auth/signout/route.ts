import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { AUTH_ERRORS } from '@/app/_constants';

export async function POST() {
	try {
		(await cookies()).delete('session');
		return NextResponse.json({ success: true, message: AUTH_ERRORS.SIGN_OUT_SUCCESS }, { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ success: false, message: error.message }, { status: 500 });
		}
		return NextResponse.json({ success: false, message: AUTH_ERRORS.SIGN_OUT_FAILED }, { status: 500 });
	}
}