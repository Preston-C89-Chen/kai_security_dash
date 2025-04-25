import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import AppLayout from './AppLayout'
import Dashboard from '@/pages/Dashboard'
import Vulnerabilities from '@/pages/Vulnerabilities'
import VulnerabilityDetail from '@/pages/VulnerabilityDetail'
// etc...

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="vulnerabilities" element={<Vulnerabilities />} />
      <Route path="vulnerabilities/:cve" element={<VulnerabilityDetail />} />
      {/* etc... */}
    </Route>
  )
)
