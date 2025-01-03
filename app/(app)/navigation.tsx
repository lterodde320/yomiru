import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ReactNode, useEffect } from "react"
import { AppSidebar } from "@/components/sidebar/AppSidebar"




const Navigation = async ({ children }: {children: ReactNode}) => {

    return(
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="h-full">
                <header className="sticky top-0 bg-white/90 backdrop-blur-sm flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger />
                </header>
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Navigation