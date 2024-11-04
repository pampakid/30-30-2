# backend/config.py
from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///todos.db')
    SQLALQUEMY_TRACK_MODIFICATIONS = False
    CORS_HEADERS = 'Content-Type'