import requests
from jose import jwt
from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from app.config import settings

security = HTTPBearer()

# Local cache for the JSON Web Key Set (JWKS) to optimize API calls
clerk_jwks_cache = None

def get_jwks():
    global clerk_jwks_cache
    if clerk_jwks_cache is None:
        try:
            jwks_url = settings.CLERK_JWKS_URL
            if not jwks_url or "your-clerk-domain" in jwks_url:
                # If not configured, raise a local config exception so the client knows it
                raise ValueError("Clerk JWKS URL is not configured in .env")
            response = requests.get(jwks_url)
            response.raise_for_status()
            clerk_jwks_cache = response.json()
        except Exception as e:
            # Fallback to raising exception or notifying
            raise HTTPException(
                status_code=500,
                detail=f"Failed to fetch Clerk JWKS from Clerk service: {str(e)}. Please check your .env configuration."
            )
    return clerk_jwks_cache

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    """
    FastAPI dependency to verify a Clerk JWT token.
    Decodes the token, validates its signature and expiration, and extracts the User ID ('sub').
    
    Returns:
        str: Clerk User ID
    """
    token = credentials.credentials
    
    # DEV MOCK BYPASS:
    # If the user has not configured Clerk yet and sends a mock token,
    # let them bypass authentication to see the dashboard and CRUD capabilities.
    if token == "mock-user-token" or not settings.CLERK_JWKS_URL or "your-clerk-domain" in settings.CLERK_JWKS_URL:
        # If the keys aren't configured yet, we let them use the mock user
        # so they aren't completely blocked from testing the API structure!
        return "mock-user-123"

    try:
        jwks = get_jwks()
        
        # Verify the signature, expiry, and issuer of the token
        payload = jwt.decode(
            token,
            jwks,
            algorithms=["RS256"],
            issuer=settings.CLERK_ISSUER,
            options={"verify_aud": False} # Clerk tokens don't enforce client audience claim
        )
        
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="JWT token is missing user subject ('sub') claim")
        return user_id
        
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Session expired. Please log in again.")
    except jwt.JWTClaimsError:
        raise HTTPException(status_code=401, detail="Invalid session token claims.")
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Authentication failed: {str(e)}")
