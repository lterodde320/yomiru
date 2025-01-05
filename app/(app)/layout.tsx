import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ReactNode } from "react"
import { AppSidebar } from "@/components/sidebar/AppSidebar"
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/authOptions'


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