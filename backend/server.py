from flask import Flask, request, jsonify
from flask_cors import CORS
import json 
import os
import time

app = Flask(__name__)
CORS(app)
TASKS_FILE = "tasks.json"

def load_tasks():
    if os.path.exists(TASKS_FILE):
        with open(TASKS_FILE, "r") as f:
            return json.load(f)
        return []
    
def save_tasks(tasks):
    with open(TASKS_FILE, "w") as f:
        json.dump(tasks, f, indent = 2)

@app.route("/")
def home():
    return "task manager API is running"

@app.route("/tasks", methods = ["GET"])
def get_tasks():
    tasks= load_tasks()
    return jsonify(tasks)

@app.route("/tasks", methods = ["POST"])
def add_tasks():
    data = request.get_json()
    if not data or not data.get("title"):
        return jsonify({"ERROR " : "title is required"}),400
    title = data["title"].strip()
    if title == "":
        return jsonify({"ERROR " : "title cannot be left empty"}),400
    
    tasks = load_tasks()
    for task in tasks:
        if task["title"].lower() == title.lower():
            return ({"ERROR " : "task already exists"}),400
    new_task= {
        "id": int(time.time()*1000),
        "title": title,
        "completed": False,}
    tasks.append(new_task)
    save_tasks(tasks)
    return jsonify(new_task),201

if __name__ == "__main__":
    app.run(debug = True, port = 5000)