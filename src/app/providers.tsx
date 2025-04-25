// src/app/providers.tsx
import { ReactNode } from 'react'
import { Provider as ChakraProvider } from "@/components/ui/provider"
import { Provider as ReduxProvider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { store } from './store'
import { ErrorBoundary } from './errorBoundary'

const queryClient = new QueryClient()

type AppProvidersProps = {
  children: ReactNode
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ErrorBoundary>
      <ChakraProvider>
        <ReduxProvider store={store}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ReduxProvider>
      </ChakraProvider>
    </ErrorBoundary>
  )
}
