import { useState, useEffect, useRef } from "react";
import { db } from "./firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

function Wallet({ userId }) {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [displayCoins, setDisplayCoins] = useState(0);
  const prevTotal = useRef(0);

  useEffect(() => {
    const tasksQuery = query(
      collection(db, "tasks"),
      where("userId", "==", userId),
      where("completed", "==", true)
    );
    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const taskList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCompletedTasks(taskList);
    });
    return () => unsubscribe();
  }, [userId]);

  const totalCoins = completedTasks.reduce((sum, task) => sum + task.coins, 0);

  useEffect(() => {
    const start = prevTotal.current;
    const end = totalCoins;
    if (start === end) return;
    const duration = 600;
    const startTime = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayCoins(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    prevTotal.current = end;
  }, [totalCoins]);

  return (
    <div>
      <h3>My Coins</h3>
      <div className="wallet-total">{displayCoins} 🪙</div>
      <h4>History</h4>
      {completedTasks.length === 0 && <p>No coins earned yet.</p>}
      {completedTasks.map((task, i) => (
        <div key={task.id} className="history-item" style={{ animationDelay: `${i * 0.05}s` }}>
          {task.title} — +{task.coins} coins
        </div>
      ))}
    </div>
  );
}
export default Wallet;