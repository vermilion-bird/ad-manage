import React, { useState } from 'react'
import { Plus, Edit2, Trash2, X } from 'lucide-react'

interface Ad {
  id: number
  name: string
  type: string
  status: string
}

const AdManager: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([
    { id: 1, name: 'Summer Sale Banner', type: 'Image', status: 'Active' },
    { id: 2, name: 'Product Showcase Video', type: 'Video', status: 'Paused' },
    { id: 3, name: 'Holiday Promotion', type: 'Rich Media', status: 'Draft' },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentAd, setCurrentAd] = useState<Ad | null>(null)

  const openModal = (ad: Ad | null = null) => {
    setCurrentAd(ad)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setCurrentAd(null)
    setIsModalOpen(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const newAd: Ad = {
      id: currentAd ? currentAd.id : Date.now(),
      name: formData.get('name') as string,
      type: formData.get('type') as string,
      status: formData.get('status') as string,
    }

    if (currentAd) {
      setAds(ads.map(ad => ad.id === currentAd.id ? newAd : ad))
    } else {
      setAds([...ads, newAd])
    }
    closeModal()
  }

  const deleteAd = (id: number) => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      setAds(ads.filter(ad => ad.id !== id))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Ad Manager</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
          onClick={() => openModal()}
        >
          <Plus size={20} className="mr-2" /> Create New Ad
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ads.map((ad) => (
              <tr key={ad.id}>
                <td className="px-6 py-4 whitespace-nowrap">{ad.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ad.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    ad.status === 'Active' ? 'bg-green-100 text-green-800' :
                    ad.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {ad.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4" onClick={() => openModal(ad)}>
                    <Edit2 size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-900" onClick={() => deleteAd(ad.id)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{currentAd ? 'Edit Ad' : 'Create New Ad'}</h3>
              <form className="mt-2 text-left" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    defaultValue={currentAd?.name}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                    Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    defaultValue={currentAd?.type}
                    required
                  >
                    <option value="Image">Image</option>
                    <option value="Video">Video</option>
                    <option value="Rich Media">Rich Media</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    defaultValue={currentAd?.status}
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {currentAd ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdManager