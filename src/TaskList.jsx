import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

function TaskList({ userId, view }) {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCoins, setEditCoins] = useState(5);
  const [poppingTask, setPoppingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    const tasksQuery = query(collection(db, "tasks"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const taskList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(taskList);
    });
    return () => unsubscribe();
  }, [userId]);

  const isToday = (timestamp) => {
    if (!timestamp) return false;
    const taskDate = timestamp.toDate();
    const today = new Date();
    return taskDate.getDate() === today.getDate() && taskDate.getMonth() === today.getMonth() && taskDate.getFullYear() === today.getFullYear();
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    return timestamp.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const handleToggleComplete = async (task) => {
    const newStatus = !task.completed;
    const taskRef = doc(db, "tasks", task.id);
    await updateDoc(taskRef, { completed: newStatus });
    if (newStatus) {
      setPoppingTask({ id: task.id, coins: task.coins });
      setTimeout(() => setPoppingTask(null), 900);
    }
  };

  const confirmDelete = async () => {
    if (!taskToDelete) return;
    await deleteDoc(doc(db, "tasks", taskToDelete));
    setTaskToDelete(null);
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditCoins(task.coins);
  };

  const cancelEditing = () => setEditingId(null);

  const saveEdit = async (taskId) => {
    if (editTitle.trim() === "") {
      alert("Task title can't be empty");
      return;
    }
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { title: editTitle, coins: Number(editCoins) });
    setEditingId(null);
  };

  const renderTask = (task) => {
    if (editingId === task.id) {
      return (
        <div key={task.id} className="task-item">
          <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          <select className="select-dark" value={editCoins} onChange={(e) => setEditCoins(e.target.value)}>
            <option value="5">5 coins</option>
            <option value="10">10 coins</option>
            <option value="15">15 coins</option>
            <option value="20">20 coins</option>
          </select>
          <button className="btn" onClick={() => saveEdit(task.id)}>Save</button>
          <button className="btn btn-secondary" onClick={cancelEditing}>Cancel</button>
        </div>
      );
    }
    return (
      <div key={task.id} className="task-item">
        <input type="checkbox" checked={task.completed} onChange={() => handleToggleComplete(task)} />
        {poppingTask && poppingTask.id === task.id && <span className="coin-pop">+{poppingTask.coins}</span>}
        <span className={`task-title ${task.completed ? "completed" : ""}`}>{task.title}</span>
        <span className="task-date">{formatDate(task.createdAt)}</span>
        <span className="coin-badge">{task.coins} coins</span>
        <button className="btn btn-secondary" onClick={() => startEditing(task)}>Edit</button>
        <button className="btn btn-danger" onClick={() => setTaskToDelete(task.id)}>Delete</button>
      </div>
    );
  };

  if (view === "projects") {
    return (
      <div>
        <h3>Projects</h3>
        <p className="muted-note">Projects aren't set up yet — this is a placeholder for a future update.</p>
      </div>
    );
  }

  const todayTasks = tasks.filter((task) => isToday(task.createdAt) && !task.completed);
  const backlogTasks = tasks.filter((task) => !isToday(task.createdAt) && !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  let heading = "Today's Tasks";
  let list = todayTasks;
  if (view === "upcoming") {
    heading = "Backlog (Carried Over)";
    list = backlogTasks;
  }
  if (view === "completed") {
    heading = "Completed Tasks";
    list = completedTasks;
  }

  return (
    <div>
      <h3>{heading}</h3>
      {list.length === 0 && <p className="muted-note">Nothing here yet.</p>}
      {list.map(renderTask)}
      {taskToDelete && (
        <div className="modal-overlay" onClick={() => setTaskToDelete(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <p className="modal-text">Are you sure you want to delete this task?</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setTaskToDelete(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default TaskList;