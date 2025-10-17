"use client";
import React, { useState } from 'react';
import {
  Plus, Trash2, Check, X, Package, MapPin, Calendar, 
  Wallet, Edit3, ArrowLeft, Plane, DollarSign, Search
} from 'lucide-react';

const TravelTracker = () => {
  // Removed unused currentView state
  const [idCounter, setIdCounter] = useState(2); // Start from 2 since we have sample data with id 1
  const [trips, setTrips] = useState([]);
  const fetchUserID = async () => {
  const res = await fetch("/api/usr");
  const data = await res.json();
  return data.userId; // return it for immediate use
  };

  React.useEffect(() => {
    async function fetchData() {
      const userId = await fetchUserID();
      console.log("User ID:", userId);
    
      async function loadTrips(userId) {
        const res = await fetch(`http://localhost:3001/api/travel-plans/${userId}`);
        const data = await res.json();
        const mappedTrips = data.map(trip => ({
          id: trip.id,
          name: trip.destination,
          destination: trip.destination,
          startDate: trip.start_date ? trip.start_date.split('T')[0] : '',
          endDate: trip.end_date ? trip.end_date.split('T')[0] : '',
          budget: parseFloat(trip.budget) || 0,
          notes: trip.description || '',
          packingList: trip.packingList ? trip.packingList.map((item) => ({ id: item.id, name: item.name, packed: item.packed })) : [],
          expenses: trip.expenses ? trip.expenses.map((exp) => ({ id: exp.id, name: exp.name, amount: parseFloat(exp.amount), date: exp.date })) : []
        }));
        setTrips(mappedTrips);
      }
      await loadTrips(userId);
    }
    fetchData();
  }, []);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showTripForm, setShowTripForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [newTrip, setNewTrip] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    notes: ''
  });
  const [newPackingItem, setNewPackingItem] = useState();
  const [newExpense, setNewExpense] = useState({id: 0, name: '', amount: '' });
  const [searchQuery, setSearchQuery] = useState('');

 

  const formatCurrency = (amount) => `${amount.toLocaleString()}`;
  const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const handleSaveTrip = async () => {
    console.log("Saving trip:", trips);
    const userId = await fetchUserID();
    if (!newTrip.name || !newTrip.destination) return;

    if (editingTrip) {
      const updatedTrip = { 
      ...editingTrip, 
      ...newTrip, 
      budget: parseFloat(newTrip.budget) || 0 
      };
      // Update trip in backend
      const updatedTripData = {
      user_id: userId,
      destination: updatedTrip.destination,
      start_date: updatedTrip.startDate,
      end_date: updatedTrip.endDate,
      budget: updatedTrip.budget,
      description: updatedTrip.notes,
      status: null
      };

      await fetch(`http://localhost:3001/api/travel-plans/${editingTrip.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTripData)
      });
      setTrips(trips.map(t => t.id === editingTrip.id ? updatedTrip : t));
      if (selectedTrip?.id === editingTrip.id) {
      setSelectedTrip(updatedTrip);
      }
    } else {
      // Create trip in backend
      const newTripData = {
        user_id: userId,
        name: newTrip.name,
        destination: newTrip.destination,
        start_date: newTrip.startDate,
        end_date: newTrip.endDate,
        budget: parseFloat(newTrip.budget) || 0,
        description: newTrip.notes,
        status: null
      };
      const res = await fetch(`http://localhost:3001/api/travel-plans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTripData)
      });
      const createdTrip = await res.json();
      const trip = {
        id: createdTrip.travelPlanId, // Use backend-generated id
        name: newTrip.name,
        destination: newTrip.destination,
        startDate: newTrip.startDate,
        endDate: newTrip.endDate,
        budget: parseFloat(newTrip.budget) || 0,
        notes: newTrip.notes,
        packingList: [],
        expenses: []
      };
      setTrips([...trips, trip]);
    }

    setNewTrip({ name: '', destination: '', startDate: '', endDate: '', budget: '', notes: '' ,expenses: [], packingList: []});
    setShowTripForm(false);
    setEditingTrip(null);
  };

  const handleEditTrip = (trip) => {
    setNewTrip({
      name: trip.name,
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
      budget: trip.budget.toString(),
      notes: trip.notes
    });
    setEditingTrip(trip);
    setShowTripForm(true);
  };

  const handleDeleteTrip = (tripId) => {
    if (window.confirm('Delete this trip?')) {
      // Call backend API to delete the trip
      fetch(`http://localhost:3001/api/travel-plans/${tripId}`, {
      method: 'DELETE',
      }).then(() => {
      setTrips(trips.filter(t => t.id !== tripId));
      if (selectedTrip?.id === tripId) {
        setSelectedTrip(null);
      }
      });
    }
  };

  const addPackingItem = async () => {
    if (!newPackingItem.trim()) return;
    // Send new packing item to backend
    const packingItemData = {
      name: newPackingItem.trim(),
      packed: false
    };
    const res = await fetch(`http://localhost:3001/api/travel-plans/${selectedTrip.id}/item`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(packingItemData)
    });
    const createdItem = await res.json();
    // Use backend-generated id
    const updatedTrip = {
      ...selectedTrip,
      packingList: [
        ...selectedTrip.packingList,
        { id: createdItem.itemId, name: newPackingItem.trim(), packed: false }
      ]
    };
    setSelectedTrip(updatedTrip);
    setTrips(trips.map(t => t.id === selectedTrip.id ? updatedTrip : t));
    setNewPackingItem('');
  };

  const togglePacked = async (itemID) => {

    console.log("Selected Trip:", selectedTrip);
    console.log("Packing List:", selectedTrip.packingList);
    console.log("Item ID to toggle:", itemID);

    // Find the item to toggle
    if (!itemID) return;
    console.log("Toggling item ID:", itemID);
    const item = selectedTrip.packingList.find(i => i.id === itemID);
    if (!item) return;
    console.log("Current item:", item);
    // Call backend API to update packed status
    await fetch(`http://localhost:3001/api/travel-plans/item/${itemID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: !item.status })
    });

    // Update local state
    const updatedTrip = {
      ...selectedTrip,
      packingList: selectedTrip.packingList.map(item =>
        item.id === itemID ? { ...item, packed: !item.status } : item
      )
    };
    setSelectedTrip(updatedTrip);
    setTrips(trips.map(t => t.id === selectedTrip.id ? updatedTrip : t));
  };

  const removePackingItem = async (itemId) => {
    // Call backend API to delete the packing item
    await fetch(`http://localhost:3001/api/travel-plans/item/${itemId}`, {
      method: 'DELETE',
    });
    const updatedTrip = {
      ...selectedTrip,
      packingList: selectedTrip.packingList.filter(item => item.id !== itemId)
    };
    setSelectedTrip(updatedTrip);
    setTrips(trips.map(t => t.id === selectedTrip.id ? updatedTrip : t));
  };

  const addExpense = async () => {
    if (!newExpense.name.trim() || !newExpense.amount) return;
    const parsedAmount = parseFloat(newExpense.amount);
    if (isNaN(parsedAmount) || parsedAmount < 0) return; // Prevent invalid amounts

    const expenseData = {
      name: newExpense.name.trim(),
      amount: parsedAmount,
      date: new Date().toISOString()
    };
    // Send expense to backend and get the created expense with its unique id
    const res = await fetch(`http://localhost:3001/api/travel-plans/${selectedTrip.id}/expense`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseData)
    });
    const createdExpense = await res.json();
    console.log("Created Expense:", createdExpense);
    const expenseDate = createdExpense.date && !isNaN(Date.parse(createdExpense.date))
      ? createdExpense.date
      : new Date().toISOString();
    // Use id from backend

    // Update selectedTrip and trips with the latest expense name from input (not backend response)
    const updatedTrip = {
      ...selectedTrip,
      expenses: [
        ...selectedTrip.expenses,
        { 
          id: createdExpense.expenseId, // Use backend-generated id
          name: newExpense.name.trim(), // Use latest input value
          amount: typeof createdExpense.amount === 'number' ? createdExpense.amount : parsedAmount,
          date: expenseDate
        }
      ]
    };
    setSelectedTrip(updatedTrip);
    setTrips(trips.map(t => t.id === selectedTrip.id ? updatedTrip : t));
    setNewExpense({ id: 0, name: '', amount: '' });
  };

  const removeExpense = async (expenseId) => {
    console.log("Selected Trip:", selectedTrip);
    console.log("Removing expense with ID:", expenseId);
    // Call backend API to delete the expense
    await fetch(`http://localhost:3001/api/travel-plans/${expenseId}/expense`, {
      method: 'DELETE',
    });
    const updatedTrip = {
      ...selectedTrip,
      expenses: selectedTrip.expenses.filter(exp => exp.id !== expenseId)
    };
    setSelectedTrip(updatedTrip);
    setTrips(trips.map(t => t.id === selectedTrip.id ? updatedTrip : t));
   
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto p-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {selectedTrip && (
            <button
              onClick={() => setSelectedTrip(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <div>
            <p className="text-gray-600">
              {selectedTrip ? `Managing ${selectedTrip.name}` : 'Plan your trips with packing & budget'}
            </p>
          </div>
        </div>

        {!selectedTrip && (
          <button
            onClick={() => setShowTripForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            New Trip
          </button>
        )}
      </div>

      {/* Trip Form Modal */}
      {showTripForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {editingTrip ? 'Edit Trip' : 'New Trip'}
              </h2>
              <button onClick={() => {
                setShowTripForm(false);
                setEditingTrip(null);
                setNewTrip({ name: '', destination: '', startDate: '', endDate: '', budget: '', notes: '' });
              }} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trip Name *</label>
                <input
                  type="text"
                  value={newTrip.name}
                  onChange={(e) => setNewTrip(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  placeholder="Summer Vacation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination *</label>
                <input
                  type="text"
                  value={newTrip.destination}
                  onChange={(e) => setNewTrip(prev => ({ ...prev, destination: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  placeholder="Paris, France"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={newTrip.startDate}
                    onChange={(e) => setNewTrip(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={newTrip.endDate}
                    onChange={(e) => setNewTrip(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget ($)</label>
                <input
                  type="number"
                  value={newTrip.budget}
                  onChange={(e) => setNewTrip(prev => ({ ...prev, budget: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  placeholder="2000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trip Plan & Notes</label>
                <textarea
                  value={newTrip.notes}
                  onChange={(e) => setNewTrip(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  rows={3}
                  placeholder="Day 1: Beach&#10;Day 2: Museum"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowTripForm(false);
                    setEditingTrip(null);
                    setNewTrip({ name: '', destination: '', startDate: '', endDate: '', budget: '', notes: '' });
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTrip}
                  disabled={!newTrip.name.trim() || !newTrip.destination.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingTrip ? 'Update' : 'Create'} Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!selectedTrip ? (
        <div>
          {/* Search Bar */}
          {trips.length > 0 && (
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search trips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
          )}

          {trips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.filter(trip => 
                trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                trip.destination.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((trip) => {
                const packedItems = trip.packingList.filter(item => item.packed).length;
                const totalSpent = trip.expenses.reduce((sum, expense) => sum + expense.amount, 0);
                const budgetUsed = trip.budget > 0 ? (totalSpent / trip.budget) * 100 : 0;

                return (
                  <div 
                    key={trip.id}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                    onClick={() => setSelectedTrip(trip)}
                  >
                    {/* Background gradient accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-bl-full opacity-50"></div>
                    
                    <div className="relative">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg mb-1">{trip.name}</h3>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            <span className="text-sm">{trip.destination}</span>
                          </div>
                        </div>

                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditTrip(trip);
                            }}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTrip(trip.id);
                            }}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {trip.startDate && trip.endDate && (
                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                        </div>
                      )}

                      {/* Progress indicators */}
                      {(trip.packingList.length > 0 || (trip.budget > 0 && trip.expenses.length > 0)) && (
                        <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                          {trip.packingList.length > 0 && (
                            <div className="flex items-center gap-2 flex-1">
                              <Package className="w-4 h-4 text-blue-500" />
                              <div className="flex-1">
                                <div className="flex justify-between text-xs text-gray-600 mb-1">
                                  <span>Packed</span>
                                  <span>{packedItems}/{trip.packingList.length}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div
                                    className="bg-blue-500 h-1.5 rounded-full transition-all"
                                    style={{ width: `${(packedItems / trip.packingList.length) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          )}

                          {trip.budget > 0 && trip.expenses.length > 0 && (
                            <div className="flex items-center gap-2 flex-1">
                              <Wallet className="w-4 h-4 text-green-500" />
                              <div className="flex-1">
                                <div className="flex justify-between text-xs text-gray-600 mb-1">
                                  <span>Budget</span>
                                  <span>{Math.round(budgetUsed)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div
                                    className={`h-1.5 rounded-full transition-all ${
                                      budgetUsed > 100 ? 'bg-red-500' : budgetUsed > 80 ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}
                                    style={{ width: `${Math.min(budgetUsed, 100)}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No trips yet</h3>
              <p className="text-gray-500 mb-6">Create your first trip to get started</p>
              <button
                onClick={() => setShowTripForm(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create First Trip
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Trip Header */}
          <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedTrip.name}</h3>
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedTrip.destination}</span>
                  </div>
                  {selectedTrip.startDate && selectedTrip.endDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(selectedTrip.startDate)} - {formatDate(selectedTrip.endDate)}</span>
                    </div>
                  )}
                </div>
                {selectedTrip.notes && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Trip Plan</h4>
                    <p className="text-gray-600 whitespace-pre-wrap text-sm">{selectedTrip.notes}</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => handleEditTrip(selectedTrip)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </button>
            </div>
          </div>

          {/* Trip Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Packing Checklist */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  Packing Checklist
                </h3>
                <span className="text-sm text-gray-600">
                  {selectedTrip.packingList.filter(item => item.packed).length} of {selectedTrip.packingList.length} packed
                </span>
              </div>

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newPackingItem}
                  onChange={(e) => setNewPackingItem(e.target.value)}
                  placeholder="Add item..."
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  onKeyDown={(e) => e.key === 'Enter' && addPackingItem()}
                />
                <button
                  onClick={addPackingItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {selectedTrip.packingList.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 group">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => togglePacked(item.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          item.packed ? 'bg-green-600 border-green-600 text-white' : 'border-gray-300 hover:border-green-400'
                        }`}
                      >
                        {item.packed && <Check className="w-3 h-3" />}
                      </button>
                      <span className={`${item.packed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                        {item.name}
                      </span>
                      {item.packed && <span className="text-green-600 text-sm">✅</span>}
                    </div>
                    
                    <button
                      onClick={() => removePackingItem(item.id)}
                      className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {selectedTrip.packingList.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p>No items yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Budget Manager */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">Budget Manager</h3>
              </div>

              {/* Budget Overview */}
              {selectedTrip.budget > 0 && (
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-blue-600 text-xs font-medium">Budget</p>
                    <p className="text-lg font-bold text-blue-800">{formatCurrency(selectedTrip.budget)}</p>
                  </div>
                  
                  <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-red-600 text-xs font-medium">Spent</p>
                    <p className="text-lg font-bold text-red-800">
                      {formatCurrency(selectedTrip.expenses.reduce((sum, expense) => sum + expense.amount, 0))}
                    </p>
                  </div>
                  
                  <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-green-600 text-xs font-medium">Left</p>
                    <p className="text-lg font-bold text-green-800">
                      {formatCurrency(Math.max(0, selectedTrip.budget - selectedTrip.expenses.reduce((sum, expense) => sum + expense.amount, 0)))}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newExpense.name}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Expense name..."
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-500"
                />
                <input
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="$"
                  className="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-500"
                />
                <button
                  onClick={addExpense}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {selectedTrip.expenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 group">
                    <div>
                      <p className="font-medium text-gray-800">{expense.name}</p>
                      <p className="text-xs text-gray-600">{formatDate(expense.date)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-800">{formatCurrency(expense.amount)}</span>
                      <button
                        onClick={() => removeExpense(expense.id)}
                        className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {selectedTrip.expenses.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p>No expenses yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelTracker;