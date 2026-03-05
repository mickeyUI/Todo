# Todo App with FastAPI and PostgreSQL

A simple Todo application built with FastAPI, SQLAlchemy, and PostgreSQL. It allows users to register, add tasks, retrieve tasks, mark tasks as complete, and delete tasks.

## Features

- User registration with password hashing
- Add tasks for authenticated users
- Retrieve all tasks for a user
- Mark tasks as completed
- Delete tasks
- Authentication via username and password

## Prerequisites

- Python 3.8+
- PostgreSQL database
- Virtual environment (recommended)

## Installation

1. Clone or navigate to the project directory.

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```
   pip install fastapi uvicorn sqlalchemy passlib[bcrypt] psycopg2-binary pydantic
   ```

5. Set up the PostgreSQL database:
   - Create a database named `todo`
   - Update the `DATABASE_URL` in `database.py` if necessary (default: `postgresql://postgres:Forsythej2@localhost:5432/todo`)

6. Run the database migrations (models are created automatically on startup).

## Usage

1. Start the FastAPI server:
   ```
   uvicorn main:app --reload
   ```

2. The API will be available at `http://127.0.0.1:8000`

3. Access the interactive API documentation at `http://127.0.0.1:8000/docs`

## API Endpoints

### POST /Register
Register a new user.

- **Parameters:**
  - `user_name` (str): Username
  - `pass_word` (str): Password

- **Response:** Success message or error if user exists.

### POST /AddTask
Add a new task for a user.

- **Parameters:**
  - `user_name` (str): Username
  - `pass_word` (str): Password
  - `task` (str): Task title

- **Response:** Success message or authentication error.

### GET /retrive
Retrieve all tasks for a user.

- **Parameters:**
  - `user_name` (str): Username
  - `pass_word` (str): Password

- **Response:** List of tasks or error.

### PUT /complete
Mark a task as completed.

- **Parameters:**
  - `user_name` (str): Username
  - `pass_word` (str): Password
  - `task` (str): Task title

- **Response:** Success message or error.

### DELETE /delete
Delete a task.

- **Parameters:**
  - `user_name` (str): Username
  - `pass_word` (str): Password
  - `task` (str): Task title

- **Response:** Success message or error.

## Project Structure

- `main.py`: FastAPI application and endpoints
- `auth.py`: Password hashing and verification
- `database.py`: Database configuration
- `model.py`: SQLAlchemy models
- `schemas.py`: Pydantic schemas

## Contributing

Feel free to contribute by opening issues or pull requests.

## License

This project is open source. Use at your own risk.
