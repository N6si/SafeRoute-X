import type { Alert, HistoryItem, RouteOption } from '@/types';
export const routes:RouteOption[]=[
{id:'r1',name:'Recommended',eta:'28 min',minutes:28,distance:'12.4 km',risk:'LOW',riskScore:24,traffic:'Low',flood:'Low',crime:'Medium',weather:'Low',reason:['Low traffic congestion','No major flood zones','Moderate crime exposure','Good road conditions'],coordinates:[[72.8777,19.076],[72.872,19.082],[72.866,19.091],[72.854,19.101],[72.842,19.112]]},
{id:'r2',name:'Fastest',eta:'24 min',minutes:24,distance:'10.8 km',risk:'MEDIUM',riskScore:46,traffic:'High',flood:'Low',crime:'Medium',weather:'Low',reason:['Shortest travel time','Heavy congestion on two segments','Moderate crime exposure','No active weather warnings'],coordinates:[[72.8777,19.076],[72.889,19.083],[72.895,19.094],[72.884,19.105],[72.866,19.116]]},
{id:'r3',name:'Low Exposure',eta:'32 min',minutes:32,distance:'13.7 km',risk:'VERY LOW',riskScore:16,traffic:'Low',flood:'Very low',crime:'Low',weather:'Low',reason:['Lowest overall risk','Avoids mapped flood-prone segments','Low crime exposure','Slightly longer travel time'],coordinates:[[72.8777,19.076],[72.867,19.066],[72.853,19.071],[72.841,19.085],[72.842,19.112]]}
];
export const alerts:Alert[]=[
{id:'a1',type:'Flood Risk Alert',severity:'High',location:'Sion East',time:'12 min ago',description:'Elevated flooding risk detected near the destination corridor after recent rainfall.',status:'Active'},
{id:'a2',type:'Traffic Alert',severity:'Medium',location:'Western Express Highway',time:'26 min ago',description:'Heavy congestion is adding approximately 9 minutes to the fastest route.',status:'Monitoring'},
{id:'a3',type:'Weather Alert',severity:'Medium',location:'Bandra West',time:'48 min ago',description:'Heavy rainfall is expected in the selected area during the next hour.',status:'Monitoring'},
{id:'a4',type:'Road Condition Alert',severity:'Low',location:'Andheri Link Road',time:'2 hr ago',description:'Temporary lane restriction reported. Alternative routes remain available.',status:'Resolved'}
];
export const history:HistoryItem[]=[
{id:'h1',origin:'Andheri',destination:'Bandra',time:'Today, 6:42 PM',distance:'12.4 km',duration:'28 min',risk:'LOW'},
{id:'h2',origin:'Vasai',destination:'Mumbai',time:'Yesterday, 9:18 AM',distance:'38.7 km',duration:'1h 12m',risk:'MEDIUM'},
{id:'h3',origin:'Powai',destination:'BKC',time:'Sep 24, 7:54 PM',distance:'14.2 km',duration:'34 min',risk:'VERY LOW'},
{id:'h4',origin:'Thane',destination:'Ghatkopar',time:'Sep 23, 8:03 AM',distance:'16.1 km',duration:'39 min',risk:'LOW'}
];
export const recentRoutes=[['Andheri','Bandra'],['Powai','BKC'],['Vasai','Mumbai']];
