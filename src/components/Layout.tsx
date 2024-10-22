import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {children}
    </div>
  )
}

export const Menu: React.FC<LayoutProps> = ({ children }) => {
  return (
    <nav className="w-64 bg-white shadow-lg">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Ad System</h1>
      </div>
      <ul className="mt-4">
        {children}
      </ul>
    </nav>
  )
}