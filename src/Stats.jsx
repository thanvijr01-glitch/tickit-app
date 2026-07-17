import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

function Stats({ userId }) {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const tasksQuery = query(collection(db, "tasks"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const taskList = snapshot.docs.map((doc) => doc.data());
      setTasks(taskList);
    });
    return () => unsubscribe();
  }, [userId]);
  const completedCount = tasks.filter((t) => t.completed).length;
  const backlogCount = tasks.filter((t) => !t.completed).length;
  const totalTasks = completedCount + backlogCount;
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);
  return (
    <div>
      <h3>Statistics</h3>
      <div className="stats-row">
        <div className="progress-ring" style={{ "--percent": completionRate }}>
          <span className="progress-ring-label">{completionRate}%</span>
        </div>
        <div className="stats-counts">
          <div className="stat-count-card">
            <span className="stat-count-number">{completedCount}</span>
            <span className="stat-count-label">Completed</span>
          </div>
          <div className="stat-count-card">
            <span className="stat-count-number">{backlogCount}</span>
            <span className="stat-count-label">Backlog</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Stats;