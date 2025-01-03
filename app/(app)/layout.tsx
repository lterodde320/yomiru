import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ReactNode, useEffect } from "react"
import { AppSidebar } from "@/components/sidebar/AppSidebar"
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from '@/lib/query'


const Layout = async ({ children }: {children: ReactNode}) => {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/login')
    }


    return(
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="h-full">
                <header className="sticky top-0 bg-background/90 backdrop-blur-sm flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger />
                </header>
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Layout