import os
import json
import uuid
import requests
from datetime import datetime
from typing import List, Dict, Any, Optional
from supabase import create_client, Client
from app.config import settings

# Determine if we should use the local file database mock or real Supabase
USE_MOCK = (
    not settings.SUPABASE_URL 
    or not settings.SUPABASE_KEY 
    or "your-supabase-project" in settings.SUPABASE_URL 
    or "your-supabase" in settings.SUPABASE_KEY
)

supabase_client: Optional[Client] = None

if not USE_MOCK:
    try:
        # Check connection connectivity (DNS lookup/unreachable checks)
        requests.get(settings.SUPABASE_URL, timeout=3.0)
        supabase_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        print("Using Cloud Supabase PostgreSQL Database.")
    except Exception as e:
        print(f"Error connecting to Supabase: {e}. Falling back to Local Database.")
        USE_MOCK = True
else:
    print("Using Local JSON File Database (mock mode). Add Supabase keys to .env to connect to cloud.")

# --- Local File Database Implementation (Fallback) ---
LOCAL_DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "local_db.json")

def load_local_db() -> Dict[str, List[Dict[str, Any]]]:
    if not os.path.exists(LOCAL_DB_FILE):
        # Initial Seed Data for a premium first-run experience
        initial_data = {
            "subjects": [
                {"id": "s1", "user_id": "mock-user-123", "name": "Computer Networks", "color": "#8B5CF6", "created_at": datetime.now().isoformat()},
                {"id": "s2", "user_id": "mock-user-123", "name": "DBMS", "color": "#3B82F6", "created_at": datetime.now().isoformat()},
                {"id": "s3", "user_id": "mock-user-123", "name": "Web Development", "color": "#10B981", "created_at": datetime.now().isoformat()},
                {"id": "s4", "user_id": "mock-user-123", "name": "Placement Prep", "color": "#F59E0B", "created_at": datetime.now().isoformat()}
            ],
            "creators": [
                {"id": "c1", "user_id": "mock-user-123", "name": "Love Babbar", "platform": "YouTube", "handle": "@lovebabbar", "profile_url": "https://youtube.com/@lovebabbar", "created_at": datetime.now().isoformat()},
                {"id": "c2", "user_id": "mock-user-123", "name": "Striver (takeUforward)", "platform": "YouTube", "handle": "@takeUforward", "profile_url": "https://youtube.com/@takeuforward", "created_at": datetime.now().isoformat()},
                {"id": "c3", "user_id": "mock-user-123", "name": "Tech Insider", "platform": "Instagram", "handle": "@tech_insider", "profile_url": "https://instagram.com", "created_at": datetime.now().isoformat()}
            ],
            "materials": [
                {
                    "id": "m1", 
                    "user_id": "mock-user-123", 
                    "title": "Complete DSA Placement Sheet", 
                    "type": "google_drive", 
                    "url": "https://drive.google.com/drive/folders/123_placeholder", 
                    "description": "Comprehensive interview preparation sheet containing 450+ solved DSA problems in C++ and Java.",
                    "subject_id": "s4", 
                    "creator_id": "c1", 
                    "is_favorite": True, 
                    "is_read": False, 
                    "tags": ["DSA", "Placements", "Interview"], 
                    "notes": "Must complete arrays and trees section first.", 
                    "created_at": datetime.now().isoformat()
                },
                {
                    "id": "m2", 
                    "user_id": "mock-user-123", 
                    "title": "SQL Cheat Sheet for Developers", 
                    "type": "pdf", 
                    "url": "https://example.com/sql_cheat_sheet.pdf", 
                    "description": "A quick-reference sheet covering SQL joins, aggregates, subqueries, and window functions.",
                    "subject_id": "s2", 
                    "creator_id": "c2", 
                    "is_favorite": False, 
                    "is_read": True, 
                    "tags": ["SQL", "Cheat Sheet", "Database"], 
                    "notes": "Keep printed on desk.", 
                    "created_at": datetime.now().isoformat()
                },
                {
                    "id": "m3", 
                    "user_id": "mock-user-123", 
                    "title": "React 19 Server Components Explained", 
                    "type": "website", 
                    "url": "https://react.dev", 
                    "description": "Official guide and breakdown of React Server Components (RSC), hydration, and data fetching.",
                    "subject_id": "s3", 
                    "creator_id": "c3", 
                    "is_favorite": True, 
                    "is_read": False, 
                    "tags": ["React", "Frontend", "Web Dev"], 
                    "notes": "Explains how server components differ from client components.", 
                    "created_at": datetime.now().isoformat()
                }
            ],
            "todos": [],
            "monthly_targets": []
        }
        with open(LOCAL_DB_FILE, 'w') as f:
            json.dump(initial_data, f, indent=4)
        return initial_data
    
    with open(LOCAL_DB_FILE, 'r') as f:
        data = json.load(f)
        changed = False
        if "todos" not in data:
            data["todos"] = []
            changed = True
        if "monthly_targets" not in data:
            data["monthly_targets"] = []
            changed = True
        if changed:
            save_local_db(data)
        return data

