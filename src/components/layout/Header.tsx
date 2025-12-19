'use client';

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { NotificationCenter } from "@/components/common/NotificationCenter"
import { MobileSidebar } from "@/components/layout/MobileSidebar"
import { ModeToggle } from "@/components/mode-toggle"

export function Header() {
    const router = useRouter()

    return (
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
            <div className="h-16 px-4 flex items-center justify-between">
                {/* Left Side */}
                <div className="flex items-center gap-2">
                    <MobileSidebar />

                    {/* Search */}
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search orders, users, restaurants..."
                            className="pl-10 pr-4 py-2 w-96"
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-3">
                    <ModeToggle />
                    {/* Notifications */}
                    <NotificationCenter />

                    {/* User Profile */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                                    <AvatarFallback>SC</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">Arsh Verma</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        arsh@zomato.com
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => router.push('/settings')}>
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
