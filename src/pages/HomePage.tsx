import { Button } from '@/components/ui/button'

export function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-semibold tracking-tight">React 18 + Vite POC</h1>
      <p className="text-muted-foreground">Tailwind 4, shadcn/ui, and React Router v6 are wired up.</p>
      <Button>Get started</Button>
    </main>
  )
}
