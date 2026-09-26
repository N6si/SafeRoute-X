import './globals.css'; import { QueryProvider } from '@/features/routing/QueryProvider';
export const metadata={title:'SafeRoute — AI-powered safe urban navigation',description:'Risk-aware urban navigation demo'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><QueryProvider>{children}</QueryProvider></body></html>}
