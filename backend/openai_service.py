from dotenv import load_dotenv
import os
from openai import OpenAI

def get_openai_response(prompt):
    load_dotenv()
    
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    if not OPENAI_API_KEY:
        raise ValueError("OPENAI_API_KEY is not set in the environment")

    OpenAI.api_key = OPENAI_API_KEY
    
    completion = OpenAI().chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a professional medical assistant with 20 years of experience in scribing medical notes, writing clearly and concisely with a focus on accuracy and organization."},
            {"role": "user", "content": prompt}
        ]
    )

    return completion.choices[0].message.content
