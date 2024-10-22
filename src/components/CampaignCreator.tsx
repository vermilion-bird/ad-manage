import React, { useState, useEffect } from 'react'

interface Campaign {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  budget: string;
  targetAudience: string;
}

const CampaignCreator: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null)
  const [campaignName, setCampaignName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [budget, setBudget] = useState('')
  const [targetAudience, setTargetAudience] = useState('')

  useEffect(() => {
    // Load campaigns from localStorage on component mount
    const savedCampaigns = localStorage.getItem('campaigns')
    if (savedCampaigns) {
      setCampaigns(JSON.parse(savedCampaigns))
    }
  }, [])

  useEffect(() => {
    // Save campaigns to localStorage whenever it changes
    localStorage.setItem('campaigns', JSON.stringify(campaigns))
  }, [campaigns])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCampaign) {
      // Update existing campaign
      const updatedCampaigns = campaigns.map(campaign =>
        campaign.id === editingCampaign.id
          ? { ...campaign, name: campaignName, startDate, endDate, budget, targetAudience }
          : campaign
      )
      setCampaigns(updatedCampaigns)
      setEditingCampaign(null)
    } else {
      // Create new campaign
      const newCampaign: Campaign = {
        id: Date.now(),
        name: campaignName,
        startDate,
        endDate,
        budget,
        targetAudience
      }
      setCampaigns([...campaigns, newCampaign])
    }
    resetForm()
  }

  const resetForm = () => {
    setCampaignName('')
    setStartDate('')
    setEndDate('')
    setBudget('')
    setTargetAudience('')
  }

  const editCampaign = (campaign: Campaign) => {
    setEditingCampaign(campaign)
    setCampaignName(campaign.name)
    setStartDate(campaign.startDate)
    setEndDate(campaign.endDate)
    setBudget(campaign.budget)
    setTargetAudience(campaign.targetAudience)
  }

  const deleteCampaign = (id: number) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== id))
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">{editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="campaignName">
            Campaign Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="campaignName"
            type="text"
            placeholder="Enter campaign name"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
              Start Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
              End Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="budget">
            Budget
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="budget"
            type="number"
            placeholder="Enter budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="targetAudience">
            Target Audience
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="targetAudience"
            placeholder="Describe your target audience"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            rows={4}
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {editingCampaign ? 'Update Campaign' : 'Create Campaign'}
          </button>
          {editingCampaign && (
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                setEditingCampaign(null)
                resetForm()
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <CampaignList campaigns={campaigns} onEdit={editCampaign} onDelete={deleteCampaign} />
    </div>
  )
}

const CampaignList: React.FC<{
  campaigns: Campaign[];
  onEdit: (campaign: Campaign) => void;
  onDelete: (id: number) => void;
}> = ({ campaigns, onEdit, onDelete }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Campaign List</h3>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td className="px-6 py-4 whitespace-nowrap">{campaign.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{campaign.startDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{campaign.endDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">${campaign.budget}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onEdit(campaign)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(campaign.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CampaignCreator