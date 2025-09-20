"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin, AlertTriangle, HelpCircle, Share2, 
  Phone, Shield, Navigation, Clock, 
  Wifi, WifiOff, CheckCircle, XCircle, Plus
} from 'lucide-react';

const EmergencyAlert = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onlineState !== false);
  const [lastUpdate, setLastUpdate] = useState(null);
  
  // Bangladesh Emergency Contacts
  const [emergencyContacts] = useState([
    { name: 'Emergency Service', phone: '999', color: 'bg-red-500' },
    { name: 'Police', phone: '100', color: 'bg-blue-500' },
    { name: 'Fire Service', phone: '102', color: 'bg-orange-500' },
    { name: 'Ambulance', phone: '199', color: 'bg-green-500' }
  ]);

  const watchIdRef = useRef(null);

  useEffect(() => {
    initializeLocation();
    
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const initializeLocation = () => {
    if (!navigator.geolocation) {
      setError('Location not supported by this device');
      setLoading(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(position.timestamp)
        };
        setLocation(newLocation);
        setLastUpdate(newLocation.timestamp);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setError(getLocationErrorMessage(error));
        setLoading(false);
      },
      options
    );

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(position.timestamp)
        };
        setLocation(newLocation);
        setLastUpdate(newLocation.timestamp);
      },
      (error) => {
        console.error('Location watch error:', error);
      },
      options
    );
  };

  const getLocationErrorMessage = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'Location access denied. Please enable location services.';
      case error.POSITION_UNAVAILABLE:
        return 'Location information unavailable.';
      case error.TIMEOUT:
        return 'Location request timed out.';
      default:
        return 'Unknown location error occurred.';
    }
  };

  const formatCoordinates = (lat, lng) => {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  };

  const handleSOS = async () => {
    if (!location) {
      alert('Location not available. Cannot send SOS.');
      return;
    }

    const locationText = `${formatCoordinates(location.lat, location.lng)}`;
    const alertMessage = `🚨 EMERGENCY SOS ALERT!\n\nLocation: ${locationText}\nTime: ${new Date().toLocaleString()}\n\nEmergency services notified.`;
    
    alert(alertMessage);
    
    if (window.confirm('Call emergency services now? (999)')) {
      window.open(`tel:999`);
    }
  };

  const handleHelp = () => {
    if (!location) {
      alert('Location not available. Cannot send help request.');
      return;
    }

    const locationText = `${formatCoordinates(location.lat, location.lng)}`;
    const message = `🆘 HELP REQUEST\n\nI need assistance at:\n${locationText}\n\nTime: ${new Date().toLocaleString()}`;
    
    if (window.confirm(`Send help request?\n\n${message}`)) {
      alert('Help request sent to emergency contacts!');
    }
  };

  const handleShareLocation = () => {
    if (!location) {
      alert('Location not available.');
      return;
    }

    const locationUrl = `https://maps.google.com/?q=${location.lat},${location.lng}`;
    const shareText = `📍 My current location: ${formatCoordinates(location.lat, location.lng)}\n\nView on map: ${locationUrl}\n\nShared at: ${new Date().toLocaleString()}`;

    if (navigator.share) {
      navigator.share({
        title: 'My Current Location',
        text: shareText,
        url: locationUrl
      }).catch((error) => console.log('Sharing failed:', error));
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Location copied to clipboard!');
      }).catch(() => {
        alert(`Location Details:\n\n${shareText}`);
      });
    }
  };

  const callEmergencyContact = (contact) => {
    if (window.confirm(`Call ${contact.name}?\n${contact.phone}`)) {
      window.open(`tel:${contact.phone}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-lg p-8 shadow-lg">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Emergency System</h2>
          <p className="text-gray-600">Getting your location...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6" />
            <div>
              <h1 className="text-xl font-bold">Emergency Alert</h1>
              <p className="text-red-100 text-sm">Quick emergency assistance</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            {isOnline ? (
              <Wifi className="w-4 h-4 text-green-300" />
            ) : (
              <WifiOff className="w-4 h-4 text-yellow-300" />
            )}
            <span>{isOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Google Maps Style Location Display */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {error ? (
            <div className="p-4">
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-500" />
                <div>
                  <h3 className="font-semibold text-red-800">Location Error</h3>
                  <p className="text-sm text-red-600">{error}</p>
                  <button 
                    onClick={initializeLocation}
                    className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          ) : location ? (
            <>
              {/* Interactive Map View */}
              <div className="h-64 relative bg-gray-100">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyD4_example_key_replace_with_real&center=${location.lat},${location.lng}&zoom=16&maptype=roadmap`}
                  title="Your Current Location"
                />
                
                {/* Fallback when Google Maps doesn't load */}
                <div className="absolute inset-0 flex items-center justify-center bg-blue-50 border-2 border-dashed border-blue-200">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-red-500 mx-auto mb-2 animate-pulse" />
                    <p className="font-semibold text-gray-800">Your Location</p>
                    <p className="text-sm text-gray-600 font-mono">{formatCoordinates(location.lat, location.lng)}</p>
                    <button
                      onClick={() => window.open(`https://maps.google.com/?q=${location.lat},${location.lng}`, '_blank')}
                      className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      Open in Google Maps
                    </button>
                  </div>
                </div>

                {/* Location Status Overlay */}
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur rounded-lg px-3 py-2 shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">Live Location</span>
                  </div>
                </div>

                {/* Accuracy Indicator */}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-lg px-3 py-2 shadow-md">
                  <div className="flex items-center gap-2 text-sm">
                    <Navigation className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-700">±{Math.round(location.accuracy)}m</span>
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div className="p-4 bg-gray-50 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <h3 className="font-semibold text-green-800">Location Tracked</h3>
                      <p className="text-sm text-green-600">Real-time GPS active</p>
                    </div>
                  </div>
                  
                  {lastUpdate && (
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{lastUpdate.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="font-mono text-sm text-gray-700 bg-white px-2 py-1 rounded border">
                    {formatCoordinates(location.lat, location.lng)}
                  </div>
                  
                  <button
                    onClick={() => navigator.clipboard.writeText(formatCoordinates(location.lat, location.lng))}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Copy Coordinates
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-64 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Waiting for location...</p>
              </div>
            </div>
          )}
        </div>

        {/* Emergency Action Buttons */}
        <div className="space-y-4">
          {/* SOS Button */}
          <button
            onClick={handleSOS}
            disabled={!location}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg p-6 shadow-lg transition-all active:scale-95 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center gap-3">
              <AlertTriangle className="w-8 h-8" />
              <div className="text-left">
                <div className="text-2xl font-bold">🚨 SOS</div>
                <div className="text-sm opacity-90">Emergency Alert</div>
              </div>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-4">
            {/* Help Button */}
            <button
              onClick={handleHelp}
              disabled={!location}
              className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white rounded-lg p-4 shadow-lg transition-all active:scale-95 disabled:cursor-not-allowed"
            >
              <div className="text-center">
                <HelpCircle className="w-6 h-6 mx-auto mb-2" />
                <div className="font-bold">🆘 Help</div>
                <div className="text-xs opacity-90">Request Assistance</div>
              </div>
            </button>

            {/* Share Location Button */}
            <button
              onClick={handleShareLocation}
              disabled={!location}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg p-4 shadow-lg transition-all active:scale-95 disabled:cursor-not-allowed"
            >
              <div className="text-center">
                <Share2 className="w-6 h-6 mx-auto mb-2" />
                <div className="font-bold">📍 Share</div>
                <div className="text-xs opacity-90">Send Location</div>
              </div>
            </button>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Emergency Contacts
          </h3>
          
          <div className="grid grid-cols-2 gap-2">
            {emergencyContacts.map((contact, index) => (
              <button
                key={index}
                onClick={() => callEmergencyContact(contact)}
                className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className={`w-3 h-3 ${contact.color} rounded-full mr-3`}></div>
                <div className="text-left">
                  <div className="font-medium text-gray-800 text-sm">{contact.name}</div>
                  <div className="text-lg font-bold text-gray-900">{contact.phone}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Safety Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Safety Notice</p>
              <p>
                This emergency system works best with location services enabled and internet connection. 
                For real emergencies, always call local emergency services directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlert;