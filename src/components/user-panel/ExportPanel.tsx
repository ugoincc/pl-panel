import { useState } from 'react'
import { Download } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Granularity = 'hour' | 'day'
type Format = 'csv' | 'json'

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

export function ExportPanel() {
  const [startDate, setStartDate] = useState(todayStr)
  const [endDate, setEndDate] = useState(todayStr)
  const [granularity, setGranularity] = useState<Granularity>('hour')
  const [format, setFormat] = useState<Format>('csv')

  function handleExport() {
    const step = granularity === 'hour' ? 3_600_000 : 86_400_000
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()
    const rows: {
      timestamp: string
      deviceId: string
      hr: number
      hrv: number
      spo2: number
      stress: number
    }[] = []

    for (let t = start; t <= end && rows.length < 500; t += step) {
      rows.push({
        timestamp: new Date(t).toISOString(),
        deviceId: 'GW-0041',
        hr: Math.floor(Math.random() * (100 - 55 + 1)) + 55,
        hrv: Math.floor(Math.random() * (60 - 20 + 1)) + 20,
        spo2: Math.floor(Math.random() * (100 - 95 + 1)) + 95,
        stress: Math.floor(Math.random() * (80 - 10 + 1)) + 10,
      })
    }

    let blob: Blob
    let filename: string

    if (format === 'csv') {
      const header = 'timestamp,deviceId,hr,hrv,spo2,stress'
      const lines = rows.map(
        (r) => `${r.timestamp},${r.deviceId},${r.hr},${r.hrv},${r.spo2},${r.stress}`,
      )
      blob = new Blob([[header, ...lines].join('\n')], { type: 'text/csv' })
      filename = 'pulselab-export.csv'
    } else {
      blob = new Blob([JSON.stringify(rows, null, 2)], {
        type: 'application/json',
      })
      filename = 'pulselab-export.json'
    }

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted-foreground">De</label>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted-foreground">Até</label>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted-foreground">Granularidade</label>
        <Select
          value={granularity}
          onValueChange={(v) => setGranularity(v as Granularity)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hour">Por hora</SelectItem>
            <SelectItem value="day">Por dia</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <Button
          variant={format === 'csv' ? 'default' : 'outline'}
          onClick={() => setFormat('csv')}
          className="flex-1"
        >
          CSV
        </Button>
        <Button
          variant={format === 'json' ? 'default' : 'outline'}
          onClick={() => setFormat('json')}
          className="flex-1"
        >
          JSON
        </Button>
      </div>
      <Button variant="default" className="w-full" onClick={handleExport}>
        <Download className="h-4 w-4 mr-2" />
        Exportar
      </Button>
    </div>
  )
}
