import { useState, useRef } from "react";
import "./Landing.css";

const stickers = [
  { emoji: "⭐", style: { top: "10%", left: "6%" }, delay: "0s" },
  { emoji: "🔥", style: { top: "16%", right: "10%" }, delay: "1.2s" },
  { emoji: "🎯", style: { top: "58%", left: "4%" }, delay: "0.6s" },
  { emoji: "💎", style: { bottom: "14%", right: "6%" }, delay: "1.8s" },
  { emoji: "⚡", style: { top: "42%", right: "22%" }, delay: "0.9s" },
  { emoji: "🚀", style: { bottom: "22%", left: "16%" }, delay: "1.5s" },
];

function Landing({ onLogin }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const handleMouseMove = (e) => {
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y });
  };
  const resetTilt = () => setTilt({ x: 0, y: 0 });
  return (
    <div className="landing">
      <div className="glow-orb glow-purple"></div>
      <div className="glow-orb glow-turquoise"></div>
      {stickers.map((s, i) => (
        <div key={i} className="sticker" style={{ ...s.style, animationDelay: s.delay }}>{s.emoji}</div>
      ))}
      <nav className="landing-nav">
        <div className="logo">Todo<span>.</span></div>
        <button className="btn-glass" onClick={onLogin}>Sign in with Google</button>
      </nav>
      <section className="hero" ref={heroRef} onMouseMove={handleMouseMove} onMouseLeave={resetTilt}>
        <div className="hero-text">
          <span className="eyebrow">Tasks that pay you back</span>
          <h1>Turn your to-do list<br />into a reward system</h1>
          <p>Plan today's tasks, attach coins to each one, and watch your wallet grow every time you get something done.</p>
          <button className="btn-primary" onClick={onLogin}>Get Started — It's Free</button>
        </div>
        <div className="card-stack" style={{ transform: `rotateY(${tilt.x * 20}deg) rotateX(${-tilt.y * 20}deg)` }}>
          <div className="task-card glass-panel card-back">
            <p className="card-label">Backlog</p>
            <p className="card-title">Read 10 pages</p>
          </div>
          <div className="task-card glass-panel card-mid">
            <p className="card-label">Today</p>
            <p className="card-title">Finish report</p>
            <span className="coin-tag">+10</span>
          </div>
          <div className="task-card glass-panel card-front">
            <div className="coin-flip">
              <div className="coin-face coin-task">
                <p className="card-label">Today</p>
                <p className="card-title">Morning workout</p>
              </div>
              <div className="coin-face coin-back">🪙 +15</div>
            </div>
          </div>
        </div>
      </section>
      <section className="features">
        <div className="feature glass-panel feature-purple">
          <span className="feature-mark">Plan</span>
          <h3>Add today's tasks</h3>
          <p>Write down what needs doing and set a coin value for each one.</p>
        </div>
        <div className="feature glass-panel feature-turquoise">
          <span className="feature-mark">Complete</span>
          <h3>Check it off</h3>
          <p>Finish a task, tick the box — nothing carries over unless you let it.</p>
        </div>
        <div className="feature glass-panel feature-gold">
          <span className="feature-mark">Earn</span>
          <h3>Watch coins add up</h3>
          <p>Every completed task credits your wallet, tracked in real time.</p>
        </div>
      </section>
    </div>
  );
}
export default Landing;