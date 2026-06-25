import os
from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, File, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from app.auth import verify_token
from app.database import (
    db_get_subjects, db_create_subject, db_delete_subject,
    db_get_creators, db_create_creator, db_delete_creator,
    db_get_materials, db_create_material, db_update_material, db_delete_material,
    db_upload_file, db_get_todos, db_create_todo, db_update_todo, db_delete_todo,
    db_get_monthly_targets, db_create_monthly_target, db_update_monthly_target, db_delete_monthly_target, USE_MOCK
)

app = FastAPI(
    title="StudyStack API",
    description="Backend API for managing study resources, links, and documents with Clerk Auth and Supabase",
    version="1.0.0"
)

# Enable CORS for frontend clients (development and production URLs)
origins = [
    "http://localhost:5173",  # Vite dev server
    "http://127.0.0.1:5173",
    "https://studystack-student.vercel.app", # Replace with actual Vercel domain later
    "*" # Allowed for ease of testing; restrict in production
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development testing, let's allow all. Restrict when deploying.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.responses import JSONResponse

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    # Print the full traceback to the server console for easy debugging
    print(f"ERROR: Unhandled API Exception on {request.url.path}: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal Server Error: {str(exc)}"}
    )

# Mount Local Uploads folder for file serving when running in local fallback mode
current_dir = os.path.dirname(os.path.abspath(__file__))
uploads_dir = os.path.join(current_dir, "..", "uploads")
os.makedirs(uploads_dir, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=uploads_dir), name="uploads")


# --- PYDANTIC MODEL SCHEMAS ---

class SubjectCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    color: str = Field("#8B5CF6", description="Hex or class color code")

class CreatorCreate(BaseModel):
    name: str = Field(...)
    platform: str = Field(..., description="e.g., Instagram, YouTube, Medium, LinkedIn")
    handle: Optional[str] = None
    profile_url: Optional[str] = None

class MaterialCreate(BaseModel):
    title: str = Field(...)
    type: str = Field(..., description="google_drive, website, pdf, docx, youtube, github, other")
    url: str = Field(...)
    description: Optional[str] = None
    subject_id: Optional[str] = None
    creator_id: Optional[str] = None
    is_favorite: Optional[bool] = False
    is_read: Optional[bool] = False
    tags: Optional[List[str]] = []
    notes: Optional[str] = None

class MaterialUpdate(BaseModel):
    title: Optional[str] = None
    type: Optional[str] = None
    url: Optional[str] = None
    description: Optional[str] = None
    subject_id: Optional[str] = None
    creator_id: Optional[str] = None
    is_favorite: Optional[bool] = None
    is_read: Optional[bool] = None
    tags: Optional[List[str]] = None
    notes: Optional[str] = None


class TodoCreate(BaseModel):
    text: str = Field(..., min_length=1)

class TodoUpdate(BaseModel):
    is_completed: bool

class MonthlyTargetCreate(BaseModel):
    month: str = Field(..., pattern=r"^\d{4}-\d{2}$", description="YYYY-MM format")
    text: str = Field(..., min_length=1)

class MonthlyTargetUpdate(BaseModel):
    is_completed: bool


# --- ENDPOINTS ---

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "StudyStack API Gateway",
        "database_mode": "Mock File Database (local_db.json)" if USE_MOCK else "Cloud Supabase PostgreSQL"
    }

# --- SUBJECTS ENDPOINTS ---

@app.get("/api/subjects", response_model=List[dict])
def get_subjects(user_id: str = Depends(verify_token)):
    return db_get_subjects(user_id)

@app.post("/api/subjects", status_code=status.HTTP_201_CREATED)
def create_subject(subject: SubjectCreate, user_id: str = Depends(verify_token)):
    return db_create_subject(user_id, subject.name, subject.color)

@app.delete("/api/subjects/{subject_id}")
def delete_subject(subject_id: str, user_id: str = Depends(verify_token)):
    success = db_delete_subject(user_id, subject_id)
    if not success:
        raise HTTPException(status_code=404, detail="Subject not found or unauthorized")
    return {"message": "Subject deleted successfully"}

# --- CREATORS ENDPOINTS ---

@app.get("/api/creators", response_model=List[dict])
def get_creators(user_id: str = Depends(verify_token)):
    return db_get_creators(user_id)

@app.post("/api/creators", status_code=status.HTTP_201_CREATED)
def create_creator(creator: CreatorCreate, user_id: str = Depends(verify_token)):
    return db_create_creator(user_id, creator.name, creator.platform, creator.handle, creator.profile_url)

