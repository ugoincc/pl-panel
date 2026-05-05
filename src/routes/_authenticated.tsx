import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useAuth, RedirectToSignIn } from '@clerk/react'

export const Route = createFileRoute('/_authenticated')({
    component: AuthGuard,
})

function AuthGuard() {
    const { isSignedIn, isLoaded } = useAuth()
    if (!isLoaded) return null;
    if (!isSignedIn) return <RedirectToSignIn />
    return <Outlet />
}
