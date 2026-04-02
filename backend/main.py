from fastapi import FastAPI, HTTPException, Depends, Header, Request
from database import SessionLocal
from model import User, Tasks
from auth import hash_password, verify_password, create_access_token, verify_token
from schemas import TodoResponse, UserCreate, LoginRequest, TodoCreate, Target
from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware
from typing import cast
from sqlalchemy import desc

app = FastAPI()

app.add_middleware(
    SessionMiddleware,
    secret_key="supersecretkey"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # allow all for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_current_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="No token provided")

    try:
        token = authorization.split(" ")[1]  # "Bearer <token>"
    except:
        raise HTTPException(status_code=401, detail="Invalid token format")

    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    return payload["user_id"]

@app.post("/Register")
def Register(new_user: UserCreate):
    session = SessionLocal()
    current_user = session.query(User).filter(User.username == new_user.username).first()
    if not current_user:
        hashed = hash_password(new_user.password)
        newuser = User(username = new_user.username, email = new_user.email, password = hashed)
        session.add(newuser) 
        session.commit()
        session.refresh(newuser)
        session.close()
        return {
            'user': "registered sucessfully"
        }
    else:
        session.close()
        raise HTTPException(status_code = 400, detail = 'user already exists')

@app.post("/Login")
async def Login(user: LoginRequest):
    session = SessionLocal()
    current_user = session.query(User).filter(User.email == user.email).first()
    if current_user:
        if verify_password(user.password, current_user.password):
            token = create_access_token({"user_id": current_user.id})
            session.close()
            return {"token": token}
        else:
            session.close()
            raise HTTPException(status_code = 401, detail = 'password incorrect')
    else:
        session.close()
        raise HTTPException(status_code = 404, detail = 'user not found')


@app.post("/AddTask")
async def Addtask(task: TodoCreate, userid: int = Depends(get_current_user)):
    if userid:
        session = SessionLocal()
        new_task = Tasks(title = task.title, user_id = userid)
        session.add(new_task)
        session.commit()
        return {"id": new_task.id,
                "title": new_task.title,
                "completed": new_task.completed}
    else:
        raise HTTPException(status_code = 401, detail = 'not logged in')

    
@app.get('/retrive', response_model = list[TodoResponse])
async def Get_tasks(userid:int = Depends(get_current_user)):
    session = SessionLocal()
    if userid:
        tasks = session.query(Tasks).filter(Tasks.user_id == userid).order_by(desc(Tasks.completed)).all()
        session.close()
        return tasks
    else:
        session.close()
        raise HTTPException(status_code = 401, detail = 'not logged in')

@app.put("/complete")
async def mark_complete(task: Target, userid: int = Depends(get_current_user)):
    session = SessionLocal()
    if userid:
        tasktemp = session.query(Tasks).join(User).filter(Tasks.id == task.id, User.id == userid).first()
        if tasktemp:
            tasktemp.completed = not tasktemp.completed
            session.commit()
            session.refresh(tasktemp)
            session.close()
            return {tasktemp.title: "completed"}
        else:
            session.close()
            raise HTTPException(status_code= 404, detail = f"no tasks named {Tasks.title}")
    else:
        session.close()
        raise HTTPException(status_code = 404, detail = 'user not found')
    


@app.delete("/delete")
async def delete_task(task: Target,userid: int = Depends(get_current_user)):
    session = SessionLocal()
    if userid:
        tasktemp = session.query(Tasks).filter(Tasks.id == task.id).first()
        session.delete(tasktemp)
        session.commit()
        session.close()
        return {'task': "deleted sucessfuly"}
    else:
        session.close()
        raise HTTPException(status_code = 404, detail = 'user not found')
    


