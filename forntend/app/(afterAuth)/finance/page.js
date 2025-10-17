"use client";

import { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Plus, 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Utensils, 
  Car, 
  Home, 
  ShoppingBag, 
  Heart, 
  Coffee,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Zap,
  Send,
  X,
  Calendar,
  PiggyBank,
  CreditCard,
  ArrowLeft,
  BarChart3
} from 'lucide-react';

const FinanceTracker = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const [transactions, setTransactions] = useState([
    { id: 1, type: 'income', amount: 5000, category: 'Salary', description: 'Monthly Salary', date: '2025-08-01' },
    { id: 2, type: 'expense', amount: 800, category: 'Food', description: 'Groceries', date: '2025-08-03' },
    { id: 3, type: 'expense', amount: 300, category: 'Transport', description: 'Gas', date: '2025-08-05' },
    { id: 4, type: 'expense', amount: 1200, category: 'Bills', description: 'Rent', date: '2025-08-01' }
  ]);

  const [budgets, setBudgets] = useState([
  // Example budgets
  { category: 'Food', limit: 1000, spent: 800 },
  { category: 'Transport', limit: 500, spent: 300 },
  { category: 'Bills', limit: 1500, spent: 1200 },
  { category: 'Shopping', limit: 400, spent: 0 },
  { category: 'Healthcare', limit: 300, spent: 0 },
  { category: 'Entertainment', limit: 200, spent: 0 }
]);

const fetchUserID = async () => {
  const res = await fetch("/api/usr");
  const data = await res.json();
  return data.userId; // return it for immediate use
};

