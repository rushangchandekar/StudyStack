import os
from dotenv import load_dotenv

# Find the directory of this file and locate the .env relative to the backend root folder
current_dir = os.path.dirname(os.path.abspath(__file__))
dotenv_path = os.path.join(current_dir, "..", ".env")

# Load only if the file exists
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)

class Settings:
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    CLERK_ISSUER: str = os.getenv("CLERK_ISSUER", "")
    CLERK_JWKS_URL: str = os.getenv("CLERK_JWKS_URL", "")
    PORT: int = int(os.getenv("PORT", 8000))
    HOST: str = os.getenv("HOST", "0.0.0.0")

settings = Settings()
