'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bell, ChevronRight, Map, Moon, ShieldCheck, UserRound } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const schema=z.object({name:z.string().min(2),email:z.string().email(),risk:z.enum(['balanced','safety','time']),notifications:z.boolean(),dark:z.boolean()});
type Form=z.infer<typeof schema>;

export default function Settings(){
 const {register,handleSubmit,formState:{errors}}=useForm<Form>({resolver:zodResolver(schema),defaultValues:{name:'Soham Dalvi',email:'soham@example.com',risk:'balanced',notifications:true,dark:false}});
 return <AppShell><form onSubmit={handleSubmit(()=>alert('Preferences saved locally for this demo.'))} className="mx-auto max-w-4xl space-y-6">
  <div><p className="text-sm font-medium text-slate-500">Preferences</p><h1 className="mt-1 text-3xl font-bold tracking-tight">Settings</h1><p className="mt-1 text-slate-500">Tune the SafeRoute experience for your trips.</p></div>
  <Card className="p-6"><div className="flex items-center gap-3 border-b border-slate-100 pb-5"><UserRound className="text-[#176b57]"/><div><h2 className="font-bold">Profile</h2><p className="text-sm text-slate-500">Your demo account details</p></div></div><div className="mt-5 grid gap-5 sm:grid-cols-2">
   <label className="text-sm font-medium">Name<input {...register('name')} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-[#176b57]"/>{errors.name&&<span className="text-xs text-red-600">{errors.name.message}</span>}</label>
   <label className="text-sm font-medium">Email<input {...register('email')} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-[#176b57]"/>{errors.email&&<span className="text-xs text-red-600">{errors.email.message}</span>}</label>
  </div></Card>
  <Card className="p-6"><div className="flex items-center gap-3"><ShieldCheck className="text-[#176b57]"/><div><h2 className="font-bold">Risk preferences</h2><p className="text-sm text-slate-500">Choose what route comparisons emphasize.</p></div></div><div className="mt-5 grid gap-3 sm:grid-cols-3">
   {([['balanced','Balanced','Time + risk'],['safety','Lower risk','Risk first'],['time','Faster travel','ETA first']] as const).map(([v,l,d])=><label key={v} className="cursor-pointer rounded-xl border border-slate-200 p-4 has-[:checked]:border-[#176b57] has-[:checked]:bg-[#f0f8f5]"><input type="radio" value={v} {...register('risk')} className="sr-only"/><span className="font-semibold text-sm">{l}</span><p className="mt-1 text-xs text-slate-500">{d}</p></label>)}
  </div></Card>
  <Card className="divide-y divide-slate-100">
   <label className="flex items-center justify-between p-5"><span className="flex items-center gap-3"><Bell size={18} className="text-slate-500"/><span><b className="block text-sm">Notifications</b><small className="text-xs text-slate-500">Route and safety alerts</small></span></span><input type="checkbox" {...register('notifications')} className="h-5 w-5 accent-[#176b57]"/></label>
   <div className="flex items-center justify-between p-5"><span className="flex items-center gap-3"><Map size={18} className="text-slate-500"/><span><b className="block text-sm">Map preferences</b><small className="text-xs text-slate-500">Show traffic and risk zones</small></span></span><ChevronRight size={18} className="text-slate-400"/></div>
   <label className="flex items-center justify-between p-5"><span className="flex items-center gap-3"><Moon size={18} className="text-slate-500"/><span><b className="block text-sm">Dark appearance</b><small className="text-xs text-slate-500">UI-only demo preference</small></span></span><input type="checkbox" {...register('dark')} className="h-5 w-5 accent-[#176b57]"/></label>
  </Card>
  <div className="flex justify-end"><Button type="submit">Save preferences</Button></div>
 </form></AppShell>
}
