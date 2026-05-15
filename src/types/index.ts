// ── Types ──────────────────────────────────────────────────────────────────────
export type DeviceStatus = 'online' | 'offline' | 'syncing';
export type StudyStatus = 'ativo' | 'concluído';
export type ParticipantStatus = 'ativo' | 'pausado';

export interface Device {
  id: string;
  model: string;
  status: DeviceStatus;
  battery: number;
  participant: string;
  study: string;
  lastSync: string;
  hr: number | null;
  hrv: number | null;
  spo2: number | null;
  stress: number | null;
}
export interface Participant {
  id: string;
  name: string;
  age: number;
  study: string;
  device: string;
  enrolled: string;
  status: ParticipantStatus;
}

export interface Study {
  id: string;
  title: string;
  pi: string;
  devices: number;
  participants: number;
  progress: number;
  status: StudyStatus;
}
