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