useEffect(() => {
  
   async function fetchBudgets() {
     const userID = await fetchUserID();
    try {
      const res = await fetch(`http://localhost:3001/api/budget/${userID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.ok) {
        const data = await res.json();
        console.log('Raw API data:', data);
        // CRITICAL: Convert string numbers to actual numbers
        const normalized = data.map(b => ({
          id: b.id,
          category: b.category,
          limit: parseFloat(b.limit),
          spent: parseFloat(b.spent)
        }));
        console.log('Normalized budgets:', normalized);
        setBudgets(normalized);
      }
    } catch (err) {
      console.error('Error fetching budgets:', err);
    }
  }
  fetchBudgets();
}, []);

  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddStep, setQuickAddStep] = useState(1);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [newTransaction, setNewTransaction] = useState({
    type: 'expense',
    amount: '',
    category: 'Food',
    description: ''
  });
  const [budgetForm, setBudgetForm] = useState({
    category: 'Food',
    limit: ''
  });

  const categoryIcons = {
    'Food': Utensils,
    'Transport': Car,
    'Bills': Home,
    'Shopping': ShoppingBag,
    'Healthcare': Heart,
    'Entertainment': Coffee
  };

  // Calculate totals
  const [totals, setTotals] = useState({ totalIncome: 0, totalExpense: 0, current: 0 });

  useEffect(() => {
    async function fetchTotals() {
      const userID = await fetchUserID();
      try {
        const res = await fetch(`http://localhost:3001/api/income-expense/${userID}`);
        if (res.ok) {
          const data = await res.json();
          setTotals({
            totalIncome: parseFloat(data.total_income) || 0,
            totalExpense: parseFloat(data.total_expense) || 0,
            current: parseFloat(data.saving) || 0
          });
        }
      } catch (err) {
        console.error('Error fetching totals:', err);
      }
    }
    fetchTotals();
  }, []);

  const totalIncome = totals.totalIncome;
  const totalExpenses = totals.totalExpense;
  const totalSavings = totals.current;

  // Update budget spent amounts when transactions change
  useEffect(() => {
    const updatedBudgets = budgets.map(budget => {
      const categoryExpenses = transactions
        .filter(t => t.type === 'expense' && t.category === budget.category)
        .reduce((sum, t) => sum + t.amount, 0);
      return { ...budget, spent: categoryExpenses };
    });
    setBudgets(updatedBudgets);
  }, [transactions]);

  const handleQuickAdd = async () => {
    if (!newTransaction.amount || !newTransaction.description) return;

    const transaction = {
      id: Date.now(),
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
      date: new Date().toISOString().split('T')[0]
    };

    // Add to local state immediately
    setTransactions([...transactions, transaction]);
    setNewTransaction({ type: 'expense', amount: '', category: 'Food', description: '' });
    setShowQuickAdd(false);
    setQuickAddStep(1);

    // Send to API
    try {
      const userID = await fetchUserID();
      await fetch("http://localhost:3001/api/income-expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: userID,
          type: transaction.type,
          amount: transaction.amount,
          category: transaction.category,

        })
      });
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  const handleBudgetSave = async () => {
    if (!budgetForm.category || !budgetForm.limit) return;
    const userID = await fetchUserID();

    try {
      if (editingBudget !== null) {
        // Edit existing budget
        await fetch(`http://localhost:3001/api/budget/${editingBudget}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: userID,
            area: budgetForm.category,
            amount: parseFloat(budgetForm.limit)
          })
        });
      } else {
        // Add new budget
        await fetch("http://localhost:3001/api/budget", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: userID,
            area: budgetForm.category,
            amount: parseFloat(budgetForm.limit)
          })
        });
      }

      // Always fetch latest budgets after save
      const res = await fetch(`http://localhost:3001/api/budget/${userID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.ok) {
        const data = await res.json();
        const normalized = data.map(b => ({
          id: b.id,
          category: b.category,
          limit: parseFloat(b.limit),
          spent: parseFloat(b.spent)
        }));
        setBudgets(normalized);
      }
    } catch (err) {
      console.error('Error saving budget:', err);
    }

    setBudgetForm({ category: 'Food', limit: '' });
    setShowBudgetForm(false);
    setEditingBudget(null);
  };

  const handleEditBudget = (index) => {
    const budget = budgets[index];
    setBudgetForm({
      category: budget.category,
      limit: budget.limit.toString()
    });
    setEditingBudget(budget.id);
    setShowBudgetForm(true);
  };

  const handleDeleteBudget = async (index) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      const budget = budgets[index];
      const userID = await fetchUserID();
      try {
        await fetch(`http://localhost:3001/api/budget/${budget.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        // Refresh budgets after delete
        const res = await fetch(`http://localhost:3001/api/budget/${userID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (res.ok) {
          const data = await res.json();
          const normalized = data.map(b => ({
            id: b.id,
            category: b.category,
            limit: parseFloat(b.limit),
            spent: parseFloat(b.spent)
          }));
          setBudgets(normalized);
        }
      } catch (err) {
        console.error('Error deleting budget:', err);
      }
    }
  };

  const nextStep = () => {
    if (quickAddStep < 4) setQuickAddStep(quickAddStep + 1);
  };

  const prevStep = () => {
    if (quickAddStep > 1) setQuickAddStep(quickAddStep - 1);
  };

  const getSpendingInsights = () => {
    const insights = [];
    
    budgets.forEach(budget => {
      const percentUsed = (budget.spent / budget.limit) * 100;
      
      if (percentUsed > 90) {
        insights.push({
          type: 'danger',
          message: `${budget.category} budget exceeded! Time to cut back.`,
          category: budget.category
        });
      } else if (percentUsed > 70) {
        insights.push({
          type: 'warning',
          message: `${budget.category} at ${Math.round(percentUsed)}% - watch your spending!`,
          category: budget.category
        });
      } else if (percentUsed < 30) {
        insights.push({
          type: 'success',
          message: `Excellent! You're crushing your ${budget.category} budget!`,
          category: budget.category
        });
      }
    });

    return insights.slice(0, 3);
  };

  const insights = getSpendingInsights();

  return (
    <div className="flex-1 flex flex-col overflow-auto p-6 bg-gray-50">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {currentView !== 'dashboard' && (
            <button
              onClick={() => setCurrentView('dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
         
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex bg-white rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                currentView === 'dashboard'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Dashboard
            </button>
            <button
              onClick={() => setCurrentView('budgets')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                currentView === 'budgets'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Target className="w-4 h-4 inline mr-2" />
              Budgets
            </button>
          </div>
        </div>
      </div>

      {/* Floating Quick Add Button */}
      {!showQuickAdd && (
        <button
          onClick={() => setShowQuickAdd(true)}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 group"
        >
          <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      )}

      {/* Quick Add Modal */}
      {showQuickAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => {
                setShowQuickAdd(false);
                setQuickAddStep(1);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center p-3 bg-purple-600 rounded-2xl mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Quick Add</h2>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      step <= quickAddStep
                        ? 'bg-purple-600'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {quickAddStep === 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Transaction Type</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setNewTransaction({...newTransaction, type: 'income'});
                        nextStep();
                      }}
                      className="p-6 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-all duration-300 group"
                    >
                      <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-green-700 font-medium">Income</p>
                    </button>
                    <button
                      onClick={() => {
                        setNewTransaction({...newTransaction, type: 'expense'});
                        nextStep();
                      }}
                      className="p-6 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-all duration-300 group"
                    >
                      <TrendingDown className="h-8 w-8 text-red-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-red-700 font-medium">Expense</p>
                    </button>
                  </div>
                </div>
              )}

              {quickAddStep === 2 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Choose Category</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(categoryIcons).map(([category, Icon]) => (
                      <button
                        key={category}
                        onClick={() => {
                          setNewTransaction({...newTransaction, category});
                          nextStep();
                        }}
                        className={`p-4 border rounded-xl hover:bg-gray-50 transition-all duration-300 group ${
                          newTransaction.category === category ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                        }`}
                      >
                        <Icon className="h-6 w-6 text-gray-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-gray-700 text-sm font-medium">{category}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {quickAddStep === 3 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Enter Amount</h3>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                    <input
                      type="number"
                      placeholder="0.00"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                      className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-xl font-semibold text-center"
                      autoFocus
                    />
                  </div>
                  <button
                    onClick={nextStep}
                    disabled={!newTransaction.amount}
                    className="w-full mt-6 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-all duration-300"
                  >
                    Continue
                  </button>
                </div>
              )}

              {quickAddStep === 4 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Add Description</h3>
                  <input
                    type="text"
                    placeholder="What was this for?"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-xl px-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 mb-6"
                    autoFocus
                  />
                  <button
                    onClick={handleQuickAdd}
                    disabled={!newTransaction.description}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center group"
                  >
                    <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    Add Transaction
                  </button>
                </div>
              )}

              {quickAddStep > 1 && (
                <button
                  onClick={prevStep}
                  className="absolute bottom-4 left-4 text-gray-500 hover:text-gray-700 transition-colors text-sm"
                >
                  ← Back
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Budget Form Modal */}
      {showBudgetForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => {
                setShowBudgetForm(false);
                setBudgetForm({ category: 'Food', limit: '' });
                setEditingBudget(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center p-3 bg-purple-600 rounded-2xl mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {editingBudget !== null ? 'Edit Budget' : 'Create Budget'}
              </h2>
            </div>

            <div className="space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(categoryIcons).map(([category, Icon]) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setBudgetForm(prev => ({...prev, category}))}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        budgetForm.category === category
                          ? 'bg-purple-100 text-purple-700 border-2 border-purple-200 shadow-sm'
                          : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Limit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Limit *</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    placeholder="0.00"
                    value={budgetForm.limit}
                    onChange={(e) => setBudgetForm(prev => ({...prev, limit: e.target.value}))}
                    className="w-full border border-gray-300 rounded-lg pl-11 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg font-medium"
                    required
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setShowBudgetForm(false);
                    setBudgetForm({ category: 'Food', limit: '' });
                    setEditingBudget(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBudgetSave}
                  disabled={!budgetForm.limit}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {editingBudget !== null ? 'Update Budget' : 'Create Budget'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard View */}
      {currentView === 'dashboard' && (
        <div className="space-y-6">
      

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Total Income</p>
                  <p className="text-2xl font-bold text-green-800">৳{totalIncome.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 text-sm font-medium">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-800">৳{totalExpenses.toLocaleString()}</p>
                </div>
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${totalSavings >= 0 ? 'text-purple-600' : 'text-orange-600'} text-sm font-medium`}>Net Savings</p>
                  <p className="text-2xl font-bold text-gray-800">৳{totalSavings.toLocaleString()}</p>
                </div>
                <Target className={`w-8 h-8 ${totalSavings >= 0 ? 'text-purple-600' : 'text-orange-600'}`} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Budget Overview */}
            <div className="xl:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    Budget Overview
                  </h3>
                  <button
                    onClick={() => setCurrentView('budgets')}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {budgets.slice(0, 4).map((budget, index) => {
                    const Icon = categoryIcons[budget.category];
                    const percentUsed = (budget.spent / budget.limit) * 100;
                    
                    return (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="bg-white p-2 rounded-lg mr-3 shadow-sm">
                              <Icon className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <span className="text-gray-800 font-medium">{budget.category}</span>
                              <p className="text-gray-500 text-sm">৳{budget.spent} of ৳{budget.limit}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            percentUsed > 90 ? 'bg-red-100 text-red-700' :
                            percentUsed > 70 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {Math.round(percentUsed)}%
                          </span>
                        </div>
                        
                        <div className="relative">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                percentUsed > 90 ? 'bg-red-500' :
                                percentUsed > 70 ? 'bg-yellow-500' :
                                'bg-green-500'
                              }`}
                              style={{ width: `${Math.min(percentUsed, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Insights & Activity */}
            <div className="space-y-6">
              {/* Smart Insights */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                    <Lightbulb className="h-5 h-5 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Insights</h3>
                </div>
                
                <div className="space-y-3">
                  {insights.length > 0 ? insights.map((insight, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        insight.type === 'danger' ? 'bg-red-50 border border-red-200' :
                        insight.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                        'bg-green-50 border border-green-200'
                      }`}
                    >
                      <p className="text-gray-700 text-sm">{insight.message}</p>
                    </div>
                  )) : (
                    <div className="text-center py-4">
                      <Lightbulb className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-500 text-sm">Keep tracking for insights!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                </div>
                
                <div className="space-y-3">
                  {transactions.slice(-4).reverse().map((transaction) => {
                    const Icon = categoryIcons[transaction.category] || DollarSign;
                    
                    return (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          <div className="bg-white p-2 rounded-lg mr-3 shadow-sm"> 
                            {<Icon className="h-4 w-4 text-gray-600" /> }
                          </div>
                          <div>
                            <p className="text-gray-800 font-medium text-sm">{transaction.description}</p>
                            <p className="text-gray-500 text-xs">{transaction.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.type === 'income' ? '+' : '-'}৳{transaction.amount}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Budget View */}
      {currentView === 'budgets' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Budget Management</h2>
              <p className="text-gray-600">Monitor and control your spending</p>
            </div>
            <button
              onClick={() => setShowBudgetForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105 font-medium shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add Budget
            </button>
          </div>

          {budgets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {budgets.map((budget, index) => {
                const Icon = categoryIcons[budget.category];
                const percentUsed = (budget.spent / budget.limit) * 100;
                const remaining = budget.limit - budget.spent;
                
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative group">
                    {/* Edit/Delete buttons */}
                    <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditBudget(index)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteBudget(index)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mb-4 pr-16">
                      <div className="flex items-center">
                        <div className="bg-gray-100 p-3 rounded-xl mr-3">
                          <Icon className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{budget.category}</h3>
                          <p className="text-gray-500 text-sm">${budget.spent} of ${budget.limit}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          percentUsed > 90 ? 'bg-red-100 text-red-700' :
                          percentUsed > 70 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {Math.round(percentUsed)}%
                        </span>
                        <span className="text-sm text-gray-600">
                          ${remaining >= 0 ? remaining : 0} left
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-500 ${
                            percentUsed > 100 ? 'bg-red-500' :
                            percentUsed > 90 ? 'bg-red-500' :
                            percentUsed > 70 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(percentUsed, 100)}%` }}
                        />
                      </div>
                      {percentUsed > 100 && (
                        <p className="text-red-600 text-sm mt-1 font-medium">
                          Over budget by ${(budget.spent - budget.limit).toLocaleString()}
                        </p>
                      )}
                    </div>

                    <div className="text-center">
                      <p className={`text-2xl font-bold ${
                        percentUsed > 90 ? 'text-red-600' :
                        percentUsed > 70 ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        ${Math.abs(remaining).toLocaleString()}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {remaining >= 0 ? 'Remaining' : 'Over budget'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No budgets yet</h3>
              <p className="text-gray-500 mb-6">Create your first budget to start tracking your spending!</p>
              <button
                onClick={() => setShowBudgetForm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors mx-auto"
              >
                <Plus className="w-5 h-5" />
                Create First Budget
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FinanceTracker;