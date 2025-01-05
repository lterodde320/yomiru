"use client"

import Link from "next/link"

import * as React from "react"
import {
  Settings2,
  Newspaper
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import UserDropdown from "./UserDropdown"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"


// This is sample data.
const data = {
  navMain: [
    {
      title: "Feeds",
      url: "/feed",
      icon: Newspaper,
      isCollapsible: false,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      isCollapsible: true,
      items: [
        {
          title: "Manage Feeds",
          url: "/feeds",
        }
      ],
    }
  ]
}

export function AppSidebar({email}: {email: string}) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <UserDropdown email={email} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

function Header() {
  return (
    <div className="flex justify-between flex-row-reverse pt-2">
      <SidebarTrigger />
      <h1 className="group-data-[collapsible=icon]:hidden ps-2">Yomiru</h1>
      
    </div>
  )
}

function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    isCollapsible: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          item.isCollapsible ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ):(
            <SidebarMenuItem>
              <Link href={item.url} > 
                <SidebarMenuButton tooltip={item.title} >
                  
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  
                </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          )
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

