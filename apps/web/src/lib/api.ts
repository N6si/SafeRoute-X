// Frontend-only boundary. Backend integration can replace these local functions later.
import { routes, alerts, history } from '@/mock/data';
export const mockApi={getRoutes:async()=>routes,getAlerts:async()=>alerts,getHistory:async()=>history};
