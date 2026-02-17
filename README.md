# CampusConnect - The Ultimate College Event Hub

CampusConnect is a centralized platform designed to bridge the gap between event organizers and students. It provides a seamless, intuitive, and visually stunning experience for discovering and managing college events.

## Features

### Student Interface
*   **Intuitive Discovery**: A visually appealing homepage showcasing featured events.
*   **Advanced Exploration**: Search and filter events by category (Technical, Cultural, Sports, etc.).
*   **Interactive Calendar**: View events in a monthly calendar layout.
*   **Event Details**: Comprehensive event information with a mock registration flow.
*   **Responsive Design**: Fully optimized for desktop and mobile devices.

### Admin Interface
*   **Secure Login**: Simple authentication for event organizers.
*   **Dashboard**: Manage events (Create, Delete) with real-time updates.

## Tech Stack

*   **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide React
*   **Backend**: FastAPI, SQLAlchemy, Pydantic
*   **Database**: SQLite (Default) / PostgreSQL (Supported via config)

## Getting Started

### Prerequisites
*   Node.js & npm
*   Python 3.8+

### Setup Instructions

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/campus-connect.git
    cd campus-connect
    ```

2.  **Frontend Build**
    The backend serves the frontend, so we need to build it first.
    ```bash
    cd frontend
    npm install
    npm run build
    ```

3.  **Backend Setup & Run**
    ```bash
    cd ../backend
    python -m venv venv
    # Activate venv:
    # Windows: venv\Scripts\activate
    # Mac/Linux: source venv/bin/activate
    
    pip install -r requirements.txt
    
    # Run the server
    uvicorn main:app --reload
    ```
    The application will be available at [`http://localhost:8000`](http://localhost:8000).
    API docs available at [`http://localhost:8000/docs`](http://localhost:8000/docs).

### Admin Credentials (Demo)
*   **Username**: admin
*   **Password**: admin

## Project Structure
*   `backend/`: FastAPI application, database models, and schemas.
*   `frontend/`: React application with Tailwind styling.

## Screenshots
(Add screenshots here)
