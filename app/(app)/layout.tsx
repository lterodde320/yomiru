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

    if (!session || !session.user) {
        redirect('/login')
    }


    return(
        <SidebarProvider>
            <AppSidebar email={session.user.email!} />
            <SidebarInset>
                <div className="h-full">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Layout