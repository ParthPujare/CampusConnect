from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas, crud

def reset_admin():
    db = SessionLocal()
    username = "admin"
    new_password = "admin"
    
    print(f"Resetting password for user: {username}")
    
    # Check if admin exists
    admin = crud.get_admin_by_username(db, username=username)
    
    if admin:
        print("Admin user found. Updating password...")
        hashed_password = crud.pwd_context.hash(new_password)
        admin.password_hash = hashed_password
        db.commit()
        print("Password updated successfully.")
    else:
        print("Admin user not found. Creating new admin...")
        new_admin = schemas.AdminCreate(username=username, password=new_password)
        crud.create_admin(db, new_admin)
        print("Admin user created.")
    
    db.close()

if __name__ == "__main__":
    reset_admin()
