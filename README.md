# LifeSync

LifeSync is a personal dashboard designed to help you organize your daily life, including tasks, finances, and travel plans. It provides a central hub to manage various aspects of your life, enhancing productivity and organization.

## Features

-   **Dashboard:** A central hub for all your activities.
-   **To-Do List:** Manage your daily tasks and stay productive.
-   **Finance Tracker:** Keep track of your income and expenses.
-   **Emergency Contacts:** A place to store important contacts for emergencies.
-   **Travel Planner:** Plan your trips and adventures.
-   **Learning Hub:** Organize your learning resources and track your progress.

## Screenshots

**Homepage**

![Homepage](./forntend/public/screenshots./homepage1.png)
![Homepage](./forntend/public/screenshots./Homepage2.png)
![Homepage](./forntend/public/screenshots./Homepage3.png)

**Authentication**

![Signup](./forntend/public/screenshots./Signup.png)
![Signin](./forntend/public/screenshots./Singin.png)

**Dashboard**

![Dashboard](./forntend/public/screenshots./Dashboard.png)

**To-Do**

![To-Do Dashboard](./forntend/public/screenshots./to%20do%20dashboard.png)
![Create Task](./forntend/public/screenshots./to%20do%20create%20task.png)
![Task List](./forntend/public/screenshots./to%20do%20tasklist.png)

**Finance Tracker**

![Finance Tracker](./forntend/public/screenshots./finance%20Tracker1.png)
![Finance Tracker Budget](./forntend/public/screenshots./Finance%20Tracker%20budget.png)
![Create Budget](./forntend/public/screenshots./FInance%20tracker%20create%20budget.png)
![Add Income/Expense](./forntend/public/screenshots./finance%20tracker%20add%20income%20expanse.png)
![Income/Expense Category](./forntend/public/screenshots./incom_expence%20category.png)
![Add Money](./forntend/public/screenshots./money%20add%20in%20finance.png)
![Money Description](./forntend/public/screenshots./money%20description.png)

**Travel Tracker**

![Travel Tracker](./forntend/public/screenshots./travel%20tracker.png)
![Add New Trip](./forntend/public/screenshots./Travel%20tracker%20new%20trip%20add.png)
![Keyword Search](./forntend/public/screenshots./travel%20tracker%20keyword%20search.png)
![Budget and Item](./forntend/public/screenshots./travel%20traker%20budget%20and%20item.png)

**Learning Hub**

![Learning Queue](./forntend/public/screenshots./Learning%20queue.png)
![Add Learning Item](./forntend/public/screenshots./add%20learning%20item.png)

**Quick Dock**

![Quickdoc Dashboard](./forntend/public/screenshots./Quickdoc%20dashboard.png)
![Newspaper](./forntend/public/screenshots./Quickdoc%20news%20papet.png)
![Prothom Alo](./forntend/public/screenshots./quickdoc%20prothom%20alo.png)

**Logout**

![Logout](./forntend/public/screenshots./logout.png)


## Technologies Used

### Frontend

-   [Next.js](https://nextjs.org/) - React framework for production.
-   [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
-   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
-   [Framer Motion](https://www.framer.com/motion/) - A production-ready motion library for React.

### Backend

-   [Node.js](https://nodejs.org/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
-   [Express](https://expressjs.com/) - A minimal and flexible Node.js web application framework.
-   [MySQL](https://www.mysql.com/) - An open-source relational database management system.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js and npm installed
-   MySQL database

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/khaledhasanmilu/LifeSync.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd LifeSync
    ```
3.  **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    ```
4.  **Create a `.env` file in the `backend` directory** and add your MySQL database credentials:
    ```
    DB_HOST=your_host
    DB_USER=your_user
    DB_PASSWORD=your_password
    DB_NAME=your_database_name
    ```
5.  **Install frontend dependencies:**
    ```bash
    cd ../forntend
    npm install
    ```

### Running the Application

1.  **Start the backend server:**
    ```bash
    cd backend
    npm run dev
    ```
2.  **Start the frontend development server:**
    ```bash
    cd ../forntend
    npm run dev
    ```
3.  Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```
/
├── backend/
│   ├── controller/
│   ├── db/
│   ├── routes/
│   └── ...
└── forntend/
    ├── app/
    │   ├── (afterAuth)/
    │   ├── login/
    │   └── signup/
    └── ...
```

## API Endpoints

The base URL for all the endpoints is `/users`.

-   `GET /`: Get all users.
-   `POST /signup`: Create a new user.
-   `POST /login`: Log in a user.

For more details on the API, please refer to the `API_DOCUMENTATION.md` file.

## Pages

-   **/login:** User authentication page.
-   **/signup:** User registration page.
-   **/dashboard:** The main dashboard with an overview of all features.
-   **/todo:** A page to manage your to-do list.
-   **/finance:** A page to track your finances.
-   **/emergency:** A page to store emergency contacts.
-   **/travel:** A page to plan your travels.
-   **/learning:** A page to organize your learning materials.
-   **/quickdock:** A page for quick access to your most used features.

## Contributors

-   [Khaled Hasan Milu](https://github.com/khaledhasanmilu)
-   [Sumiya Akter Subarna](https://github.com/Subarna-007)
-   [Minhazul Islam Sizan](https://github.com/sizan2119254)
