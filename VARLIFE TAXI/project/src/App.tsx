import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MapPin, User, CreditCard, Shield, Share2, Phone, Mail, Upload, Check, X, Star, Clock, Car, Users, Moon, GraduationCap, Plus, ChevronRight, Menu, ArrowLeft, Search, Navigation, Zap, Settings, Heart, MessageCircle, Send, Smile, Camera, Mic } from 'lucide-react';

const VarLifeApp = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rideInProgress, setRideInProgress] = useState(false);
  const [userLocation, setUserLocation] = useState('Nelspruit');
  const [favorites, setFavorites] = useState([]);
  const [recentRides, setRecentRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Mock data optimized for Nelspruit/White River area
  const mockDriver = {
    name: "Sarah Johnson",
    rating: 4.9,
    car: "Toyota Camry",
    plate: "MHL-123-GP",
    eta: "3 min",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b332c3c5?w=150&h=150&fit=crop&crop=face",
    studentId: "STU2024",
    verified: true
  };

  const localAreas = [
    "Local University Campus",
    "Nelspruit CBD",
    "White River",
    "Mbombela Stadium",
    "Riverside Mall",
    "Ilanga Mall",
    "Lowveld High School",
    "Nelspruit Hospital",
    "Kruger Mpumalanga Airport"
  ];

  const rideOptions = useMemo(() => [
    {
      id: 'standard',
      name: 'Standard Ride',
      icon: <Car className="w-6 h-6" />,
      price: 'R25.50',
      time: '5 min',
      description: 'Reliable rides for students',
      discount: '15% student discount'
    },
    {
      id: 'campus',
      name: 'Campus Shuttle',
      icon: <GraduationCap className="w-6 h-6" />,
      price: 'R12.75',
      time: '8 min',
      description: 'Shared rides around campus',
      discount: '50% campus special'
    },
    {
      id: 'group',
      name: 'Group Ride',
      icon: <Users className="w-6 h-6" />,
      price: 'R38.25',
      time: '6 min',
      description: 'Split fare with friends (up to 4)',
      discount: '20% group discount'
    },
    {
      id: 'latenight',
      name: 'Safe Night Ride',
      icon: <Moon className="w-6 h-6" />,
      price: 'R28.50',
      time: '4 min',
      description: '24/7 safe transportation',
      discount: 'Priority verified drivers'
    },
    {
      id: 'express',
      name: 'Express Ride',
      icon: <Zap className="w-6 h-6" />,
      price: 'R35.00',
      time: '3 min',
      description: 'Fastest available ride',
      discount: '10% student discount'
    }
  ], []);

  // Mock chat messages
  const initialMessages = [
    {
      id: 1,
      sender: 'driver',
      message: "Hi! I'm Sarah, your driver. I'm on my way to pick you up at the campus.",
      timestamp: new Date(Date.now() - 300000),
      read: true
    },
    {
      id: 2,
      sender: 'user',
      message: "Great! I'll be waiting at the main entrance.",
      timestamp: new Date(Date.now() - 240000),
      read: true
    },
    {
      id: 3,
      sender: 'driver',
      message: "Perfect! I'm in a white Toyota Camry, plate MHL-123-GP. ETA 3 minutes.",
      timestamp: new Date(Date.now() - 180000),
      read: true
    }
  ];

  // Quick reply options
  const quickReplies = [
    "I'm here",
    "Running 2 mins late",
    "Can't find you",
    "Thanks!",
    "Almost there"
  ];

  // Performance optimization: Memoized handlers
  const handleVerification = useCallback(() => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      setTimeout(() => {
        setCurrentScreen('home');
      }, 2000);
    }, 3000);
  }, []);

  const handleRideRequest = useCallback((ride) => {
    setSelectedRide(ride);
    setCurrentScreen('matching');
    setLoading(true);
    
    // Add to recent rides
    setRecentRides(prev => [ride, ...prev.slice(0, 4)]);
    
    // Initialize chat messages
    setChatMessages(initialMessages);
    
    setTimeout(() => {
      setLoading(false);
      setCurrentScreen('tracking');
      setRideInProgress(true);
    }, 3000);
  }, []);

  const addToFavorites = useCallback((location) => {
    setFavorites(prev => {
      if (prev.includes(location)) return prev;
      return [...prev, location];
    });
  }, []);

  const filteredAreas = useMemo(() => {
    if (!searchQuery) return localAreas;
    return localAreas.filter(area => 
      area.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Chat functions
  const sendMessage = useCallback(() => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: 'user',
        message: newMessage.trim(),
        timestamp: new Date(),
        read: true
      };
      
      setChatMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate driver typing and response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const driverResponse = {
          id: chatMessages.length + 2,
          sender: 'driver',
          message: "Got it! See you soon.",
          timestamp: new Date(),
          read: true
        };
        setChatMessages(prev => [...prev, driverResponse]);
      }, 2000);
    }
  }, [newMessage, chatMessages.length]);

  const sendQuickReply = useCallback((reply) => {
    const message = {
      id: chatMessages.length + 1,
      sender: 'user',
      message: reply,
      timestamp: new Date(),
      read: true
    };
    
    setChatMessages(prev => [...prev, message]);
  }, [chatMessages.length]);

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  // Welcome Screen with enhanced animations
  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-8 w-32 h-32 bg-white bg-opacity-3 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-white bg-opacity-4 rounded-full animate-pulse delay-700"></div>
      </div>
      
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="text-center">
          <div className="w-28 h-28 bg-gradient-to-br from-white to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl animate-bounce">
            <GraduationCap className="w-14 h-14 text-black" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            VAR LIFE
          </h1>
          <p className="text-gray-300 text-xl mb-2">Student rides, verified and safe</p>
          <p className="text-gray-400 text-base">Nelspruit • White River • Mpumalanga</p>
        </div>
      </div>
      
      <div className="p-6 space-y-4 relative z-10">
        <button 
          onClick={() => setCurrentScreen('signup')}
          className="w-full bg-gradient-to-r from-white to-gray-100 text-black py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Get Started
        </button>
        <button 
          onClick={() => setCurrentScreen('login')}
          className="w-full border-2 border-gray-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all duration-300"
        >
          I already have an account
        </button>
      </div>
    </div>
  );

  // Enhanced Sign Up Screen
  const SignUpScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="p-6">
        <button 
          onClick={() => setCurrentScreen('welcome')} 
          className="mb-6 p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Create your account
        </h1>
        <p className="text-gray-300 mb-8 text-lg">Join the verified student community in Mpumalanga</p>
        
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="First name" 
            className="w-full bg-gray-800 bg-opacity-50 border border-gray-600 rounded-xl p-4 text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors"
          />
          <input 
            type="text" 
            placeholder="Last name" 
            className="w-full bg-gray-800 bg-opacity-50 border border-gray-600 rounded-xl p-4 text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors"
          />
          <input 
            type="email" 
            placeholder="Email (e.g., student@university.ac.za)" 
            className="w-full bg-gray-800 bg-opacity-50 border border-gray-600 rounded-xl p-4 text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors"
          />
          <input 
            type="tel" 
            placeholder="Phone number (+27)" 
            className="w-full bg-gray-800 bg-opacity-50 border border-gray-600 rounded-xl p-4 text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-gray-800 bg-opacity-50 border border-gray-600 rounded-xl p-4 text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors"
          />
        </div>
        
        <button 
          onClick={() => setCurrentScreen('verification')}
          className="w-full bg-gradient-to-r from-white to-gray-100 text-black py-4 rounded-xl font-semibold text-lg mt-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Continue to Student Verification
        </button>
        
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );

  // Enhanced Verification Screen
  const VerificationScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="p-6">
        <button 
          onClick={() => setCurrentScreen('signup')} 
          className="mb-6 p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Verify your student status
        </h1>
        <p className="text-gray-300 mb-8 text-lg">We use SheerID to verify your enrollment at local institutions</p>
        
        {!isVerifying && !isVerified && (
          <div className="space-y-6">
            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="Student email (.ac.za or .edu address)" 
                className="w-full bg-gray-800 bg-opacity-50 border border-gray-600 rounded-xl p-4 text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors"
              />
              <select className="w-full bg-gray-800 bg-opacity-50 border border-gray-600 rounded-xl p-4 text-white focus:border-white focus:outline-none transition-colors">
                <option value="">Select your institution</option>
                <option value="local-university">Local University</option>
                <option value="unisa">University of South Africa</option>
                <option value="wits">University of the Witwatersrand</option>
                <option value="up">University of Pretoria</option>
                <option value="other">Other institution</option>
              </select>
            </div>
            
            <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-gray-500 transition-colors">
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-300 mb-2">Upload Student ID or Enrollment Letter</p>
              <p className="text-sm text-gray-500">JPG, PNG, or PDF up to 10MB</p>
            </div>
            
            <button 
              onClick={handleVerification}
              className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Verify Student Status
            </button>
          </div>
        )}
        
        {isVerifying && (
          <div className="text-center py-20">
            <div className="animate-spin w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-6"></div>
            <h2 className="text-3xl font-bold mb-3">Verifying your status...</h2>
            <p className="text-gray-300 text-lg">This may take a moment</p>
          </div>
        )}
        
        {isVerified && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-3 text-green-400">Verification Complete!</h2>
            <p className="text-gray-300 text-lg">Welcome to VAR LIFE Mpumalanga</p>
          </div>
        )}
      </div>
    </div>
  );

  // Enhanced Home Screen with better performance
  const HomeScreen = () => (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 z-10 p-6">
          <div className="flex items-center justify-between mb-6">
            <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Verified Student • {userLocation}</span>
            </div>
          </div>
          
          {/* Enhanced Search Bar */}
          <div className="bg-white rounded-xl p-4 shadow-2xl">
            <div className="flex items-center space-x-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Where to in Nelspruit/White River?" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-black placeholder-gray-500 outline-none text-lg"
              />
            </div>
            
            {/* Quick suggestions */}
            {searchQuery && (
              <div className="mt-3 space-y-2 max-h-40 overflow-y-auto">
                {filteredAreas.map((area, index) => (
                  <div 
                    key={index}
                    onClick={() => setSearchQuery(area)}
                    className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                  >
                    <span className="text-gray-800">{area}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToFavorites(area);
                      }}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Favorites */}
          {favorites.length > 0 && (
            <div className="mt-4">
              <h3 className="text-white text-sm font-medium mb-2">Favorites</h3>
              <div className="flex space-x-2 overflow-x-auto">
                {favorites.map((fav, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(fav)}
                    className="bg-gray-800 bg-opacity-50 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap"
                  >
                    {fav}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Enhanced Map Background */}
        <div className="h-96 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="text-gray-400 text-center relative z-10">
            <MapPin className="w-16 h-16 mx-auto mb-4 animate-pulse" />
            <p className="text-lg font-medium">Interactive map of Nelspruit & White River</p>
            <p className="text-sm text-gray-500">Live driver locations</p>
          </div>
        </div>
      </div>
      
      {/* Enhanced Ride Options */}
      <div className="bg-white text-black rounded-t-3xl p-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Choose a ride</h2>
          <div className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
            Student Discounts Active
          </div>
        </div>
        
        {/* Recent rides */}
        {recentRides.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Recent Rides</h3>
            <div className="flex space-x-3 overflow-x-auto">
              {recentRides.map((ride, index) => (
                <button
                  key={index}
                  onClick={() => handleRideRequest(ride)}
                  className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg min-w-24 text-center transition-colors"
                >
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white mx-auto mb-2">
                    {ride.icon}
                  </div>
                  <p className="text-xs font-medium">{ride.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {rideOptions.map((ride) => (
          <div 
            key={ride.id}
            onClick={() => handleRideRequest(ride)}
            className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-xl hover:border-gray-300 hover:bg-gray-50 cursor-pointer transition-all duration-200 transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-800 rounded-xl flex items-center justify-center text-white shadow-lg">
                {ride.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg">{ride.name}</h3>
                <p className="text-sm text-gray-600">{ride.description}</p>
                <p className="text-xs text-green-600 font-medium">{ride.discount}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-xl text-green-600">{ride.price}</p>
              <p className="text-sm text-gray-500">{ride.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Enhanced Matching Screen
  const MatchingScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="w-32 h-32 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
        <h2 className="text-3xl font-bold mb-4">Finding your ride...</h2>
        <p className="text-gray-300 text-lg mb-2">
          {selectedRide ? `Looking for ${selectedRide.name}` : 'Matching with nearby drivers'}
        </p>
        <p className="text-gray-400 text-sm">Searching verified student drivers in your area</p>
        
        {/* Progress indicators */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
            <span className="text-sm">Locating drivers...</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-300"></div>
            <span className="text-sm text-gray-400">Verifying credentials...</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-700"></div>
            <span className="text-sm text-gray-400">Confirming match...</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced Tracking Screen
  const TrackingScreen = () => (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setCurrentScreen('home')}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 bg-red-600 rounded-full hover:bg-red-500 transition-colors">
              <Shield className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCurrentScreen('chat')}
              className="p-2 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors relative"
            >
              <MessageCircle className="w-5 h-5" />
              {chatMessages.length > 3 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Map */}
      <div className="h-64 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="text-gray-400 text-center relative z-10">
          <Navigation className="w-16 h-16 mx-auto mb-4 animate-pulse" />
          <p className="text-lg font-medium">Live tracking map</p>
          <p className="text-sm">Real-time location updates</p>
        </div>
      </div>
      
      {/* Enhanced Driver Info */}
      <div className="bg-white text-black rounded-t-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your driver is on the way</h2>
          <div className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-bold shadow-sm animate-pulse">
            {mockDriver.eta}
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-xl">
          <img 
            src={mockDriver.photo} 
            alt="Driver" 
            className="w-16 h-16 rounded-full object-cover shadow-lg"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-lg">{mockDriver.name}</h3>
              {mockDriver.verified && (
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{mockDriver.rating}</span>
              <span className="text-xs text-gray-400">• Student ID: {mockDriver.studentId}</span>
            </div>
            <p className="text-sm text-gray-500">{mockDriver.car} • {mockDriver.plate}</p>
          </div>
          <div className="flex space-x-2">
            <button className="p-3 bg-green-100 rounded-full hover:bg-green-200 transition-colors">
              <Phone className="w-5 h-5 text-green-600" />
            </button>
            <button 
              onClick={() => setCurrentScreen('chat')}
              className="p-3 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors relative"
            >
              <MessageCircle className="w-5 h-5 text-blue-600" />
              {chatMessages.length > 3 && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            <div>
              <p className="font-semibold">Pickup</p>
              <p className="text-sm text-gray-500">Local University Campus - Main Entrance</p>
            </div>
          </div>
          <div className="w-0.5 h-8 bg-gray-300 ml-2"></div>
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-black rounded-full"></div>
            <div>
              <p className="font-semibold">Drop-off</p>
              <p className="text-sm text-gray-500">Riverside Mall - Nelspruit</p>
            </div>
          </div>
        </div>
        
        {/* Trip details */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Trip fare</span>
            <span className="font-bold text-lg">{selectedRide?.price || 'R25.50'}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-600">Student discount</span>
            <span className="text-sm text-green-600 font-medium">-R3.75</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Chat Screen
  const ChatScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setCurrentScreen('tracking')}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <img 
            src={mockDriver.photo} 
            alt="Driver" 
            className="w-12 h-12 rounded-full object-cover shadow-lg"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-lg">{mockDriver.name}</h3>
              {mockDriver.verified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-2 h-2 text-white" />
                </div>
              )}
            </div>
            <p className="text-sm text-gray-400">Your driver • {mockDriver.car}</p>
          </div>
          <button className="p-2 bg-green-600 rounded-full hover:bg-green-500 transition-colors">
            <Phone className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {chatMessages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
              message.sender === 'user' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white' 
                : 'bg-gray-800 text-white'
            }`}>
              <p className="text-sm">{message.message}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800 px-4 py-3 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Replies */}
      <div className="px-6 pb-4">
        <div className="flex space-x-2 overflow-x-auto">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => sendQuickReply(reply)}
              className="bg-gray-800 bg-opacity-50 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap hover:bg-gray-700 transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="p-6 border-t border-gray-800">
        <div className="flex items-center space-x-3 bg-gray-800 bg-opacity-50 rounded-2xl p-3">
          <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
            <Camera className="w-5 h-5 text-gray-400" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
          />
          <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
            <Smile className="w-5 h-5 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
            <Mic className="w-5 h-5 text-gray-400" />
          </button>
          <button 
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className={`p-2 rounded-full transition-colors ${
              newMessage.trim() 
                ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  // Enhanced Profile Screen
  const ProfileScreen = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setCurrentScreen('home')}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Profile</h1>
          <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Enhanced Profile Info */}
      <div className="bg-white p-6 border-b border-gray-200 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center shadow-lg">
            <User className="w-10 h-10 text-gray-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-gray-600">john.doe@university.ac.za</p>
            <div className="flex items-center space-x-2 mt-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 font-semibold">Verified Student</span>
            </div>
            <div className="flex items-center space-x-4 mt-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">47</p>
                <p className="text-xs text-gray-500">Rides</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">4.8</p>
                <p className="text-xs text-gray-500">Rating</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">R342</p>
                <p className="text-xs text-gray-500">Saved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Menu Items */}
      <div className="bg-white shadow-sm">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <span className="text-lg font-medium">Payment Methods</span>
              <p className="text-sm text-gray-500">Manage cards & wallets</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="p-4 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <span className="text-lg font-medium">Ride History</span>
              <p className="text-sm text-gray-500">View past trips</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="p-4 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <span className="text-lg font-medium">Student Verification</span>
              <p className="text-sm text-gray-500">Local University</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">Verified</span>
          </div>
        </div>
        
        <div className="p-4 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <span className="text-lg font-medium">Refer Friends</span>
              <p className="text-sm text-gray-500">Earn R50 credit per referral</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="p-4 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <span className="text-lg font-medium">Favorite Places</span>
              <p className="text-sm text-gray-500">{favorites.length} saved locations</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="p-4 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <span className="text-lg font-medium">Safety Center</span>
              <p className="text-sm text-gray-500">Emergency contacts & features</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <span className="text-lg font-medium">Rate Your Experience</span>
              <p className="text-sm text-gray-500">Help us improve VAR LIFE</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      
      {/* Student perks section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 m-4 p-6 rounded-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Student Perks</h3>
        <p className="text-sm text-gray-600 mb-4">Enjoy exclusive benefits as a verified student</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <GraduationCap className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm font-medium">15% Discount</p>
            <p className="text-xs text-gray-500">On all rides</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm font-medium">Group Rides</p>
            <p className="text-xs text-gray-500">Split with friends</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Login Screen (bonus addition)
  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="p-6">
        <button 
          onClick={() => setCurrentScreen('welcome')} 
          className="mb-6 p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Welcome back
        </h1>
        <p className="text-gray-300 mb-8 text-lg">Sign in to your VAR LIFE account</p>
        
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full bg-gray-800 bg-opacity-50 border border-gray-600 rounded-xl p-4 text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-gray-800 bg-opacity-50 border border-gray-600 rounded-xl p-4 text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors"
          />
        </div>
        
        <button 
          onClick={() => setCurrentScreen('home')}
          className="w-full bg-gradient-to-r from-white to-gray-100 text-black py-4 rounded-xl font-semibold text-lg mt-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Sign In
        </button>
        
        <div className="mt-6 text-center">
          <button className="text-gray-400 hover:text-white transition-colors">
            Forgot your password?
          </button>
        </div>
      </div>
    </div>
  );

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'signup':
        return <SignUpScreen />;
      case 'login':
        return <LoginScreen />;
      case 'verification':
        return <VerificationScreen />;
      case 'home':
        return <HomeScreen />;
      case 'matching':
        return <MatchingScreen />;
      case 'tracking':
        return <TrackingScreen />;
      case 'chat':
        return <ChatScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen overflow-hidden relative">
      {renderScreen()}
      
      {/* Enhanced Bottom Navigation */}
      {currentScreen === 'home' && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-md w-full bg-white border-t border-gray-200 shadow-lg">
          <div className="flex items-center justify-around py-4">
            <button className="flex flex-col items-center space-y-1 group">
              <div className="p-2 rounded-full bg-black">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-black font-semibold">Home</span>
            </button>
            <button className="flex flex-col items-center space-y-1 group hover:bg-gray-50 rounded-lg p-2 transition-colors">
              <Clock className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              <span className="text-xs text-gray-400 group-hover:text-gray-600">Activity</span>
            </button>
            <button className="flex flex-col items-center space-y-1 group hover:bg-gray-50 rounded-lg p-2 transition-colors">
              <CreditCard className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              <span className="text-xs text-gray-400 group-hover:text-gray-600">Payment</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('profile')}
              className="flex flex-col items-center space-y-1 group hover:bg-gray-50 rounded-lg p-2 transition-colors"
            >
              <User className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              <span className="text-xs text-gray-400 group-hover:text-gray-600">Account</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl text-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-800 font-medium">Processing...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VarLifeApp;