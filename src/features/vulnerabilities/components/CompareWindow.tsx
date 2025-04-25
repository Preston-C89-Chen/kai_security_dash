import { Box, Text, IconButton, Link } from '@chakra-ui/react'
import { FiX } from 'react-icons/fi'
import { Rnd } from 'react-rnd'
import { useColorModeValue } from '@/components/ui/color-mode'

const CompareWindow = ({ data, onClose }) => {
  const headerBg = useColorModeValue('gray.100', 'gray.600')
  const cardBg = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.300', 'gray.600')

  if (typeof window === 'undefined') return null

  return (
    <Rnd
      default={{
        x: 100,
        y: 100,
        width: 400,
        height: 300,
      }}
      minWidth={300}
      minHeight={200}
      bounds="window"
      dragHandleClassName="compare-window-header"
      style={{
        zIndex: 9999, // High z-index
        position: 'fixed',
        pointerEvents: 'auto',
      }}
      onDragStart={() => {
        document.body.style.userSelect = 'none'
      }}
      onDragStop={() => {
        document.body.style.userSelect = ''
      }}
    >
      <Box
        bg={cardBg}
        border="1px solid"
        borderColor={borderColor}
        rounded="md"
        shadow="lg"
        h="100%"
        display="flex"
        flexDir="column"
      >
        <Box
          className="compare-window-header"
          p={2}
          cursor="move"
          bg={headerBg}
          borderBottom="1px solid"
          borderColor={borderColor}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontWeight="bold" fontSize="sm">CVE Details</Text>
          <IconButton
            size="xs"
            aria-label="Close"
            onClick={onClose}
          >
            <FiX />
          </IconButton>
        </Box>
        <Box p={4} flex="1" overflowY="auto" fontSize="sm">
          <Text><strong>CVE:</strong> {data.cve}</Text>
          <Text><strong>Group:</strong> {data.groupName}</Text>
          <Text><strong>Fix Date:</strong> {data.fixDate}</Text>
          <Text><strong>Severity:</strong> {data.severity}</Text>
          <Text><strong>Package:</strong> {data.packageName}</Text>
          <Text><strong>Image:</strong> {data.imageName}:{data.imageVersion}</Text>
          <Text><strong>Link:</strong> <Link href={data.link} isExternal color="blue.500"k>{data.link}</Link></Text>
          <Text><strong>Status:</strong> {data.kaiStatus || "-"}</Text>

        </Box>
      </Box>
    </Rnd>
  )
}

export default CompareWindow