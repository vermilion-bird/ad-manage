import React from 'react'
import { BarChart, Newspaper, Users, DollarSign } from 'lucide-react'

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard icon={<BarChart />} title="Total Impressions" value="1.2M" />
        <DashboardCard icon={<Newspaper />} title="Active Campaigns" value="15" />
        <DashboardCard icon={<Users />} title="Audience Reach" value="500K" />
        <DashboardCard icon={<DollarSign />} title="Revenue" value="$50,000" />
      </div>
    </div>
  )
}

const DashboardCard: React.FC<{ icon: React.ReactNode; title: string; value: string }> = ({ icon, title, value }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 p-3 rounded-full mr-4">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}

export default Dashboard