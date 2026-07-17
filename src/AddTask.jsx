import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function AddTask({ userId }) {
  const [title, setTitle] = useState("");
  const [coins, setCoins] = useState(5);
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      alert("Please enter a task title");
      return;
    }
    try {
      await addDoc(collection(db, "tasks"), {
        title: title,
        coins: Number(coins),
        completed: false,
        userId: userId,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setCoins(5);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  return (
    <form onSubmit={handleAddTask} className="task-input-row">
      <input type="text" placeholder="Enter today's task" value={title} onChange={(e) => setTitle(e.target.value)} />
      <select className="select-dark" value={coins} onChange={(e) => setCoins(e.target.value)}>
        <option value="5">5 coins</option>
        <option value="10">10 coins</option>
        <option value="15">15 coins</option>
        <option value="20">20 coins</option>
      </select>
      <button type="submit" className="btn">Add Task</button>
    </form>
  );
}
export default AddTask;