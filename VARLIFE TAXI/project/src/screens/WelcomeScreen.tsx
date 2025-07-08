import React from 'react'
import { Button } from '../components/Button'

interface WelcomeScreenProps {
  onNavigate: (screen: 'welcome' | 'signup' | 'home' | 'profile') => void
}

export default function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center px-4">
      <div className="text-center text-white max-w-md">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4">VAR LIFE</h1>
          <p className="text-xl opacity-90">Your premium ride-sharing experience</p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={() => onNavigate('signup')}
            className="w-full bg-white text-blue-600 py-4 px-8 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Get Started
          </Button>
          
          <button 
            onClick={() => onNavigate('home')}
            className="w-full border-2 border-white text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
          >
            Continue as Guest
          </button>
        </div>
        
        <div className="mt-8 text-sm opacity-75">
          <p>Safe • Reliable • Affordable</p>
        </div>
      </div>
    </div>
  )
}