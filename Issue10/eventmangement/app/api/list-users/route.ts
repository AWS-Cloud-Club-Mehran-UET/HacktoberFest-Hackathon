import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: { users }, error } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }

    const filteredUsers = users
      .filter(u => u.id !== user.id)
      .map(u => ({ id: u.id, email: u.email, is_online: false }));

    return NextResponse.json(filteredUsers);
  } catch (error) {
    console.error('Error listing users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
