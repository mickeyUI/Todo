# 📝 Full Stack Todo App

A full-stack Todo application built with **FastAPI**, **PostgreSQL**, and **React**.
Users can register, log in, and manage their personal tasks with authentication.

---

## 🚀 Features

* User registration and login (JWT authentication)
* Add, retrieve, update, and delete tasks
* Mark tasks as completed / incomplete (toggle)
* Persistent storage using PostgreSQL
* RESTful API built with FastAPI
* React frontend for interactive UI
* CORS-enabled for frontend-backend communication

---

## 🛠 Tech Stack

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* Pydantic
* JWT Authentication

### Frontend

* React (Vite)
* Fetch API

---

## 📂 Project Structure

```
backend/
│
├── main.py          # FastAPI routes
├── database.py      # DB connection
├── model.py         # SQLAlchemy models
├── schemas.py       # Pydantic schemas
├── auth.py          # Authentication logic
│
frontend/
│
├── src/
│   ├── App.jsx
│   ├── mainUI.jsx
│
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### 2. Backend Setup

Create virtual environment:

```
python -m venv venv
```

Activate:

```
venv\Scripts\activate   # Windows
```

Install dependencies:

```
pip install -r requirements.txt
```

Run server:

```
uvicorn main:app --reload
```

---

### 3. Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 🔐 Authentication

* Uses JWT tokens
* Token must be included in requests:

```
Authorization: Bearer <your_token>
```

---

## 📡 API Endpoints

| Method | Endpoint  | Description        |
| ------ | --------- | ------------------ |
| POST   | /Register | Register user      |
| POST   | /Login    | Login user         |
| GET    | /retrive  | Get user tasks     |
| POST   | /AddTask  | Add new task       |
| PUT    | /complete | Toggle task status |
| DELETE | /delete   | Delete task        |

---

## ⚠️ Notes

* Make sure PostgreSQL is running before starting backend
* Ensure correct DB credentials in configuration
* CORS is configured for `http://localhost:5173`

---

## 📌 Future Improvements

* Pagination for tasks
* Better error handling
* UI improvements
* Deployment (Docker / Cloud)

---

## 📜 License

This project is open-source and available under the MIT License.

