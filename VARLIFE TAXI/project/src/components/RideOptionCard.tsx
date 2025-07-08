import React from 'react'

interface Ride {
  id: number
  name: string
  price: string
  time: string
  description: string
}

interface RideOptionCardProps {
  ride: Ride
  isSelected?: boolean
  onSelect?: () => void
}

export const RideOptionCard = ({ ride, isSelected = false, onSelect }: RideOptionCardProps) => {
  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-xl p-4 cursor-pointer transition-all ${
        isSelected
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
  )
}