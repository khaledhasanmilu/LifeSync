// app/api/user/route.js (Server)
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = await cookies();
    const username = cookieStore.get('userName')?.value || 'Guest';
    const userId = cookieStore.get('userId')?.value || null;
    const userEmail = cookieStore.get('userEmail')?.value;
    return new Response(JSON.stringify({ username, userId, userEmail }), {
        headers: { 'Content-Type': 'application/json' },
    });
}
 