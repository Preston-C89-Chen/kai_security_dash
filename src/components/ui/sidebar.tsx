// src/components/layout/Sidebar.tsx
import {
  Box,
  IconButton,
  VStack,
  Text,
  Icon
} from '@chakra-ui/react'
import { useColorModeValue } from '@/components/ui/color-mode' 
import { Tooltip } from '@/components/ui/tooltip' // adjust path

import {
  FiHome,
  FiShield,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const navItems = [
  { label: 'Dashboard Overview', path: '/', icon: FiHome },
  { label: 'Vulnerability Logs', path: '/vulnerabilities', icon: FiShield },
  // { label: 'User Settings', path: '/settings', icon: FiSettings },
]

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => setCollapsed(!collapsed)

  const width = collapsed ? '80px' : '240px'
  const bg = useColorModeValue('gray.50', 'gray.900')
  const activeColor = useColorModeValue('blue.600', 'blue.300')
  const gray = useColorModeValue('gray.100', 'gray.700')
  return (
    <Box
      w={width}
      transition="width 0.3s"
      h="100vh"
      bg={bg}
      height="100%"
      minHeight="100vh"
      p={4}
      boxShadow="md"
      borderRight="1px solid"
      borderColor="gray.200"
      display="flex"
      flexDirection="column"
    >
      {/* Header */}
      <Box mb={6} display="flex" alignItems="center" justifyContent="space-between">
        {!collapsed && <Text fontSize="xl" fontWeight="bold">Kai Dash</Text>}
        <IconButton
          size="sm"
          variant="ghost"
          aria-label="Toggle sidebar"
          icon={collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          onClick={toggleSidebar}
        />
      </Box>

      {/* Navigation */}
      <VStack spacing={4} align="stretch">
        {navItems.map(({ label, path, icon }) => {
          const content = (
            <Box
              as={NavLink}
              to={path}
              display="flex"
              alignItems="center"
              gap={collapsed ? 0 : 3}
              p={2}
              fontSize="sm"
              borderRadius="md"
              _hover={{ bg: gray }}
              _activeLink={{ color: activeColor }}
            >
              <Icon as={icon} boxSize={5} />
              {!collapsed && label}
            </Box>
          )

          return collapsed ? (
            <Tooltip label={label} placement="right" key={label}>
              {content}
            </Tooltip>
          ) : (
            <Box key={label}>{content}</Box>
          )
        })}
      </VStack>
    </Box>
  )
}

export default Sidebar
