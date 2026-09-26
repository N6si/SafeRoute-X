'use client'; import { MAPBOX_TOKEN } from '@/lib/map'; import { MapboxMap } from './MapboxMap'; import { MockMap } from './MockMap'; import type { RouteOption } from '@/types';
export function RouteMap({routes,selectedId}:{routes:RouteOption[];selectedId:string}){return MAPBOX_TOKEN?<MapboxMap/>:<MockMap routes={routes} selectedId={selectedId}/>}
