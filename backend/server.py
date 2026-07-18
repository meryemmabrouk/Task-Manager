from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json 
import os
import time

BASE_DIR = os.path.dirname(__file__)
FRONTEND_DIR = os.path.join(BASE_DIR, "..", "frontend")

app = Flask(__name__, static_folder= FRONTEND_DIR, static_url_path= "")
CORS(app)
TASKS_FILE = os.path.join(BASE_DIR, "tasks.json")

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
    return send_from_directory(FRONTEND_DIR,"index.html")
    # return "task manager API is running"

 

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
            return jsonify({"error": "Task already exists"}), 400
    new_task= {
        "id": int(time.time()*1000),
        "title": title,
        "completed": False,}
    tasks.append(new_task)
    save_tasks(tasks)
    return jsonify(new_task),201

@app.route("/tasks/<int:task_id>", methods = ["DELETE"])
def delete_tasks(task_id):
    tasks = load_tasks()
    original_length = len(tasks)
    tasks = [task for task in tasks if task["id"] != task_id]
    if len(tasks) == original_length:
        return jsonify({"ERROR " : "task not found"}),404
    save_tasks(tasks)
    return jsonify({"message" : "task deleted"}),200

@app.route("/tasks", methods = ["DELETE"])
def clear_all():
    save_tasks([])
    return jsonify({"message" : "all tasks cleared"}),200
    


if __name__ == "__main__":
    app.run(debug = True, port = 5001)