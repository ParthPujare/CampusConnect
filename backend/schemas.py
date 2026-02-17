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
