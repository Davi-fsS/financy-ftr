import { Header } from "./Header"

interface LayoutProps {
    children: React.ReactNode
}

export function Page({ children } : LayoutProps){
    return <div className="flex flex-col min-h-screen">
        <Header/>
        <main className="flex-1 p-12">
            {children}
        </main>
    </div>
}