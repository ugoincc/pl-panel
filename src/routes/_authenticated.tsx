import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useAuth, RedirectToSignIn, useUser } from '@clerk/react'
import { useNavigate, useRouterState } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_authenticated')({
    component: AuthGuard,
})

function AuthGuard() {
    const { isSignedIn, isLoaded: authLoaded } = useAuth()
    const { user, isLoaded } = useUser()
    const navigate = useNavigate()
    const pathname = useRouterState({ select: (s) => s.location.pathname })

    useEffect(() => {
        if (!isLoaded) return
        const role = user?.publicMetadata?.role as string | undefined
        if (pathname.startsWith('/panel') && role !== 'admin') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            navigate({ to: '/user/' as any })
        } else if (pathname.startsWith('/user') && role === 'admin') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            navigate({ to: '/panel/' as any })
        }
    }, [isLoaded, user, navigate])

    if (!authLoaded || !isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
            </div>
        )
    }
    if (!isSignedIn) return <RedirectToSignIn />

    const role = user?.publicMetadata?.role as string | undefined
    const mismatch =
        (pathname.startsWith('/panel') && role !== 'admin') ||
        (pathname.startsWith('/user') && role === 'admin')

    if (mismatch)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
            </div>
        )

    return <Outlet />
}
