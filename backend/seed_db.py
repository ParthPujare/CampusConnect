from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas, crud
import datetime

# Create tables if they don't exist
models.Base.metadata.create_all(bind=engine)

def seed_data():
    db = SessionLocal()
    
    # 1. Clear existing data (Optional, handle with care)
    # db.query(models.Hackathon).delete()
    # db.query(models.Experience).delete()
    # db.query(models.Alert).delete()
    # db.query(models.Timetable).delete()
    # db.commit()

    print("Seeding Hackathons...")
    if not db.query(models.Hackathon).first():
        hackathons = [
            schemas.HackathonCreate(
                title="Smart India Hackathon 2026",
                description="The world's biggest open innovation model to solve the challenges faced by our nation.",
                date="March 15, 2026",
                prize_pool="₹5,00,000",
                is_sponsored=True,
                image_url="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000"
            ),
            schemas.HackathonCreate(
                title="HackTheCrisis",
                description="Global virtual hackathon to build solutions for pandemics and crises.",
                date="April 05, 2026",
                prize_pool="$10,000",
                is_sponsored=False,
                image_url="https://images.unsplash.com/photo-1504384308090-c54be3855485?auto=format&fit=crop&q=80&w=1000"
            ),
            schemas.HackathonCreate(
                title="Google Cloud Hero",
                description="A gamified learning experience where you can complete labs and win swag.",
                date="May 20, 2026",
                prize_pool="Swag & Google Cloud Credits",
                is_sponsored=True,
                image_url="https://images.unsplash.com/photo-1581447109200-bf2769116351?auto=format&fit=crop&q=80&w=1000"
            ),
             schemas.HackathonCreate(
                title="Campus Code fest",
                description="Internal college hackathon for freshers.",
                date="Feb 28, 2026",
                prize_pool="₹10,000",
                is_sponsored=False,
                image_url="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000"
            ),
        ]
        for h in hackathons:
            crud.create_hackathon(db, h)
            
    print("Seeding Experiences...")
    if not db.query(models.Experience).first():
        experiences = [
            schemas.ExperienceCreate(
                student_name="Rahul Sharma",
                achievement_type="Placement",
                company_or_event="Google",
                content="Consistent practice on LeetCode and building real-world projects helped me crack the Google interview. Don't give up!",
            ),
             schemas.ExperienceCreate(
                student_name="Anjali Verma",
                achievement_type="Hackathon Win",
                company_or_event="Smart India Hackathon",
                content="Our team focused on a simple, scalable solution. The mentors helped us refine our pitch. It was an amazing experience!",
            ),
             schemas.ExperienceCreate(
                student_name="Sarthak Gupta",
                achievement_type="Internship",
                company_or_event="Amazon",
                content="Understanding core CS concepts like OS and DBMS is crucial. I also participated in 5 hackathons which boosted my resume.",
            ),
        ]
        for e in experiences:
            crud.create_experience(db, e)

    print("Seeding Timetable...")
    if not db.query(models.Timetable).first():
        timetable = [
            schemas.TimetableCreate(day="Monday", time="09:00 AM - 10:00 AM", subject="Data Structures", room="LH-101"),
            schemas.TimetableCreate(day="Monday", time="10:00 AM - 11:00 AM", subject="Operating Systems", room="LH-102"),
            schemas.TimetableCreate(day="Tuesday", time="11:00 AM - 01:00 PM", subject="DBMS Lab", room="Lab-3"),
            schemas.TimetableCreate(day="Wednesday", time="09:00 AM - 10:00 AM", subject="Algorithms", room="LH-101"),
            schemas.TimetableCreate(day="Friday", time="02:00 PM - 04:00 PM", subject="Project Work", room="Lab-1"),
        ]
        for t in timetable:
            crud.create_timetable_entry(db, t)

    print("Seeding Alerts...")
    if not db.query(models.Alert).first():
        alerts = [
            schemas.AlertCreate(message="DBMS Lab rescheduled to 2:00 PM today.", type="reschedule"),
            schemas.AlertCreate(message="Operating Systems class cancelled.", type="cancel"),
            schemas.AlertCreate(message="Guest lecture on AI at 5:00 PM in Auditorium.", type="info"),
        ]
        for a in alerts:
            crud.create_alert(db, a)
            
    print("Seeding Complete!")
    db.close()

if __name__ == "__main__":
    seed_data()
