import React, { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [weather, setWeather] = useState('Loading weather...')
  const [location, setLocation] = useState('Seoul') // Default location
  const [inputLocation, setInputLocation] = useState('')

  const fetchWeather = async (loc) => {
    try {
      const response = await fetch(`/weather/${loc}?T0&lang=ko`)
      const text = await response.text()
      setWeather(text)
    } catch (error) {
      setWeather('Failed to fetch weather. Please try again.')
      console.error('Error fetching weather:', error)
    }
  }

  useEffect(() => {
    fetchWeather(location)
  }, [location])

  const handleSearch = (e) => {
    e.preventDefault()
    if (inputLocation.trim()) {
      setLocation(inputLocation)
      setInputLocation('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-8 flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          🚀 ASCII Weather
        </h1>

        <form onSubmit={handleSearch} className="mb-8 flex justify-center">
          <input
            type="text"
            value={inputLocation}
            onChange={(e) => setInputLocation(e.target.value)}
            placeholder="Enter city name (e.g., Seoul, London)"
            className="p-3 rounded-l-lg border-none focus:outline-none focus:ring-2 focus:ring-purple-500 w-full max-w-md text-gray-800"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-r-lg transition duration-300"
          >
            Search
          </button>
        </form>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl font-mono text-sm text-green-300 whitespace-pre overflow-x-auto">
          {weather}
        </div>
      </div>
    </div>
  )
}

export default App
