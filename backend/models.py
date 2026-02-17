from sqlalchemy import Column, Integer, String, Text, DateTime
from database import Base
import datetime

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    date = Column(String) # Storing as string for simplicity in hackathon
    time = Column(String)
    venue = Column(String)
    category = Column(String, index=True) # Technical, Cultural, Sports, etc.
    organizer = Column(String)
    image_url = Column(String, nullable=True)
    
class Admin(Base):
    __tablename__ = "admins"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)
    full_name = Column(String)

class Timetable(Base):
    __tablename__ = "timetable"

    id = Column(Integer, primary_key=True, index=True)
    day = Column(String) # Monday, Tuesday, etc.
    time = Column(String) # e.g., "10:00 AM - 11:00 AM"
    subject = Column(String)
    room = Column(String)
    
class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(String)
    type = Column(String) # reschedule, cancel, info
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class Hackathon(Base):
    __tablename__ = "hackathons"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    date = Column(String)
    prize_pool = Column(String)
    is_sponsored = Column(Integer, default=0) # 0 for False, 1 for True (SQLite boolean)
    image_url = Column(String, nullable=True)

class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True)
    student_name = Column(String)
    achievement_type = Column(String) # Placement, Hackathon Win, etc.
    company_or_event = Column(String)
    content = Column(Text)
    image_url = Column(String, nullable=True)

