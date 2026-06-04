import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { isSuperAdmin } from '@/lib/utils/is-superadmin'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    },
  )

  const { data: { user } } = await supabase.auth.getUser()
  const superAdmin = isSuperAdmin(user?.email)
  const { pathname } = request.nextUrl

  // ── Superadmin: block access to /admin, redirect to /superadmin ──
  if (superAdmin && pathname.startsWith('/admin')) {
    const url = request.nextUrl.clone()
    url.pathname = '/superadmin'
    return NextResponse.redirect(url)
  }

  // ── Protect /superadmin — only superadmin can enter ──
  if (pathname.startsWith('/superadmin')) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/login'
      return NextResponse.redirect(url)
    }
    if (!superAdmin) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin'
      return NextResponse.redirect(url)
    }
    return supabaseResponse
  }

  // ── Protect /admin — must be logged in ──
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login') && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  // ── Redirect logged-in users away from login page ──
  if (pathname === '/admin/login' && user) {
    const url = request.nextUrl.clone()
    url.pathname = superAdmin ? '/superadmin' : '/admin/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
