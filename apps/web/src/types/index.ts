export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY LOW';
export type AlertSeverity = 'Low' | 'Medium' | 'High';
export interface RiskBreakdown { traffic:number; flood:number; crime:number; weather:number; }
export interface RouteOption { id:string; name:string; eta:string; minutes:number; distance:string; risk:RiskLevel; riskScore:number; traffic:string; flood:string; crime:string; weather:string; reason:string[]; coordinates:[number,number][]; }
export interface Alert { id:string; type:string; severity:AlertSeverity; location:string; time:string; description:string; status:'Active'|'Monitoring'|'Resolved'; }
export interface HistoryItem { id:string; origin:string; destination:string; time:string; distance:string; duration:string; risk:RiskLevel; }
