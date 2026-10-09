export interface CruiseWorkflow {
  id: string;
  number: string;
  title: string;
  hook: string;
  description: string;
  steps: string[];
  tags?: string[];
  supportingNote?: string;
}

export const cruiseOperations: CruiseWorkflow[] = [
  {
    id: 'embarkation',
    number: '01',
    title: 'Embarkation',
    hook: 'Faster check-in from port to ship.',
    description:
      'Pammy AI supports mobile guest check-in and secure identity capture, helping cruise teams move away from traditional fixed check-in podiums and create a smoother embarkation experience.',
    steps: ['CHECK IN', 'CAPTURE IDENTITY', 'VERIFY', 'BOARD'],
    tags: ['Mobile Check-in', 'Offline-ready', 'Identity Capture'],
  },
  {
    id: 'gangway',
    number: '02',
    title: 'Gangway',
    hook: 'Know who’s on board. And who’s off.',
    description:
      'Pammy AI supports mobile identity verification for guests, crew and visitors moving between ship and port, helping teams maintain clear IN / OUT movement visibility.',
    steps: ['IDENTIFY', 'VERIFY', 'CHECK IN / OUT', 'UPDATE STATUS'],
    supportingNote: 'Supports clearer souls-on-board and souls-off-board visibility.',
  },
  {
    id: 'mustering',
    number: '03',
    title: 'Mustering',
    hook: 'Clear visibility when every person matters.',
    description:
      'Pammy AI can support digital identification and attendance tracking during muster operations, giving onboard teams a clearer view of participation and outstanding status.',
    steps: ['IDENTIFY', 'CHECK STATUS', 'CONFIRM', 'MONITOR'],
  },
  {
    id: 'debarkation',
    number: '04',
    title: 'Debarkation',
    hook: 'A smoother final step in the guest journey.',
    description:
      'Pammy AI can support structured guest departure workflows with identity confirmation and status updates as passengers complete their journey and leave the ship.',
    steps: ['IDENTIFY', 'VERIFY', 'CHECK OUT', 'COMPLETE'],
  },
];
