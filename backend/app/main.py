# from fastapi.middleware.cors import CORSMiddleware
# from fastapi import FastAPI
# from app.routes.chat import router as chat_router

# # Create FastAPI app instance
# app = FastAPI(
#     title="AI Chatbot Backend",
#     description="Backend API for AI Chatbot",
#     version="1.0.0"
# )

# # Register routers
# app.include_router(chat_router)

# # Health check / root endpoint
# @app.get("/")
# def root():
#     return {
#         "status": "success",
#         "message": "Backend is running successfully"
#     }
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.chat import router as chat_router

# Create FastAPI app instance
app = FastAPI(
    title="AI Chatbot Backend",
    description="Backend API for AI Chatbot",
    version="1.0.0"
)

# ✅ ADD CORS MIDDLEWARE (THIS FIXES LIVE SERVER ISSUE)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins (development only)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(chat_router)

# Health check / root endpoint
@app.get("/")
def root():
    return {
        "status": "success",
        "message": "Backend is running successfully"
    }
