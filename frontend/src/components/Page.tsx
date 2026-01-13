import { Header } from "./Header"

interface LayoutProps {
    children: React.ReactNode
}

export function Page({ children } : LayoutProps){
    return <div className="min-h-screen">
        <Header/>
        <main className="h-auto">
            {children}
        </main>
    </div>
}