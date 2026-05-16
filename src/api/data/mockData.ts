import type { Device, User } from '@types'

// ── Mock data ──────────────────────────────────────────────────────────────────
export const USERS: User[] = [
  { id: 'U-001', clerkId: 'user_mock_001', email: 'carla.m@pulselab.io', firstName: 'Carla', lastName: 'M.', role: 'user', deviceId: 'GW-0041', createdAt: '2025-11-20' },
  { id: 'U-002', clerkId: 'user_mock_002', email: 'rafael.s@pulselab.io', firstName: 'Rafael', lastName: 'S.', role: 'user', deviceId: 'GW-0038', createdAt: '2025-12-05' },
  { id: 'U-003', clerkId: 'user_mock_003', email: 'ines.p@pulselab.io', firstName: 'Inês', lastName: 'P.', role: 'user', deviceId: 'GW-0052', createdAt: '2026-01-22' },
  { id: 'U-004', clerkId: 'user_mock_004', email: 'bruno.k@pulselab.io', firstName: 'Bruno', lastName: 'K.', role: 'user', deviceId: 'GW-0017', createdAt: '2026-01-10' },
  { id: 'U-005', clerkId: 'user_mock_005', email: 'ana.l@pulselab.io', firstName: 'Ana', lastName: 'L.', role: 'user', deviceId: 'GW-0063', createdAt: '2026-02-18' },
  { id: 'U-006', clerkId: 'user_mock_006', email: 'diego.v@pulselab.io', firstName: 'Diego', lastName: 'V.', role: 'user', deviceId: 'GW-0029', createdAt: '2026-02-01' },
  { id: 'U-007', clerkId: 'user_mock_007', email: 'sofia.r@pulselab.io', firstName: 'Sofia', lastName: 'R.', role: 'user', deviceId: 'GW-0044', createdAt: '2026-03-08' },
  { id: 'U-008', clerkId: 'user_mock_008', email: 'marco.f@pulselab.io', firstName: 'Marco', lastName: 'F.', role: 'user', deviceId: 'GW-0071', createdAt: '2025-10-30' },
  { id: 'U-009', clerkId: 'user_mock_009', email: 'julia.h@pulselab.io', firstName: 'Julia', lastName: 'H.', role: 'user', deviceId: 'GW-0012', createdAt: '2026-01-15' },
  { id: 'U-010', clerkId: 'user_mock_010', email: 'pedro.n@pulselab.io', firstName: 'Pedro', lastName: 'N.', role: 'user', deviceId: 'GW-0058', createdAt: '2026-03-01' },
]

export const DEVICES: Device[] = [
  { id: 'GW-0041', model: 'Galaxy Watch 6 (44mm)', status: 'online',  battery: 87, lastSync: '2026-04-23 08:42', userId: 'U-001', userName: 'Carla M.',  hr: 68,  hrv: 41, spo2: 98, stress: 28 },
  { id: 'GW-0038', model: 'Galaxy Watch 5 Pro',    status: 'online',  battery: 61, lastSync: '2026-04-23 08:39', userId: 'U-002', userName: 'Rafael S.', hr: 74,  hrv: 36, spo2: 97, stress: 44 },
  { id: 'GW-0052', model: 'Galaxy Watch 6 (40mm)', status: 'syncing', battery: 45, lastSync: '2026-04-23 08:44', userId: 'U-003', userName: 'Inês P.',   hr: 81,  hrv: 29, spo2: 96, stress: 62 },
  { id: 'GW-0017', model: 'Galaxy Watch 4',        status: 'offline', battery: 12, lastSync: '2026-04-22 23:11', userId: 'U-004', userName: 'Bruno K.',  hr: null, hrv: null, spo2: null, stress: null },
  { id: 'GW-0063', model: 'Galaxy Watch 6 (44mm)', status: 'online',  battery: 93, lastSync: '2026-04-23 08:41', userId: 'U-005', userName: 'Ana L.',    hr: 65,  hrv: 52, spo2: 99, stress: 18 },
  { id: 'GW-0029', model: 'Galaxy Watch 5',        status: 'online',  battery: 78, lastSync: '2026-04-23 08:38', userId: 'U-006', userName: 'Diego V.',  hr: 72,  hrv: 45, spo2: 98, stress: 33 },
  { id: 'GW-0044', model: 'Galaxy Watch 6 (40mm)', status: 'offline', battery: 0,  lastSync: '2026-04-21 14:55', userId: 'U-007', userName: 'Sofia R.',  hr: null, hrv: null, spo2: null, stress: null },
  { id: 'GW-0071', model: 'Galaxy Watch 6 (44mm)', status: 'syncing', battery: 55, lastSync: '2026-04-23 08:44', userId: 'U-008', userName: 'Marco F.',  hr: 77,  hrv: 38, spo2: 97, stress: 51 },
  { id: 'GW-0012', model: 'Galaxy Watch 4',        status: 'online',  battery: 66, lastSync: '2026-04-23 08:40', userId: 'U-009', userName: 'Julia H.',  hr: 70,  hrv: 43, spo2: 98, stress: 26 },
  { id: 'GW-0058', model: 'Galaxy Watch 5 Pro',    status: 'online',  battery: 82, lastSync: '2026-04-23 08:37', userId: 'U-010', userName: 'Pedro N.',  hr: 63,  hrv: 58, spo2: 99, stress: 15 },
]
