from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai_service import get_openai_response
import json

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NoteRequest(BaseModel):
    userInput: str

class RedoRequest(BaseModel):
    userInput: str
    initialGeneratedResponse: str

@app.post("/generate/new")
async def generate_note(request: NoteRequest):
    prompt = f"""
    Generate a concise ABA therapy session note based on the following information written by a clinician reviewing a patient's case:

    {request.userInput}

    Please format the note according to standard ABA therapy session note guidelines.
    """

    try:
        generated_note = get_openai_response(prompt)
        return {"generated_note": generated_note}
    except Exception as e:
        return {"error": str(e)}
    

@app.post("/generate/redo")
async def generate_redo_note(request: RedoRequest):
    prompt = f""" """

    try:
        # generated_redo_note = get_openai_redo(prompt)
        # return {"generated_note": generated_redo_note}
        return {"generated_note": "yes"}
    except Exception as e:
        return {"error": str(e)}