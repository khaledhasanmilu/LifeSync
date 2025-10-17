import '@testing-library/jest-dom'
import 'whatwg-fetch'

// Mock fetch globally
global.fetch = jest.fn()

// Mock alert
global.alert = jest.fn()

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks()
  
  // Default fetch mock that handles different endpoints
  fetch.mockImplementation((url, options) => {
    // Signup endpoint
    if (url.includes('/api/users/signup')) {
      return Promise.resolve({
        json: () => Promise.resolve({ message: 'Signup successful!' }),
        ok: true,
        status: 200
      })
    }
    
    // Login endpoint
    if (url.includes('/api/users/login')) {
      return Promise.resolve({
        json: () => Promise.resolve({ message: 'Login successful!' }),
        ok: true,
        status: 200
      })
    }
    
    // User info endpoint
    if (url.includes('/api/usr')) {
      return Promise.resolve({
        json: () => Promise.resolve({ 
          username: 'testuser', 
          userId: 1 
        }),
        ok: true,
        status: 200
      })
    }
    
    // Todo endpoints
    if (url.includes('/todo')) {
      if (options && options.method === 'POST') {
        // Creating a new todo
        return Promise.resolve({
          json: () => Promise.resolve({ 
            success: true,
            task: { 
              id: Date.now(), 
              title: 'New Task', 
              status: 'pending',
              due_date: '2025-12-31',
              priority: 'medium',
              description: ''
            }
          }),
          ok: true,
          status: 200
        })
      } else {
        // Getting todos
        return Promise.resolve({
          json: () => Promise.resolve([
            { 
              id: 1, 
              title: 'Test task', 
              status: 'pending',
              due_date: '2025-12-31',
              priority: 'medium',
              description: ''
            }
          ]),
          ok: true,
          status: 200
        })
      }
    }
    
    // Finance endpoints
    if (url.includes('/budget') || url.includes('/income') || url.includes('/expense')) {
      return Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, amount: 100, category: 'Food', type: 'expense' }
        ]),
        ok: true,
        status: 200
      })
    }
    
    // Default response for other endpoints
    return Promise.resolve({
      json: () => Promise.resolve({ success: true }),
      ok: true,
      status: 200
    })
  })
})
