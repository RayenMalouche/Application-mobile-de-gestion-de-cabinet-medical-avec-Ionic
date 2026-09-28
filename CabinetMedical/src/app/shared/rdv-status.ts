// Appointment statuses as the API spells them, and how the practice stamps them.
// The backend and pages use several spellings: accepted/approved, rejected/refused.

export type StampTone = 'ok' | 'wait' | 'no';

export interface RdvStatus {
  label: string;
  tone: StampTone;
  icon: string;
}

export function rdvStatus(status: string | null | undefined): RdvStatus {
  switch ((status || '').toLowerCase()) {
    case 'accepted':
    case 'approved':
    case 'confirmed':
      return { label: 'Confirmé', tone: 'ok', icon: 'checkmark-circle-outline' };
    case 'rejected':
    case 'refused':
    case 'cancelled':
      return { label: 'Refusé', tone: 'no', icon: 'close-circle-outline' };
    default:
      return { label: 'En attente', tone: 'wait', icon: 'time-outline' };
  }
}
