// src/components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react'
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error('ErrorBoundary caught an error:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box p={8} textAlign="center">
          <VStack spacing={4}>
            <Heading size="lg" color="red.500">
              Something went wrong.
            </Heading>
            <Text fontSize="md" color="gray.600">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </Text>
            <Button onClick={this.handleReset} colorScheme="red">
              Reload Page
            </Button>
          </VStack>
        </Box>
      )
    }

    return this.props.children
  }
}
