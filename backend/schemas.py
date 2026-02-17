from pydantic import BaseModel
from typing import Optional

class EventBase(BaseModel):
    title: str
    description: str
    date: str
    time: str
    venue: str
    category: str
    organizer: str
    image_url: Optional[str] = None

class EventCreate(EventBase):
    pass

class Event(EventBase):
    id: int

    class Config:
        from_attributes = True

class AdminBase(BaseModel):
    username: str

class AdminCreate(AdminBase):
    password: str

class Admin(AdminBase):
    id: int

    class Config:
        from_attributes = True

# Student Schemas
class StudentBase(BaseModel):
    username: str
    full_name: str

class StudentCreate(StudentBase):
    password: str

class Student(StudentBase):
    id: int

    class Config:
        from_attributes = True

# Timetable Schemas
class TimetableBase(BaseModel):
    day: str
    time: str
    subject: str
    room: str

class TimetableCreate(TimetableBase):
    pass

class Timetable(TimetableBase):
    id: int

    class Config:
        from_attributes = True

# Alert Schemas
class AlertBase(BaseModel):
    message: str
    type: str

class AlertCreate(AlertBase):
    pass

class Alert(AlertBase):
    id: int
    timestamp: Optional[str] = None

    class Config:
        from_attributes = True
        json_encoders = {
            'datetime': lambda v: v.isoformat() if v else None
        }

# Hackathon Schemas
class HackathonBase(BaseModel):
    title: str
    description: str
    date: str
    prize_pool: str
    is_sponsored: bool = False
    image_url: Optional[str] = None

class HackathonCreate(HackathonBase):
    pass

class Hackathon(HackathonBase):
    id: int

    class Config:
        from_attributes = True

# Experience Schemas
class ExperienceBase(BaseModel):
    student_name: str
    achievement_type: str
    company_or_event: str
    content: str
    image_url: Optional[str] = None

class ExperienceCreate(ExperienceBase):
    pass

class Experience(ExperienceBase):
    id: int

    class Config:
        from_attributes = True
