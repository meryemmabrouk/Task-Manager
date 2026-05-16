from flask import Flask, request, jsonify
from flask_cors import CORS
import json 
import os
import time

app = Flask(__name__)
CORS(app)
TASKS_FILE = "tasks.json"

# COMMIT called -- active buttons and task counter put into senetence