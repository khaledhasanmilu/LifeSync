// app/api/user/route.js (Server)
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = await cookies();
    const username = cookieStore.get('userName')?.value || 'Guest';
    const userId = cookieStore.get('userId')?.value || null;
    
    return new Response(JSON.stringify({ username, userId }), {
        headers: { 'Content-Type': 'application/json' },
    });
}
 