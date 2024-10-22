import React, { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts'

const campaignPerformanceData = [
  { name: 'Jan', impressions: 4000, clicks: 2400, conversions: 400 },
  { name: 'Feb', impressions: 3000, clicks: 1398, conversions: 210 },
  { name: 'Mar', impressions: 2000, clicks: 9800, conversions: 290 },
  { name: 'Apr', impressions: 2780, clicks: 3908, conversions: 300 },
  { name: 'May', impressions: 1890, clicks: 4800, conversions: 181 },
  { name: 'Jun', impressions: 2390, clicks: 3800, conversions: 250 },
  { name: 'Jul', impressions: 3490, clicks: 4300, conversions: 210 },
]

const countryPerformanceData = [
  { name: 'USA', value: 400 },
  { name: 'China', value: 300 },
  { name: 'India', value: 300 },
  { name: 'Germany', value: 200 },
  { name: 'UK', value: 100 },
]

const mediaPerformanceData = [
  { subject: 'Facebook', A: 120, B: 110, fullMark: 150 },
  { subject: 'Google', A: 98, B: 130, fullMark: 150 },
  { subject: 'Twitter', A: 86, B: 130, fullMark: 150 },
  { subject: 'LinkedIn', A: 99, B: 100, fullMark: 150 },
  { subject: 'Instagram', A: 85, B: 90, fullMark: 150 },
  { subject: 'YouTube', A: 65, B: 85, fullMark: 150 },
]

const benchmarkData = [
  { name: 'CTR', current: 2.5, benchmark: 2.1 },
  { name: 'CPC', current: 0.5, benchmark: 0.6 },
  { name: 'Conv. Rate', current: 3.2, benchmark: 2.8 },
  { name: 'CPA', current: 15, benchmark: 18 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

const Analytics: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-6">Analytics Dashboard</h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Campaign Performance Over Time</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={campaignPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="impressions" fill="#8884d8" />
            <Bar dataKey="clicks" fill="#82ca9d" />
            <Bar dataKey="conversions" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Performance by Country</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={countryPerformanceData}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {countryPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Media Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart outerRadius={90} data={mediaPerformanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 150]} />
              <Radar name="Your Campaign" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Industry Average" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Performance Benchmarks</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={benchmarkData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="current" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="benchmark" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Value ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

export default Analytics