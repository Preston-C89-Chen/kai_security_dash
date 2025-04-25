import { Outlet, useLocation } from 'react-router-dom'
import { Flex, Box } from '@chakra-ui/react'
import Sidebar from '@/components/ui/sidebar'
import Topbar from '@/components/ui/topbar'

const AppLayout = () => {
  const location = useLocation()
  const tablePages = ['/vulnerabilities']
  const isTablePage = tablePages.includes(location.pathname)
  return (
    <Flex h="100vh">
      <Sidebar />
      <Box 
        flex="1"
        overflow={'scroll'}
      >
        <Topbar />
        <Box p={4}>
          <Outlet /> {/* renders the matched route (e.g. Dashboard, Vulnerabilities) */}
        </Box>
      </Box>
    </Flex>
  )
}

export default AppLayout
