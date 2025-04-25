// src/components/layout/Topbar.tsx
import {
  Flex,
  Spacer,
  Text,
  IconButton,
} from '@chakra-ui/react'
import { useColorModeValue, useColorMode } from '@/components/ui/color-mode' 
import { FiSun, FiMoon } from 'react-icons/fi'

const Topbar = () => {
  const { toggleColorMode, colorMode } = useColorMode()
  return (
    <Flex
      as="header"
      px={6}
      py={4}
      align="center"
      bg={useColorModeValue('white', 'gray.800')}
      borderBottom="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Spacer />
      <IconButton
        aria-label="Toggle dark mode"  
        onClick={toggleColorMode}
      >
       {colorMode === 'dark' ? <FiSun /> : <FiMoon />}
      </IconButton>
    </Flex>
  )
}

export default Topbar
