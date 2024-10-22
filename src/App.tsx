import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Layout, Menu } from './components/Layout'
import Dashboard from './components/Dashboard'
import AdManager from './components/AdManager'
import CampaignCreator from './components/CampaignCreator'
import Analytics from './components/Analytics'
import { BarChart3, Image, PlusCircle, LayoutDashboard } from 'lucide-react'

function App() {
  return (
    <Router>
      <Layout>
        <Menu>
          <Link to="/" className="flex items-center p-2 text-gray-600 hover:bg-gray-100">
            <LayoutDashboard className="mr-2" size={20} />
            Dashboard
          </Link>
          <Link to="/ad-manager" className="flex items-center p-2 text-gray-600 hover:bg-gray-100">
            <Image className="mr-2" size={20} />
            Ad Manager
          </Link>
          <Link to="/campaign-creator" className="flex items-center p-2 text-gray-600 hover:bg-gray-100">
            <PlusCircle className="mr-2" size={20} />
            Campaign Creator
          </Link>
          <Link to="/analytics" className="flex items-center p-2 text-gray-600 hover:bg-gray-100">
            <BarChart3 className="mr-2" size={20} />
            Analytics
          </Link>
        </Menu>
        <div className="flex-1 p-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ad-manager" element={<AdManager />} />
            <Route path="/campaign-creator" element={<CampaignCreator />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>
      </Layout>
    </Router>
  )
}

export default App