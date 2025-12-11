import Link from 'next/link'
import { Users, BookOpen, LayoutDashboard, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen w-full">
            {/* Sidebar */}
            <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
                <div className="flex h-16 items-center border-b px-6">
                    <Link href="/admin" className="flex items-center gap-2 font-semibold">
                        <LayoutDashboard className="size-6" />
                        <span>Admin Portal</span>
                    </Link>
                </div>
                <nav className="flex-1 space-y-2 p-4 text-sm font-medium">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <LayoutDashboard className="size-4" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/users"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <Users className="size-4" />
                        Users
                    </Link>
                    <Link
                        href="/admin/courses"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <BookOpen className="size-4" />
                        Courses
                    </Link>
                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <Settings className="size-4" />
                        Settings
                    </Link>
                </nav>
                <div className="border-t p-4">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        <LogOut className="size-4" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="flex h-16 items-center border-b px-6 md:hidden">
                    <Link href="/admin" className="font-semibold">
                        Admin Portal
                    </Link>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}