@app.delete("/api/creators/{creator_id}")
def delete_creator(creator_id: str, user_id: str = Depends(verify_token)):
    success = db_delete_creator(user_id, creator_id)
    if not success:
        raise HTTPException(status_code=404, detail="Creator not found or unauthorized")
    return {"message": "Creator deleted successfully"}

# --- MATERIALS ENDPOINTS ---

@app.get("/api/materials", response_model=List[dict])
def get_materials(user_id: str = Depends(verify_token)):
    return db_get_materials(user_id)

@app.post("/api/materials", status_code=status.HTTP_201_CREATED)
def create_material(material: MaterialCreate, user_id: str = Depends(verify_token)):
    return db_create_material(user_id, material.model_dump())

@app.put("/api/materials/{material_id}")
def update_material(material_id: str, material: MaterialUpdate, user_id: str = Depends(verify_token)):
    updated = db_update_material(user_id, material_id, material.model_dump(exclude_unset=True))
    if not updated:
        raise HTTPException(status_code=404, detail="Material not found or unauthorized")
    return updated

@app.delete("/api/materials/{material_id}")
def delete_material(material_id: str, user_id: str = Depends(verify_token)):
    success = db_delete_material(user_id, material_id)
    if not success:
        raise HTTPException(status_code=404, detail="Material not found or unauthorized")
    return {"message": "Material deleted successfully"}

# --- FILE UPLOAD ENDPOINT ---

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...), user_id: str = Depends(verify_token)):
    # Validate file type
    allowed_extensions = [".pdf", ".docx", ".doc", ".txt", ".png", ".jpg", ".jpeg"]
    _, file_ext = os.path.splitext(file.filename.lower())
    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=f"Unsupported file format. Allowed types: {', '.join(allowed_extensions)}"
        )
    
    try:
        content = await file.read()
        file_url = db_upload_file(user_id, file.filename, content, file.content_type)
        return {
            "file_name": file.filename,
            "file_url": file_url,
            "file_type": file_ext.replace(".", "")
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"File upload failed: {str(e)}"
        )


# --- TODOS ENDPOINTS ---

@app.get("/api/todos", response_model=List[dict])
def get_todos(user_id: str = Depends(verify_token)):
    return db_get_todos(user_id)

@app.post("/api/todos", status_code=status.HTTP_201_CREATED)
def create_todo(todo: TodoCreate, user_id: str = Depends(verify_token)):
    return db_create_todo(user_id, todo.text)

@app.put("/api/todos/{todo_id}")
def update_todo(todo_id: str, todo: TodoUpdate, user_id: str = Depends(verify_token)):
    updated = db_update_todo(user_id, todo_id, todo.is_completed)
    if not updated:
        raise HTTPException(status_code=404, detail="Todo not found or unauthorized")
    return updated

@app.delete("/api/todos/{todo_id}")
def delete_todo(todo_id: str, user_id: str = Depends(verify_token)):
    success = db_delete_todo(user_id, todo_id)
    if not success:
        raise HTTPException(status_code=404, detail="Todo not found or unauthorized")
    return {"message": "Todo deleted successfully"}


# --- MONTHLY TARGETS ENDPOINTS ---

@app.get("/api/targets/{month}", response_model=List[dict])
def get_monthly_targets(month: str, user_id: str = Depends(verify_token)):
    # Validate month format
    import re
    if not re.match(r"^\d{4}-\d{2}$", month):
        raise HTTPException(status_code=400, detail="Invalid month format. Use YYYY-MM.")
    return db_get_monthly_targets(user_id, month)

@app.post("/api/targets", status_code=status.HTTP_201_CREATED)
def create_monthly_target(target: MonthlyTargetCreate, user_id: str = Depends(verify_token)):
    return db_create_monthly_target(user_id, target.month, target.text)

@app.put("/api/targets/{target_id}")
def update_monthly_target(target_id: str, target: MonthlyTargetUpdate, user_id: str = Depends(verify_token)):
    updated = db_update_monthly_target(user_id, target_id, target.is_completed)
    if not updated:
        raise HTTPException(status_code=404, detail="Target not found or unauthorized")
    return updated

@app.delete("/api/targets/{target_id}")
def delete_monthly_target(target_id: str, user_id: str = Depends(verify_token)):
    success = db_delete_monthly_target(user_id, target_id)
    if not success:
        raise HTTPException(status_code=404, detail="Target not found or unauthorized")
    return {"message": "Monthly target deleted successfully"}
