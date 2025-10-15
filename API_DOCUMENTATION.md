# LifeSync API Documentation

## User Routes

Base Path: `/api/users`

### GET /

- **Description:** Get all users.
- **Method:** `GET`
- **Path:** `/`
- **Response Body:**
  ```json
  [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
  ]
  ```

### POST /signup

- **Description:** Create a new user.
- **Method:** `POST`
- **Path:** `/signup`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response Body:**
  ```json
  {
    "message": "User registered successfully",
    "userId": 1
  }
  ```

### POST /login

- **Description:** Log in a user.
- **Method:** `POST`
- **Path:** `/login`
- **Request Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response Body:**
  ```json
  {
    "message": "Login successful",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
  }
  ```

## Todo Routes

Base Path: `/api/todos`

### GET /

- **Description:** Get all todos for a user.
- **Method:** `GET`
- **Path:** `/:userId`
- **Response Body:**
  ```json
  [
    {
      "id": 1,
      "user_id": 1,
      "title": "Buy milk",
      "description": "Buy milk from the store",
      "due_date": "2025-10-16T10:00:00.000Z",
      "completed": false
    }
  ]
  ```

### POST /

- **Description:** Create a new todo.
- **Method:** `POST`
- **Path:** `/`
- **Request Body:**
  ```json
  {
    "user_id": 1,
    "title": "Buy milk",
    "description": "Buy milk from the store",
    "due_date": "2025-10-16"
  }
  ```
- **Response Body:**
  ```json
  {
    "message": "Todo created successfully",
    "todoId": 1
  }
  ```

### PUT /:id

- **Description:** Update a todo.
- **Method:** `PUT`
- **Path:** `/:id`
- **Request Body:**
  ```json
  {
    "title": "Buy milk and eggs",
    "description": "Buy milk and eggs from the store",
    "due_date": "2025-10-16",
    "completed": false
  }
  ```
- **Response Body:**
  ```json
  {
    "message": "Todo updated successfully"
  }
  ```

### DELETE /:id

- **Description:** Delete a todo.
- **Method:** `DELETE`
- **Path:** `/:id`
- **Response Body:**
  ```json
  {
    "message": "Todo deleted successfully"
  }
  ```

## Income/Expense Routes

Base Path: `/api/income-expense`

### POST /

- **Description:** Add a new income/expense entry.
- **Method:** `POST`
- **Path:** `/`
- **Request Body:**
  ```json
  {
    "user_id": 1,
    "type": "expense",
    "amount": 50,
    "category": "Groceries"
  }
  ```
- **Response Body:**
  ```json
  {
    "message": "Entry created successfully",
    "entryId": 1
  }
  ```

### GET /:userId

- **Description:** Get income/expense summary for a user.
- **Method:** `GET`
- **Path:** `/:userId`
- **Response Body:**
  ```json
  {
    "total_income": 1000,
    "total_expense": 500,
    "saving": 500
  }
  ```

## Budget Routes

Base Path: `/api/budgets`

### GET /:userId

- **Description:** Get budgets for a user.
- **Method:** `GET`
- **Path:** `/:userId`
- **Response Body:**
  ```json
  [
    {
      "id": 1,
      "category": "Groceries",
      "limit": 500,
      "spent": 200
    }
  ]
  ```

### POST /

- **Description:** Create a new budget.
- **Method:** `POST`
- **Path:** `/`
- **Request Body:**
  ```json
  {
    "user_id": 1,
    "amount": 500,
    "area": "Groceries"
  }
  ```
- **Response Body:**
  ```json
  {
    "message": "Budget created successfully",
    "budgetId": 1
  }
  ```

### PUT /:id

- **Description:** Update a budget.
- **Method:** `PUT`
- **Path:** `/:id`
- **Request Body:**
  ```json
  {
    "amount": 600,
    "area": "Groceries"
  }
  ```
- **Response Body:**
  ```json
  {
    "message": "Budget updated successfully"
  }
  ```

### DELETE /:id

- **Description:** Delete a budget.
- **Method:** `DELETE`
- **Path:** `/:id`
- **Response Body:**
  ```json
  {
    "message": "Budget deleted successfully"
  }
  ```
