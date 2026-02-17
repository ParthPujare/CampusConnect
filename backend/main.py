from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import models, schemas, crud
from database import SessionLocal, engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="CampusConnect API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for hackathon simplicity
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/events/", response_model=schemas.Event)
def create_event(event: schemas.EventCreate, db: Session = Depends(get_db)):
    return crud.create_event(db=db, event=event)

@app.get("/events/", response_model=List[schemas.Event])
def read_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    events = crud.get_events(db, skip=skip, limit=limit)
    return events

@app.get("/events/{event_id}", response_model=schemas.Event)
def read_event(event_id: int, db: Session = Depends(get_db)):
    db_event = crud.get_event(db, event_id=event_id)
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return db_event

@app.delete("/events/{event_id}", response_model=schemas.Event)
def delete_event(event_id: int, db: Session = Depends(get_db)):
    db_event = crud.delete_event(db, event_id=event_id)
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    return db_event

@app.post("/admin/login")
def login(admin: schemas.AdminCreate, db: Session = Depends(get_db)):
    # Simple auth for hackathon: Check if username exists and password matches
    # In a real app, use JWT tokens
    db_admin = crud.get_admin_by_username(db, username=admin.username)
    if not db_admin:
         # Auto-create admin if not exists (Hackathon shortcut)
         return crud.create_admin(db, admin)
    
    
    if not crud.pwd_context.verify(admin.password, db_admin.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect password")
    
    return {"message": "Login successful", "username": admin.username}

# Serve static files from the frontend build directory
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

# Create an absolute path to the frontend/dist directory
# Assuming backend and frontend vary by one level up
frontend_dist = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend", "dist")

if os.path.exists(frontend_dist):
    # Mount assets first
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="assets")

    # Catch-all for React Router
    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        file_path = os.path.join(frontend_dist, full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        
        # Fallback to index.html for SPA routing
        return FileResponse(os.path.join(frontend_dist, "index.html"))
else:
    print(f"Warning: Frontend build directory not found at {frontend_dist}")
