// ── Types ──────────────────────────────────────────────────────────────────────
export type DeviceStatus = 'online' | 'offline' | 'syncing' | 'maintenance'
export type UserRole = 'admin' | 'user'

export interface User {
  id: string
  clerkId: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  deviceId: string | null
  createdAt: string
}

export interface Device {
  id: string
  model: string
  status: DeviceStatus
  battery: number
  lastSync: string
  userId: string | null
  userName: string | null
  hr: number | null
  hrv: number | null
  spo2: number | null
  stress: number | null
}
