import { cn } from "@/lib/utils"

const Header = ({children, className}: {children: React.ReactNode, className?: string}) => {
    return(
        <header className={cn("sticky top-0 bg-background/90 backdrop-blur-sm flex h-16 shrink-0 items-center gap-2 border-b px-4", className)} >
            {children}
        </header>
    )
}

export default Header;