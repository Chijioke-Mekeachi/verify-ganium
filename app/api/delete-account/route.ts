import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(request: NextRequest) {
  try {
    // Security: Validate authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { 
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
    }

    const token = authHeader.split(' ')[1]
    
    // Security: Verify the token using a regular client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
        },
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    )
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { 
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
    }

    // Security: Use admin client for deletion
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
      user.id
    )

    if (deleteError) {
      console.error('Account deletion failed:', deleteError)
      return NextResponse.json(
        { error: 'Failed to delete account' },
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
    }

    return NextResponse.json(
      { message: 'Account deleted successfully' },
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

  } catch (error) {
    console.error('Account deletion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  }
}