def save_local_db(data: Dict[str, List[Dict[str, Any]]]):
    with open(LOCAL_DB_FILE, 'w') as f:
        json.dump(data, f, indent=4)

# --- Repository Functions ---

# --- SUBJECTS CRUD ---
def db_get_subjects(user_id: str) -> List[Dict[str, Any]]:
    if USE_MOCK:
        db = load_local_db()
        return [s for s in db["subjects"] if s["user_id"] == user_id]
    
    response = supabase_client.table("subjects").select("*").eq("user_id", user_id).execute()
    return response.data

def db_create_subject(user_id: str, name: str, color: str) -> Dict[str, Any]:
    if USE_MOCK:
        db = load_local_db()
        new_subject = {
            "id": str(uuid.uuid4()),
            "user_id": user_id,
            "name": name,
            "color": color,
            "created_at": datetime.now().isoformat()
        }
        db["subjects"].append(new_subject)
        save_local_db(db)
        return new_subject
    
    response = supabase_client.table("subjects").insert({
        "user_id": user_id,
        "name": name,
        "color": color
    }).execute()
    return response.data[0] if response.data else {}

def db_delete_subject(user_id: str, subject_id: str) -> bool:
    if USE_MOCK:
        db = load_local_db()
        original_len = len(db["subjects"])
        db["subjects"] = [s for s in db["subjects"] if not (s["id"] == subject_id and s["user_id"] == user_id)]
        
        # Orphan materials: set their subject_id to None
        for m in db["materials"]:
            if m.get("subject_id") == subject_id and m["user_id"] == user_id:
                m["subject_id"] = None
                
        save_local_db(db)
        return len(db["subjects"]) < original_len
    
    response = supabase_client.table("subjects").delete().eq("id", subject_id).eq("user_id", user_id).execute()
    return len(response.data) > 0 if response.data is not None else True

# --- CREATORS CRUD ---
def db_get_creators(user_id: str) -> List[Dict[str, Any]]:
    if USE_MOCK:
        db = load_local_db()
        return [c for c in db["creators"] if c["user_id"] == user_id]
    
    response = supabase_client.table("creators").select("*").eq("user_id", user_id).execute()
    return response.data

def db_create_creator(user_id: str, name: str, platform: str, handle: Optional[str] = None, profile_url: Optional[str] = None) -> Dict[str, Any]:
    if USE_MOCK:
        db = load_local_db()
        new_creator = {
            "id": str(uuid.uuid4()),
            "user_id": user_id,
            "name": name,
            "platform": platform,
            "handle": handle,
            "profile_url": profile_url,
            "created_at": datetime.now().isoformat()
        }
        db["creators"].append(new_creator)
        save_local_db(db)
        return new_creator
    
    response = supabase_client.table("creators").insert({
        "user_id": user_id,
        "name": name,
        "platform": platform,
        "handle": handle,
        "profile_url": profile_url
    }).execute()
    return response.data[0] if response.data else {}

def db_delete_creator(user_id: str, creator_id: str) -> bool:
    if USE_MOCK:
        db = load_local_db()
        original_len = len(db["creators"])
        db["creators"] = [c for c in db["creators"] if not (c["id"] == creator_id and c["user_id"] == user_id)]
        
        # Orphan materials: set their creator_id to None
        for m in db["materials"]:
            if m.get("creator_id") == creator_id and m["user_id"] == user_id:
                m["creator_id"] = None
                
        save_local_db(db)
        return len(db["creators"]) < original_len
    
    response = supabase_client.table("creators").delete().eq("id", creator_id).eq("user_id", user_id).execute()
    return len(response.data) > 0 if response.data is not None else True

