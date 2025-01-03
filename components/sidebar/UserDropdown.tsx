import * as React from "react"
import { ChevronUp, SunMoonIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"
import { useTheme } from "next-themes"

export function UserDropdown({ email }: { email: string }) {
    return (
        <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                <Avatar className="size-8">
                    <AvatarFallback className="bg-gray-200">{email.substring(0,1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">{email}</span>
                </div>
                <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width]" 
                align="start"
            >
                <DropdownMenuItem
                    className="cursor-pointer"
                    key={1}
                >
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer text-red-500 hover:!text-red-600" 
                    key={2}
                >
                    Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
        </SidebarMenu>
    )
}

export default UserDropdown;