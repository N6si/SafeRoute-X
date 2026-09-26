import Link from 'next/link'; import { ShieldCheck } from 'lucide-react';
export function Logo({light=false}:{light?:boolean}){return <Link href="/" className={'flex items-center gap-2 font-bold tracking-tight '+(light?'text-white':'text-slate-900')}><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#176b57] text-white"><ShieldCheck size={20}/></span><span>SafeRoute</span></Link>}