# --- MATERIALS CRUD ---
def db_get_materials(user_id: str) -> List[Dict[str, Any]]:
    if USE_MOCK:
        db = load_local_db()
        return [m for m in db["materials"] if m["user_id"] == user_id]
    
    response = supabase_client.table("materials").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
    return response.data

def db_create_material(user_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
    # Extract material attributes
    material_data = {
        "user_id": user_id,
        "title": data.get("title"),
        "type": data.get("type", "other"),
        "url": data.get("url"),
        "description": data.get("description"),
        "subject_id": data.get("subject_id"),
        "creator_id": data.get("creator_id"),
        "is_favorite": data.get("is_favorite", False),
        "is_read": data.get("is_read", False),
        "tags": data.get("tags", []),
        "notes": data.get("notes")
    }

    if USE_MOCK:
        db = load_local_db()
        new_material = {
            "id": str(uuid.uuid4()),
            "created_at": datetime.now().isoformat(),
            **material_data
        }
        db["materials"].append(new_material)
        save_local_db(db)
        return new_material
    
    response = supabase_client.table("materials").insert(material_data).execute()
    return response.data[0] if response.data else {}

def db_update_material(user_id: str, material_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
    # Filter only relevant fields to update
    allowed_keys = ["title", "type", "url", "description", "subject_id", "creator_id", "is_favorite", "is_read", "tags", "notes"]
    update_data = {k: v for k, v in data.items() if k in allowed_keys}
    
    if USE_MOCK:
        db = load_local_db()
        for m in db["materials"]:
            if m["id"] == material_id and m["user_id"] == user_id:
                m.update(update_data)
                save_local_db(db)
                return m
        return {}
    
    response = supabase_client.table("materials").update(update_data).eq("id", material_id).eq("user_id", user_id).execute()
    return response.data[0] if response.data else {}

def db_delete_material(user_id: str, material_id: str) -> bool:
    if USE_MOCK:
        db = load_local_db()
        original_len = len(db["materials"])
        db["materials"] = [m for m in db["materials"] if not (m["id"] == material_id and m["user_id"] == user_id)]
        save_local_db(db)
        return len(db["materials"]) < original_len
    
    response = supabase_client.table("materials").delete().eq("id", material_id).eq("user_id", user_id).execute()
    return len(response.data) > 0 if response.data is not None else True

# --- Supabase Storage Bucket Mock/Real Upload ---
def db_upload_file(user_id: str, file_name: str, file_content: bytes, content_type: str) -> str:
    """
    Uploads a file to Supabase Storage, or stores it locally as mock.
    Returns:
        str: Access URL (public url or mock url)
    """
    clean_file_name = f"{user_id}/{str(uuid.uuid4())}_{file_name}"
    
    if USE_MOCK:
        # Save file locally inside an 'uploads/' subdirectory in backend
        uploads_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "uploads")
        os.makedirs(uploads_dir, exist_ok=True)
        file_path = os.path.join(uploads_dir, file_name)
        with open(file_path, 'wb') as f:
            f.write(file_content)
        # Return a relative/local mock URL
        return f"http://localhost:8000/uploads/{file_name}"
    
    # Upload to Supabase bucket 'materials-bucket'
    try:
        # Make sure the bucket exists or handle error
        bucket_name = "materials-bucket"
        supabase_client.storage.from_(bucket_name).upload(
            path=clean_file_name,
            file=file_content,
            file_options={"content-type": content_type}
        )
        # Generate the public URL
        url_res = supabase_client.storage.from_(bucket_name).get_public_url(clean_file_name)
        return url_res
    except Exception as e:
        # If public bucket configuration fails, we fallback to signed URL or raise
        raise Exception(f"Supabase Storage Upload failed: {str(e)}")


# --- TODOS CRUD ---
def db_get_todos(user_id: str) -> List[Dict[str, Any]]:
    if USE_MOCK:
        db = load_local_db()
        return [t for t in db["todos"] if t["user_id"] == user_id]
    
    response = supabase_client.table("todos").select("*").eq("user_id", user_id).order("created_at", desc=False).execute()
    return response.data

def db_create_todo(user_id: str, text: str) -> Dict[str, Any]:
    todo_data = {
        "user_id": user_id,
        "text": text,
        "is_completed": False
    }
    
    if USE_MOCK:
        db = load_local_db()
        new_todo = {
            "id": str(uuid.uuid4()),
            "created_at": datetime.now().isoformat(),
            **todo_data
        }
        db["todos"].append(new_todo)
        save_local_db(db)
        return new_todo
        
    response = supabase_client.table("todos").insert(todo_data).execute()
    return response.data[0] if response.data else {}

def db_update_todo(user_id: str, todo_id: str, is_completed: bool) -> Dict[str, Any]:
    if USE_MOCK:
        db = load_local_db()
        for t in db["todos"]:
            if t["id"] == todo_id and t["user_id"] == user_id:
                t["is_completed"] = is_completed
                save_local_db(db)
                return t
        return {}
        
    response = supabase_client.table("todos").update({"is_completed": is_completed}).eq("id", todo_id).eq("user_id", user_id).execute()
    return response.data[0] if response.data else {}

def db_delete_todo(user_id: str, todo_id: str) -> bool:
    if USE_MOCK:
        db = load_local_db()
        original_len = len(db["todos"])
        db["todos"] = [t for t in db["todos"] if not (t["id"] == todo_id and t["user_id"] == user_id)]
        save_local_db(db)
        return len(db["todos"]) < original_len
        
    response = supabase_client.table("todos").delete().eq("id", todo_id).eq("user_id", user_id).execute()
    return len(response.data) > 0 if response.data is not None else True


# --- MONTHLY TARGETS (Monthly task lists) ---
def db_get_monthly_targets(user_id: str, month: str) -> List[Dict[str, Any]]:
    if USE_MOCK:
        db = load_local_db()
        if "monthly_targets" not in db:
            db["monthly_targets"] = []
            save_local_db(db)
        return [t for t in db["monthly_targets"] if t["user_id"] == user_id and t["month"] == month]
    
    response = supabase_client.table("monthly_targets").select("*").eq("user_id", user_id).eq("month", month).order("created_at", desc=False).execute()
    return response.data

def db_create_monthly_target(user_id: str, month: str, text: str) -> Dict[str, Any]:
    target_data = {
        "user_id": user_id,
        "month": month,
        "text": text,
        "is_completed": False
    }
    
    if USE_MOCK:
        db = load_local_db()
        if "monthly_targets" not in db:
            db["monthly_targets"] = []
        new_target = {
            "id": str(uuid.uuid4()),
            "created_at": datetime.now().isoformat(),
            **target_data
        }
        db["monthly_targets"].append(new_target)
        save_local_db(db)
        return new_target
        
    response = supabase_client.table("monthly_targets").insert(target_data).execute()
    return response.data[0] if response.data else {}

def db_update_monthly_target(user_id: str, target_id: str, is_completed: bool) -> Dict[str, Any]:
    if USE_MOCK:
        db = load_local_db()
        if "monthly_targets" not in db:
            db["monthly_targets"] = []
        for t in db["monthly_targets"]:
            if t["id"] == target_id and t["user_id"] == user_id:
                t["is_completed"] = is_completed
                save_local_db(db)
                return t
        return {}
        
    response = supabase_client.table("monthly_targets").update({"is_completed": is_completed}).eq("id", target_id).eq("user_id", user_id).execute()
    return response.data[0] if response.data else {}

def db_delete_monthly_target(user_id: str, target_id: str) -> bool:
    if USE_MOCK:
        db = load_local_db()
        if "monthly_targets" not in db:
            db["monthly_targets"] = []
        original_len = len(db["monthly_targets"])
        db["monthly_targets"] = [t for t in db["monthly_targets"] if not (t["id"] == target_id and t["user_id"] == user_id)]
        save_local_db(db)
        return len(db["monthly_targets"]) < original_len
        
    response = supabase_client.table("monthly_targets").delete().eq("id", target_id).eq("user_id", user_id).execute()
    return len(response.data) > 0 if response.data is not None else True
