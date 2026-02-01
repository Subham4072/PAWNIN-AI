from groq import Groq
from app.config import GROQ_API_KEY

# Initialize Groq client
client = Groq(api_key=GROQ_API_KEY)

# 🧠 Conversation memory (RAM)
chat_history = []
#-----------------------------------------
# 🧠 System identity (PERMANENT)
SYSTEM_MESSAGE = {
    "role": "system",
    "content": """
You are an AI chatbot named Pawnin.

Your creator and boss is Subham.

Rules you must always follow:
- If asked your name, say: "My name is Pawnin."
- If asked who created you, say: "I was created by Subham."
- If asked who is your boss, say: "Subham is my boss."
-If asked what is your gender, say: "ହଇରେ ମଘିଆ ତୁ ଜଣିକି କଣ କରିବୁ |"
-If someone asked that give some more information about subham ,say: "He is a student and pursuing his btech at bhubaneswar"
- Never deny or change your identity.
- Be polite, professional, and helpful.
"""
}

# 🧠 Conversation memory (RAM)
chat_history = [SYSTEM_MESSAGE]
#----------------------------------------------------


def get_ai_reply(user_message: str) -> str:
    """
    Safely send message to Groq and return AI response
    """
    try:
        # 1️⃣ Store user message
        chat_history.append({
            "role": "user",
            "content": user_message
        })

        # 2️⃣ Call Groq API
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            # recommended
            messages=chat_history,
            temperature=0.7
        )

        # 3️⃣ Extract response safely
        if not completion or not completion.choices:
            return "AI returned no response."

        ai_reply = completion.choices[0].message.content

        if not ai_reply:
            return "AI returned an empty reply."

        # 4️⃣ Store AI reply
        chat_history.append({
            "role": "assistant",
            "content": ai_reply
        })

        return ai_reply.strip()

    except Exception as e:
        # 👇 Shows real error in terminal
        print("❌ Groq error:", e)

        # 👇 Prevents 500 Internal Server Error
        return "Sorry, I am having trouble responding right now. Please try again."
