import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import UserDropdown from "./UserDropdown"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// This is sample data.
const data = [
    {
        title: "Feed",
        url: "/feed",
    },
    {
        title: "Manage Feeds",
        url: "/feeds",
    },
]

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = await getServerSession(authOptions)

  return (
    <Sidebar {...props}>
      <SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
        <SidebarGroupContent>
            <SidebarMenu>
             {data.map((item) => (
                <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                    <a href={item.url}>{item.title}</a>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserDropdown email={session!.user!.email!}/>
      </SidebarFooter>
    </Sidebar>
  )
}
