import React, { useState } from 'react'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { RideOptionCard } from '../components/RideOptionCard'

interface HomeScreenProps {
  user: { name: string; email: string } | null
  onNavigate: (screen: 'welcome' | 'signup' | 'home' | 'profile') => void
}

const rideOptions = [
  { id: 1, name: 'VAR Economy', price: '$12', time: '5 min', description: 'Affordable rides for everyday trips' },
  { id: 2, name: 'VAR Comfort', price: '$18', time: '3 min', description: 'Extra legroom and premium vehicles' },
  { id: 3, name: 'VAR Premium', price: '$25', time: '2 min', description: 'Luxury vehicles with top-rated drivers' }
]

export default function HomeScreen({ user, onNavigate }: HomeScreenProps) {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [selectedRide, setSelectedRide] = useState<number | null>(null)

  const handleBookRide = () => {
    if (pickup && destination && selectedRide) {
      alert('Ride booked successfully! Your driver will arrive shortly.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">VAR LIFE</h1>
          <button
            onClick={() => onNavigate('profile')}
            className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold"
          >
            {user?.name?.charAt(0) || 'G'}
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Greeting */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Hello {user?.name || 'Guest'}!
          </h2>
          <p className="text-gray-600">Where would you like to go?</p>
        </div>

        {/* Location Inputs */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Location
              </label>
              <Input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter pickup location"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <Input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Where to?"
              />
            </div>
          </div>
        </div>

        {/* Ride Options */}
        {pickup && destination && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose your ride</h3>
            <div className="space-y-3">
              {rideOptions.map((ride) => (
                <div
                  key={ride.id}
                  onClick={() => setSelectedRide(ride.id)}
                  className={`bg-white rounded-xl p-4 cursor-pointer transition-all ${
                    selectedRide === ride.id
                      ? 'ring-2 ring-blue-500 bg-blue-50'
                      : 'hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{ride.name}</h4>
                      <p className="text-sm text-gray-600">{ride.description}</p>
                      <p className="text-sm text-gray-500">{ride.time} away</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{ride.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Book Ride Button */}
        {pickup && destination && selectedRide && (
          <Button
            onClick={handleBookRide}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Book Ride
          </Button>
        )}
      </div>
    </div>
  )
}