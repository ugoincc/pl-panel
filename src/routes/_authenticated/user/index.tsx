import { createFileRoute } from '@tanstack/react-router'
import { useUser } from '@clerk/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserButtonData } from '@/components/user/UserButtonData'

export const Route = createFileRoute('/_authenticated/user/')({
  component: UserPanel,
})

function UserPanel() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-foam">
      <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-background/80 backdrop-blur-sm">
        <span className="text-lg font-bold text-lagoon">PulseLab</span>
        <span className="text-sm text-sea-ink">Olá, {user?.firstName}</span>
        <UserButtonData />
      </header>
      <main className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-sea-ink">Meus Dispositivos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Em breve...</p>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-sea-ink">Exportar Dados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Em breve...</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
