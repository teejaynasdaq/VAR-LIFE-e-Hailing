import React from 'react'
import { Button } from '../components/Button'

interface ProfileScreenProps {
  user: { name: string; email: string } | null
  onNavigate: (screen: 'welcome' | 'signup' | 'home' | 'profile') => void
}

export default function ProfileScreen({ user, onNavigate }: ProfileScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="text-blue-600 font-medium"
          >
            ← Back
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
          <div></div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              {user?.name?.charAt(0) || 'G'}
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {user?.name || 'Guest User'}
            </h2>
            <p className="text-gray-600">{user?.email || 'guest@varlife.com'}</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="divide-y divide-gray-100">
            <button className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Ride History</span>
                <span className="text-gray-400">→</span>
              </div>
            </button>
            
            <button className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Payment Methods</span>
                <span className="text-gray-400">→</span>
              </div>
            </button>
            
            <button className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Settings</span>
                <span className="text-gray-400">→</span>
              </div>
            </button>
            
            <button className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Help & Support</span>
                <span className="text-gray-400">→</span>
              </div>
            </button>
          </div>
        </div>

        {/* Sign Out */}
        <Button
          onClick={() => onNavigate('welcome')}
          className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Sign Out
        </Button>
      </div>
    </div>
  )
}