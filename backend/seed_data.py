from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas, crud

models.Base.metadata.create_all(bind=engine)

def seed_data():
    db = SessionLocal()
    
    # Check if data exists
    if db.query(models.Event).first():
        print("Data already exists.")
        return

    events = [
        schemas.EventCreate(
            title="Tech Hackathon 2024",
            description="A 24-hour coding competition to solve real-world problems. Prizes worth $5000!",
            date="2024-03-15",
            time="10:00 AM",
            venue="Main Auditorium",
            category="Technical",
            organizer="Computer Science Dept",
            image_url="https://images.unsplash.com/photo-1504384308090-c54be3855833?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ),
        schemas.EventCreate(
            title="Cultural Fest: Tarang",
            description="Annual cultural festival featuring dance, music, and drama performances.",
            date="2024-04-20",
            time="5:00 PM",
            venue="College Ground",
            category="Cultural",
            organizer="Student Council",
            image_url="https://images.unsplash.com/photo-1514525253440-b393452e8d26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ),
        schemas.EventCreate(
            title="Inter-College Football",
            description="The biggest football tournament of the year. Come cheer for your team!",
            date="2024-03-25",
            time="3:00 PM",
            venue="Sports Complex",
            category="Sports",
            organizer="Sports Committee",
            image_url="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ),
        schemas.EventCreate(
            title="AI Workshop",
            description="Learn the basics of Artificial Intelligence and Machine Learning from industry experts.",
            date="2024-03-10",
            time="11:00 AM",
            venue="Seminar Hall 1",
            category="Technical",
            organizer="AI Club",
            image_url="https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ),
         schemas.EventCreate(
            title="Guest Lecture: Future of Space",
            description="Dr. Smith from ISRO discusses the future of space exploration.",
            date="2024-03-12",
            time="2:00 PM",
            venue="Seminar Hall 2",
            category="Technical",
            organizer="Science Club",
            image_url="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ),
    ]

    for event in events:
        crud.create_event(db, event)
    
    print("Dummy data seeded.")
    db.close()

if __name__ == "__main__":
    seed_data()
