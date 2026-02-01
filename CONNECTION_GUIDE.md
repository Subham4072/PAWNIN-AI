# Frontend-Backend Connection Setup

## ✅ What's Been Connected

### Backend (FastAPI on port 8000)
- **Chat Endpoint:** `POST /chat/`
- **Request:** `{ "message": "user message" }`
- **Response:** `{ "reply": "AI response" }`
- **Features:** CORS enabled, Groq AI integration with conversation memory

### Frontend (React on port 5173)
- **API Client Hook:** `useChat()` - handles all API calls
- **Environment:** `VITE_API_BASE_URL=http://localhost:8000`
- **Real-time:** Messages sent to backend, AI responses displayed in chat

---

## 🚀 How to Run

### **Terminal 1: Start Backend**
```powershell
cd d:\projects\AI\ based\ chatbot\backend
# Activate venv (if not already activated)
.\.venv\Scripts\Activate.ps1
# Install dependencies (if needed)
pip install -r requirements.txt
# Run backend
python -m uvicorn app.main:app --reload --port 8000
```

### **Terminal 2: Start Frontend**
```powershell
cd d:\projects\AI\ based\ chatbot\frontend
# Run frontend dev server
npm run dev
# Or if using bun
bun run dev
```

**Frontend URL:** http://localhost:5173  
**Backend API:** http://localhost:8000

---

## 📋 Testing Checklist

1. ✅ Backend running on port 8000
   - Check: http://localhost:8000/ should show `{"status":"success","message":"Backend is running successfully"}`

2. ✅ Frontend running on port 5173
   - Check: http://localhost:5173/ should load the chat interface

3. ✅ Send a test message
   - Type: "What is your name?"
   - Expected: AI responds with "My name is Pawnin."

4. ✅ Check conversation memory
   - Send: "What was the first thing I said?"
   - Expected: AI remembers your initial message

5. ✅ Test error handling
   - Stop backend and try sending a message
   - Expected: Error message shown gracefully

---

## 🔧 Environment Variables

### Frontend (.env and .env.local)
```
VITE_API_BASE_URL=http://localhost:8000
```

### Backend (.env in backend folder)
```
GROQ_API_KEY=your_actual_api_key_here
```

---

## 📁 Key Files Changed

- **Created:** [frontend/src/hooks/useChat.ts](frontend/src/hooks/useChat.ts) - API client hook
- **Modified:** [frontend/src/pages/Index.tsx](frontend/src/pages/Index.tsx) - Uses real API instead of mock responses
- **Created:** [frontend/.env](frontend/.env) - Environment config
- **Existing:** [backend/app/main.py](backend/app/main.py) - Already had CORS enabled
- **Existing:** [backend/app/routes/chat.py](backend/app/routes/chat.py) - Chat endpoint working

---

## 🎯 How It Works

1. User types message in ChatInput → sends to Index page
2. Index page calls `sendChatMessage()` from `useChat()` hook
3. Hook makes POST request to `http://localhost:8000/chat/`
4. Backend receives message, sends to Groq AI API
5. Groq AI returns response
6. Backend returns response in JSON format
7. Frontend receives response and displays it in chat
8. Conversation history maintained on backend for context

---

## 🐛 Troubleshooting

### "Failed to fetch" error
- Check if backend is running on port 8000
- Check browser console for CORS errors
- Verify `VITE_API_BASE_URL` is set correctly

### Backend shows 500 error
- Check if GROQ_API_KEY is set in backend/.env
- Check terminal output for detailed error messages
- Verify Groq API key is valid

### Messages not being sent
- Check if frontend is connected to the same network
- Verify port 8000 is not blocked by firewall
- Check network tab in browser DevTools

---

## 🔄 How to Change Backend URL

For production or different server:
1. Edit `frontend/.env` or `frontend/.env.local`
2. Change: `VITE_API_BASE_URL=https://your-api-url.com`
3. Restart frontend dev server

---

**Connection Status: ✅ READY TO USE**
