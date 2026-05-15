import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  BarChart3,
  Bell,
  BookOpen,
  Download,
  LogOut,
  Plus,
  Settings,
  Users,
  Watch,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { UserButtonData } from '@/components/user/UserButtonData'
import type { Device } from '@types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DeviceDrawer } from '@/components/panel/DeviceDrawer'
import { DevicesTab } from '@/components/panel/DevicesTab'
import { ParticipantsTab } from '@/components/panel/ParticipantsTab'
import { StudiesTab } from '@/components/panel/StudiesTab'

export const Route = createFileRoute('/_authenticated/panel/')({
  component: PanelPage,
})

type NavId = 'devices' | 'participants' | 'studies' | 'analytics'

const NAV = [
  { id: 'devices' as NavId, label: 'Dispositivos', Icon: Watch, badge: '10' },
  { id: 'participants' as NavId, label: 'Participantes', Icon: Users, badge: '10' },
  { id: 'studies' as NavId, label: 'Estudos', Icon: BookOpen, badge: '4' },
  { id: 'analytics' as NavId, label: 'Analytics', Icon: BarChart3, badge: null },
]

const PAGE_META: Record<
  NavId,
  { title: string; sub: string; tabs: [string, string][] }
> = {
  devices: {
    title: 'Dispositivos',
    sub: 'Gerenciar smartwatches conectados e monitorar métricas ao vivo',
    tabs: [['all', 'Dispositivos'], ['alerts', 'Alertas'], ['log', 'Log de eventos']],
  },
  participants: {
    title: 'Participantes',
    sub: 'Cadastro e gerenciamento de participantes dos estudos',
    tabs: [['all', 'Participantes'], ['consent', 'TCLEs']],
  },
  studies: {
    title: 'Estudos',
    sub: 'Protocolos de pesquisa ativos e histórico',
    tabs: [['all', 'Estudos'], ['protocols', 'Protocolos']],
  },
  analytics: {
    title: 'Analytics',
    sub: 'Visualizações e relatórios consolidados',
    tabs: [['all', 'Visão geral']],
  },
}

function PanelPage() {
  const [activeNav, setActiveNav] = useState<NavId>('devices')
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const page = PAGE_META[activeNav]

  function handleViewDevice(device: Device) {
    setSelectedDevice(device)
    setDrawerOpen(true)
  }

  return (
    <div className='pl-dark dark grid grid-cols-[220px_1fr] grid-rows-[48px_1fr] h-screen overflow-hidden text-[13px] leading-[1.5]'>
      {/* Topbar */}
      <header className='col-span-full flex items-center gap-4 px-5 bg-card border-b border-border z-10'>
        <div className='flex items-center gap-2 mr-2 whitespace-nowrap'>
          <span className='pl-logo-dot size-[6px] rounded-full bg-primary shrink-0' />
          <span className='text-foreground font-medium'>PulseLab</span>
        </div>
        <div className='w-px h-5 bg-border' />
        <span className='text-[0.72rem] text-muted-foreground tracking-[0.06em]'>
          Admin / <span className='text-primary'>{page.title}</span>
        </span>
        <div className='ml-auto flex items-center gap-3'>
          <span className='text-[0.65rem] tracking-[0.1em] uppercase text-muted-foreground border border-border px-2 py-0.5'>
            ⚠ Acesso restrito
          </span>
          <Button variant='ghost' size='icon-xs'>
            <Bell />
          </Button>
          <UserButtonData />
        </div>
      </header>

      {/* Sidebar */}
      <aside className='flex flex-col overflow-y-auto py-3 bg-card border-r border-border'>
        <p className='text-[0.6rem] tracking-[0.16em] uppercase text-muted-foreground px-[18px] py-3 opacity-70'>
          Principal
        </p>
        {NAV.map(({ id, label, Icon, badge }) => (
          <button
            key={id}
            onClick={() => setActiveNav(id)}
            className={cn(
              'flex items-center gap-2.5 px-[18px] py-2.5 text-[0.8rem] cursor-pointer transition-all border-l-2 text-left w-full',
              activeNav === id
                ? 'border-primary bg-primary/10 text-primary font-medium'
                : 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <Icon size={14} className={cn('shrink-0', activeNav !== id && 'opacity-70')} />
            {label}
            {badge && (
              <span className={cn('ml-auto text-[0.6rem] font-semibold px-1.5 py-0.5 rounded-full', activeNav === id ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground')}>
                {badge}
              </span>
            )}
          </button>
        ))}

        <div className='h-px bg-border my-2' />
        <button className='flex items-center gap-2.5 px-[18px] py-2.5 text-[0.8rem] text-muted-foreground hover:bg-muted hover:text-foreground transition-all border-l-2 border-transparent w-full'>
          <Settings size={14} className='shrink-0 opacity-70' />
          Configurações
        </button>

        <div className='mt-auto border-t border-border'>
          <button className='flex items-center gap-2.5 px-[18px] py-2.5 text-[0.8rem] text-muted-foreground hover:bg-muted hover:text-foreground transition-all border-l-2 border-transparent w-full'>
            <LogOut size={14} className='shrink-0 opacity-70' />
            Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className='flex flex-col overflow-hidden bg-background'>
        <Tabs key={activeNav} defaultValue='all' className='flex flex-col flex-1 overflow-hidden min-h-0'>
          <div className='px-7 pt-6 border-b border-border flex-shrink-0'>
            <div className='flex items-end justify-between mb-4'>
              <div>
                <h1 className='text-[1.5rem] text-foreground leading-none'>{page.title}</h1>
                <p className='text-[0.75rem] text-muted-foreground mt-1 font-light'>{page.sub}</p>
              </div>
              <div className='flex items-center gap-2'>
                <Button variant='outline' size='sm'>
                  <Download className='size-3' /> Download
                </Button>
                <Button size='sm'>
                  <Plus className='size-3' /> Adicionar
                </Button>
              </div>
            </div>
            <TabsList variant='line' className='h-auto gap-0 p-0 w-fit'>
              {page.tabs.map(([id, label]) => (
                <TabsTrigger key={id} value={id} className='rounded-none px-5 py-2.5 text-[0.78rem]'>
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {activeNav === 'analytics' ? (
            <div className='flex-1 overflow-auto p-6'>
              <Card className='bg-card border-border'>
                <CardContent className='p-6 text-muted-foreground text-[0.82rem]'>
                  Analytics — Em breve
                </CardContent>
              </Card>
            </div>
          ) : (
            <>
              <TabsContent value='all' className='flex-1 overflow-auto m-0'>
                {activeNav === 'devices' && <DevicesTab onViewDevice={handleViewDevice} />}
                {activeNav === 'participants' && <ParticipantsTab />}
                {activeNav === 'studies' && <StudiesTab />}
              </TabsContent>
              {page.tabs.slice(1).map(([id]) => (
                <TabsContent key={id} value={id} className='flex-1 flex items-center justify-center text-muted-foreground text-[0.82rem] m-0'>
                  Em desenvolvimento
                </TabsContent>
              ))}
            </>
          )}
        </Tabs>
      </main>

      <DeviceDrawer
        device={selectedDevice}
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false); setSelectedDevice(null) }}
      />
    </div>
  )
}
