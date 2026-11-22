'use client'
import { ThemeProvider } from './theme-provider'
import { Toaster } from '@/components/ui/toast'

/**
 *
 * unisco ThemeProvider con Toaster di Shadcn in un unico provider
 *
 */
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Toaster componente shadcn da montare su layout. viene richiamato da toast */}
      <Toaster />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        // disableTransitionOnChange  // disabilita la transizione tailwind
      >
        {children}
      </ThemeProvider>
    </>
  )
}
export default Providers
