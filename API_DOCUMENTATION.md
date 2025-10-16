
# LifeSync API Documentation

## Introduction

The LifeSync API provides a set of endpoints to manage personal data for the LifeSync application. This includes features for managing budgets, income and expenses, learning progress, to-do lists, and travel plans.

## Authentication

Authentication is handled through a cookie-based session system. After a successful login, the server sets a `userId` cookie that is used to authenticate subsequent requests.

### User Signup

*   **Endpoint:** `/api/users/signup`
*   **Method:** `POST`
*   **Description:** Registers a new user.
*   **Request Body:**
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "yourpassword"
    }
    ```
*   **Success Response:**
    ```json
    {
      "message": "User registered successfully",
      "userId": 1
    }
    ```
*   **Error Response:**
    ```json
    {
      "error": "Email already registered"
    }
    ```

### User Login

*   **Endpoint:** `/api/users/login`
*   **Method:** `POST`
*   **Description:** Logs in a user and sets authentication cookies.
*   **Request Body:**
    ```json
    {
      "email": "john.doe@example.com",
      "password": "yourpassword"
    }
    ```
*   **Success Response:**
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
*   **Error Response:**
    ```json
    {
      "error": "Invalid email or password"
    }
    ```

### User Logout

*   **Endpoint:** `/api/users/logout`
*   **Method:** `POST`
*   **Description:** Logs out the user by clearing the authentication cookies.
*   **Success Response:**
    ```json
    {
      "message": "Logout successful"
    }
    ```

## API Endpoints

### Budget

#### Get Budgets

*   **Endpoint:** `/api/budget/:userId`
*   **Method:** `GET`
*   **Description:** Retrieves all budget entries for a specific user.
*   **URL Parameters:**
    *   `userId`: The ID of the user.
*   **Success Response:**
    ```json
    [
      {
        "id": 1,
        "category": "Groceries",
        "limit": 500,
        "spent": 250
      }
    ]
    ```

#### Create Budget

*   **Endpoint:** `/api/budget`
*   **Method:** `POST`
*   **Description:** Creates a new budget entry.
*   **Request Body:**
    ```json
    {
      "user_id": 1,
      "amount": 500,
      "area": "Groceries"
    }
    ```
*   **Success Response:**
    ```json
    {
      "message": "Budget created successfully",
      "budgetId": 1
    }
    ```

#### Update Budget

*   **Endpoint:** `/api/budget/:id`
*   **Method:** `PUT`
*   **Description:** Updates an existing budget entry.
*   **URL Parameters:**
    *   `id`: The ID of the budget entry.
*   **Request Body:**
    ```json
    {
      "amount": 600,
      "area": "Groceries"
    }
    ```
*   **Success Response:**
    ```json
    {
      "message": "Budget updated successfully"
    }
    ```

#### Delete Budget

*   **Endpoint:** `/api/budget/:id`
*   **Method:** `DELETE`
*   **Description:** Deletes a budget entry.
*   **URL Parameters:**
    *   `id`: The ID of the budget entry.
*   **Success Response:**
    ```json
    {
      "message": "Budget deleted successfully"
    }
    ```

### Income & Expense

#### Get Income/Expense Summary

*   **Endpoint:** `/api/income-expense/:userId`
*   **Method:** `GET`
*   **Description:** Retrieves the total income, total expense, and savings for a user.
*   **URL Parameters:**
    *   `userId`: The ID of the user.
*   **Success Response:**
    ```json
    {
      "total_income": 2000,
      "total_expense": 1200,
      "saving": 800
    }
    ```

#### Set Income/Expense

*   **Endpoint:** `/api/income-expense`
*   **Method:** `POST`
*   **Description:** Adds a new income or expense entry.
*   **Request Body:**
    ```json
    {
      "user_id": 1,
      "type": "expense",
      "amount": 50,
      "category": "Groceries"
    }
    ```
*   **Success Response:**
    ```json
    {
      "message": "Entry created successfully",
      "entryId": 1
    }
    ```

### Learning

#### Get Learnings

*   **Endpoint:** `/api/learning/:userId`
*   **Method:** `GET`
*   **Description:** Retrieves all learning entries for a user.
*   **URL Parameters:**
    *   `userId`: The ID of the user.
*   **Success Response:**
    ```json
    [
      {
        "id": 1,
        "user_id": 1,
        "title": "Learn Node.js",
        "description": "Complete a Node.js course.",
        "progress": 50,
        "completed": false
      }
    ]
    ```

#### Create Learning

*   **Endpoint:** `/api/learning`
*   **Method:** `POST`
*   **Description:** Creates a new learning entry.
*   **Request Body:**
    ```json
    {
      "user_id": 1,
      "title": "Learn React",
      "description": "Build a React application."
    }
    ```
*   **Success Response:**
    ```json
    {
      "message": "Learning created successfully",
      "learningId": 1
    }
    ```

#### Update Learning

*   **Endpoint:** `/api/learning/:id`
*   **Method:** `PUT`
*   **Description:** Updates a learning entry.
*   **URL Parameters:**
    *   `id`: The ID of the learning entry.
*   **Request Body:**
    ```json
    {
      "title": "Learn Advanced React",
      "description": "Learn about React Hooks and Context API.",
      "progress": 75,
      "completed": false
    }
    ```
*   **Success Response:**
    ```json
    {
      "message": "Learning updated successfully"
    }
    ```

#### Delete Learning

*   **Endpoint:** `/api/learning/:id`
*   **Method:** `DELETE`
*   **Description:** Deletes a learning entry.
*   **URL Parameters:**
    *   `id`: The ID of the learning entry.
*   **Success Response:**
    ```json
    {
      "message": "Learning deleted successfully"
    }
    ```

### To-Do

#### Get To-Dos

*   **Endpoint:** `/api/todo/:userId`
*   **Method:** `GET`
*   **Description:** Retrieves all to-do items for a user.
*   **URL Parameters:**
    *   `userId`: The ID of the user.
*   **Success Response:**
    ```json
    [
      {
        "id": 1,
        "user_id": 1,
        "title": "Buy milk",
        "description": "",
        "due_date": null,
        "completed": false
      }
    ]
    ```

#### Create To-Do

*   **Endpoint:** `/api/todo`
*   **Method:** `POST`
*   **Description:** Creates a new to-do item.
*   **Request Body:**
    ```json
    {
      "user_id": 1,
      "title": "Walk the dog",
      "description": "Take the dog for a 30-minute walk."
    }
    ```
*   **Success Response:**
    ```json
    {
      "message": "Todo created successfully",
      "todoId": 2
    }
    ```

#### Update To-Do

*   **Endpoint:** `/api/todo/:id`
*   **Method:** `PUT`
*   **Description:** Updates a to-do item.
*   **URL Parameters:**
    *   `id`: The ID of the to-do item.
*   **Request Body:**
    ```json
    {
      "title": "Walk the dog in the park",
      "description": "Take the dog for a 45-minute walk in the park.",
      "due_date": "2025-11-15",
      "completed": false
    }
    ```
*   **Success Response:**
    ```json
    {
      "message": "Todo updated successfully"
    }
    ```

#### Delete To-Do

*   **Endpoint:** `/api/todo/:id`
*   **Method:** `DELETE`
*   **Description:** Deletes a to-do item.
*   **URL Parameters:**
    *   `id`: The ID of the to-do item.
*   **Success Response:**
    ```json
    {
      "message": "Todo deleted successfully"
    }
    ```

### Travel Plans

#### Get Travel Plans

*   **Endpoint:** `/api/travel/:userId`
*   **Method:** `GET`
*   **Description:** Retrieves all travel plans for a user, including expenses and packing list items.
*   **URL Parameters:**
    *   `userId`: The ID of the user.
*   **Success Response:**
    ```json
    [
      {
        "id": 1,
        "user_id": 1,
        "destination": "Paris",
        "start_date": "2026-06-01",
        "end_date": "2026-06-10",
        "budget": 2000,
        "description": "Summer vacation in Paris.",
        "status": "Planned",
        "expenses": [
          {
            "id": 1,
            "name": "Flight tickets",
            "amount": 800,
            "date": "2025-10-15T10:00:00.000Z"
          }
        ],
        "packingList": [
          {
            "id": 1,
            "name": "Passport",
            "packed": true
          }
        ]
      }
    ]
    ```

#### Create Travel Plan

*   **Endpoint:** `/api/travel`
*   **Method:** `POST`
*   **Description:** Creates a new travel plan.
*   **Request Body:**
    ```json
    {
      "user_id": 1,
      "destination": "Tokyo",
      "start_date": "2027-04-01",
      "end_date": "2027-04-10",
      "budget": 3000,
      "description": "Trip to see the cherry blossoms."
    }
    ```
*   **Success Response:**
    ```json
    {
      "message": "Travel plan created successfully",
      "travelPlanId": 2
    }
    ```

#### Update Travel Plan

*   **Endpoint:** `/api/travel/:id`
*   **Method:** `PUT`
*   **Description:** Updates a travel plan.
*   **URL Parameters:**
    *   `id`: The ID of the travel plan.
*   **Request Body:**
    ```json
    {
      "destination": "Kyoto",
      "start_date": "2027-04-05",
      "end_date": "2027-04-15",
      "budget": 3500,
      "description": "Extended trip to see more of Japan.",
      "status": "Confirmed"
    }
    ```
*   **Success Response:**
    ```json
    {
      "message": "Travel plan updated successfully"
    }
    ```

#### Delete Travel Plan

*   **Endpoint:** `/api/travel/:id`
*   **Method:** `DELETE`
*   **Description:** Deletes a travel plan.
*   **URL Parameters:**
    *   `id`: The ID of the travel plan.
*   **Success Response:**
    ```json
    {
      "message": "Travel plan deleted successfully"
    }
    ```

#### Add Expense to Travel Plan

*   **Endpoint:** `/api/travel/:id/expense`
*   **Method:** `POST`
*   **Description:** Adds an expense to a travel plan.
*   **URL Parameters:**
    *   `id`: The ID of the travel plan.
*   **Request Body:**
    ```json
    {
      "amount": 150,
      "name": "Hotel booking"
    }
    ```
*   **Success Response:**
    ```json
    {
      "message": "Expense added successfully",
      "expenseId": 2
    }
    ```

#### Delete Expense from Travel Plan

*   **Endpoint:** `/api/travel/:id/expense`
*   **Method:** `DELETE`
*   **Description:** Deletes an expense from a travel plan.
*   **URL Parameters:**
    *   `id`: The ID of the expense.
*   **Success Response:**
    ```json
    {
      "message": "Expense deleted successfully"
    }
    ```

#### Add Item to Packing List

*   **Endpoint:** `/api/travel/:id/item`
*   **Method:** `POST`
*   **Description:** Adds an item to the packing list of a travel plan.
*   **URL Parameters:**
    *   `id`: The ID of the travel plan.
*   **Request Body:**
    ```json
    {
      "name": "Camera"
    }
    ```
*   **Success Response:**
    ```json
    {
      "message": "Item added successfully",
      "itemId": 2
    }
    ```

#### Update Packing List Item Status

*   **Endpoint:** `/api/travel/item/:id`
*   **Method:** `PUT`
*   **Description:** Updates the 'packed' status of a packing list item.
*   **URL Parameters:**
    *   `id`: The ID of the packing list item.
*   **Request Body:**
    ```json
    {
      "status": 1
    }
    ```
*   **Success Response:**
    ```json
    {
      "message": "Item status updated successfully"
    }
    ```

#### Delete Item from Packing List

*   **Endpoint:** `/api/travel/item/:id`
*   **Method:** `DELETE`
*   **Description:** Deletes an item from a packing list.
*   **URL Parameters:**
    *   `id`: The ID of the packing list item.
*   **Success Response:**
    ```json
    {
      "message": "Item deleted successfully"
    }
    ```
