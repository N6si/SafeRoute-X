'use client';
import { create } from 'zustand';
interface State { destination:string; selectedRouteId:string; riskFilter:'all'|'low'|'medium'; setDestination:(v:string)=>void; selectRoute:(id:string)=>void; setRiskFilter:(v:State['riskFilter'])=>void; }
export const useSafeRouteStore=create<State>(set=>({destination:'Bandra, Mumbai',selectedRouteId:'r1',riskFilter:'all',setDestination:destination=>set({destination}),selectRoute:selectedRouteId=>set({selectedRouteId}),setRiskFilter:riskFilter=>set({riskFilter})}));
