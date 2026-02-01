from fastapi import APIRouter, HTTPException
from app.models.schemas import ChatRequest, ChatResponse
from app.services.ai_service import get_ai_reply

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)

@router.get("/test")
def test():
    return {"msg": "chat route working"}

@router.post("/", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    try:
        # Show user message in terminal
        print("User message received:", request.message)

        # Send message to Gemini AI
        ai_reply = get_ai_reply(request.message)

        return ChatResponse(
            reply=ai_reply 
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
