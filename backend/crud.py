from sqlalchemy.orm import Session
import models, schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def get_event(db: Session, event_id: int):
    return db.query(models.Event).filter(models.Event.id == event_id).first()

def get_events(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Event).offset(skip).limit(limit).all()

def create_event(db: Session, event: schemas.EventCreate):
    db_event = models.Event(**event.dict())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

def delete_event(db: Session, event_id: int):
    db_event = db.query(models.Event).filter(models.Event.id == event_id).first()
    if db_event:
        db.delete(db_event)
        db.commit()
    return db_event

def get_admin_by_username(db: Session, username: str):
    return db.query(models.Admin).filter(models.Admin.username == username).first()

def create_admin(db: Session, admin: schemas.AdminCreate):
    hashed_password = pwd_context.hash(admin.password)
    db_admin = models.Admin(username=admin.username, password_hash=hashed_password)
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return db_admin

# Student CRUD
def get_student_by_username(db: Session, username: str):
    return db.query(models.Student).filter(models.Student.username == username).first()

def create_student(db: Session, student: schemas.StudentCreate):
    hashed_password = pwd_context.hash(student.password)
    db_student = models.Student(username=student.username, full_name=student.full_name, password_hash=hashed_password)
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

# Timetable CRUD
def get_timetable(db: Session):
    return db.query(models.Timetable).all()

def create_timetable_entry(db: Session, entry: schemas.TimetableCreate):
    db_entry = models.Timetable(**entry.dict())
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

# Alert CRUD
def get_alerts(db: Session):
    return db.query(models.Alert).order_by(models.Alert.timestamp.desc()).all()

def create_alert(db: Session, alert: schemas.AlertCreate):
    db_alert = models.Alert(**alert.dict())
    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)
    return db_alert

# Hackathon CRUD
def get_hackathons(db: Session, sponsored_only: bool = False):
    query = db.query(models.Hackathon)
    if sponsored_only:
        query = query.filter(models.Hackathon.is_sponsored == 1)
    return query.all()

def create_hackathon(db: Session, hackathon: schemas.HackathonCreate):
    db_hackathon = models.Hackathon(**hackathon.dict())
    # Convert bool to int for SQLite if needed (though SQLAlchemy handles it usually, explicit is safe)
    if hackathon.is_sponsored:
        db_hackathon.is_sponsored = 1
    else:
        db_hackathon.is_sponsored = 0
        
    db.add(db_hackathon)
    db.commit()
    db.refresh(db_hackathon)
    return db_hackathon

# Experience CRUD
def get_experiences(db: Session):
    return db.query(models.Experience).all()

def create_experience(db: Session, experience: schemas.ExperienceCreate):
    db_experience = models.Experience(**experience.dict())
    db.add(db_experience)
    db.commit()
    db.refresh(db_experience)
    return db_experience
