import { useState, useEffect } from "react";
import { auth, googleProvider } from "./firebase";
import { signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from "firebase/auth";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import Wallet from "./Wallet";
import Stats from "./Stats";
import Sidebar from "./Sidebar";
import Calendar from "./Calendar";
import Landing from "./Landing";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [activeView, setActiveView] = useState("today");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    getRedirectResult(auth).catch((error)=>{
      console.log("Redirect login error:",error);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (!user) {
    return <Landing onLogin={handleLogin} />;
  }

  return (
    <div className="dashboard-shell">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="dashboard-main">
        <div className="header glass-panel">
          <h1>Todo<span className="logo-dot">.</span></h1>
          <div className="header-right">
            <div className="profile-info">
              <img src={user.photoURL} alt="profile" />
              <div>
                <div className="profile-name">{user.displayName}</div>
                <div className="profile-email">{user.email}</div>
              </div>
              <button className="btn btn-secondary" onClick={handleLogout}>Log Out</button>
            </div>
          </div>
        </div>
        <div className="main-grid">
          <div className="left-column">
            <div className="card glass-panel">
              <h3>Add a Task</h3>
              <AddTask userId={user.uid} />
            </div>
            <div className="card glass-panel">
              <TaskList userId={user.uid} view={activeView} />
            </div>
          </div>
          <div className="right-column">
            <div className="card glass-panel">
              <Calendar />
            </div>
            <div className="card glass-panel">
              <Wallet userId={user.uid} />
            </div>
            <div className="card glass-panel">
              <Stats userId={user.uid} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;